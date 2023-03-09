export const isGoogleMapsLink = (text) => {
  return text ? text.includes('goo.gl/maps') : null;
}
export const getGoogleCoords = async (googleLink) => {
  const latLngRegex = /(?:@)(-?\d{1,3}(?:\.\d+)?),(-?\d{1,3}(?:\.\d+)?)/;
  // Check if the input URL is a short URL or already a long URL
  const isShortUrl = isGoogleMapsLink(googleLink);
  let url = googleLink;

  if(isShortUrl) {
    url = await fetch(googleLink).then(r => r.url);
  }

  const match = url.match(latLngRegex);

  if (match) {
    // Return an object with the latitude and longitude values
    return {
      latitude: parseFloat(match[1]),
      longitude: parseFloat(match[2])
    };
  }

  return null;
}

const getTelegramCoords = (address) => {
  return `${ctx.message.location.latitude}:${ctx.message.location.longitude}`;
}