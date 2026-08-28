# Fase 3A — Migración de Create React App a Vite

## Objetivo

Sustituir Create React App por Vite sin rediseñar la aplicación, añadir funcionalidades ni migrar todavía React, React Router, Redux o Auth0. La subfase busca retirar una herramienta obsoleta manteniendo el comportamiento existente y los comandos habituales del repositorio.

## Cambios realizados

- Se eliminó `react-scripts` y se incorporaron Vite 8 y su plugin oficial de React.
- El punto de entrada HTML pasó de `client/public/index.html` a `client/index.html`.
- Los puntos de entrada de React usan extensiones JSX y módulos ES compatibles con Vite.
- Se reemplazaron los `require` residuales del navegador por imports ES.
- La URL pública de la API cambió de `REACT_APP_API_URL` a `VITE_API_URL`.
- Tailwind y PostCSS se integran en el proceso de Vite, sin watchers ni CSS generado versionado.
- El build se genera en `client/dist` y el deploy de GitHub Pages apunta a esa carpeta.
- El test mínimo del frontend se ejecuta con Vitest.
- ESLint usa configuración plana compatible con la nueva cadena de herramientas.
- Se conservó la base pública `/PF-Chilly/`, por lo que las rutas y assets siguen preparados para GitHub Pages.

## Configuración local

El frontend espera la siguiente variable en `client/.env`:

```dotenv
VITE_API_URL=http://localhost:3001
```

El archivo real permanece ignorado y `client/.env.example` documenta la clave. Esta variable contiene una URL pública del frontend, no un secreto.

## Comandos

Desde la raíz del repositorio:

```bash
npm run dev
npm test
npm run lint
npm run build
```

También se puede iniciar únicamente el frontend con `npm --prefix client run dev`. Vite mantiene el puerto `3000` y falla explícitamente si está ocupado para evitar arrancar silenciosamente en otra dirección.

## Validación

- Los tres tests del backend y los tres tests del frontend pasan.
- El lint termina sin errores; conserva warnings legacy para que puedan corregirse de forma incremental.
- El build de producción se completa y genera rutas bajo `/PF-Chilly/`.
- Se verificaron manualmente la portada y el catálogo contra la API local, sin errores en la consola del navegador.
- El código fuente destinado al navegador ya no contiene módulos CommonJS.
- El carrito se conserva al recargar y se reconcilia sin duplicados con el backend al restaurar una sesión.

## Pendientes conocidos

- El bundle JavaScript principal supera 500 kB y Vite recomienda dividirlo. No bloquea la ejecución y se tratará en una optimización posterior.
- El lint todavía informa avisos heredados, principalmente imports o variables sin uso, dependencias de hooks y accesibilidad.
- npm informa vulnerabilidades pendientes en el árbol de dependencias. No se aplicó `audit fix --force` porque podría introducir migraciones incompatibles; se revisarán por dependencia y alcance.
- React 17, React Router 5, Redux clásico y Auth0 React 1 se mantienen deliberadamente. Sus migraciones corresponden a las siguientes subfases.

## Fuera de alcance

- Cambios visuales o funcionales.
- Migración a React 18 o React Router 6.
- Reestructuración del estado global.
- Cambios de seguridad, persistencia o modo demo del backend.
- Recuperación de credenciales e integraciones externas.
