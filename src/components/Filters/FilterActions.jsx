import { useSelector } from "react-redux";
import { Button, Flex, Text } from "@chakra-ui/react";

export const FilterActions = ({ onSave, onClear }) => {
  return (
    <Flex position='fixed' bottom='32px' left='0' right='0' justifyContent={'center'} alignItems='center' h='64px' p='0 1rem'>
      <Button onClick={onSave} variant='solid' colorScheme='brand' boxShadow='0px 4px 12px 0px rgba(137, 81, 255, 0.50)'>Show Masters</Button>
    </Flex>
  )
}