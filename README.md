# Prueba Softtek - AWS Node.js Typescript

Para correr el servicio

- npm i
- serverless deploy (para desplegar en AWS)
- serverless offline (para correrlo en local)

Crear planeta customizado
https://lwlh4mbpva.execute-api.us-east-1.amazonaws.com/dev/create-planet

METHOD: POST

BODY:

    {
        "nombre": "Planeta prueba2",
        "periodoDeRotacion": "24",
        "periodoOrbital": "4800",
        "diametro": "10000",
        "clima": "humedo",
        "gravedad": "1 standard",
        "terreno": "selva",
        "superficieAgua": "15",
        "poblacion": "13650"
    }

Obtener planetas DynamoDB
https://lwlh4mbpva.execute-api.us-east-1.amazonaws.com/dev/get-planets-db

Obtener planeta (Integración SWAPI)
https://lwlh4mbpva.execute-api.us-east-1.amazonaws.com/dev/get-planets-api/1

METHOD: GET
