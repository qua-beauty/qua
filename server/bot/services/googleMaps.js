export const getDistance = async (shopCoords, placeCoords) => {
  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${shopCoords.latitude},${shopCoords.longitude}&destinations=${placeCoords.latitude},${placeCoords.longitude}&key=${Deno.env.get('GOOGLE_MAPS_API_KEY')}`;

  const response = await fetch(url);
  const data = await response.json();

  if (data.status !== "OK") {
    throw new Error(`Failed to retrieve distance: ${data.status}`);
  }

  return data.rows[0].elements[0].distance.value / 1000;
};