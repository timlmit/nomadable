import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import mapboxgl from "mapbox-gl";

import * as cons from "../../constants";
import { Place } from "../../redux/slices/placeSlice";
import { features } from "process";
import { getColorOfSpeed } from "./NetSpeedIndicator";
import { useRouter } from "next/router";

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
  onClickMarker: (placeId: string) => void;
  selectedPlace: string;
  viewHeight: number;
}

export const MapSearch: React.FC<Props> = (props) => {
  const router = useRouter();
  const mapId = `mapbox-${props.mapId}`;
  const mapRef = useRef<mapboxgl.Map>();
  const markersRef = useRef<{ id: string; marker: any }[]>([]);

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
    return places.map((p) => ({
      id: p.id,
      lat: p.spotLat,
      lng: p.spotLng,
      color: getColorOfSpeed(p.speedDown),
    }));
  };

  const updatePins = (
    pins: { id: string; lat: number; lng: number; color: string }[]
  ) => {
    // Create a default Marker and add it to the mapbox.
    markersRef.current.map((m) => {
      m.marker.remove();
    });

    pins.forEach((pin) => {
      if (!mapRef.current) return;
      const marker = new mapboxgl.Marker({ color: pin.color })
        .setLngLat([pin.lng, pin.lat])
        .addTo(mapRef.current);
      markersRef.current.push({ id: pin.id, marker });

      marker.getElement().addEventListener("click", () => {
        props.onClickMarker(pin.id);
      });

      marker.getElement().style.cursor = "pointer";
      marker.getElement().style.opacity =
        pin.id === props.selectedPlace ? "0.5" : "1";
    });
  };

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

  useEffect(() => {
    if (props.viewHeight < 1) return;
    const { lat, lng, zoom } = props;
    loadMapBox(lat, lng, zoom);
  }, [props.lat, props.lng, props.zoom, props.viewHeight]);

  useEffect(() => {
    const pins = makePins(props.places);
    updatePins(pins);
  }, [props.places]);

  useEffect(() => {
    if (router.query.latStart) {
      updateMapArea(router.query);
    } else {
      onViewportUpdate();
    }
  }, [mapRef.current]);

  useEffect(() => {
    markersRef.current.forEach((marker) => {
      marker.marker.getElement().style.opacity =
        marker.id === props.selectedPlace ? 0.5 : 1;
    });
  }, [props.selectedPlace]);

  /**
   * Render
   */

  return <Map id={mapId} viewHeight={props.viewHeight}></Map>;
};

const Map = styled.div<{ viewHeight: number }>`
  width: 100%;
  height: 100%;

  @media only screen and (max-width: ${cons.WIDTH_TABLET}px) {
    height: calc(${(props) => props.viewHeight}px - 15rem);
  }
`;
