# Instrucciones para agentes de código (Copilot / AI)

Propósito
- Proveer al agente la visión mínima para trabajar productivamente en este repo React + Node/Mongo.

Arquitectura general
- Backend: Node.js + Express + Mongoose. Entrada: [backend/index.js](backend/index.js#L1-L40).
- Rutas API: [backend/routes/products.js](backend/routes/products.js#L1-L60) y [backend/routes/budgets.js](backend/routes/budgets.js#L1-L80).
- Modelos: [backend/models/Product.js](backend/models/Product.js#L1-L40) y [backend/models/Budget.js](backend/models/Budget.js#L1-L80).
- Frontend: Vite + React (SPA). Entrada: [frontend/src/main.jsx](frontend/src/main.jsx#L1-L40). Componentes y context en `frontend/src/components` y `frontend/src/context`.

Puntos críticos y razonamiento de diseño
- El backend usa ES modules (`"type": "module"` en [backend/package.json](backend/package.json#L1-L40)).
- Mongoose se usa para persistencia; el `Budget` guarda tanto `productId` como campos denormalizados (`name`, `price`, `qty`) — ojo al actualizar productos (no hay sincronización automática).
- La creación de presupuestos implementa numeración automática (busca el último `number` y suma 1) en [backend/routes/budgets.js](backend/routes/budgets.js#L1-L40).

Comandos y flujos de desarrollo
- Iniciar backend en desarrollo:

```bash
cd backend
npm install
npm run dev   # usa nodemon, escucha en PORT según .env
```

- Iniciar frontend en desarrollo:

```bash
cd frontend
npm install
npm run dev   # arranca Vite
```

- Variables de entorno importantes: `MONGO_URI` y `PORT` en [backend/.env](backend/.env) (archivo local). El servidor imprime "MongoDB conectado" y el puerto en la consola.

API y contratos (ejemplos)
- GET `/api/products` — lista productos. Implementado en [backend/routes/products.js](backend/routes/products.js#L1-L30).
- POST `/api/products` — crea producto. Payload mínimo:

```json
{ "name":"Panel 550W", "category":"Solar", "subcategory":"Paneles", "price":180000 }
```

- GET `/api/budgets` — lista presupuestos.
- POST `/api/budgets` — crea presupuesto con numeración automática; payload típicamente contiene `products` (array con `productId`, `name`, `qty`, `price`) y totales (`subtotal`,`shipping`,`total`,`clientEmail`). Ejemplo mínimo:

```json
{
  "products": [{ "productId":"<ObjectId>", "name":"Panel", "qty":1, "price":180000 }],
  "subtotal":180000,
  "shipping":50000,
  "total":230000,
  "clientEmail":"cliente@ej.com"
}
```

Patrones y convenciones específicas
- ESM (imports/exports). Mantener `import`/`export default` en backend.
- Rutas pequeñas y centradas por recurso (products, budgets). Añadir nuevas rutas en `backend/routes` y exportarlas en `backend/index.js`.
- Modelos sencillos; si hace falta agregar índices o validaciones, éditelos en `backend/models/*`.
- El frontend usa Context para carrito y autenticación ([frontend/src/context/CartContext.jsx](frontend/src/context/CartContext.jsx#L1-L200)). Para cambios en el flujo del presupuesto, actualizar ambos context y vistas en `frontend/src/pages`.

Integraciones y dependencias externas
- MongoDB: requerido en `MONGO_URI`.
- Vite/React en frontend; no hay backend SSR.
- CORS está habilitado en [backend/index.js](backend/index.js#L1-L30).

Debug y verificación rápida
- Probar endpoints via `curl` o Postman; ejemplo para listar productos:

```bash
curl http://localhost:3000/api/products
```

- Logs: el backend imprime conexión y puerto; la mayor parte de errores se devuelven como `500` con `{ error: err.message }`.

Dónde hacer cambios comunes
- Añadir/editar API: `backend/routes/*.js` + `backend/models/*.js`.
- Ajustes de negocio del presupuesto: `backend/routes/budgets.js` (autonumeración) y `backend/models/Budget.js`.
- UI/UX: `frontend/src/pages/*` y `frontend/src/components/*`.

Limitaciones detectadas
- No hay tests automatizados en el repo.
- No hay sincronización automática entre cambios de `Product` y `Budget` (datos denormalizados).

Si necesitas más contexto
- Pide que ejecute los comandos dev para levantar ambos lados y probar endpoints, o que muestre archivos concretos (componentes, context o rutas) para ejemplos puntuales.

Solicito feedback: ¿quieres que incluya snippets de flujo de trabajo para debugging (por ejemplo, requests cURL más avanzados) o plantillas de PR/commit para este repo?
