# CRUD REST API

REST API for managing users. Built with Express and Sequelize on MySQL, with passwords hashed using bcrypt.

## Requirements

- Node.js
- MySQL running locally
- A database named `crud_db`

## Running the server

```bash
npm install
npm run dev
```

To run without auto-reload:

```bash
npm start
```

The server reads the port from `src/.env`. If the variable is missing, it uses `3001`.

```env
PORT=5001
```

After the database connects, the server logs that it is running, for example:

```text
Server is running on http://localhost:5001
```

The database connection is configured in `src/config/database.js` (`crud_db` on `localhost`). Sequelize syncs the tables when the server starts.

## Routes

Every route is under `/api` except the home route.

| Method | Path | Description |
| --- | --- | --- |
| GET | `/` | Welcome message |
| POST | `/api/user` | Create a user |
| GET | `/api/users` | Get all users |
| GET | `/api/user/:id` | Get a user by id |
| PUT | `/api/user/:id` | Update a user |
| DELETE | `/api/user/:id` | Delete a user |

Create and update require `name`, `email`, and `password` in the body. The password is stored hashed.

```json
{
  "name": "Omar",
  "email": "omar@example.com",
  "password": "secret123"
}
```

Example request to create a user:

```bash
curl -X POST http://localhost:5001/api/user \
  -H "Content-Type: application/json" \
  -d '{"name":"Omar","email":"omar@example.com","password":"secret123"}'
```

Successful response shape:

```json
{
  "status": 201,
  "message": "User created successfully",
  "data": {}
}
```

`GET /api/user/:id` returns only `id`, `name`, and `email`. If the user does not exist, or a required field is missing on create or update, the error handler responds with status `500`.

## Project structure

```text
src/
  index.js                  App startup and database connection
  config/database.js        Sequelize setup
  models/userModel.js       User model
  routes/userRoutes.js      Route definitions
  controllers/userController.js
  services/userServices.js
  middlewares/errorHandlers.js
  .env                      PORT
```

A request goes from the route to the controller, then the service, then the model.
