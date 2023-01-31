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
  overflow: hidden;
  border-radius: 50%;
`;
const Image = styled('img')`
  max-width: 100%;
  
`;
const Info = styled('div')`
  margin-left: 16px;
`;
const Title = styled(Typography)``;
const Address = styled(Typography)``;
const WorkTime = styled(Typography)``;
const Instagram = styled('a')``;

const Shop = ({id, image, title, address, workTime, instagram}) => {
  return (
    <Base component={Link} to={`shop/${id}`}>
      <Thumbnail>
        <Image src={image}></Image>
      </Thumbnail>
      <Info>
        <Title variant="subtitle1">{title}</Title>
        <Address  variant="subtitle2">{address}, {workTime}</Address>
        <Instagram href={instagram}></Instagram>
      </Info>
    </Base>
  );
};

export default Shop;
