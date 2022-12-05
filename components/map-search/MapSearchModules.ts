import { PLACE_TYPE_CAFE } from "./../../constants";
import { Place } from "../../redux/slices/placeSlice";
import { PLACE_TYPE_WORKSPACE, PLACE_TYPE_LIST } from "../../constants";
import { getColorOfSpeed } from "../commons/NetSpeedIndicator";

export interface Pin {
  id: string;
  lat: number;
  lng: number;
  color: string;
  placeType: string;
  name: string;
}

const makeIcon = (
  placeType: string,
  name: string,
  color: string,
  fontSize: number
) => {
  return `
      <div style="display:flex; flex-direction: column; align-items: center;">
        <div style="font-size: ${
          placeType === PLACE_TYPE_CAFE ? fontSize * 2.4 : fontSize * 2
        }rem; margin-bottom: ${fontSize * 0.2}rem;">${
    PLACE_TYPE_LIST[placeType].icon
  }</div>
        <div style="display:flex; align-items: center; position: absolute; left: 2rem; width: 6rem;">
          <div style="height: 0.6rem; width: 0.6rem; border-radius: 50%; background-color: ${color}; margin-right: 0.3rem;"></div>
          <div style="font-weight: bold; font-size: 0.7rem;">${name.slice(
            0,
            10
          )}</div>
        </div>
      </div>
    `;
};

const convertPlacesToPins = (places: Place[]): Pin[] => {
  return places.map((p) => ({
    id: p.id,
    lat: p.spotLat,
    lng: p.spotLng,
    color: getColorOfSpeed(p.speedDown),
    placeType: p.placeType,
    name: p.spotName,
  }));
};

export { makeIcon, convertPlacesToPins };
