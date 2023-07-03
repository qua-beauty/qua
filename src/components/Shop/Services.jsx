import React from "react";
import Service from "./Service";
import { Box, Flex, Image, Heading, Text } from '@chakra-ui/react';

const Services = () => {
  return (
    <Flex direction='column' position={'relative'}>
      <img
        className="absolute my-0 mx-[!important] top-[-2.69rem] left-[0rem] w-[6.25rem] h-[8.25rem] z-[0]"
        alt=""
        src="/vector.svg"
      />
      <Flex justifyContent={'space-between'}>
      <Heading fontSize='20px' letterSpacing={'-1px'} fontWeight={'500'}>Services</Heading>
      <div className="relative tracking-[-0.02em] font-medium">
            <span>{`Sort by `}</span>
            <span className="text-telegram">Price</span>
          </div>
      </Flex>
      <div className="w-[24.38rem] flex flex-col py-[0rem] px-[1rem] box-border items-center justify-start gap-[1rem] z-[2] text-[1.13rem]">
        <Service simpleDesign="Simple design" m="90m" prop="$100" />
        <Service
          frame44Height="unset"
          frame44Cursor="pointer"
          frame65JustifyContent="center"
          simpleDesign="Nail design – 1 difficulty"
          m="60m"
          prop="$120"
        />
        <Service
          frame44Height="3.38rem"
          frame44Cursor="unset"
          frame65JustifyContent="flex-start"
          simpleDesign="Pedicure - 1 difficulty"
          m="60m"
          prop="$90"
        />
      </div>
    </Flex>
  );
};

export default Services;
