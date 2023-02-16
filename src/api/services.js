import {webApp} from '../telegram.js';
import axios from 'axios';

export const fetchAnswerWebQuery = async ({messageText}) => {
  await axios({
    method: 'POST',
    url: `${import.meta.env.VITE_SERVER_URL}/answerWebAppQuery`,
    data: {
      queryId: import.meta.env.DEV ? 'AAEQTXFGAgAAABBNcUYW5SUR' : webApp.initDataUnsafe.query_id,
      id: import.meta.env.DEV ? 'AAEQTXFGAgAAABBNcUYW5SUR' : webApp.initDataUnsafe.query_id,
      type: 'article',
      title: 'Order Created',
      input_message_content: {
        message_text: messageText,
      }
    },
    headers: {
      'Access-Control-Allow-Origin': 'http://localhost:5137'
    }
  });
};