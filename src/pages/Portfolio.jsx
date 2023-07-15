import { useDispatch, useSelector } from "react-redux";
import { Box, Flex, Image, Text, Avatar } from "@chakra-ui/react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { BackButton } from "../components/BackButton";
import { useEffect, useState } from "react";

const Portfolio = () => {
  const [swiper, setSwiper] = useState(null);
  const [currentPortfolio, setCurrentPortfolio] = useState(null);
  const navigate = useNavigate();
  const currentShop = useSelector(state => state.shops.current);
  const portfolio = currentShop.portfolio;
  let { portfolioId } = useParams();

  const handlePhotoChange = (currentIndex) => {
    setCurrentPortfolio(currentIndex);
    window.history.replaceState(null, '', `/shop/${currentShop.id}/portfolio/${portfolio[currentIndex].id}`);
    swiper.slideTo(currentIndex);
  }

  useEffect(() => {
    if (portfolioId) {
      const index = portfolio.findIndex(portfolioItem => portfolioItem.id === portfolioId);
      setCurrentPortfolio(index || 0);
    }
  }, [portfolioId]);

  return (currentPortfolio !== null && portfolio) && (
    <>
      <BackButton onClick={() => navigate(-1)} />
      <Box p='12px'>
        <Flex p='8px 0 10px' gap='8px'>
          {portfolio.map((portfolioItem, index) => (
            <Box onClick={() => handlePhotoChange(index)} flex={1} key={portfolioItem.id} background={currentPortfolio === index ? 'brand.200' : 'blackAlpha.400'} height='4px' borderRadius={'2px'} overflow={'hidden'} />
          ))}
        </Flex>
        <Swiper initialSlide={currentPortfolio}
          onSwiper={setSwiper}
          onSlideChange={(swiper) => handlePhotoChange(swiper.activeIndex)}
          style={{
            borderRadius: '8px',
            overflow: 'hidden'
          }}>
          {portfolio.map(portfolioItem => (
            <SwiperSlide key={portfolioItem.url}>
              <Box position={'relative'}>
                <Image
                  alt=""
                  src={portfolioItem.image}
                />
                <Flex as={Link} to={`/shop/${currentShop.id}`} gap='12px' position='absolute' bottom='8px' left='8px' bg='blackAlpha.500' p='0.25rem 0.75rem' borderRadius='8px'>
                  <Avatar src={currentShop.avatar} width='40px' height='40px'></Avatar>
                  <Box flex='1'>
                    <Text fontSize='md' fontWeight='500' color='whiteAlpha.700'>{currentShop.category.name}</Text>
                    <Text fontSize='2xl' color='white'>{currentShop.name}</Text>
                  </Box>
                </Flex>
              </Box>
              <Text mt='12px' fontSize='md'>{portfolioItem.description}</Text>

            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </>
  )
}

export default Portfolio;