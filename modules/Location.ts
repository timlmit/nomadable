/**
 * getCurrentLocation
 */

const accurateOption = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

const fastOption = {
  enableHighAccuracy: false,
  timeout: 1000,
  maximumAge: 1000 * 60 * 3,
};

export const getCurrentLocation = async ({
  accurate,
}: {
  accurate: boolean;
}): Promise<{ lat: number; lng: number } | false> => {
  const options = accurate ? accurateOption : fastOption;

  return new Promise((resolve, reject) => {
    const tryGetCurrentLocation = () => {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const crd = pos.coords;
          resolve({ lat: crd.latitude, lng: crd.longitude });
        },
        (error) => {
          if (error.code === 3) {
            tryGetCurrentLocation();
          } else {
            reject(error);
          }
        },
        options
      );
    };

    tryGetCurrentLocation();
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
