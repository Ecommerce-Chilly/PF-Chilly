# Primera ejecución legacy

Este documento registra la fase 1 de recuperación: instalar y levantar la aplicación original con cambios mínimos, sin migrar todavía sus tecnologías ni corregir de forma general sus fallos.

## Entorno de la prueba

- Fecha: 26–27 de agosto de 2026.
- Sistema: Windows.
- Rama: `codex/portfolio-ready`.
- Node.js: `22.14.0`.
- npm: `10.9.2`.
- PostgreSQL: `16.15`, aislado en un contenedor local.
- Frontend: `http://localhost:3000/PF-Chilly/`.
- Backend: `http://localhost:3001`.

No se generaron lockfiles ni se ejecutaron correcciones automáticas de npm.

## PostgreSQL de diagnóstico

La instancia personal instalada en Windows estaba activa en el puerto 5432, pero requería una contraseña que no forma parte del repositorio. Para no modificarla se creó un contenedor aislado:

```bash
docker run --name pf-chilly-postgres \
  --env POSTGRES_USER=chilly \
  --env POSTGRES_PASSWORD=chilly_local_dev \
  --env POSTGRES_DB=chilly \
  --publish 127.0.0.1:55432:5432 \
  --detach postgres:16-alpine
```

La contraseña anterior es exclusivamente local y no debe reutilizarse en ningún entorno compartido.

Para volver a iniciar el contenedor existente:

```bash
docker start pf-chilly-postgres
```

La URI empleada en el `api/.env` local fue:

```env
DB_DEPLOY=postgresql://chilly:chilly_local_dev@127.0.0.1:55432/chilly
```

El archivo real permanece ignorado por Git.

## Instalación de dependencias

Se ejecutó en los dos proyectos:

```bash
npm install --package-lock=false
```

### Backend

- Instalación correcta con Node 22.
- 423 paquetes instalados.
- 13 vulnerabilidades informadas por npm: 7 moderadas, 4 altas y 2 críticas.
- Warnings de paquetes obsoletos, principalmente dependencias transitivas de Mercado Pago y del stack original.
- No se ejecutó `npm audit fix` ni `npm audit fix --force`.

Versiones relevantes realmente resueltas dentro de los rangos originales:

| Paquete | Versión instalada |
|---|---:|
| Express | `4.22.2` |
| Sequelize | `6.37.8` |
| pg | `8.23.0` |
| Mercado Pago | `1.5.17` |
| Auth0 JWT bearer | `1.10.0` |
| Axios | `1.19.0` |

### Frontend

- Instalación correcta con Node 22.
- 1.376 paquetes instalados.
- 30 vulnerabilidades informadas por npm: 9 bajas, 7 moderadas y 14 altas.
- Numerosos warnings procedentes de Create React App, Webpack, Babel, Workbox y ESLint.
- No se ejecutó ninguna actualización automática.

Versiones relevantes realmente resueltas:

| Paquete | Versión instalada |
|---|---:|
| React | `17.0.2` |
| React Router DOM | `5.3.4` |
| React Scripts | `5.0.1` |
| Auth0 React | `1.12.1` |
| Redux | `4.2.1` |
| Tailwind CSS | `3.4.19` |
| Axios | `1.19.0` |

## Arranque del backend

Comando:

```bash
cd api
npm start
```

Resultado: correcto, sin cambios de código.

- Abrió el puerto 3001 con Node 22.
- Creó 14 tablas mediante Sequelize.
- Completó el seed sin errores visibles.
- Un segundo arranque volvió a generar exactamente el mismo resultado.

Datos creados en cada arranque:

| Entidad | Cantidad |
|---|---:|
| Categorías | 11 |
| Productos | 550 |
| Inventarios | 550 |
| Descuentos | 1 |
| Usuarios | 0 |

El servidor empieza a escuchar antes de esperar explícitamente al seed. Aunque los dos arranques observados terminaron correctamente, la carrera detectada en el baseline sigue existiendo y se corregirá en la fase de base de datos.

## Smoke test de la API

| Solicitud | Estado | Resultado |
|---|---:|---|
| `GET /product` | 200 | 550 productos |
| `GET /product/1` | 200 | Detalle correcto |
| `GET /product?name=CORSAIR...` | 200 | 2 coincidencias correctas |
| `GET /categoryDetails/cases` | 200 | Detalles de categoría |
| `GET /article` | 404 | No existen artículos sembrados |
| `GET /favorite/1` | 401 | Ruta protegida por token |
| `GET /datauser` | 404 | Ruta pública, sin registros existentes |

Las respuestas 401 imprimen el stack completo del middleware Auth0 en la consola del backend. Esto no bloquea el proceso, pero ensucia los logs y expone detalles internos.

## Arranque del frontend

Comando:

```bash
cd client
npm start
```

Resultado: compilación correcta con Node 22.

Create React App mostró únicamente warnings deprecados de Webpack Dev Server durante el arranque. La aplicación renderizó en `/PF-Chilly/`.

