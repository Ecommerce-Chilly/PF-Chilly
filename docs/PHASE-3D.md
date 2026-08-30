# Fase 3D — Auth0 React 2 y configuración recuperada

## Objetivo

Recuperar la autenticación sin conservar referencias al tenant original, actualizar el SDK de React y hacer que frontend y backend validen tokens emitidos para la misma API de Auth0.

## Cambios realizados

- Actualización de `@auth0/auth0-react` 1.12 a 2.24.
- Migración de `Auth0Provider` y `logout` a la API de configuración de la versión 2.
- Sustitución del dominio, client ID, audience, issuer y permiso administrativos incrustados en el código por variables de entorno.
- Cálculo de callback y logout a partir del origen actual y del `base` de Vite.
- Persistencia de la caché de sesión de Auth0 al recargar la SPA, manteniendo el comportamiento esperado por la aplicación legacy.
- Eliminación de la petición del frontend a Auth0 Management API. Chilly no necesita acceder desde el navegador a datos administrativos del tenant.
- Actualización del middleware del backend para validar tokens de `Chilly API` y exigir `admin:access` en rutas administrativas.
- Compatibilidad con el permiso tanto en el claim OAuth `scope` como en el array RBAC `permissions` emitido por Auth0.
- Validación al arrancar de la configuración Auth0 necesaria para la API.
- Sincronización del usuario de Auth0 con el usuario local y recuperación posterior de su carrito.

## Configuración local

### Frontend

Crear `client/.env` a partir de `client/.env.example` y completar:

```dotenv
VITE_AUTH0_DOMAIN=your-tenant.us.auth0.com
VITE_AUTH0_CLIENT_ID=your-client-id
VITE_AUTH0_AUDIENCE=https://chilly-api
VITE_AUTH0_ADMIN_SCOPE=admin:access
```

El dominio, el client ID y el audience identifican recursos públicos de una SPA; no debe añadirse un Client Secret al frontend.

### Backend

Crear `api/.env` a partir de `api/.env.example` y completar:

```dotenv
AUTH0_AUDIENCE=https://chilly-api
AUTH0_ISSUER_BASE_URL=https://your-tenant.us.auth0.com/
AUTH0_ADMIN_SCOPE=admin:access
```

El audience del frontend y del backend debe coincidir exactamente con el Identifier de la API creada en Auth0.

## Configuración del tenant

La aplicación debe ser de tipo **Single Page Application**. Para el entorno local actual:

```text
Allowed Callback URLs: http://localhost:3000/PF-Chilly/user/info
Allowed Logout URLs:   http://localhost:3000/PF-Chilly/
Allowed Web Origins:   http://localhost:3000
```

La API utiliza el Identifier `https://chilly-api`, firma RS256 y RBAC. El permiso administrativo es `admin:access`, asignado mediante el rol `Admin`.

La política de acceso de Auth0 Management API se configuró como **Per-app authorization** tanto para acceso delegado como para acceso de cliente. `Chilly portfolio` no tiene ningún grant para esa API del sistema: solo puede solicitar `admin:access` para `Chilly API`.

Las URLs de producción se añadirán como valores separados cuando exista un despliegue definitivo; no deben sustituir a las locales durante el desarrollo.

## Alta del primer administrador

1. Levantar la aplicación e iniciar sesión una vez para que Auth0 cree el usuario.
2. En Auth0, abrir **User Management → Users** y seleccionar ese usuario.
3. Abrir **Roles**, elegir **Assign Roles** y asignar `Admin`.
4. Cerrar sesión en Chilly y volver a iniciarla para obtener un token nuevo con el permiso.

Un usuario sin ese rol puede usar las funciones autenticadas normales, pero el backend rechazará las rutas administrativas con `403`.

## Verificación automática

```bash
npm test
npm run lint
npm run build
```

Resultado de esta subfase: 8 pruebas de API y 6 de frontend superadas, lint sin errores y build de producción correcto. Las advertencias legacy del lint y el aviso de tamaño del bundle continúan registrados para limpieza posterior.

## Pendiente deliberado

- Prueba manual completa de login, logout y autorización del primer administrador.
- Añadir las URLs del despliegue cuando sean conocidas.
- Retirar el almacenamiento manual del access token en `localStorage` al endurecer el flujo de identidad en la fase 5.
- Sustituir la caché persistente transitoria por una estrategia con refresh tokens rotatorios cuando se endurezca la protección frente a XSS.
- Revisar la confianza en emails e IDs enviados por el cliente y comprobar propiedad de recursos en la fase 5.
