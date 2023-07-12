import { Avatar } from "@chakra-ui/react";

const Shop = ({ shop }) => {
    console.log(shop)
  return (
    <Avatar
      name={shop.name}
      src={shop.avatar}
      size="md"
    />
  );
};

export default Shop;
