# Fase 3C — Migración a React Router 6

## Objetivo

Actualizar React Router 5 a la última versión mantenida de la rama 6 sin cambiar las URLs públicas, la organización visual ni la lógica funcional de la aplicación.

## Cambios realizados

- `react-router-dom` se actualizó de 5.3.4 a 6.30.6.
- El enrutador central usa `Routes` en lugar de `Switch`.
- Las rutas renderizan mediante `element` en lugar de `component` y ya no usan `exact`.
- Las navegaciones imperativas migraron de `useHistory().push()` a `useNavigate()`.
- Se eliminó un `useHistory` sin uso del carrito y comentarios obsoletos asociados.
- El enlace de login del registro pasó de relativo a absoluto para conservar `/user/info` bajo las reglas de resolución de Router 6.
- `BrowserRouter` activa los flags `v7_startTransition` y `v7_relativeSplatPath`, eliminando los avisos de transición futura y haciendo explícito el comportamiento que espera Router 7.

## Compatibilidad preservada

- El basename público continúa siendo `/PF-Chilly/`.
- Se mantienen todas las rutas existentes, incluidos los segmentos con `+` y los parámetros `:id`.
- La ruta comodín continúa mostrando la página 404.
- La búsqueda conserva la query `?name=`.
- No se introdujeron rutas anidadas ni loaders de datos de React Router.

## Validación

- Los tres tests del backend y los seis tests del frontend pasan.
- ESLint termina sin errores; los warnings legacy bajaron de 150 a 147 al retirar referencias sin uso.
- El build de producción se completa con Vite.
- `npm ls` confirma React Router DOM y React Router 6.30.6.
- Se recorrieron en navegador la portada, el catálogo, el detalle de producto, la búsqueda, Build Your Own, el registro y una URL inexistente.
- El catálogo mostró 25 productos, la búsqueda navegó a `/store?name=corsair`, los parámetros de detalle funcionaron y la página 404 respondió correctamente.
- El recorrido terminó sin errores ni warnings en la consola del navegador.

## Pendientes

- Actualizar Auth0 React y revisar su configuración de redirecciones.
- Mantener Router 7 fuera del alcance hasta que exista una razón concreta para una nueva major.
- Resolver las vulnerabilidades y warnings legacy por dependencia y flujo, sin aplicar actualizaciones forzadas.

## Fuera de alcance

- Migración a React Router 7.
- Data routers, loaders, actions o rutas anidadas.
- Cambios de Redux, Auth0 o backend.
- Cambios visuales o funcionales.
