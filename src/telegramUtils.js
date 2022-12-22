let webApp = window.Telegram.WebApp;

if(webApp.platform === 'unknown') {
  webApp = null;
}

let params = (new URL(document.location)).searchParams;
const token = params.get('token');
if(token) webApp.token = token;

export {
  webApp
}