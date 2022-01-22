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

```
git clone -b production https://github.com/jatinluthra14/KSL --depth 1
cd KSL
docker-compose up
```

- The service is up at [https://localhost/8443](https://localhost:8443).
