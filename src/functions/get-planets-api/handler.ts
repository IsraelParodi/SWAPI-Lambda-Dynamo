import {
  formatJSONResponse,
  formatJSONResponseBadRequest,
} from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";

import { PlanetService } from "../../services/planets";

const getPlanetsApi = async (event) => {
  try {
    const { planetId } = event.pathParameters;
    let planetsData = await PlanetService.getPlanets(planetId);
    return formatJSONResponse({
      status: 200,
      message: "Planetas obtenidos satisfactoriamente",
      input: planetsData,
    });
  } catch (error) {
    throw formatJSONResponseBadRequest(error);
  }
};

export const main = middyfy(getPlanetsApi);
