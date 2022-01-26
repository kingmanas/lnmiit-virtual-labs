# Virtual Labs

![Virtual Labs](./misc/system_design.png)

## Production Build

- Using NGINX as a reverse proxy and a nameserver because
  the services may be deployed on different places.

- The api gateway redirects to:

  - Authentication Server
  - File Server
  - Code Evaluator

- Jupyter Labs deployed on NVIDIA DGX-1 have
  an entry as an independent microservice, still
  rely on the API Gateway for issuing new tokens.

- Other servers are :
  - MongoDB
  - Redis
  - Mongo Express

## How to Run?

- Make sure you have a running copy of [docker](https://docs.docker.com/engine/install/) and [docker-compose](https://docs.docker.com/compose/install/)

- Then run :

```shell
git clone -b production https://github.com/jatinluthra14/KSL --depth 1
cd KSL
```

### Adding the admin to the database

- Open the docker-compose.yml file and comment this part

```
  environment:
    MONGO_INITDB_ROOT_USERNAME: ${MONGO_ROOT_USERNAME}
    MONGO_INITDB_ROOT_PASSWORD: ${MONGO_ROOT_PASSWORD}
```

- Now run `docker-compose up`

- We now can attach a shell to the mongo container.

```shell
# First print the container id for the mongo continer
docker ps | grep mongo
docker exec -it <mongo-container-id> bash
```

- Once inside the container run `mongo`.

- Now run the following commands:-

```js
use admin
db.createUser({
  user: 'root',
  pass: passwordPrompt(),
  roles: ["root"]
})
```

- Enter the password for the database stored as `MONGO_ROOT_PASSWORD` at `./backend/api/utils/.env`.

- Now uncomment the lines in `docker-compose.yml` and restart all containers.

- The service is up at [https://localhost/3000](https://localhost:3000).