### Bloqueo original reproducido

El frontend apuntaba directamente al Railway desaparecido. El navegador mostraba:

- `AxiosError: Network Error`.
- Un `TypeError` al intentar leer `error.response.data` cuando no existía respuesta.
- Home y navegación renderizadas, pero sin datos dinámicos utilizables.

### Cambio mínimo aplicado

Se permitió configurar la URL de Axios sin eliminar todavía el fallback histórico:

```js
axios.defaults.baseURL =
  process.env.REACT_APP_API_URL ||
  'https://pf-chilly-back-production.up.railway.app/';
```

El `client/.env` local contiene:

```env
REACT_APP_API_URL=http://localhost:3001
```

Se añadió `client/.env.example` sin secretos. Después de reiniciar Create React App desaparecieron los errores de red y el catálogo quedó conectado al backend local.

## Recorrido funcional

| Funcionalidad | Estado | Observación |
|---|---|---|
| Home y navegación | Parcial | Renderizan; existen warnings de propiedades DOM |
| Catálogo | Funciona | 550 productos, 25 por página y 22 páginas |
| Filtro por categoría | Funciona | El filtro de GPUs cambió correctamente productos y filtros detallados |
| Detalle de producto | Funciona | Datos, cantidad y botón de carrito visibles |
| Búsqueda | Rota en UI | La API devuelve 2 coincidencias, pero `Store` pide todos los productos al montarse y pisa el resultado |
| Carrito anónimo | Parcial | Estado local, cantidades y total funcionan |
| Carrito persistido | Bloqueado | Sin usuario/cart ID se intenta `POST /cartItems` y responde 404 |
| Constructor de PC | Parcial | Renderiza selector inicial y carga productos; flujo completo reservado para pruebas posteriores |
| About us y FAQ | Funciona | Equipo, enlaces y contenido visibles |
| Login y perfil | Bloqueado | Dependen del tenant y callbacks antiguos de Auth0 |
| Favoritos | Bloqueado | Requieren autenticación válida |
| Checkout y pedidos | Bloqueado | Requieren Auth0 y servicios externos |
| Panel administrativo | Bloqueado | Requiere token con scope administrativo |
| Blog/artículos | Vacío | La base no contiene artículos iniciales |
| Cloudinary | No probado | Configuración antigua pendiente de recuperar o sustituir |
| EmailJS | No probado | Configuración antigua pendiente de recuperar o sustituir |
| Mercado Pago | No probado | No existe `ACCESS_TOKEN` local y se usará sandbox más adelante |

## Warnings y errores observados en el navegador

- Un `Link` de la barra de navegación recibe `to={undefined}`.
- Uso de `class` en lugar de `className`.
- Uso de `for` en lugar de `htmlFor`.
- Propiedades SVG como `stroke-linecap`, `stroke-linejoin` y `stroke-width` no usan nombres JSX.
- Al cargar sin sesión se realizan solicitudes con email o user ID `undefined`.
- Esas solicitudes pueden enviar un token inválido y provocar stacks 401 en el backend.
- El carrito anónimo intenta sincronizar con backend aunque no exista carrito persistido.
- Existen numerosos `console.log` de depuración.

Estos problemas no impiden renderizar y quedan reservados principalmente para la fase 2.

## Build y pruebas existentes

### Build

La compilación optimizada de Create React App se ejecutó hacia una carpeta temporal para no sobrescribir el build histórico versionado.

Resultado: correcto.

- JavaScript principal comprimido: aproximadamente 239,84 kB.
- CSS principal comprimido: aproximadamente 6,52 kB.
- 22 archivos generados.
- Base pública asumida: `/PF-Chilly/`.

La generación aislada de Tailwind/PostCSS también terminó correctamente. No se ejecutó el script completo `npm run build` porque genera CSS después del build de React y sobrescribe artefactos versionados; ese pipeline se corregirá en la fase 2.

### Scripts y tests

| Comando | Resultado |
|---|---|
| Backend `npm test` | Falla: Mocha no encuentra archivos en `test` |
| Frontend `npm test -- --watchAll=false` | Falla: falta `@testing-library/jest-dom` |
| Frontend `npm run dev` | Falla: `run-p` no está instalado |
| Build aislado de React | Correcto |
| Generación aislada de Tailwind | Correcta |

No se añadieron dependencias ni tests durante esta fase.

## Conclusión de la fase

- Node 22 es compatible con el arranque y build legacy observados.
- Backend, PostgreSQL y frontend funcionan juntos localmente.
- El catálogo, filtros, detalle y carrito anónimo son demostrables.
- El único cambio funcional necesario fue hacer configurable la URL local de la API.
- Autenticación, administración, pagos y servicios externos siguen bloqueados por configuración antigua o credenciales ausentes.
- La estructura, scripts, warnings, búsqueda y tests quedan registrados para las fases posteriores.
