import React from 'react';
import { Box } from '@chakra-ui/react';
import Map from '../components/Map/Map';
import SliderControl from '../components/SliderControl';
import { BackButton } from '../components/BackButton';
import { useNavigate } from 'react-router-dom';

const Maps = () => {
  const navigate = useNavigate();
  // Sample catalog data with geo locations, names, URLs, and IDs
  const catalog = [
    { id: 1, name: 'Me', lat: 37.7749, lng: -122.4194, imageURL: 'url_to_my_image' },
    { id: 2, name: 'Shop A', lat: 37.773972, lng: -122.431297, imageURL: 'url_to_shopA_image' },
    { id: 3, name: 'Shop B', lat: 37.772792, lng: -122.437946, imageURL: 'url_to_shopB_image' },
    // Add more shops as needed
  ];

  const me = catalog.find((item) => item.id === 1); // Get "me" data from the catalog

  const others = catalog.filter((item) => item.id !== 1); // Filter out "me" from the catalog

  console.log(others);

  return (
    <Box>
      <BackButton onClick={() => navigate(-1)} />
      <SliderControl />
      <Map shops={others} me={me} />
    </Box>
  );
};

export default Maps;
