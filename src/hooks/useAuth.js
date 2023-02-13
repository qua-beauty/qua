import {webApp} from '../telegram.js';
import {useGetUserMutation, useSaveUserMutation} from '../api/api.js';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setUser} from '../api/slices/userSlice.js';

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
      username: 'rashdeva'
    };

    if (webApp) {
      userData = webApp.initDataUnsafe.user;
    }

    getUser(userData).unwrap().then((data) => {
      if (!data && !user) {
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