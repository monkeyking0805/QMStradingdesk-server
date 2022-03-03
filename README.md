# qms-tradingdesk-server

## Development

### knex CLI
```
npm install -g knex
```

### knex-migrate CLI
```
npm install -g knex-migrate
```

### Reset all migrations, migrate, seed
```
npm run migrate:redo:dev
```
is equivelant to
```
knex migrate:rollback
knex migrate:latest
knex seed:run
```

### Docker
You can run the whole project from docker compose by
```
docker-compose up -d
```
But, by running above command, your code will be copied to docker container and run there.
If you have updated your code. You will have to remove all related docker images and redo all over again.
Run only posgresql engine on docker is a lot easier (suggested)
```
docker-compose up -d db
```
then you must run node.js application on you local. It is a lot easier for development.

### Config .env file
Please config your .env file in order for application to works.
***Please note***: If you are running application from docker, docker will use .env.docker

### Create an empty database, migrate and seed
```
npm run db:init
```

## Start an app
```
npm run start:dev
```