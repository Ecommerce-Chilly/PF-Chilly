# Fase 4B — Protección del reset y modo demo

## Objetivo

Evitar que el arranque pueda borrar una base persistente por omisión o por una
variable aislada mal configurada, conservando el reset automático cuando Chilly se
ejecuta deliberadamente como demo.

## Configuración

Las variables solo aceptan literalmente `true` o `false`. Si no están presentes,
ambas toman el valor seguro `false`.

| `DEMO_MODE` | `RESET_DB_ON_START` | Comportamiento |
|---|---|---|
| `false` | `false` | Sincroniza tablas sin borrarlas y no ejecuta el seed. |
| `true` | `false` | Conserva los datos y no ejecuta el seed legacy. |
| `true` | `true` | Borra tablas, las recrea y carga el catálogo de demo. |
| `false` | `true` | Rechaza el arranque antes de abrir la conexión. |

Un valor diferente, por ejemplo `yes`, también rechaza el arranque. El guard existe
tanto en la lectura de configuración como en la preparación de la base, para que
una llamada interna no pueda saltárselo accidentalmente.

Para conservar localmente el comportamiento de demo anterior, añadir a `api/.env`:

```dotenv
DEMO_MODE=true
RESET_DB_ON_START=true
```

Para trabajar conservando usuarios, carritos y pedidos entre reinicios:

```dotenv
DEMO_MODE=false
RESET_DB_ON_START=false
```

En este segundo modo una base nueva crea las tablas, pero queda sin catálogo. El
seed independiente e idempotente se implementará en 4C.

## Cambios realizados

- Parseo estricto y valores seguros para ambas variables.
- Validación destructiva antes de importar la conexión PostgreSQL en el entrypoint.
- `sync({ force: true })` y seed condicionados a la combinación demo explícita.
- `sync()` no destructivo para los demás arranques.
- Mensaje de arranque que indica si se hizo reset/seed o si se conservaron datos.
- Ejemplos de configuración versionados sin secretos.

## Verificación automática

- Pruebas unitarias de valores por defecto, combinaciones válidas, booleanos
  inválidos y bloqueo del reset fuera de demo.
- Pruebas de preparación que demuestran que el modo persistente no llama al seed y
  que la combinación peligrosa no llega a invocar `sync`.
- Dos arranques persistentes reales en una base PostgreSQL temporal conservaron un
  usuario marcador y mantuvieron el catálogo vacío.
- Dos arranques demo reales reconstruyeron 550 productos y eliminaron el usuario
  marcador en cada reset.
- La base temporal se eliminó al finalizar; la base habitual `chilly` no se usó.

## Límites

- El seed legacy todavía requiere una base vacía y solo se ejecuta junto al reset.
- La restauración explícita, idempotencia, transacción y protección frente a varias
  instancias corresponden a 4C.
- No se añaden migraciones Sequelize ni se modifica el contenido del catálogo.

## Incidencia detectada durante la comprobación manual

Al restaurar el último producto eliminado, la vista intentaba leer la longitud de
un mensaje no inicializado y React dejaba la página en blanco. El estado ahora se
inicializa explícitamente y la tarjeta espera la respuesta del backend antes de
retirarse. Una restauración correcta muestra confirmación y, si la lista queda
vacía, se presenta el estado `No products were deleted yet`; un fallo mantiene la
tarjeta y muestra un aviso. Se añadió una prueba de regresión para el último
producto de la lista.

## Comprobación manual

Probar primero el modo demo y confirmar el mensaje `Database reset and demo seed
completed.`. Crear un dato de prueba, reiniciar y verificar que desaparece.

Después usar ambas variables en `false`, crear otro dato de prueba, reiniciar y
verificar el mensaje `Database schema synchronized without reset or seed.` y que el
dato permanece.
