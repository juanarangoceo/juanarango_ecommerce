-- Por favor ejecuta este código SQL en el editor SQL de tu panel de Supabase
-- para el proyecto de juanarango_ecommerce.

CREATE TABLE acceso_anticipado (
  id            uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at    timestamptz DEFAULT now() NOT NULL,
  nombre        text NOT NULL,
  email         text NOT NULL,
  whatsapp      text,
  curso_id      text NOT NULL,
  curso_titulo  text NOT NULL,
  mensaje       text
);

-- Si deseas añadir Row Level Security (RLS) para mayor seguridad:
ALTER TABLE acceso_anticipado ENABLE ROW LEVEL SECURITY;

-- Solo la service_role (que se usa en el backend) puede hacer todo.
-- Los usuarios no autenticados o anon no deberían poder leer ni modificar esta tabla desde el cliente.
