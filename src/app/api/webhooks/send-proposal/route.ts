import { NextResponse } from "next/server";
import { Resend } from "resend";
import NitroProposalEmail from "@/emails/nitro-proposal";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.error("Error: RESEND_API_KEY is missing");
      return NextResponse.json(
        { error: "Configuration Error: RESEND_API_KEY is missing in environment variables." },
        { status: 500 }
      );
    }

    const body = await req.json();

    // Supabase Webhook payload structure: { type: 'INSERT', table: 'prospects', record: { ... }, old_record: null, ... }
    const { record } = body;

    if (!record || !record.email) {
      return NextResponse.json(
        { error: "Invalid payload: 'record.email' is missing." },
        { status: 400 }
      );
    }

    const { email, full_name, company_name } = record;

    console.log(`Sending proposal email to ${email} (${company_name})...`);

    const data = await resend.emails.send({
      from: "Nitro Ecom <nitro@juanarangoecommerce.com>", // TODO: User needs to verify their domain or use resend.dev for testing
      to: [email],
      subject: `Propuesta de Infraestructura Digital para ${company_name || "su empresa"}`,
      react: NitroProposalEmail({
        prospectName: full_name || "Visionario",
        companyName: company_name || "su empresa",
      }),
    });

    if (data.error) {
      console.error("Resend Error:", data.error);
      return NextResponse.json({ error: data.error }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error("Webhook Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
