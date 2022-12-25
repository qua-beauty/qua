import {getStatusTitle} from './utils.js';

let webApp = window.Telegram.WebApp;

if (webApp.platform === 'unknown') {
  webApp = null;
}

const createOrderMessage = (data) => {
  const {products, comment, status, id} = data;

  const productsMessage = products.reduce((acc, product, index) => {
    return acc + `${index + 1}\\. ${product.title} \\(${product.count} x ${product.price}\\)\n`;
  }, '');

  const sum = products.reduce((acc, product) => acc + parseInt(product.count) * parseInt(product.price), 0);
  return `Заказ \\#${id}\n\nМой заказ:\\!\n${productsMessage}\n*Общая сумма: ${sum}*\n*Комментарий:* ${comment}\n*Статус*: ${getStatusTitle(status)}`;
};

export {
  webApp,
  createOrderMessage
};