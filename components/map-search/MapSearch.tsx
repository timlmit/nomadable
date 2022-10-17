import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import mapboxgl, { Marker } from "mapbox-gl";

import * as cons from "../../constants";
import { Place } from "../../redux/slices/placeSlice";
import { features } from "process";
import { getColorOfSpeed } from "../commons/NetSpeedIndicator";
import router, { useRouter } from "next/router";
import { convertPlacesToPins, makeIcon, Pin } from "./MapSearchModules";

interface Props {
  places: Place[];
  selectedPlace: string;
  viewHeight: number;
  onChange: (
    latStart: number,
    lngStart: number,
    latEnd: number,
    lngEnd: number
  ) => void;
  onClickMarker: (placeId: string) => void;
}

const MAP_STYLE_STREET = "mapbox://styles/mapbox/streets-v11";
const MAP_STYLE_LIGHT = "mapbox://styles/mapbox/light-v10";

export const MapSearch: React.FC<Props> = (props) => {
  const router = useRouter();
  const mapId = "mapbox-search";
  const mapRef = useRef<mapboxgl.Map>();
  const pinMarkerSetsRef = useRef<{ pin: Pin; marker: any }[]>([]);
  const [pins, setPins] = useState<Pin[]>([]);
  const [zoomLevel, setZoomLevel] = useState(0);

  /**
   * Modules
   */

  const onViewportUpdate = () => {
    if (!mapRef.current) return;
    const currentBound = mapRef.current.getBounds();
    const ne = currentBound.getNorthEast();
    const sw = currentBound.getSouthWest();
    props.onChange(sw.lat, sw.lng, ne.lat, ne.lng);
  };

  /**
   * Load Map Box
   */

  const loadMapBox = () => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoieXMwNTIwIiwiYSI6ImNsOHIzZTdhNDB5MGczcXJ1cW41bzJ4YmsifQ.mLHbDsXmbrmjxIIbkY4j1A";

    mapRef.current = new mapboxgl.Map({
      container: mapId,
      // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
      style: MAP_STYLE_LIGHT,
      center: [0, 0],
      zoom: 0.1,
      interactive: true,
    });

    // on change map
    mapRef.current.on("dragend", () => {
      onViewportUpdate();
    });

    mapRef.current.on("zoomend", () => {
      onViewportUpdate();
      if (mapRef.current) {
        const zoom = mapRef.current.getZoom();
        setZoomLevel(zoom < 8 ? 0 : zoom < 15 ? 1 : 2);
      }
    });

    mapRef.current.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        // When active the map will receive updates to the device's location as it changes.
        trackUserLocation: true,
        // Draw an arrow next to the location dot to indicate which direction the device is heading.
        showUserHeading: true,
      })
    );
  };

  /**
   * Pin Functions
   */

  const addPinToMap = (pin: Pin) => {
    if (!mapRef.current) return null;
    const marker = new mapboxgl.Marker({ color: pin.color })
      .setLngLat([pin.lng, pin.lat])
      .addTo(mapRef.current);

    marker.getElement().addEventListener("click", () => {
      props.onClickMarker(pin.id);
    });
    marker.getElement().style.fontSize = "0.8rem";
    marker.getElement().style.cursor = "pointer";
    marker.getElement().style.opacity =
      pin.id === props.selectedPlace ? "0.8" : "1";

    // change icon shape based on zoom level
    if (zoomLevel >= 1) {
      marker.getElement().innerHTML = makeIcon(
        pin.placeType,
        pin.name,
        pin.color,
        zoomLevel >= 2 ? 0.85 : 0.7
      );
    }

    const pinMarkerSet = { pin, marker };
    return pinMarkerSet;
  };

  const updatePins = (pins: Pin[]) => {
    // remove existing markers
    pinMarkerSetsRef.current.forEach(({ marker }) => {
      marker.remove();
    });

    const newPinMarkerSets: { pin: Pin; marker: any }[] = [];

    pins.forEach((pin) => {
      const pinMarkerSet = addPinToMap(pin);
      if (pinMarkerSet) {
        newPinMarkerSets.push(pinMarkerSet);
      }
    });

    pinMarkerSetsRef.current = newPinMarkerSets;
  };

  /**
   * Update Map Area
   */

  const updateMapArea = (query: any) => {
    try {
      const latStart = parseFloat(query.latStart);
      const lngStart = parseFloat(query.lngStart);
      const latEnd = parseFloat(query.latEnd);
      const lngEnd = parseFloat(query.lngEnd);

      const map = mapRef.current;
      map?.fitBounds([
        [lngEnd, latEnd],
        [lngStart, latStart],
      ]);
    } catch (err) {
      return;
    }
  };

  /**
   * Effect
   */

  // when selected place changed
  useEffect(() => {
    pinMarkerSetsRef.current.forEach(({ marker }) => {
      marker.getElement().style.opacity =
        marker.pin.id === props.selectedPlace ? 0.7 : 1;
    });
  }, [props.selectedPlace]);

  // on zoom level changed
  useEffect(() => {
    const pins = pinMarkerSetsRef.current.map((set) => set.pin);
    updatePins(pins);
  }, [zoomLevel]);

  // on fetch places complete
  useEffect(() => {
    const pins = convertPlacesToPins(props.places);
    updatePins(pins);
  }, [props.places]);

  // on load complete
  useEffect(() => {
    if (router.query.latStart) {
      updateMapArea(router.query);
    } else {
      onViewportUpdate();
    }
  }, [mapRef.current]);

  // initial load of map
  useEffect(() => {
    if (props.viewHeight < 1) return;
    loadMapBox();
  }, [props.viewHeight]);

  /**
   * Render
   */

  return (
    <MapWrapper>
      <Map id={mapId} viewHeight={props.viewHeight}></Map>
    </MapWrapper>
  );
};

const Map = styled.div<{ viewHeight: number }>`
  width: 100%;
  height: 100%;

  @media only screen and (max-width: ${cons.WIDTH_TABLET}px) {
    height: calc(${(props) => props.viewHeight}px - 15rem);
  }
`;

const MapWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const MarkerIcon = styled.div<{ color: string }>`
  background-color: ${(props) => props.color};
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
`;
