import { transformString } from "../utils/utils";
import { IPlanet } from "../interfaces/IPlanet";
import DynamoDBConnection from "../database/dynamodb";
import * as AWS from "aws-sdk";

const { v4 } = require("uuid");
const https = require("https");
const translate = new AWS.Translate();

export class PlanetService {
  constructor() {}

  static async getPlanets(planetId: string) {
    const translatedData = {} as IPlanet;
    try {
      const planet = (await this.handlePlanets(planetId)) as IPlanet;
      console.log(planet);
      for (const key in planet) {
        const translatedKey = await translate
          .translateText({
            Text: key,
            SourceLanguageCode: "en",
            TargetLanguageCode: "es",
          })
          .promise();
        const cleanString = transformString(translatedKey.TranslatedText);
        translatedData[cleanString] = planet[key];
      }
    } catch (error) {
      throw Error(error);
    }

    return { statusCode: 200, body: translatedData };
  }

  static async createPlanet(planet: IPlanet) {
    try {
      const dynamodb = await DynamoDBConnection.getInstance();

      planet.id = v4();
      planet.creado = new Date().toISOString();

      await dynamodb
        .put({
          TableName: "planets",
          Item: planet,
        })
        .promise();
    } catch (error) {
      throw Error(error);
    }

    return { statusCode: 201, body: planet };
  }

  static async getPlanetsDb() {
    try {
      const dynamodb = await DynamoDBConnection.getInstance();
      const planets = await dynamodb.scan({ TableName: "planets" }).promise();

      return { statusCode: 200, body: planets };
    } catch (error) {
      throw Error(error);
    }
  }
  static async handlePlanets(planetId: string) {
    return new Promise((resolve, reject) => {
      const req = https.get(
        `https://swapi.dev/api/planets/${planetId}`,
        (res) => {
          let data = "";

          // called when a data chunk is received.
          res.on("data", (chunk) => {
            data += chunk;
          });

          // called when the complete response is received.
          res.on("end", () => {
            const planet = JSON.parse(data);
            console.log(planet);
            resolve(planet);
          });
        }
      );

      req.on("error", (err) => {
        console.log("Error: ", err.message);
        reject(err);
      });

      req.end();
    });
  }
}
