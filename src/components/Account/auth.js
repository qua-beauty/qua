import {webApp} from '../../telegram.js';
import {signInWithCustomToken, signInAnonymously} from 'firebase/auth';
import {auth, siteUrl} from '../../firebase.js';
import {useAuthState} from 'react-firebase-hooks/auth';
import {useEffect, useState} from 'react';

const useWebAppAuth = () => {
  const [loading, setLoading] = useState(true);
  const user = webApp.initDataUnsafe.user;

  useEffect(() => {
    fetch(`${siteUrl}/api/createCustomToken`, {
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

        setLoading(false);
      }).catch(err => console.log(err));
  }, []);

  return [user, loading];
};

const useAuth = () => {
  if (webApp && webApp.initDataUnsafe.user) {
    return useWebAppAuth();
  }

  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (!user) {
      signInAnonymously(auth)
        .catch(error => console.log(error));
    }
  }, []);

  return [user, loading];
};

export default useAuth;