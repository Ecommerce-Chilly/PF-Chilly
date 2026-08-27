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

## Stack original

### Frontend

- React 17 y Create React App.
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
|-- client/    Aplicacion React y build historico
`-- docs/      Baseline y plan de recuperacion
```

## Ejecución local legacy

La aplicación original fue validada con Node.js `22.14.0`, npm `10.9.2` y PostgreSQL 16. Esta forma de ejecución es temporal y se simplificará durante las siguientes fases.

Antes de arrancar, debe existir una base PostgreSQL accesible y deben crearse los archivos locales a partir de los ejemplos:

```bash
cd api
cp .env.example .env

cd ../client
cp .env.example .env
```

### Backend

```bash
cd api
npm install --package-lock=false
npm start
```

El backend escucha en `http://localhost:3001` por defecto. En el modo legacy recrea y vuelve a sembrar la base de datos en cada arranque.

### Frontend

```bash
cd client
npm install --package-lock=false
npm start
```

El frontend queda disponible en `http://localhost:3000/PF-Chilly/`. El resultado completo de la primera ejecución está registrado en [docs/LEGACY-RUN.md](docs/LEGACY-RUN.md).

## Estado de la recuperación

El punto de partida técnico está registrado en [docs/BASELINE.md](docs/BASELINE.md), el primer arranque en [docs/LEGACY-RUN.md](docs/LEGACY-RUN.md) y el plan de trabajo en [docs/ROADMAP.md](docs/ROADMAP.md). La separación prevista entre entornos está descrita en [docs/ENVIRONMENTS.md](docs/ENVIRONMENTS.md).

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
