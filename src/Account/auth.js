import {webApp} from '../telegramUtils.js';
import {signInWithCustomToken} from 'firebase/auth';
import {auth} from '../firebase.js';

const useAuth = () => {
  if (!webApp || !webApp.initDataUnsafe.user) return null;
  const user = webApp.initDataUnsafe.user;

  fetch('https://lanka.cafe/api/createCustomToken', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: user.id
    })
  }).then(res => res.json())
    .then(({token}) => {
      signInWithCustomToken(auth, token)
        .catch(err => console.log(err));
    }).catch(err => console.log(err));
};

export default useAuth;