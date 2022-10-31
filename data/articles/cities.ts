/**
 * Type
 */

export interface Boundary {
  latStart: number;
  lngStart: number;
  latEnd: number;
  lngEnd: number;
}

export interface City {
  slug: string;
  country: string;
  city: string;
  boundary: Boundary;
  // center: { lat: number; lng: number };
  thumbnail?: string;
}

export interface CityMetaData {
  slug: string;
  spotCnt: number;
  avgSpeed: number;
}

export interface CityWithData extends City {
  spotCnt: number;
  avgSpeed: number;
}

/**
 * Cities
 */

const IMAGE_PATH = "/img/cities";

export const THAILAND_BANGKOK: City = {
  slug: "thailand-bangkok",
  country: "Thailand",
  city: "Bangkok",
  boundary: {
    latStart: 13.672981477425537,
    lngStart: 100.46799149310829,
    latEnd: 13.79455979333963,
    lngEnd: 100.62824274505061,
  },
  // center: { lat: 13.732659608344978, lng: 100.54471042062359 },
  thumbnail: `${IMAGE_PATH}/thailand-bangkok.jpg`,
};

export const THAILAND_CHIANGMAI: City = {
  slug: "thailand-chiangmai",
  country: "Thailand",
  city: "Chiang Mai",
  boundary: {
    latStart: 18.758529348325865,
    lngStart: 98.94571798180516,
    latEnd: 18.817653026659116,
    lngEnd: 99.02568099469926,
  },
  // center: { lat: 18.76022003414657, lng: 98.98601517771374 },
  thumbnail: `${IMAGE_PATH}/thailand-chiangmai.jpg`,
};

export const INDONESIA_CANGGU: City = {
  slug: "indonesia-canggu",
  country: "Indonesia",
  city: "Canggu",
  boundary: {
    latStart: -8.707071696141014,
    lngStart: 115.07572211994403,
    latEnd: -8.60429808302807,
    lngEnd: 115.2004462734472,
  },
  // center: { lat: -8.653273825526307, lng: 115.13478074413004 },
  thumbnail: `${IMAGE_PATH}/indonesia-canggu.jpg`,
};

export const PERU_LIMA: City = {
  slug: "peru-lima",
  country: "Peru",
  city: "Lima",
  boundary: {
    latStart: -12.309968109283844,
    lngStart: -77.34866767524159,
    latEnd: -11.848931715227906,
    lngEnd: -76.7449859403346,
  },
  // center: { lat: -12.046067197261035, lng: -77.04477146758003 },
  thumbnail: `${IMAGE_PATH}/peru-lima.jpg`,
};

export const CANADA_VANCUBER: City = {
  slug: "canada-vancuber",
  country: "Canada",
  city: "Vancuber",
  boundary: {
    latStart: 49.06904929903996,
    lngStart: -123.35248601373657,
    latEnd: 49.39535206379091,
    lngEnd: -122.75296120963932,
  },
};

export const USA_NEW_YORK: City = {
  slug: "usa-new_york",
  country: "USA",
  city: "New York",
  boundary: {
    latStart: 40.54667681393454,
    lngStart: -74.24563592537136,
    latEnd: 40.8745391712454,
    lngEnd: -73.72670426372198,
  },
};

export const SOUTH_KOREA_SEOUL: City = {
  slug: "south_korea-seoul",
  country: "South Korea",
  city: "Seoul",
  boundary: {
    latStart: 37.411461495836576,
    lngStart: 126.78164407951601,
    latEnd: 37.6876155700223,
    lngEnd: 127.17061851195638,
  },
};

export const JAPAN_TOKYO: City = {
  slug: "japan-tokyo",
  country: "Japan",
  city: "Tokyo",
  boundary: {
    latStart: 35.601898825977486,
    lngStart: 139.64312141126504,
    latEnd: 35.756014725290996,
    lngEnd: 139.8549962528498,
  },
};

export const CITIES: City[] = [
  /**
   * Eeast Asia
   */
  SOUTH_KOREA_SEOUL,
  JAPAN_TOKYO,
  /**
   * South East Asia
   */
  THAILAND_BANGKOK,
  THAILAND_CHIANGMAI,
  INDONESIA_CANGGU,
  /**
   * North America
   */
  CANADA_VANCUBER,
  USA_NEW_YORK,
  /**
   * South America
   */
  PERU_LIMA,
  /**
   * East Europe
   */
];
