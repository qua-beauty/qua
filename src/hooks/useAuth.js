import {webApp} from '../telegram.js';

const useAuth = () => {
  if (webApp) {
    console.log(webApp.initDataUnsafe);
  }
};

export default useAuth;