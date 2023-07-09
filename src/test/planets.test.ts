import { PlanetService } from "../services/planets";
const DynamoDBConnection = require("../database/dynamodb.ts");

jest.setTimeout(10000);

jest.mock("../database/dynamodb.ts", () => ({
  getInstance: jest.fn(),
}));

const mockScan = jest
  .fn()
  .mockReturnValue({ promise: jest.fn().mockResolvedValue({}) });
const mockPut = jest
  .fn()
  .mockReturnValue({ promise: jest.fn().mockResolvedValue({}) });

DynamoDBConnection.getInstance.mockResolvedValue({
  scan: mockScan,
  put: mockPut,
});

describe("getPlanetsDb", () => {
  it("should return the scanned planets", async () => {
    const mockPlanets = {
      Items: [
        {
          diametro: "10000",
          nombre: "Planeta prueba",
          superficieDelAgua: "15",
          periodoDeRotacion: "24",
          periodoOrbital: "4800",
          clima: "humedo",
          gravedad: "1 standard",
          creado: "2023-07-08T22:03:34.440Z",
          poblacion: "13650",
          id: "8aa4bff1-36d3-45cd-8055-b8c5b6e27e78",
          terreno: "selva",
        },
        {
          diametro: "10000",
          nombre: "Planeta prueba2",
          superficieDelAgua: "15",
          periodoDeRotacion: "24",
          periodoOrbital: "4800",
          clima: "humedo",
          gravedad: "1 standard",
          creado: "2023-07-09T00:26:08.445Z",
          poblacion: "13650",
          id: "df47bd25-911c-4c91-adb9-08958ea75a00",
          terreno: "selva",
        },
        {
          year: 4,
          director: 3,
          id: "1",
          createAt: 5,
          title: 2,
        },
        {
          diametro: "10000",
          nombre: "Planeta prueba2",
          superficieDelAgua: "15",
          periodoDeRotacion: "24",
          periodoOrbital: "4800",
          clima: "humedo",
          gravedad: "1 standard",
          creado: "2023-07-09T05:55:11.626Z",
          poblacion: "13650",
          id: "161d644a-c8dd-4a83-9a28-fe429bbdb8ad",
          terreno: "selva",
        },
        {
          diametro: "Planeta prueba",
          nombre: "Planeta prueba",
          superficieDelAgua: "Planeta prueba",
          periodoDeRotacion: "Planeta prueba",
          periodoOrbital: "Planeta prueba",
          clima: "Planeta prueba",
          gravedad: "Planeta prueba",
          creado: "2023-07-08T22:01:03.184Z",
          poblacion: "Planeta prueba",
          id: "392429b2-463a-4ac8-b7a7-7066709f0438",
          terreno: "Planeta prueba",
        },
      ],
      Count: 5,
      ScannedCount: 5,
    };
    mockScan.mockReturnValue({
      promise: jest.fn().mockResolvedValue({ Items: mockPlanets }),
    });

    const result = await PlanetService.getPlanetsDb();

    expect(result.statusCode).toBe(200);
    expect(result.body.Items).toEqual(mockPlanets);
    expect(DynamoDBConnection.getInstance).toHaveBeenCalled();
    expect(mockScan).toHaveBeenCalledWith({ TableName: "planets" });
  });

  it("should throw an error if an error occurs", async () => {
    mockScan.mockReturnValue({
      promise: jest.fn().mockRejectedValue("Error: Some error"),
    });

    await expect(PlanetService.getPlanetsDb()).rejects.toThrowError(
      "Error: Some error"
    );
    expect(DynamoDBConnection.getInstance).toHaveBeenCalled();
    expect(mockScan).toHaveBeenCalledWith({ TableName: "planets" });
  });
});

describe("createPlanet", () => {
  it("should create a planet and return the created planet", async () => {
    const mockPlanet = {
      nombre: "Planeta prueba2",
      periodoDeRotacion: "24",
      periodoOrbital: "4800",
      diametro: "10000",
      clima: "humedo",
      gravedad: "1 standard",
      terreno: "selva",
      superficieAgua: "15",
      poblacion: "13650",
    };

    const result = await PlanetService.createPlanet(mockPlanet);

    expect(result.statusCode).toBe(201);
    expect(result.body).toEqual(mockPlanet);
    expect(DynamoDBConnection.getInstance).toHaveBeenCalled();
    expect(mockPut).toHaveBeenCalledWith({
      TableName: "planets",
      Item: expect.objectContaining({
        id: expect.any(String),
        creado: expect.any(String),
        ...mockPlanet,
      }),
    });
  });

  it("should throw an error if an error occurs during planet creation", async () => {
    mockPut.mockReturnValue({
      promise: jest.fn().mockRejectedValue("Error: Some error"),
    });

    // Set up mock data
    const mockPlanet = {
      nombre: "Planeta prueba2",
      periodoDeRotacion: "24",
      periodoOrbital: "4800",
      diametro: "10000",
      clima: "humedo",
      gravedad: "1 standard",
      terreno: "selva",
      superficieAgua: "15",
      poblacion: "13650",
    };

    await expect(PlanetService.createPlanet(mockPlanet)).rejects.toThrowError(
      "Error: Some error"
    );
    expect(DynamoDBConnection.getInstance).toHaveBeenCalled();
    expect(mockPut).toHaveBeenCalledWith({
      TableName: "planets",
      Item: expect.objectContaining({
        id: expect.any(String),
        creado: expect.any(String),
        ...mockPlanet,
      }),
    });
  });
});

describe("getPlanetsSwapi", () => {
  it("should get and translate the planet data", async () => {
    const mockPlanetId = "3";
    const resultMock = {
      nombre: "Yavin IV",
      periodoDeRotacion: "24",
      periodoOrbital: "4818",
      diametro: "10200",
      clima: "temperate, tropical",
      gravedad: "1 standard",
      terreno: "jungle, rainforests",
      superficieAgua: "8",
      poblacion: "1000",
      residentes: [],
      peliculas: ["https://swapi.dev/api/films/1/"],
      creado: "2014-12-10T11:37:19.144000Z",
      editado: "2014-12-20T20:58:18.421000Z",
      url: "https://swapi.dev/api/planets/3/",
    };

    const result = await PlanetService.getPlanets(mockPlanetId);

    expect(result.statusCode).toBe(200);
    expect(result.body).toEqual(resultMock);
  });
});
