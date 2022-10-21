import { FilterObj, PlaceWithData } from "../../redux/slices/placeSlice";
import * as cons from "./../../constants";
import * as ct from "./cities";
/**
 * Type
 */

export interface Article {
  slug: string;
  city: ct.City;
  title: string;
  filterObj: FilterObj;
  placeCnt: number;
  omitPlaceIds: string[];
  omitReviewIds: string[];
}

export interface ArticleWithData extends Article {
  placesWithData: PlaceWithData[];
}

/**
 * Articles
 */

const BANGKOK_CORWORKING: Article = {
  slug: `top-5-coworking-spaces-${ct.THAILAND_BANGKOK.slug}`,
  city: ct.THAILAND_BANGKOK,
  title: "Top 5 Coworking Spaces in Bangkok, Thailand",
  filterObj: {
    placeTypes: [cons.PLACE_TYPE_WORKSPACE],
    availability: [cons.AVL_DROP_IN],
  },
  placeCnt: 5,
  omitPlaceIds: [],
  omitReviewIds: [],
};

const BANGKOK_CAFE: Article = {
  slug: `top-5-wifi-cafes-${ct.THAILAND_BANGKOK.slug}`,
  city: ct.THAILAND_BANGKOK,
  title: "Top 5 WiFi Cafes in Bangkok, Thailand to Work & Study From",
  filterObj: {
    placeTypes: [cons.PLACE_TYPE_CAFE],
    availability: [],
  },
  placeCnt: 5,
  omitPlaceIds: [],
  omitReviewIds: [],
};

/**
 * Export
 */

export const ARTICLES: Article[] = [
  // South East Asia
  BANGKOK_CORWORKING,
  BANGKOK_CAFE,
  // East Europe
];
