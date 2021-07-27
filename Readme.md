# CRUD API using node, Sequelize, Mysql and  Docker

[![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=CSP%20Collection&uri=https%3A%2F%2Fraw.githubusercontent.com%2FVonLisboa%2Fcsp-test-node%2Fmaster%2Fspecs%2Fcontatos.yaml)

Navigate where the docker-compose.yml is located and build the image (you can customize your image name in the docker-compose.yml file)
```
docker-compose build
```

To run the db:

```
docker-compose up -d db_mysql
```

To run the backend

```
docker-compose up -d csp_backend
```
