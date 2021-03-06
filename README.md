# Desafio Backend

## Endpoints

|  Método   |          Rota               |         Descrição          |
|:---------:|:---------------------------:|:--------------------------:|
| `POST`    | /planets/                   | Adiciona um novo planeta   |
| `GET`     | /planets/?page=1            | Lista todos os planetas    |
| `GET`     | /planets/?name=:name&page=1 | Busca um planeta pelo nome |
| `GET`     | /planets/?id=:id            | Busca um planeta pelo id   |
| `DELETE`  | /planets/?id=:id            | Remove um planeta pelo id  |


## Adicionando um Planeta
```json
{
  "name"    : string,
  "climate" : string,
  "terrain" : string
}
```

## Success Responses
### `201` - Planeta criado com sucesso 
```json
{
  data: {
    "name"    : string,
    "climate" : string,
    "terrain" : string,
    "movie_apparitions": number
  }
}
```

### `200` - Planeta removido com Sucesso
```json
{
  "data": {
    "deleted": number,
    "not_deleted": number
  }
}
```

### `200` - Buscar planeta por ID
```json
{
  data: {
    "name"    : string,
    "climate" : string,
    "terrain" : string,
    "movie_apparitions": number
  }
}
```

### `200` - Buscar planeta por nome e listar planetas
```json
{
  "data": {
    "count": number,
    "next": string,
    "previous": string,
    "planets": [
      {
        "name"    : string,
        "climate" : string,
        "terrain" : string,
        "movie_apparitions": number
      }
    ]
  }
}
```
## Error Responses

### `403` - Planeta já existe no Banco de Dados 
```json
{
  "error": "PlanetAlreadyExistsError",
  "detail": "The planet already exists in the database!"
}
```

### `400` - O nome do planeta é obrigatório
```json
{
  "error": "RequiredParamError",
  "detail": "The param name is required!"
}
```

### `403` - O nome do planeta é inválido
```json
{
  "error": "InvalidPlanetDataError",
  "detail": "The planet name is invalid!"
}
```

### `400` - O terreno do planeta é obrigatório
```json
{
  "error": "RequiredParamError",
  "detail": "The param terrain is required!"
}
```

### `403` -  O terreno do planeta é inválido
```json
{
  "error": "InvalidPlanetDataError",
  "detail": "The planet terrain is invalid!"
}
```
### `400` - O clima do planeta é obrigatório
```json
{
  "error": "RequiredParamError",
  "detail": "The param climate is required!"
}
```

### `400` - O clima do planeta é inválido
```json
{
  "error": "InvalidPlanetDataError",
  "detail": "The planet climate is invalid!"
}
```

### `404` - Not Found
```json
{
  "detail": "Not found"
}
```

### `500` - Internal Server Error
```json
{
  "error": "InternalServerError",
  "detail": "Message"
}
```
## Banco de Dados

Neste projeto foi utilizado o MongoDB.