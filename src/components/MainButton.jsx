import { Button } from '@chakra-ui/react';
import { webApp } from '../telegram.js';
import { useEffect, useCallback } from 'react';

export const MainButton = ({ onClick, children }) => {

  const handleClick = useCallback(async () => {
    webApp?.MainButton.disable();
    webApp?.MainButton.showProgress();
    webApp?.disableClosingConfirmation();

    onClick && await onClick();

    webApp?.MainButton.hideProgress();
    webApp?.enableClosingConfirmation();
  }, [onClick])

  useEffect(() => {
    if (webApp) {
      webApp.MainButton.text = children;
      webApp.MainButton.color = theme.colors.telegram['200'];
      webApp.MainButton.textColor = theme.colors.text.primary;
      webApp.MainButton.onClick(onClick);
      webApp.MainButton.show();
    }

    return () => {
      webApp?.MainButton.offClick(onClick);
      webApp?.MainButton.hide();
    }
  }, []);

  return webApp ? <></> : (
    <Button onClick={handleClick}
      colorScheme="brand"
      borderRadius={0} w="100%" h="80px" pb="24px" fontSize='xl' color='white'>
      {children}
    </Button>
  )
}