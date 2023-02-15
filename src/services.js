import {webApp} from './telegram.js';

export const fetchAnswerWebQuery = async ({messageText}) => {
  await fetch(`${import.meta.env.VITE_SERVER_URL}/api/answerWebAppQuery`, {
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