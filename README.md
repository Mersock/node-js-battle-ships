# node-js-battle-ships

## Set Up

1. Install [Docker](https://www.docker.com/products/docker-desktop) for run on your local machine.

2. Make sure you have [Docker](https://www.docker.com/products/docker-desktop) starting after you install.
3. Start your server on your local machine by using

```
$ docker compose up -d
```

4. Server will start on port 3333 and your brwser http://localhost:3333 with connection to MongoDB on port 28888.

## Tests

```
$ docker exec -it battle-ship-api npm run test
```

## Guide

##### Start Game:

> **`GET /game/start`**

Response

```javascript
{
    "data":{
        "id":"5e6e51db2b645700d1eca346"
    }
}
```

##### View Status Game:

> **`GET /game/{id}/status`**

Response

```javascript
{
    "data": {
        "status": "placing_ships"
    }
}
```

##### Place Your Ship:

> **`POST /game/{id}/place`**

Request

| Key       | Value                           | Example                                   |
| --------- | ------------------------------- | ----------------------------------------- |
| yPosition | Integer(required) between 0-9   | 1                                         |
| xPosition | Integer(required) between 0-9   | 4                                         |
| ship      | String(required)                | battleship, cruiser, submarine, destroyer |
| vertical  | boolean(optional) default false | true                                      |

```javascript
{
	"xPosition":1,
	"yPosition":3,
	"ship":"battleship",
	"vertical":true
}
```

Response

```javascript
{
    "data": {
        "start_state": [],
        "current_state": [
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,1,1,1,1.....],
            ....
        ],
        "attack_count": 0,
        "status": "placing_ships",
        "total_ships": 1,
        "battleship": 1,
        "cruiser": 0,
        "destroyer": 0,
        "submarine": 0,
        "started_at": "2020-03-15T16:15:40.615Z",
        "__v": 1,
        "id": "5e6e51db2b645700d1eca346"
}
```

##### Attack The Ship:

> **`POST /game/{id}/attack`**

Request

| Key       | Value                         | Example |
| --------- | ----------------------------- | ------- |
| yPosition | Integer(required) between 0-9 | 1       |
| xPosition | Integer(required) between 0-9 | 4       |

```javascript
{
	"xPosition":1,
	"yPosition":3
}
```

Response

```javascript
{
    "data": {
        "status": "Hit"
    }
}
```
