# Fase 3E — Dependencias y deuda técnica

## Subfase 3E.1 — Limpieza urgente de bajo riesgo

### Objetivo

Reducir vulnerabilidades conocidas y retirar dependencias muertas sin introducir todavía migraciones funcionales ni cambios major que requieran adaptar componentes.

### Cambios realizados

- Eliminación del SDK legacy `mercadopago` y de su inicialización sin uso en `api/src/app.js`.
- Conservación temporal del flujo de checkout existente, que llama a Mercado Pago directamente mediante Axios. Su sustitución completa por Stripe Checkout se hará de forma atómica en la siguiente subfase para no dejar el pago roto entre commits.
- Eliminación de `express-jwt`, `express-jwt-permissions`, `express-openid-connect` y `jwks-rsa`: no tenían imports activos después de migrar la autenticación a `express-oauth2-jwt-bearer`.
- Actualización compatible de Axios en frontend y backend, Morgan, Nodemon y Autoprefixer.
- Actualización compatible de dependencias transitivas del entorno de pruebas del frontend mediante `npm audit fix`, sin utilizar `--force`.
- Regeneración de los lockfiles de API y cliente.

### Resultado de la auditoría

Antes de esta limpieza, la API registraba 13 avisos: 7 moderados, 4 altos y 2 críticos. Después registra 4: 3 moderados y 1 alto. En dependencias de ejecución quedan únicamente 2 moderados, procedentes del `uuid` transitivo de Sequelize 6.

El cliente pasó de 9 avisos a 4 moderados. Los avisos restantes pertenecen a React Router 6 y React Tooltip 4; corregirlos exige migraciones major y se abordará en cambios separados.

No se aplicó `npm audit fix --force`: npm propone, entre otras cosas, degradar Sequelize 6 a Sequelize 3, lo que no constituye una corrección segura.

### Verificación

```bash
npm test
npm run lint
npm run build
```

Resultado: 8 pruebas de API y 6 pruebas de frontend superadas, lint sin errores y build de producción correcto. Las 141 advertencias legacy de lint y el aviso de tamaño del bundle permanecen registrados como deuda técnica.

### Siguiente paso

La sustitución del checkout se completó en la subfase 3E.2 descrita a continuación.

## Subfase 3E.2 — Stripe Checkout en modo de pruebas

### Objetivo

Sustituir completamente la integración legacy de Mercado Pago por un checkout internacional mantenido, sin aceptar pagos reales y sin permitir que el navegador decida precios o confirme pedidos.

### Cambios realizados

- Instalación del SDK oficial de Stripe exclusivamente en la API.
- Sustitución de la ruta de Mercado Pago por creación y confirmación de sesiones de Stripe Checkout.
- Eliminación de los controladores, rutas, servicios, retornos y variables específicos de Mercado Pago.
- Cálculo de importes en el backend a partir de los productos actuales de PostgreSQL; el cliente solamente envía IDs y cantidades.
- Validación de productos, cantidades, precios e inventario antes de crear la sesión.
- Uso exclusivo de euros y actualización de los indicadores de moneda visibles.
- Redirección directa desde el carrito al checkout alojado por Stripe.
- Confirmación del estado `paid` contra Stripe antes de crear pedidos.
- Asociación de la sesión al sujeto autenticado de Auth0 y sincronización de ese identificador con el usuario local.
- Creación idempotente básica de pedidos y limpieza del carrito únicamente después de confirmar el pago.
- Conservación del carrito cuando el usuario cancela el checkout.

La clave `STRIPE_SECRET_KEY` permanece únicamente en `api/.env`. El frontend no recibe la clave secreta ni necesita una clave publicable para este flujo alojado.

### Verificación

- Conexión comprobada con Stripe usando una clave de pruebas; `livemode` resultó `false`.
- 16 pruebas de API y 6 de frontend superadas.
- Lint sin errores y build de producción correcto.
- Pago manual completado con una tarjeta oficial de pruebas.
- Retorno correcto a la aplicación, carrito vaciado y pedido visible en el panel administrativo.

### Limitaciones registradas

- La confirmación postpago funciona mediante el retorno autenticado a la aplicación. Antes de exponer el proyecto públicamente se incorporará un webhook firmado de Stripe para confirmar también pagos cuyo comprador no regrese a la página de éxito.
- La presentación actual del historial de pedidos es funcional pero muestra IDs internos y fechas sin formatear. Su mejora visual y de contenido queda separada de esta integración.
- Los pagos reales permanecen fuera del alcance: la configuración solo admite claves `sk_test_`.

## Subfase 3E.3 — React Tooltip 6

### Objetivo

Retirar React Tooltip 4 y su dependencia vulnerable de `uuid` mediante una migración aislada que conserve los tooltips existentes.

### Cambios realizados

- Actualización de `react-tooltip` 4.5 a 6.0.
- Sustitución de la importación por defecto por el componente nombrado `Tooltip`.
- Migración de `data-tip` a `data-tooltip-content` y de `data-for` a `data-tooltip-id`.
- Sustitución de las propiedades visuales eliminadas por clases equivalentes.
- Adaptación de los once tooltips del constructor de PC y del tooltip de favoritos en el detalle de producto.

### Verificación automática

- 16 pruebas de API y 6 pruebas de frontend superadas.
- Lint sin errores y build de producción correcto.
- Ningún uso restante de la API de React Tooltip 4.
- La auditoría del cliente bajó de 4 a 2 avisos moderados. Ambos pertenecen ahora a React Router 6 y se abordarán por separado.

La comprobación visual confirmó que el nombre de cada componente aparece al pasar el cursor sobre las piezas seleccionadas de **Build Your Own** y que el corazón de favoritos muestra el aviso de inicio de sesión cuando se visita un producto sin autenticar.

## Subfase 3E.4 — React Router 7

### Objetivo

Actualizar React Router 6 a una versión mantenida y corregida sin cambiar la arquitectura declarativa ni el comportamiento de navegación de la aplicación.

### Cambios realizados

- Actualización de `react-router-dom` 6.30 a 7.18.
- Conservación de las rutas, enlaces y hooks existentes, compatibles con React Router 7.
- Retirada de las banderas transitorias `v7_startTransition` y `v7_relativeSplatPath`, cuyo comportamiento ya forma parte de la versión 7.
- Conservación del `basename` histórico `/PF-Chilly/` para no alterar las rutas públicas previstas.
- Sincronización de la sesión Auth0 en la raíz de la aplicación antes de renderizar las rutas. Esto permite reconstruir el usuario, el token y el permiso administrativo al refrescar directamente cualquier página protegida.
- Restablecimiento explícito del estado administrativo de Redux al cerrar sesión.

### Verificación automática

- Pruebas de API y frontend superadas.
- Lint sin errores y build de producción correcto.
- Auditoría del cliente sin vulnerabilidades conocidas.

La comprobación manual de la migración fue confirmada por el mantenedor, incluido el acceso administrativo después de refrescar la página con la corrección de restauración de sesión.
