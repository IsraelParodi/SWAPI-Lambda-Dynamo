export interface IPlanet {
  id?: string;
  nombre: string;
  periodoDeRotacion: string;
  periodoOrbital: string;
  diametro: string;
  clima: string;
  gravedad: string;
  terreno: string;
  superficieAgua: string;
  poblacion: string;
  residentes?: string[];
  peliculas?: string[];
  creado?: string;
  editado?: string;
  url?: string;
}
