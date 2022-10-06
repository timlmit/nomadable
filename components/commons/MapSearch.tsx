import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import mapboxgl from "mapbox-gl";

import * as cons from "../../constants";
import { Place } from "../../redux/slices/placeSlice";
import { features } from "process";

interface Props {
  mapId: string;
  lat?: number;
  lng?: number;
  zoom?: number;
  places: Place[];
  onChange: (
    latStart: number,
    lngStart: number,
    latEnd: number,
    lngEnd: number
  ) => void;
}

export const MapSearch: React.FC<Props> = (props) => {
  const mapId = `mapbox-${props.mapId}`;
  const mapRef = useRef<mapboxgl.Map>();
  const markersRef = useRef<any[]>([]);

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
  const loadMapBox = (
    lat: number | undefined,
    lng: number | undefined,
    zoom: number | undefined
  ) => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoieXMwNTIwIiwiYSI6ImNsOHIzZTdhNDB5MGczcXJ1cW41bzJ4YmsifQ.mLHbDsXmbrmjxIIbkY4j1A";

    mapRef.current = new mapboxgl.Map({
      container: mapId,
      // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
      style: "mapbox://styles/mapbox/light-v10",
      center: [lng || 0, lat || 0],
      zoom: zoom || 0.1,
      interactive: true,
    });

    // on change map
    mapRef.current.on("dragend", () => {
      onViewportUpdate();
    });

    mapRef.current.on("zoomend", () => {
      onViewportUpdate();
    });
  };

  /**
   * Update Pins
   */

  const makePins = (places: Place[]) => {
    return places.map((p) => ({ lat: p.spotLat, lng: p.spotLng }));
  };

  const updatePins = (pins: { lat: number; lng: number }[]) => {
    // Create a default Marker and add it to the mapbox.
    markersRef.current.map((m) => {
      m.remove();
    });

    pins.forEach((pin) => {
      if (!mapRef.current) return;
      const marker = new mapboxgl.Marker({ color: "black" })
        .setLngLat([pin.lng, pin.lat])
        .addTo(mapRef.current);
      markersRef.current.push(marker);
    });
  };

  /**
   * Effect
   */

  useEffect(() => {
    const { lat, lng, zoom } = props;
    loadMapBox(lat, lng, zoom);
  }, [props.lat, props.lng, props.zoom]);

  useEffect(() => {
    const pins = makePins(props.places);
    updatePins(pins);
  }, [props.places]);

  return <Map id={mapId}></Map>;
};

const Map = styled.div`
  width: 100%;
  height: 100%;
`;
