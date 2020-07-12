## Tic tac toe

## Simple API server
Technologies used: Typescript, Express.js, TypeORM, docker(for spinning up db), Jest, supertest, PostgreSQL

Games are saved in games-table and moves for games are stored for moves-table. 4 api endpoints are available.

Actual server is small express.js app which is created in index.ts. Routes are declared in server.ts. TypeORM takes care
of db operations & migrations. Docker deals with spinning up the actual database. Api uses lightweight implementation
of DDD and other design patterns often used in API side.

## Run locally

To install dependencies for running locally:
``` 
npm install
docker-compose --file docker-compose-dev.yml up -d
```

Run tests:
``` 
npm test
```

Run api server:
```
npm run dev
```

## Run in production
```
docker-compose --file docker-compose-prod.yml up -d
```

## Available endpoints:

Create game
[width of board, height of board, who starts game, how many hits are required for win]:
```
curl --request POST \
  --url http://localhost:3000/api/game \
  --header 'content-type: application/json' \
  --data '{
	"width": 6,
	"height": 6,
	"starter": "o",
	"maxRequired": 3
}'
```

Make a move[id(game id), x, y, value(valid values: x/o)]:
```
curl --request PUT \
  --url http://localhost:3000/api/game \
  --header 'content-type: application/json' \
  --data '{
	"id": 1,
	"x": 1,
	"y": 1,
	"value": "o" 
}'
```

Show a single game
```
curl --request GET \
  --url 'http://localhost:3000/api/game?id=1'
```

List all games
```
curl --request GET \
  --url http://localhost:3000/api/games
```
