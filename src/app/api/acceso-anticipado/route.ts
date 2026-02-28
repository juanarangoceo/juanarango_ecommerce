import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

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

    if (!supabaseAdmin) {
      console.error('No se pudo inicializar Supabase Admin.');
      return NextResponse.json(
        { error: 'Error del servidor: Configuración de base de datos faltante.' },
        { status: 500 }
      );
    }

    const { error } = await supabaseAdmin
      .from('acceso_anticipado')
      .insert([
        {
          nombre,
          email,
          whatsapp: whatsapp || null,
          curso_id,
          curso_titulo,
          mensaje: mensaje || null,
        }
      ]);

    if (error) {
      console.error('Error insertando en Supabase:', error);
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
