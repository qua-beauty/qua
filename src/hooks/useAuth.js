import {webApp} from '../telegram.js';
import {useGetUserMutation, useSaveUserMutation} from '../api/api.js';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setUser} from '../api/slices/userSlice.js';

const checkReferral = () => {
  const url = window.location.href;
  const pattern = /\bref=([\d]+)\b/;
  const match = url.match(pattern);

  if (match) {
    return match[1];
  }

  return false;
}

const useAuth = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.data);
  const [saveUser] = useSaveUserMutation();
  const [getUser] = useGetUserMutation();

  useEffect(() => {
    let userData = {
      id: '5476797712',
      first_name: 'Dev',
      last_name: 'Env',
      username: 'rashdeva',
      language_code: 'en'
    };

    if (webApp) {
      userData = webApp.initDataUnsafe.user;
    }

    getUser(userData).unwrap().then(async (data) => {
      if (!data && !user) {
        try {
          const referrer = checkReferral();

          if(referrer) {
            const referrerUser = await getUser({
              id: referrer
            }).unwrap();

            userData = {
              ...userData,
              referrer: referrerUser.id
            }
          }
        } catch(e) {
          console.log(e);
        }

        saveUser([userData]).then((data) => {
          dispatch(setUser(data));
        });
      } else {
        dispatch(setUser(data));
      }
    });
  }, []);
};

export default useAuth;