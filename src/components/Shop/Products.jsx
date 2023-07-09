import React, { useState } from "react";
import Product from "./Product.jsx";
import { Flex, Image, Heading, Drawer, DrawerOverlay, DrawerContent } from '@chakra-ui/react';
import { ProductPopup } from "./ProductPopup.jsx";
import { SortControl } from '../SortControl.jsx';

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
        <SortControl />
      </Flex>
      <Flex direction={'column'} gap='20px'>
        {products.map(product => (
          <Product key={product.id} onSelect={() => setActiveProduct(product)} name={product.name} time={product.time} price={product.price} about={product.about} />
        ))}

        <Drawer placement={'bottom'} onClose={() => setActiveProduct(null)} isOpen={activeProduct}>
          <DrawerOverlay />
          <DrawerContent background='background.paper'>
            <ProductPopup product={activeProduct} />
          </DrawerContent>
        </Drawer>
      </Flex>
    </Flex>
  );
};

export default Products;
