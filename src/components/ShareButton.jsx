import {IosShare} from '@mui/icons-material';
import {IconButton} from '@mui/material';

const ShareButton = ({ title, text, url }) => {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: title,
        text: text ? text : '',
        url: url
      }).then(() => {
        console.log('Thanks for sharing!');
      })
        .catch(console.error);
    } else {
      console.log('sharing not working');
    }
  }
  return (
    <IconButton onClick={handleShare}>
      <IosShare color="primary" />
    </IconButton>
  )
}

export default ShareButton;