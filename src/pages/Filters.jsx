import {useEffect} from 'react';
import {webApp} from '../telegram.js';

const Filters = () => {
  useEffect(() => {
    webApp?.BackButton.show();
    webApp?.BackButton.onClick(() => {
      navigate(`/`);
    });
  }, [])

  return (
    <div>Filters</div>
  )
}

export default Filters;