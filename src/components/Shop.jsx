import {ButtonBase, styled, Typography} from '@mui/material';
import {Link} from 'react-router-dom';

const Base = styled(ButtonBase)`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 8px 16px;
  text-align: left;
  width: 100%;
`;

const Thumbnail = styled('div')`
  width: 56px;
  height: 56px;
  min-width: 56px;
  overflow: hidden;
  border-radius: 50%;
`;
const Image = styled('img')`
  max-width: 100%;
  
`;
const Info = styled('div')`
  margin-left: 16px;
  overflow: hidden;
`;
const Title = styled(Typography)``;
const Address = styled(Typography)`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const WorkTime = styled(Typography)``;
const Instagram = styled('a')``;

const Shop = ({onSelect, ...shop}) => {
  return (
    <Base onClick={() => onSelect(shop)}>
      <Thumbnail>
        <Image src={shop.image}></Image>
      </Thumbnail>
      <Info>
        <Title variant="subtitle1">{shop.name}</Title>
        <Address  variant="subtitle2">{shop.workTime}, {shop.address}</Address>
        <Instagram href={shop.instagram}></Instagram>
      </Info>
    </Base>
  );
};

export default Shop;
