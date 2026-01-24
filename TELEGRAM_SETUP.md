# Telegram Integration - Setup Guide

## Variables de Entorno Requeridas

Agrega estas variables a tu archivo `.env.local`:

```env
TELEGRAM_BOT_TOKEN=your_bot_token_here
TELEGRAM_CHAT_ID=your_chat_id_here
```

## Cómo Obtener las Credenciales

### 1. Crear un Bot de Telegram

1. Abre Telegram y busca **@BotFather**
2. Envía el comando `/newbot`
3. Sigue las instrucciones:
   - Nombre del bot: `Nitro Ecom Leads Bot` (o el que prefieras)
   - Username: `nitro_ecom_leads_bot` (debe terminar en `_bot`)
4. BotFather te dará un **token**. Cópialo y guárdalo como `TELEGRAM_BOT_TOKEN`

### 2. Obtener el Chat ID

**Opción A: Chat Personal**

1. Busca tu bot en Telegram y envíale un mensaje (ej: `/start`)
2. Abre en tu navegador: `https://api.telegram.org/bot<TU_BOT_TOKEN>/getUpdates`
3. Busca el campo `"chat":{"id":123456789}` - ese número es tu `TELEGRAM_CHAT_ID`

**Opción B: Grupo/Canal**

1. Crea un grupo o canal en Telegram
2. Agrega tu bot como administrador
3. Envía un mensaje en el grupo
4. Abre: `https://api.telegram.org/bot<TU_BOT_TOKEN>/getUpdates`
5. El `chat_id` de un grupo será negativo (ej: `-1001234567890`)

## Ejemplo de Configuración

```env
# .env.local
TELEGRAM_BOT_TOKEN=1234567890:ABCdefGHIjklMNOpqrsTUVwxyz
TELEGRAM_CHAT_ID=123456789
```

## Verificación

Una vez configurado, cada vez que llegue un lead verás una notificación en Telegram con:

- 👤 Nombre
- 📧 Email
- 🏢 Empresa
- 💼 Interés
- 📝 Mensaje (si lo hay)
- ⏰ Fecha y hora (zona horaria Colombia)

## Notas Importantes

- ✅ Si falla Telegram, el lead **SÍ se guarda** en Supabase
- ✅ El usuario **NO verá** ningún error si falla Telegram
- ✅ Los errores se registran en los logs del servidor para debugging
- ✅ Si no configuras las variables, simplemente no enviará notificaciones (sin errores)
