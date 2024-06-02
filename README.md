# Studio ghibli API wrapper
This is a challenge repo.

# How to run this project

## Requirements (production mode)
- Docker / docker-compose.yml

## Step 1. Create .env file at root's project (example)
```txt
DB_CONTAINER_NAME="ghibli_db"
POSTGRES_USER=prod_user940127
POSTGRES_PASSWORD=jfds98u123.+lxj
POSTGRES_DB=studio_ghibli_prod
DATABASE_URL="postgresql://prod_user940127:jfds98u123.+lxj@ghibli_db:5432/studio_ghibli_prod?schema=public"
PORT=3010
JWT_SECRET="js98uf329x"
JWT_TOKEN_EXPIRATION="24h"
NODE_ENV=production
CORS_ORIGIN='http://0.0.0.0'
```

## Step 2. Execute docker-compose.yml
```bash
docker-compose up --build -d
```


## Test the api

Once the containers are up and running, execute this for insert an admin user: 
```bash
cat initial.sql | docker exec -i ghibli_db psql -U prod_user940127 -d studio_ghibli_prod
```

These are the available endpoints:
- POST /api/v1/users/login
- GET /api/v1/users
- GET /api/v1/users/{id}
- POST /api/v1/users
- PUT /api/v1/users/{id}
- DELETE /api/v1/users
- GET /api/v1/ghibli
- GET /api/v1/ghibli/{id}

### Login

```bash
curl -X POST http://localhost:3010/api/v1/users/login -H "Content-Type: application/json" -d '{"email":"admin@example.com","password":"Admin123+45"}'
```

Set the session token for further requests:

```bash
export TOKEN='token field of the output of previous curl '
```


### Create an user

```bash
curl -X POST http://localhost:3010/api/v1/users -H "Content-Type: application/json" -H "Authorization: Bearer "$TOKEN -d '{"email":"vehicles@example.com","password":"Hello123+45","role":"VEHICLES"}' 
```

### Consume ghibli by role

First login as VEHICLES role
```bash
curl -X POST http://localhost:3010/api/v1/users/login -H "Content-Type: application/json" -d '{"email":"vehicles@example.com","password":"Hello123+45"}'
```

Set the token of the previous curl's output and call the api
```bash
export TOKEN_V_USER='token field of the output of the login curl of vehicles role'
curl http://localhost:3010/api/v1/ghibli\?limit\=5 -H "Content-Type: application/json" -H 'Authorization: Bearer '$TOKEN_V_USER
```

### Get all users
```bash
curl -X GET http://localhost:3010/api/v1/users -H "Content-Type: application/json" -H "Authorization: Bearer "$TOKEN 
```
