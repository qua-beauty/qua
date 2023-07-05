import React, { useState } from "react";
import Product from "./Product.jsx";
import { Box, Flex, Image, Heading, Text, Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody, Button } from '@chakra-ui/react';
import { MainButton } from "../MainButton.jsx";

const Products = ({ products, onSelect }) => {
  const [activeProduct, setActiveProduct] = useState(null);

  return products && (
    <Flex direction='column' position={'relative'} gap='24px' p='1rem'>
      <Flex justifyContent={'space-between'} position={'relative'} zIndex={1}>
        <Image
          position={'absolute'}
          top={'-72px'}
          left={'-72px'}
          zIndex={-1}
          alt=""
          src="/vector.svg"
        />
        <Heading fontSize='20px' letterSpacing={'-1px'} fontWeight={'500'}>Services</Heading>
        <Text>
          Sort by <Text as='span' color='telegram.200'>Price</Text>
        </Text>
      </Flex>
      <Flex direction={'column'} gap='20px'>
        {products.map(product => (
          <Product key={product.id} onSelect={() => setActiveProduct(product)} name={product.name} time={product.time} price={product.price} about={product.about} />
        ))}

        <Drawer placement={'bottom'} onClose={() => setActiveProduct(null)} isOpen={activeProduct}>
          <DrawerOverlay />
          <DrawerContent background='background.paper'>
            <Flex direction={'column'} justifyContent={'center'}>
              <div className="relative p-[16px] rounded-t-3xl rounded-b-none bg-text-white w-full overflow-hidden flex flex-col box-border items-center justify-start gap-[1.63rem] max-w-full max-h-full text-left text-[1.25rem] text-text-primary font-sf-pro-display">
                <div
                  className="w-full h-[3rem] flex flex-row items-start justify-between cursor-pointer"

                >
                  <div className="flex flex-col items-start justify-start gap-[0.25rem]">
                    <div className="relative tracking-[-0.02em] font-medium">
                      {activeProduct?.name}
                    </div>
                    <div className="relative text-[1.06rem] tracking-[-0.03em] font-medium font-sf-pro-text text-text-secondary">
                      {activeProduct?.time}m
                    </div>
                  </div>
                  <div className="rounded-xl bg-telegram [backdrop-filter:blur(8px)] h-[2.25rem] overflow-hidden flex flex-row py-[0.13rem] px-[0.75rem] box-border items-center justify-center text-right text-[1.13rem] text-text-white font-sf-pro-text">
                    <div className="relative tracking-[-0.03em] font-medium">${activeProduct?.price}</div>
                  </div>
                </div>
                <div className="relative text-[0.88rem] tracking-[-0.03em] leading-[1.25rem] font-sf-pro-text text-black inline-block w-full pb-[32px]">
                  {activeProduct?.about}
                </div>
                
              </div>
              <MainButton onClick={async () => onSelect(activeProduct)}>Book</MainButton>  
            </Flex>
          </DrawerContent>
        </Drawer>
      </Flex>
    </Flex>
  );
};

export default Products;
