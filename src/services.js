import {webApp} from './telegram.js';

export const apiUrl = 'https://lanka-496b2.web.app';

export const fetchAnswerWebQuery = async ({messageText, user}) => {
  await fetch(`${apiUrl}/api/answerWebAppQuery`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + user.accessToken,
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