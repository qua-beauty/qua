import React, {useEffect} from 'react';
import useAuth from './hooks/useAuth.js';
import {useParams} from 'react-router-dom';
import {useGetShopsQuery} from './api/api.js';
import {useDispatch, useSelector} from 'react-redux';
import './i18n';
import {useTranslation} from 'react-i18next';
import {Box} from '@chakra-ui/react';
import {withProfiler} from '@sentry/react';
import {t} from 'i18next';

function App() {
  useAuth();
  const {i18n} = useTranslation();

  const user = useSelector(state => state.user.data);

  useEffect(() => {
    if (user && user.language) {
      i18n.changeLanguage('ru');
    }
  }, [user])

  return (
    <Box>
      {t('helloWorld')}
    </Box>
  );
}

export default withProfiler(App);
