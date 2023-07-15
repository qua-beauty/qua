function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

export const getDistance = (shopCoords, placeCoords) => {
  const R = 6371; // radius of the earth in kilometers
  const dLat = deg2rad(placeCoords.lat - shopCoords.lat);
  const dLon = deg2rad(placeCoords.lng - shopCoords.lng);
  const lat1Rad = deg2rad(shopCoords.lat);
  const lat2Rad = deg2rad(placeCoords.lat);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  if (distance >= 1) {
    return parseFloat(distance.toFixed(1)) + " km";
  } else {
    const meters = Math.round(distance * 1000);
    return meters + " m";
  }
};
