export const getDistance = async (shopCoords, placeCoords) => {
  const url = `https://api.mapbox.com/directions-matrix/v1/mapbox/driving/${shopCoords.longitude},${shopCoords.latitude};${placeCoords.longitude},${placeCoords.latitude}?access_token=${Deno.env.get('MAPBOX_TOKEN')}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.code !== "Ok") {
      console.log(`Failed to retrieve distance: ${data.status}`);
      return false;
    }

    data.destinations.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
    return data.destinations[0].distance;
  } catch (e) {
    console.log(e);
    return false;
  }
};