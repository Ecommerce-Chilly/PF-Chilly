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

Sustituir el checkout de Mercado Pago por Stripe Checkout en modo de pruebas. Una vez verificado el flujo completo, se eliminarán el servicio, la ruta, las llamadas del frontend y las variables específicas de Mercado Pago.
