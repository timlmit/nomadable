/**
 * getCurrentLocation
 */

import { rejects } from "assert";
import error from "next/error";

const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

export const getCurrentLocation = async (): Promise<
  { lat: number; lng: number } | false
> => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const crd = pos.coords;
        resolve({ lat: crd.latitude, lng: crd.longitude });
      },
      (error) => {
        reject(error);
      },
      options
    );
  });
};

/**
 * getDistanceFromLatLngInKm
 */

function deg2rad(deg: number) {
  return deg * (Math.PI / 180);
}

export const getDistanceFromLatLngInKm = (
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
) => {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1); // deg2rad below
  var dLon = deg2rad(lng2 - lng1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return d;
};
