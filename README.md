# Chilly

Chilly es un e-commerce de componentes informáticos desarrollado como proyecto final grupal de Henry. El proyecto reúne catálogo, búsqueda y filtros, armado de equipos, carrito, favoritos, autenticación, pagos y un panel de administración.

El repositorio se encuentra actualmente en un proceso de recuperación y modernización. El objetivo es volver a poner operativa la aplicación, corregir sus problemas de seguridad y actualizar las piezas que dificultan su mantenimiento sin reescribir el producto desde cero.

## Funcionalidades existentes

- Catálogo, detalle, búsqueda, filtros y paginación de productos.
- Constructor de equipos por componentes.
- Carrito y favoritos asociados al usuario.
- Autenticación y autorización mediante Auth0.
- Checkout e integración con Mercado Pago.
- Panel para administrar productos, inventario, descuentos, usuarios y pedidos.
- Carga de imágenes mediante Cloudinary.
- Envío de correos mediante EmailJS.
- Artículos, ofertas y páginas informativas.

## Stack actual

### Frontend

- React 18 y Vite 8.
- Redux, Redux Thunk y React Redux.
- React Router 5.
- Tailwind CSS 3, Bootstrap y Reactstrap.
- Axios y Auth0 React.

### Backend

- Node.js y Express 4.
- PostgreSQL.
- Sequelize 6.
- Auth0.
- Mercado Pago.

## Estructura

```text
PF-Chilly/
|-- api/       API, modelos, controladores, rutas y datos iniciales
|-- client/    Aplicación React
`-- docs/      Baseline y plan de recuperacion
```

## Ejecución local

La aplicación está validada con Node.js `22.14.0`, npm `10.9.2` y PostgreSQL 16.

Antes de arrancar, debe existir una base PostgreSQL accesible y deben crearse los archivos locales a partir de los ejemplos:

```bash
cd api
cp .env.example .env

cd ../client
cp .env.example .env
```

Instala las dependencias fijadas por los lockfiles desde la raíz:

```bash
npm ci
npm --prefix api ci
npm --prefix client ci
```

Con PostgreSQL disponible, frontend y backend se levantan juntos mediante:

```bash
npm run dev
```

El backend escucha en `http://localhost:3001` y el frontend en `http://localhost:3000/PF-Chilly/`. El reseteo y seed de la base en cada arranque continúa siendo intencionado para el uso actual como demo.

También pueden ejecutarse por separado:

```bash
npm --prefix api run dev
npm --prefix client run dev
```

### Comprobaciones

```bash
npm test
npm run lint
npm run build
npm run smoke:api
```

El smoke test requiere que el backend esté levantado. Vite genera `client/dist` durante el build y esa carpeta no se versiona. Tailwind se procesa directamente durante desarrollo y compilación.

La preparación detallada de PostgreSQL está en [docs/LEGACY-RUN.md](docs/LEGACY-RUN.md), los cambios de estabilización en [docs/PHASE-2.md](docs/PHASE-2.md) y la migración a Vite en [docs/PHASE-3A.md](docs/PHASE-3A.md).

## Estado de la recuperación

El punto de partida técnico está registrado en [docs/BASELINE.md](docs/BASELINE.md), el primer arranque en [docs/LEGACY-RUN.md](docs/LEGACY-RUN.md), la estabilización en [docs/PHASE-2.md](docs/PHASE-2.md), la migración a Vite en [docs/PHASE-3A.md](docs/PHASE-3A.md), la actualización a React 18 en [docs/PHASE-3B.md](docs/PHASE-3B.md) y el plan de trabajo en [docs/ROADMAP.md](docs/ROADMAP.md). La separación prevista entre entornos está descrita en [docs/ENVIRONMENTS.md](docs/ENVIRONMENTS.md).

## Equipo original

- José María Ceballos
- Guillermo Durán
- Jesús Torrecilla
- Esteban Cardona
- Cinthia Maldonado
- Maximiliano Costilla
- Dante Erio Donalicio

La aplicación original fue desarrollada por el equipo **Gorditos Developers** como proyecto final de Henry.

## Recuperación y modernización

La recuperación, actualización y preparación para portfolio está dirigida y mantenida por **Dante Erio Donalicio**, con asistencia técnica de **OpenAI Codex**.
