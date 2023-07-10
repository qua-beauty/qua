import { useSelector } from "react-redux";
import { Button, Flex, Text } from "@chakra-ui/react";

export const FilterActions = ({ onSave, onClear }) => {
  return (
    <Flex bg='background.default' position='fixed' bottom='0' left='0' right='0' justifyContent={'space-between'} alignItems='center' h='64px' p='0 1rem'>
      <Button onClick={onClear} bg='background.paper' variant='outline'>Clear Filters</Button>
      <Button onClick={onSave} colorScheme='brand'>Show Masters</Button>
    </Flex>
  )
}