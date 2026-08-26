# Baseline técnico

Este documento registra el estado recibido antes de comenzar la recuperación. No describe todavía una versión corregida ni garantiza que los comandos originales funcionen en un entorno moderno.

## Referencia

- Commit: `a2dba90526bec9d2c55e21b4dde7df89a26a96f4`.
- Árbol Git: `b7f57497d76bae6cadb790188c72dd66d9d1fbb6`.
- Último commit del desarrollo original: 12 de septiembre de 2023.
- Etiqueta local de preservación: `legacy-baseline-2023`.
- Rama de recuperación: `codex/portfolio-ready`.

## Arquitectura recibida

La aplicación está dividida en dos proyectos npm independientes y no tiene configuración raíz de workspace.

```text
client (React SPA)
        |
        | HTTP mediante Axios
        v
api (Express REST API)
        |
        | Sequelize
        v
PostgreSQL
```

El frontend está preparado históricamente para GitHub Pages bajo `/PF-Chilly/`. El backend fue desplegado en Railway y el catálogo inicial se carga desde archivos JSON incluidos en el repositorio.

## Versiones declaradas relevantes

### Frontend

| Paquete | Versión declarada |
|---|---:|
| React | `^17.0.2` |
| React DOM | `^17.0.2` |
| Create React App / react-scripts | `^5.0.1` |
| React Router DOM | `^5.2.0` |
| Redux | `^4.0.5` |
| React Redux | `^7.2.3` |
| Auth0 React | `^1.12.0` |
| Tailwind CSS | `^3.2.4` |

### Backend

| Paquete | Versión declarada |
|---|---:|
| Express | `^4.18.2` |
| Sequelize | `^6.25.6` |
| PostgreSQL driver (`pg`) | `^8.8.0` |
| Mercado Pago | `^1.5.14` |
| Auth0 JWT bearer | `^1.2.0` |
| dotenv | `^16.0.3` |

No existe una versión de Node declarada por el proyecto original. Durante la auditoría se utilizó Node `22.14.0` y npm `10.9.2`, todavía sin instalar las dependencias.

## Estado de dependencias y pruebas

- No hay `node_modules` en `api` ni en `client`.
- Los dos `package-lock.json` están ignorados y no existen.
- No hay lockfiles alternativos.
- El backend declara Mocha, pero no contiene una suite de pruebas.
- El frontend conserva el test inicial de Create React App y dependencias de Testing Library que no aparecen en su `package.json`.
- Existe un build histórico versionado en `client/build` y CSS generado en `client/dist`.

## Scripts originales

### Backend

- `npm start`: ejecuta `node ./index.js`.
- `npm test`: ejecuta `mocha`.

### Frontend

- `npm start`: servidor de Create React App.
- `npm run dev`: intenta ejecutar `run-p`, que no está declarado como dependencia.
- `npm run build`: construye primero React y genera después el CSS de Tailwind.
- `npm run deploy`: publica `client/build` mediante `gh-pages`.
- La configuración de PostCSS está dentro de `client/src` en lugar de la raíz del frontend.

## Variables de entorno conocidas

El backend lee actualmente:

- `PORT`: opcional; usa `3001` por defecto.
- `DB_DEPLOY`: URI completa de PostgreSQL y necesaria para conectar.
- `ACCESS_TOKEN`: credencial privada de Mercado Pago.

`DB_USER`, `DB_PASSWORD` y `DB_HOST` se extraen del entorno, pero solamente aparecen en una conexión local comentada y no intervienen en el arranque actual.

No hay archivos `.env` en el proyecto ni en las ramas públicas inspeccionadas. Un clon de Git no puede recuperar variables que nunca fueron versionadas.

## Configuración incrustada en el código

Las siguientes configuraciones no utilizan todavía variables de entorno:

- URL pública del backend.
- URL pública del frontend y retornos de pago.
- Dominio, client ID, audience y scopes de Auth0.
- Cloud name y unsigned upload preset de Cloudinary.
- Service ID, template ID y public key de EmailJS.
- Identificadores del widget de Cliengo.

Estos identificadores públicos no sustituyen las credenciales privadas que puedan necesitar los respectivos servicios.

## Estado externo observado

Comprobado el 25 de agosto de 2026:

- La raíz histórica de GitHub Pages responde con el build estático.
- La ruta profunda `/PF-Chilly/user/info`, utilizada por Auth0, devuelve `404`.
- El dominio histórico del backend en Railway devuelve `404`, también en `/product`.
- El dominio histórico usado por los retornos de pago y logout devuelve `404`.

La copia estática sigue publicada, pero la aplicación completa no está operativa.

## Comportamiento de base de datos recibido

- El backend ejecuta `sequelize.sync({ force: true })` en cada arranque.
- El borrado es una decisión histórica para mantener limpia la demo, pero actualmente no se puede desactivar por entorno.
- Las categorías y el catálogo se inicializan después de abrir el puerto del servidor.
- Los dos procesos de seed se lanzan sin `await` y pueden competir entre ellos.
- El catálogo fuente está disponible en los JSON del repositorio, por lo que puede reconstruirse una base nueva.

## Riesgos conocidos antes de levantar

Esta lista registra hallazgos; su corrección pertenece a fases posteriores.

- Varias escrituras de usuarios, carritos, direcciones y artículos no requieren autenticación.
- Algunas rutas autenticadas aceptan IDs sin verificar que el recurso pertenezca al usuario del token.
- Los datos de checkout se pueden listar sin autenticación.
- CORS está abierto a cualquier origen.
- No existe rate limiting ni validación centralizada de entradas.
- El backend acepta desde el cliente los precios enviados a Mercado Pago.
- No existe confirmación de pago mediante webhook.
- Las rutas profundas del SPA no tienen fallback compatible con el hosting histórico.
- Hay rutas duplicadas, efectos React asíncronos, atributos `class` y código de prueba o depuración.

## Estado del baseline

En este punto no se han instalado paquetes, ejecutado migraciones, conectado servicios ni modificado archivos funcionales. La fase siguiente deberá intentar levantar la aplicación original con cambios mínimos y convertir cada fallo observado en evidencia reproducible.
