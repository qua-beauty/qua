import React from 'react';
import logoDarkSvg from '../assets/logo-dark.svg';
import logoLightSvg from '../assets/logo-light.svg';
import {Text, Flex, HStack, useTheme} from '@chakra-ui/react';
import {useTranslation} from 'react-i18next';
import {borderRadius} from '../globalSx.js';
import {rgba} from '../utils';

const Footer = () => {
  const {t, i18n: {language: lng}} = useTranslation();
  const theme = useTheme();

  console.log(theme);

  return (
    <Flex justifyContent={'center'} pt={'24px'} pb={'56px'}>
      <Flex maxW={'360px'} pb={'32px'} backdropFilter={'blur(8px)'} background={rgba(theme.colors.background.default, 0.72)} sx={borderRadius('24px')} direction={'column'} alignItems={'center'}>
        <HStack mb={'32px'} fontSize={'36px'} maxW={'100%'} overflow={'auto'}>
          <Text>🥯</Text>
          <Text>🍕</Text>
          <Text>🥐</Text>
          <Text>🥗</Text>
          <Text>🌯</Text>
          <Text>🥑</Text>
          <Text>🍌</Text>
          <Text>🥤</Text>
          <Text>🍅</Text>
          <Text>🍣</Text>
          <Text>🍔</Text>
        </HStack>
        {theme.config.initialColorMode === 'dark' && <img src={logoDarkSvg} alt="Swami Market"/>}
        {theme.config.initialColorMode !== 'dark' && <img src={logoLightSvg} alt="Swami Market"/>}
        <Text maxW={'260px'} mt={'16px'} p={'0 20px;'} textAlign={'center'} fontSize={'sm'}>Доставка из ресторанов на юге Шри-Ланки с <strong>10:00 - 20:00</strong></Text>
      </Flex>
    </Flex>
  );
};

export default Footer;