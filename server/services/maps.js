function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

export const getDistance = (shopCoords, placeCoords) => {
    const R = 6371; // radius of the earth in kilometers
    const dLat = deg2rad(placeCoords.latitude - shopCoords.latitude);
    const dLon = deg2rad(placeCoords.longitude - shopCoords.longitude);
    const lat1Rad = deg2rad(shopCoords.latitude);
    const lat2Rad = deg2rad(placeCoords.latitude);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return parseFloat(distance.toFixed(2));
};