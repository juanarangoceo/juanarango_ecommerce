# Publicación — 22 de octubre de 2026

Web y vendedor publicados por Git en producción. Bitácora completa en
`../../docs/bitacora/2026-10.md`.

- Web: `2dea20d`, `dpl_5PGVyndJzgBLvctLDVrDRLLvBjxi`, READY.
- Vendedor: `49edca4`, `dpl_Df4B55Zs7ckanVYiQf9t2WgPy9f5`, READY.
- `layout-verification.json`: 19 comprobaciones en dominio público.
- `content-verification.json`: 19 comprobaciones de contenido/audio/navegación.
- `enterprise-live.json`: recepción y panel real, un contacto ficticio.
- `crm-test.json`, `crm-cleanup.json`, `seller-test-record.json`: prueba y limpieza.
- `routes.json`: seis rutas HTTP 200. Logs error/fatal de ambos despliegues vacíos.
- Capturas del panel recortadas a la solicitud ficticia. Sin datos de clientes.

Los scripts de diseño/contenido solo leen y reproducen muestras estáticas.
**No volver a ejecutar el script empresarial sin una nueva solicitud de prueba:**
escribe en producción. `RESUME_PANEL=1` omite el envío, pero la solicitud técnica
ya fue eliminada de ambas bases al terminar. No se guardan claves ni cookies.
NitroBot no se modificó. Sin pagos, mensajes, llamadas ni guías reales.
