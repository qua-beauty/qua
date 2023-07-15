import { useDispatch, useSelector } from "react-redux";
import { Box, Flex, Image, Text, Avatar } from "@chakra-ui/react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { BackButton } from "../components/BackButton";
import { useEffect, useState } from "react";

const Portfolio = () => {
  const [currentPortfolio, setCurrentPortfolio] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentShop = useSelector(state => state.shops.current);
  const portfolio = currentShop.portfolio;
  let { portfolioId } = useParams();

  useEffect(() => {
    if (portfolioId) {
      const index = portfolio.findIndex(portfolioItem => portfolioItem.id === portfolioId);
      setCurrentPortfolio(index || 0);
    }
  }, [portfolioId]);

  return currentPortfolio !== null && (
    <>
      <BackButton onClick={() => navigate(-1)} />
      <Box p='1.5rem 1rem 10rem' minH='100vh'>
        <Swiper initialSlide={currentPortfolio}>
          {portfolio.map(portfolioItem => (
            <SwiperSlide key={portfolioItem.url} borderRadius={'8px'}>
              <Box overflow={'hidden'} position={'relative'}>
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