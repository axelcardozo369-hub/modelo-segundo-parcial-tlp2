# Práctica – API de Recetario (Express + Mongoose)

API REST para compartir recetas de cocina. Los usuarios se registran, inician sesión (JWT en cookie httpOnly) y publican recetas con sus ingredientes y etiquetas.

## Consigna

Completar **solo** los archivos marcados con `// * ARCHIVO A COMPLETAR`, siguiendo los comentarios `TODO`. Los archivos marcados `// ! ARCHIVO BASE: no modificar` ya están resueltos (`tag.validation.js` sirve de ejemplo del estilo de las validaciones). Los comentarios `// ?` son pistas.

Archivos a completar:

- `src/models/user.model.js`, `tag.model.js`, `recipe.model.js`
- `src/controllers/auth.controller.js`, `recipe.controller.js` (y una función en `user.controller.js` y otra en `tag.controller.js`)
- `src/middlewares/validation/auth.validation.js`, `recipe.validation.js`
- `src/middlewares/ownerOrAdmin.middleware.js`
- `src/routes/auth.routes.js`, `recipe.routes.js`

## Modelo de datos

- **User**: username (único), email (único), password (hash), role (`user` o `admin`), `profile` embebido (firstName, lastName, country, phone) y `deletedAt` para la eliminación lógica.
- **Tag**: name (único) y description. Una tag puede estar en muchas recetas.
- **Recipe**: title (único), description, prepTime, servings, difficulty, status, author (User), ingredients (lista de subdocumentos), nutrition (objeto embebido) y tags (lista de Tag).

## Reglas de negocio

- Un usuario eliminado lógicamente no aparece en los listados, no puede iniciar sesión y se borran sus recetas.
- Al borrar una tag se quita de las recetas que la tenían.
- El `author` de una receta es siempre el usuario logueado.
- `GET /api/recipes` solo lista las recetas con status `published`. Una receta que no está publicada solo la ve su autor o un admin.
- Todo usuario que se registra queda con role `user`.

## Cómo correrlo

1. `npm install`
2. Copiar `.env.example` a `.env` (ajustar `MONGODB_URL` si usás Atlas).
3. Tener MongoDB corriendo.
4. `npm run seed` crea un administrador: `admin@recetario.com` / `Admin1234`.
5. `npm run dev` (puerto 3005). Probar con la colección de Postman incluida.

## Endpoints

| Método | Ruta | Acceso |
| --- | --- | --- |
| POST | /api/auth/register | público |
| POST | /api/auth/login | público |
| POST | /api/auth/logout | sesión iniciada |
| GET | /api/auth/profile | sesión iniciada |
| PUT | /api/auth/profile | sesión iniciada |
| GET | /api/users | admin |
| GET | /api/users/:id | admin |
| PUT | /api/users/:id | admin |
| DELETE | /api/users/:id | admin (eliminación lógica + cascada) |
| POST | /api/tags | admin |
| GET | /api/tags | sesión iniciada |
| GET | /api/tags/:id | sesión iniciada |
| PUT | /api/tags/:id | admin |
| DELETE | /api/tags/:id | admin (con cascada) |
| POST | /api/recipes | sesión iniciada |
| GET | /api/recipes | sesión iniciada (solo publicadas) |
| GET | /api/recipes/my | sesión iniciada |
| GET | /api/recipes/:id | sesión iniciada |
| PUT | /api/recipes/:id | autor de la receta o admin |
| DELETE | /api/recipes/:id | autor de la receta o admin |
