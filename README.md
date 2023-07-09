# Prueba Softtek - AWS Node.js Typescript

Para correr el servicio
Node version: v18.16.0

- npm i
- serverless deploy (para desplegar en AWS)
- serverless offline (para correrlo en local)
- npm run test (testeo simple con jest)

Crear planeta customizado
METHOD: POST
https://lwlh4mbpva.execute-api.us-east-1.amazonaws.com/dev/create-planet

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
METHOD: GET
https://lwlh4mbpva.execute-api.us-east-1.amazonaws.com/dev/get-planets-db

Obtener planeta (Integración SWAPI)
METHOD: GET
https://lwlh4mbpva.execute-api.us-east-1.amazonaws.com/dev/get-planets-api/1
