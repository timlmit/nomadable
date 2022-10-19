/**
 * Type
 */

export interface City {
  slug: string;
  country: string;
  city: string;
  boundary: string;
  thumbnail: string;
}

/**
 * Cities
 */

const IMAGE_PATH = "/img/cities";

export const THAILAND_BANGKOK: City = {
  slug: "thailand-bangkok",
  country: "Thailand",
  city: "Bangkok",
  boundary:
    "latStart=13.672981477425537&lngStart=100.46799149310829&latEnd=13.79455979333963&lngEnd=100.62824274505061",
  thumbnail: `${IMAGE_PATH}/thailand-bangkok.jpg`,
};

export const THAILAND_CHIANGMAI: City = {
  slug: "thailand-chiangmai",
  country: "Thailand",
  city: "Chiang Mai",
  boundary:
    "latStart=18.758529348325865&lngStart=98.94571798180516&latEnd=18.817653026659116&lngEnd=99.02568099469926",
  thumbnail: `${IMAGE_PATH}/thailand-chiangmai.jpg`,
};

export const CITIES: City[] = [
  /**
   * South East Asia
   */
  THAILAND_BANGKOK,
  // THAILAND_CHIANGMAI,
  /**
   * East Europe
   */
];
