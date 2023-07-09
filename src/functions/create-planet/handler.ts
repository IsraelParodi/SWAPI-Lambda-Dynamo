import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";

import schema from "./schema";
import { PlanetService } from "../../services/planets";
import { IPlanet } from "src/interfaces/IPlanet";

export const createPlanet: ValidatedEventAPIGatewayProxyEvent<
  typeof schema
> = async (event) => {
  const planet: IPlanet = event.body;
  let planetData = await PlanetService.createPlanet(planet);
  return formatJSONResponse({
    status: 201,
    message: "Planeta creado satisfactoriamente",
    input: planetData,
  });
};

export const main = middyfy(createPlanet);
