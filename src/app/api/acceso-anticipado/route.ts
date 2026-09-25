import { NextResponse } from 'next/server';
import { captureContact } from '@/lib/crm/capture';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nombre, email, whatsapp, curso_id, curso_titulo, mensaje } = body;

    if (!nombre || !email || !curso_id || !curso_titulo) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos (nombre, email, curso_id, curso_titulo)' },
        { status: 400 }
      );
    }

    const captured = await captureContact({
      email: String(email),
      name: String(nombre),
      phone: whatsapp ? String(whatsapp) : null,
      form: 'acceso_anticipado',
      summary: `Acceso anticipado · ${String(curso_titulo).slice(0, 120)}`,
      data: { curso_id: String(curso_id), curso_titulo: String(curso_titulo), message: mensaje ? String(mensaje).slice(0, 2000) : null },
    });

    if (!captured) {
      return NextResponse.json(
        { error: 'Error guardando tu solicitud. Intenta nuevamente.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err: any) {
    console.error('Error en API acceso-anticipado:', err);
    return NextResponse.json(
      { error: 'Error procesando la solicitud' },
      { status: 500 }
    );
  }
}
