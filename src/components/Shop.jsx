import {Box, ButtonBase, Paper, styled, Typography} from '@mui/material';
import ShareButton from './ShareButton.jsx';
import {getShopUrl} from '../utils.js';


const Header = styled('header')`
  background: ${({ theme }) => theme.palette.background.default};
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  border-radius: 56px 20px 20px 56px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 8px;
  text-align: left;
  width: 100%;

  position: relative;
`;

const Thumbnail = styled('div')`
  width: 108px;
  height: 108px;
  overflow: hidden;
  border-radius: 50%;
`;

const Image = styled('img')`
  max-width: 100%;
`;

const Info = styled('div')`
  margin-left: 16px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 100%;
  gap: 2px;
`;

const Share = styled('div')`
  position: absolute;
  top: 16px;
  right: 2px;
`;

const About = styled(Typography)`
  margin-top: 8px;
  text-align: center;
`;

const Title = styled(Typography)`
  font-weight: 700;
`;
const Address = styled(Typography)`
  text-align: center;
`;
const WorkTime = styled(Typography)`
  text-align: center;
`;


const Instagram = styled('a')``;

const Wrap = styled(Box)`
  display: flex;
  align-self: flex-start;
  align-items: center;
`;

const Shop = ({onSelect, ...shop}) => {
  return (
    <Header onClick={() => onSelect(shop)}>
      <Wrap>
        <Thumbnail>
          <Image src={shop.image}></Image>
        </Thumbnail>
        <Info>
          <Title variant="h6">{shop.name}</Title>
          <WorkTime variant="subtitle2"> 🕔 {shop.workTime}</WorkTime>
          <Address variant="subtitle2">📍 {shop.address}</Address>
          <Instagram href={shop.instagram}></Instagram>
        </Info>
      </Wrap>

    </Header>
  );
};

export default Shop;
