import { CloseButton } from "@chakra-ui/react"
import { useEffect } from "react";
import {webApp} from '../telegram';

export const BackButton = ({ onClick }) => {
  useEffect(() => {
    webApp?.BackButton.show();
    webApp?.BackButton.onClick(onClick);

    return () => {
      webApp?.BackButton.offClick(onClick);
      webApp?.BackButton.hide();
    }
  }, []);

  return (
    <CloseButton size='lg' onClick={onClick} position='absolute' top='16px' left='16px' zIndex='100' />      
  )
}