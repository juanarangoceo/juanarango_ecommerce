# Registro, login y menú — validación del 29-09-2026

Capturas sobre builds de producción locales. `verification.json` registra
24 comprobaciones del registro/login y los resultados del menú. También
pasaron las 13 pruebas existentes de autenticación/activación de Nitro Bot.

El ensayo `verify-auth-ux.py` abre registro y login a 1440/360 px, prueba
contraseña, validación, Google en espera, privacidad, errores, conservación
de datos y confirmación por correo (390 px). Intercepta los POST de acciones
en el navegador y devuelve respuestas simuladas: no crea cuentas, no inicia
OAuth ni envía correos. Requiere registro y Google habilitados en los flags
que ya lee la app; el ensayo no cambia esos flags.

Para repetirlo, construir y servir Nitro Bot en `http://localhost:4322`:

```bash
CIRCLE_NODE_TOTAL=2 NODE_OPTIONS=--max-old-space-size=1536 npm run build
npm run start -- -p 4322
```

Desde la carpeta de la web, con `agent-browser` disponible:

```bash
python3 artifacts/auth-ux-2026-09-29/verify-auth-ux.py
```

Si el CLI no está en PATH, definir `AGENT_BROWSER_BIN` con su ruta ejecutable.
Usar build y navegador por separado para limitar memoria. El menú se comprobó
a 1280/360 px: destinos `/login` y `/registro` de la app, sin solapamientos ni
desbordamientos y cierre con Escape.

Los cambios están locales en ambos repositorios, sin commit ni despliegue.
