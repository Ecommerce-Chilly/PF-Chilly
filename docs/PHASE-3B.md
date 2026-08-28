# Fase 3B — Migración a React 18

## Objetivo

Actualizar React 17 a React 18 sin combinar la migración con cambios de Router, Redux, Auth0, diseño o funcionalidad. La subfase conserva el comportamiento estabilizado en 3A y prepara el frontend para modernizaciones posteriores.

## Cambios realizados

- `react` y `react-dom` se actualizaron de 17.0.2 a 18.3.1.
- El punto de entrada dejó de usar `ReactDOM.render` y monta la aplicación mediante `createRoot` desde `react-dom/client`.
- Se verificó el árbol de dependencias: Auth0 React, React Redux, React Router, Reactstrap y los componentes directos instalados resuelven una única copia de React 18.
- El README y el roadmap reflejan la versión actual.

## Decisión sobre Strict Mode

No se incorporó `React.StrictMode` en esta subfase. El proyecto conserva numerosos efectos legacy con llamadas a la API y escrituras que todavía no tienen cleanup o dependencias completas. Activar la ejecución de comprobación adicional de Strict Mode durante desarrollo podría duplicar temporalmente esas operaciones y mezclar una limpieza amplia de efectos con la migración de versión.

React 18 está activo mediante `createRoot`; Strict Mode podrá habilitarse cuando los efectos sensibles hayan sido corregidos y comprobados de forma aislada.

## Validación

- Los tres tests del backend y los seis tests del frontend pasan.
- ESLint termina sin errores y mantiene los 150 warnings legacy ya registrados.
- El build de producción se completa con Vite.
- `npm ls react react-dom --depth=1` confirma React y ReactDOM 18.3.1 sin copias incompatibles.
- Se recorrieron en navegador la portada, el catálogo, un detalle y el carrito contra la API local.
- El catálogo mostró 25 productos en la primera página.
- El carrito conservó el producto tras recargar y no aparecieron errores en la consola del navegador.

## Pendientes

- Revisar y sanear efectos legacy antes de habilitar Strict Mode.
- Migrar React Router 5 en una subfase separada.
- Actualizar Auth0 React y el resto de dependencias mantenidas de manera incremental.
- Tratar la división del bundle y los warnings de lint sin mezclarlos con esta migración.

## Fuera de alcance

- React Router 6.
- Cambios en Redux o en el modelo de estado.
- Actualización de Auth0.
- Cambios visuales o funcionales.
- Modificaciones del backend, persistencia o seguridad.
