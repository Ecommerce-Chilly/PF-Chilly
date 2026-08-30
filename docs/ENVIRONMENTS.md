# Entornos

Este documento define el comportamiento objetivo de cada entorno. La separación todavía no está implementada en el código del baseline.

## Local

Pensado para desarrollo y diagnóstico.

- Frontend y backend ejecutados por separado.
- URLs locales configurables.
- PostgreSQL local o una instancia de desarrollo aislada.
- Datos ficticios.
- Integraciones externas desactivadas o en sandbox.
- Reset y seed ejecutados de forma explícita o configurable.
- Errores detallados disponibles solamente durante desarrollo.

## Demo

Pensado para que terceros recorran las funcionalidades del portfolio.

- Datos exclusivamente ficticios.
- Catálogo restaurable desde el seed versionado.
- Reset de datos controlado y configurable.
- Credenciales de demostración sin privilegios externos reales.
- Integraciones de pago en sandbox.
- Escrituras autenticadas y limitadas.
- CORS restringido al frontend de la demo.
- Ninguna información personal real.

## Producción

Define la configuración segura y persistente, aunque inicialmente el proyecto se utilice únicamente como portfolio.

- Base de datos persistente.
- `RESET_DB_ON_START=false`.
- Seeds y cambios de esquema ejecutados como tareas separadas.
- Secretos distintos de local y demo.
- CORS limitado a orígenes explícitos.
- Errores internos ocultos al cliente.
- Logs sin credenciales ni datos personales.
- Integraciones externas configuradas con el mínimo privilegio necesario.

## Variables previstas

La implementación futura deberá separar como mínimo:

- URL pública del frontend.
- URL pública de la API.
- Conexión a PostgreSQL.
- Modo demo y política de reset.
- Configuración de Auth0.
- Clave secreta de Stripe en modo de pruebas y URL pública del storefront.
- Configuración pública de Cloudinary y EmailJS.

Los archivos con valores reales no se versionarán. El repositorio conservará únicamente ejemplos sin secretos.
