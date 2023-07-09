import { transformString } from "../utils/utils";
import { IPlanet } from "../interfaces/IPlanet";
import DynamoDBConnection from "../database/dynamodb";
import * as AWS from "aws-sdk";
AWS.config.update({ region: "us-east-1" });

const { v4 } = require("uuid");
const https = require("https");
const translate = new AWS.Translate();

export class PlanetService {
  constructor() {}

  static async getPlanets(planetId: string) {
    try {
      const translatedData = {} as IPlanet;
      const planet = (await this.handlePlanets(planetId)) as IPlanet;
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
      return { statusCode: 200, body: translatedData };
    } catch (error) {
      throw Error(error);
    }
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

      return { statusCode: 201, body: planet };
    } catch (error) {
      throw Error(error);
    }
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

          res.on("data", (chunk) => {
            data += chunk;
          });

          res.on("end", () => {
            const planet = JSON.parse(data);
            resolve(planet);
          });
        }
      );

      req.on("error", (err) => {
        reject(err);
      });

      req.end();
    });
  }
}
