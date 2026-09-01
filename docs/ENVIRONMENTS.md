# Entornos

Este documento define el comportamiento objetivo de cada entorno. La separación
del arranque, la protección del reset y el mantenimiento restaurable de la demo
se implementaron en las fases 4A, 4B y 4C.

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

## Política implementada de base de datos

- `DEMO_MODE` y `RESET_DB_ON_START` admiten exclusivamente `true` o `false`.
- La ausencia de cualquiera equivale a `false`.
- `RESET_DB_ON_START=true` requiere obligatoriamente `DEMO_MODE=true`.
- Solo esa combinación ejecuta `sync({ force: true })` y el seed legacy.
- Los demás modos usan `sync()` sin borrar ni sembrar datos.
- `npm run demo:seed`, `demo:clean` y `demo:restore` requieren `DEMO_MODE=true`.
- Las operaciones explícitas son transaccionales y están protegidas contra
  ejecuciones concurrentes mediante un advisory lock de PostgreSQL.

Véanse [PHASE-4B.md](PHASE-4B.md) para la matriz de arranque y
[PHASE-4C.md](PHASE-4C.md) para el mantenimiento explícito.
