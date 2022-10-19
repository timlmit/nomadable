import * as cons from "./../../constants";
import * as ct from "./cities";
/**
 * Type
 */

export interface Article {
  slug: string;
  city: ct.City;
  title: string;
  rules: {
    placeType: string[];
    availability: string[];
    placeCnt: number;
  };
  omitPlaceIds: string[];
  omitReviewIds: string[];
}

/**
 * Articles
 */

const BANGKOK_CORWORKING: Article = {
  slug: "top-5-coworking-spaces",
  city: ct.THAILAND_BANGKOK,
  title: "Top 5 Coworking Spaces in Bangkok, Thailand",
  rules: {
    placeType: [cons.PLACE_TYPE_WORKSPACE],
    availability: [cons.AVL_DROP_IN],
    placeCnt: 5,
  },
  omitPlaceIds: [],
  omitReviewIds: [],
};

const BANGKOK_CAFE: Article = {
  slug: "top-5-wifi-cafes",
  city: ct.THAILAND_BANGKOK,
  title: "Top 5 WiFi Cafes in Bangkok, Thailand to Work & Study From",
  rules: {
    placeType: [cons.PLACE_TYPE_CAFE],
    availability: [],
    placeCnt: 5,
  },
  omitPlaceIds: [],
  omitReviewIds: [],
};

/**
 * Export
 */

const articles: Article[] = [
  // South East Asia
  BANGKOK_CORWORKING,
  BANGKOK_CAFE,
  // East Europe
];

export default articles;
