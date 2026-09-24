# Documentación

La documentación se divide por ritmo de cambio para que agentes y personas
encuentren rápido la fuente correcta.

## Fuente de entrada

[`../AGENTS.md`](../AGENTS.md) contiene las reglas, el mapa y el estado resumido.
Codex lo descubre de forma nativa y `CLAUDE.md` lo importa para Claude Code.

## Documentos vivos

- [`pendientes.md`](pendientes.md): bloqueos y siguientes acciones. Se actualiza
  cada vez que cambia el estado.
- [`bitacora/`](bitacora/): qué se hizo, por qué y cómo se verificó. No se usa
  como lista de tareas.

## Documentos estables

- [`arquitectura.md`](arquitectura.md): estructura de la aplicación e integraciones.
- [`diseno-y-narrativa.md`](diseno-y-narrativa.md): identidad Nitro, jerarquía,
  patrones de copy, motion, responsive y decisiones visuales reutilizables.
- [`estrategia-nitrobot-embudo.md`](estrategia-nitrobot-embudo.md): plan maestro
  previo a implementación para la landing, la calificación, la integración
  segura y el panel comercial de Nitro Bot.
- [`desarrollo-y-despliegue.md`](desarrollo-y-despliegue.md): entorno, comandos,
  variables y proceso de validación.
- [`producto/`](producto/): verdad comercial, capacidades y límites de cada
  producto presentado en el sitio.

## Política de mantenimiento

1. No duplicar pendientes en varios archivos.
2. Una decisión terminada sale de `pendientes.md` y entra en la bitácora.
3. No copiar secretos, IDs privados, datos personales ni valores de `.env`.
4. Las cifras comerciales necesitan una fuente verificable.
5. Cuando documentación y código discrepen, verificar el comportamiento y
   corregir el documento obsoleto.
