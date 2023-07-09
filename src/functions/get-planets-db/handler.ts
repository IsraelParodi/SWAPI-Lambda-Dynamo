import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";

import { PlanetService } from "../../services/planets";

export const getPlanetsDb = async () => {
  try {
    let planetsData = await PlanetService.getPlanetsDb();
    return formatJSONResponse({
      status: 200,
      message: "Planetas obtenidos satisfactoriamente",
      input: planetsData,
    });
  } catch (error) {
    throw Error(error);
  }
};

export const main = middyfy(getPlanetsDb);
