import {signInAnonymously} from 'firebase/auth';
import {auth} from '../../firebase.js';
import {useAuthState} from 'react-firebase-hooks/auth';
import {useEffect} from 'react';

const useAuth = () => {
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (!user) {
      signInAnonymously(auth)
        .catch(error => console.log(error));
    }
  }, []);

  return [user];
};

export default useAuth;