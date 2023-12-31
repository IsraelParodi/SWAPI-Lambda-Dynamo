export default {
  type: "object",
  properties: {
    id: { type: "string" },
    nombre: { type: "string" },
    periodoDeRotacion: { type: "string" },
    periodoOrbital: { type: "string" },
    diametro: { type: "string" },
    clima: { type: "string" },
    gravedad: { type: "string" },
    terreno: { type: "string" },
    superficieAgua: { type: "string" },
    poblacion: { type: "string" },
    residentes: { type: "array", items: { type: "string" } },
    peliculas: { type: "array", items: { type: "string" } },
    creado: { type: "string" },
    editado: { type: "string" },
    url: { type: "string" },
  },
  required: [
    "nombre",
    "periodoDeRotacion",
    "periodoOrbital",
    "diametro",
    "clima",
    "gravedad",
    "terreno",
    "superficieAgua",
    "poblacion",
  ],
} as const;
