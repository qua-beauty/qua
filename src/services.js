import {webApp} from './telegram.js';

export const apiUrl = 'https://swamimarket.netlify.app/';

export const fetchAnswerWebQuery = async ({messageText}) => {
  await fetch(`${apiUrl}/api/answerWebAppQuery`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      queryId: webApp.initDataUnsafe.query_id,
      id: webApp.initDataUnsafe.query_id,
      type: 'article',
      title: 'Order Created',
      input_message_content: {
        message_text: messageText,
      },
    })
  })
}