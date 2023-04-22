let webApp = window.Telegram.WebApp;

if (webApp.platform === 'unknown') {
  webApp = null;
}

export const isDirectWebApp = webApp?.initDataUnsafe.hasOwnProperty('chat_type') || webApp?.initDataUnsafe.hasOwnProperty('chat_instance');

export {
  webApp
};