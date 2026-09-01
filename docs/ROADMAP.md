# Roadmap de recuperación

## Objetivo

Recuperar y modernizar Chilly para convertirlo en una demo pública segura y presentable en portfolio, preservando sus funcionalidades y evitando una reescritura innecesaria.

## Principios

- Preservar comportamiento antes de modernizar.
- Separar correcciones, migraciones y cambios funcionales.
- Actualizar versiones major solamente cuando exista una razón concreta.
- Mantener commits pequeños y descriptivos.
- Documentar fallos reproducibles y decisiones relevantes.
- No atribuir a una persona trabajo original cuya autoría no esté confirmada.

## Fuera de alcance inicial

- Reescribir la aplicación con Next.js.
- Convertir masivamente el proyecto a TypeScript.
- Reemplazar Redux sin una necesidad demostrada.
- Introducir microservicios.
- Rediseñar por completo la interfaz.
- Preparar pagos con dinero real.
- Actualizar cada dependencia a su última major solo por antigüedad.

## Fase 0 — Baseline y documentación

**Estado:** completada.

- Preservar el commit original mediante una etiqueta.
- Crear la rama de recuperación.
- Registrar arquitectura, dependencias y estado externo.
- Documentar variables conocidas y entornos previstos.
- Definir Node 22 como objetivo pendiente de validación.
- Mantener intacto el comportamiento original.

**Salida:** punto de partida verificable y documentación suficiente para iniciar el diagnóstico práctico.

## Fase 1 — Levantar la aplicación legacy

**Estado:** completada. Véase [LEGACY-RUN.md](LEGACY-RUN.md).

- Instalar las dependencias sin migraciones tecnológicas deliberadas.
- Crear una PostgreSQL local y configurar el backend.
- Resolver únicamente bloqueos imprescindibles de instalación y arranque.
- Recorrer los flujos disponibles y registrar errores.
- Determinar qué integraciones todavía responden y cuáles requieren cuentas nuevas.

**Salida:** versión legacy funcionando localmente o inventario reproducible de los bloqueos restantes.

## Fase 2 — Estructura, build y limpieza

**Estado:** completada. Véase [PHASE-2.md](PHASE-2.md).

- Crear scripts coherentes en la raíz del proyecto.
- Incorporar lockfiles y builds reproducibles.
- Corregir la generación de Tailwind/PostCSS.
- Añadir linting y formato moderados.
- Limpiar rutas duplicadas, imports muertos, logs y errores evidentes de React.
- Dejar de depender de artefactos históricos versionados.

**Salida:** instalación, desarrollo, pruebas y build mediante comandos documentados.

## Fase 3 — Modernización moderada

**Estado:** modernización prevista completada. Las subfases 3A, 3B, 3C, 3D y 3E.1 a 3E.4 están completadas; React Router 7 y la restauración del acceso administrativo tras recargar fueron comprobados manualmente. La deuda restante de seguridad e integraciones se mantiene en sus fases respectivas. Véanse [PHASE-3A.md](PHASE-3A.md), [PHASE-3B.md](PHASE-3B.md), [PHASE-3C.md](PHASE-3C.md), [PHASE-3D.md](PHASE-3D.md) y [PHASE-3E.md](PHASE-3E.md).

- [x] Migrar Create React App a Vite.
- [x] Mover la configuración pública del frontend a variables `VITE_*`.
- [x] Migrar React 17 a React 18.
- [x] Migrar React Router 5 a 6.
- [x] Actualizar Auth0 React, recuperar su configuración y retirar el acceso del navegador a Management API.
- [x] Retirar dependencias sin uso y actualizar dependencias compatibles de bajo riesgo.
- [x] Sustituir Mercado Pago por Stripe Checkout en modo de pruebas.
- [x] Verificar visualmente la migración de React Tooltip 4 a 6.
- [x] Migrar React Router 6 a 7 sin cambiar la arquitectura de rutas.
- Migrar de forma aislada las dependencias que requieren cambios major.
- Mantener inicialmente JavaScript, Redux clásico, Express 4, Sequelize 6 y Tailwind 3 si siguen siendo adecuados.

**Salida:** frontend mantenible sin alterar innecesariamente su arquitectura funcional.

## Fase 4 — Base de datos y modo demo

**Estado:** en curso. 4A está completada y 4B implementada con pruebas unitarias y PostgreSQL aislado; 4B queda pendiente de comprobación manual. Véanse [PHASE-4A.md](PHASE-4A.md) y [PHASE-4B.md](PHASE-4B.md).

- [x] 4A: separar preparación de tablas, seed y arranque sin cambiar el reset actual.
- [x] 4B: controlar el reset mediante configuración y proteger entornos no demo.
- [x] 4C: hacer el seed repetible y permitir restaurar la demo de forma controlada.
- [ ] Separar la limpieza explícita de datos del arranque habitual.
- [ ] Hacer el seed ordenado, idempotente y transaccional.
- [x] Introducir `DEMO_MODE` y `RESET_DB_ON_START`.
- [x] Desactivar el reset destructivo fuera del modo demo.
- [ ] Permitir limpiar datos mutables sin reconstruir siempre el catálogo.
- [ ] Evitar resets concurrentes entre instancias.

**Salida:** estado de demo restaurable y comportamiento persistente seguro cuando corresponda.

## Fase 5 — Seguridad

- Clasificar rutas públicas, autenticadas y administrativas.
- Obtener la identidad desde el token en lugar de confiar en IDs del cliente.
- Verificar propiedad de carritos, favoritos, direcciones y pedidos.
- Proteger datos personales y todas las escrituras.
- Restringir CORS y añadir headers de seguridad, rate limiting y límites de payload.
- Validar cuerpos, parámetros y queries.
- Calcular precios de pago en el backend.
- Normalizar errores sin exponer detalles internos.

**Salida:** API preparada para permanecer expuesta como demo pública.

## Fase 6 — Integraciones

- [x] Recuperar o recrear la configuración base de Auth0.
- [x] Sustituir Mercado Pago por Stripe Checkout en modo de pruebas.
- [x] Verificar el retorno y la confirmación del pago sin confiar en datos del navegador.
- Añadir confirmación asíncrona mediante webhooks firmados de Stripe.
- Restringir carga y formato de imágenes en Cloudinary.
- Evaluar si EmailJS y Cliengo aportan valor; recuperar, sustituir o eliminar cada integración de forma explícita.
- Mantener todos los secretos fuera del repositorio.

**Salida:** integraciones operativas, controladas y documentadas.

## Fase 7 — Pruebas y corrección de bugs

- Ejecutar recorridos manuales completos como visitante, usuario y administrador.
- Probar catálogo, filtros, carrito, favoritos, checkout, pedidos y administración.
- Revisar el contenido y la presentación del panel de usuarios administrativos.
- Añadir pruebas automatizadas pequeñas para health check, catálogo, autorización, propiedad de recursos y build.
- Corregir regresiones y estados de carga o error importantes.

**Salida:** flujos principales verificados y protegidos frente a regresiones básicas.

## Fase 8 — Despliegue y presentación

- Desplegar frontend, backend y PostgreSQL en entornos separados.
- Configurar variables, CORS, rutas SPA, health checks y logs.
- Incorporar integración continua para instalar, probar y construir.
- Preparar cuenta y datos de demostración.
- Completar README, capturas, arquitectura, decisiones y limitaciones conocidas.
- Diferenciar con claridad el trabajo grupal original de la recuperación posterior.

**Salida:** aplicación pública, reproducible y preparada para presentarse en portfolio.
