include .env
export $(shell sed 's/=.*//' .env)

.PHONY: help

nodejsContainerName = backend-nodejs
postgresContainerName = backend-postgres
redisContainerName = backend-redis

## Выводит описание команд
help:
	@echo "$$(tput bold)Available rules:$$(tput sgr0)";echo;sed -ne"/^## /{h;s/.*//;:d" -e"H;n;s/^## //;td" -e"s/:.*//;G;s/\\n## /---/;s/\\n/ /g;p;}" ${MAKEFILE_LIST}|LC_ALL='C' sort -f|awk -F --- -v n=$$(tput cols) -v i=19 -v a="$$(tput setaf 6)" -v z="$$(tput sgr0)" '{printf"%s%*s%s ",a,-i,$$1,z;m=split($$2,w," ");l=n-i;for(j=1;j<=m;j++){l-=length(w[j])+1;if(l<= 0){l=n-i-length(w[j])-1;printf"\n%*s ",-i," ";}printf"%s ",w[j];}printf"\n";}'|more $(shell test $(shell uname) == Darwin && echo '-Xr')

## Запускает prod-сборку с контейнером node.js
prod-server:
	docker-compose up -d
## Ставит зависимости node.js из контейнера
prod-yarn-install:
	docker-compose run ${nodejsContainerName} sh -c "yarn --cwd ./app install"
## Синхронизирует схему DB в prod
prod-schema-sync:
	docker-compose run ${nodejsContainerName} yarn --cwd ./app ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js schema:sync

## Запускает dev-сборку
dev-server:
	docker-compose up --build -d ${postgresContainerName} ${redisContainerName}
	yarn --cwd ./app dev
## Ставит зависимости node.js
dev-yarn-install:
	yarn --cwd ./app install
## Синхронизирует схему DB
dev-schema-sync:
	yarn --cwd ./app ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js schema:sync

## Добавляет npm зависимость
add:
	yarn --cwd ./app add $(filter-out $@,$(MAKECMDGOALS))
## Удаляет npm зависимость
rm:
	yarn --cwd ./app remove $(filter-out $@,$(MAKECMDGOALS))
## Убивает контейнеры
down:
	docker-compose down

## Открывает Postgres консоль для управления DB. Должны быть заданы параметры DATABASE_NAME и DATABASE_USER в .env
postgres-cli:
	docker-compose exec ${postgresContainerName} psql -d ${DB_NAME} -U ${DB_USER}
## Устанавливает расширения postgres
postgres-init-extensions:
	docker-compose exec ${postgresContainerName} psql -U postgres -d ${DB_NAME} -c 'CREATE EXTENSION IF NOT EXISTS "uuid-ossp";'
