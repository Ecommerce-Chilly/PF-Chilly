# Fase 4C — Seed y restauración controlada de la demo

Esta fase hace repetible la carga del catálogo y separa las operaciones de
mantenimiento de la base de datos. Todos los comandos se ejecutan desde la raíz
y requieren `DEMO_MODE=true` en `api/.env`.

## Operaciones

```bash
npm run demo:seed
npm run demo:clean
npm run demo:restore
```

- `demo:seed` completa categorías, descuento y catálogo sin duplicar productos.
- `demo:clean` elimina usuarios, perfiles, sesiones, favoritos, carritos y
  pedidos, pero conserva categorías, productos, inventario y descuentos.
- `demo:restore` borra el esquema completo y reconstruye los 550 productos del
  catálogo versionado. Es la opción destructiva y debe usarse deliberadamente.

El catálogo contiene 550 entradas y 543 nombres diferentes. Por ese motivo la
idempotencia no depende solo del nombre: compara la representación completa y
la cantidad de apariciones de cada producto. Esto preserva los siete nombres
repetidos legítimos.

## Seguridad operativa

- Los tres comandos rechazan la ejecución fuera de `DEMO_MODE=true`.
- Cada operación se ejecuta dentro de una transacción.
- Un advisory lock de PostgreSQL impide dos mantenimientos concurrentes.
- Un fallo revierte la operación en lugar de dejar un seed parcial.
- El arranque persistente continúa sin borrar ni sembrar datos.

## Verificación realizada

Sobre la base local parcialmente poblada, la primera ejecución de `demo:seed`
reconoció 12 productos y creó los 538 ausentes. La segunda ejecución reconoció
los 550 y creó cero, confirmando el comportamiento idempotente.

Antes de publicar una demo conviene ejecutar `demo:clean`. `demo:restore` queda
reservado para recuperar completamente el estado conocido del catálogo.
