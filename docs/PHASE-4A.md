# Fase 4A — Separar preparación de datos y arranque

## Objetivo

Separar las responsabilidades del arranque sin cambiar todavía la política de
datos de la demo: cada arranque del backend sigue borrando y recreando las tablas
antes de cargar los datos iniciales.

## Comportamiento que se conserva

1. Validar las variables de entorno existentes.
2. Ejecutar `conn.sync({ force: true })`.
3. Cargar las categorías.
4. Cargar el catálogo, su inventario y el descuento inicial.
5. Abrir el puerto HTTP solo cuando finalice toda la preparación.

Si una etapa falla, las siguientes no deben ejecutarse. Una carga fallida puede
dejar datos parciales: las transacciones e idempotencia se incorporarán en 4C.

## Responsabilidades separadas

- `api/index.js`: valida configuración, conecta las dependencias reales y conserva
  el manejo de señales y errores de arranque.
- `api/src/database/prepareDatabase.js`: separa el reset del esquema y el seed, y
  los coordina en el orden original. Recibe la conexión y las funciones de carga
  como argumentos para poder probarlas sin tocar una base real.
- `api/src/server.js`: espera la preparación, abre HTTP y cierra servidor/conexión.
  La conexión se cierra incluso si falla el cierre del servidor HTTP.
- `api/test/startup.test.js`: prueba el orden, la espera de las tareas asíncronas,
  la propagación de errores y el cierre de recursos con dependencias simuladas.

Los exports `startServer` y `stopServer` de `api/index.js` se conservan. Importar
los módulos no ejecuta el reset ni abre el puerto.

## Verificación realizada

- `npm test`: 29 pruebas de API (13 nuevas de preparación/arranque) y 10 de frontend
  superadas, sin necesitar PostgreSQL para las pruebas unitarias.
- `npm run lint`: 0 errores; se conservan 134 advertencias legacy.
- `npm run build`: correcto; permanece el aviso conocido de tamaño del bundle.
- Arranque real contra una base temporal independiente en PostgreSQL 16: 11
  categorías, 550 productos, 550 inventarios y 1 descuento, con cantidades
  contrastadas contra los JSON originales.
- `/health` y `/product` respondieron HTTP 200 en ese arranque aislado.
- Servidor de prueba y conexión cerrados; base temporal eliminada al terminar.
  La prueba no borró ni sembró la base habitual `chilly`.

### Incidencia detectada en la comprobación manual

Al levantar API y frontend a la vez, Auth0 restauraba la sesión antes de que la API
terminara de cargar el catálogo. La creación del usuario local fallaba mientras el
puerto seguía cerrado y Redux se quedaba con `admin: false`, por lo que el rol solo
reaparecía después de refrescar manualmente.

La sincronización de sesión ahora comprueba que la creación y lectura del usuario
local hayan terminado y reintenta durante el arranque. La consulta administrativa
se ejecuta después: un HTTP 403 continúa siendo un resultado válido para un usuario
normal y deja explícitamente `admin: false`. Se añadieron cuatro pruebas de este
flujo, incluidos reintento, agotamiento de intentos y usuario sin rol.

## Límites de esta subfase

- No se incorporan variables nuevas ni cambia la configuración local.
- No se añaden comandos independientes para borrar o sembrar la base.
- No cambian modelos, relaciones, contenido del catálogo ni reglas comerciales.
- `DEMO_MODE` y `RESET_DB_ON_START`, con protección fuera de demo, corresponden a 4B.
- La carga inicial sigue usando las funciones legacy; su idempotencia y
  transacciones corresponden a 4C.
- No debe conectarse esta versión a una base con datos que se quieran conservar.

## Hallazgo de la revisión

`categoryRoute.js` contiene una ruta GET que llama a la función de carga de
categorías, en lugar de consultarlas. Ese router **no está montado** en la API
actual: no es un endpoint público activo. Se conserva como deuda a resolver antes
de reutilizarlo; no debe montarse tal como está.

## Validación manual

Después de esta separación, arrancar como siempre desde la raíz con `npm run dev`
o `npm start`, esperar a que la API anuncie el puerto y ejecutar `npm run smoke:api`.
Revisar que se muestran los productos y categorías habituales.

El arranque continuará eliminando usuarios, pedidos y demás datos de prueba de la
base configurada, como antes. Parar Nodemon antes de editar el arranque evita
resets involuntarios por recarga automática.
