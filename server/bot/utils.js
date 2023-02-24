import {i18n} from './i18n.js';

const masks = {
  order: new RegExp(/^order-/),
  shop: new RegExp(/^shop-/),
  phone: new RegExp(/^(\+)?((\d{2,3}) ?\d|\d)(([ -]?\d)|( ?(\d{2,3}) ?)){5,12}\d$/),
};

const statuses = {
  draft: null,
  pending: 'Ожидаем ответа от Ресторана',
  cook: 'Готовится',
  delivery: 'В доставке',
  complete: 'Выполнен',
  declined: 'Отклонен Рестораном',
  cancelled: 'Отменен'
};

const orderTitles = {
  shop: 'Новый заказ:',
  user: 'Ваш заказ:',
  delivery: 'Новый заказ на доставку:',
};

const getOrderTitle = (type) => {
  return orderTitles.hasOwnProperty(type) ? orderTitles[type] : type;
};

const getStatusTitle = (status) => {
  return statuses.hasOwnProperty(status) ? statuses[status] : status;
};

const actions = {
  ABOUT: 'ABOUT',
  CONNECT: 'CONNECT',
  HOME: 'HOME',
  OPEN_SHOP: 'OPEN_SHOP',
  CANCEL_ORDER: 'CANCEL_ORDER',
  SHOP_DECLINE_ORDER: 'SHOP_DECLINE_ORDER',
  SHOP_ACCEPT_ORDER: 'SHOP_ACCEPT_ORDER',
  SHOP_DELIVERY_ORDER: 'SHOP_DELIVERY_ORDER',
  SHOP_DONE_ORDER: 'SHOP_DONE_ORDER',
  BACK_TO_HOME: 'BACK_TO_HOME',
}

const parseMode = {
  parse_mode: 'MarkdownV2',
};

export const orderCardMessage = (order, type = 'user') => {
  const data = {
    id: order.id,
    title: getOrderTitle(type),
    products: JSON.parse(order.productsJson).reduce((acc, product) => {
      return acc + `${product.icon} ${product.name} (${product.count} x ${product.price})\n`;
    }, '') + '\n',
    count: order.count,
    price: order.price,
    deliveryPrice: order.deliveryPrice,
    phone: order.phone,
    address: order.address,
    nickname: order.nickname,
    comment: order.comment,
    status: getStatusTitle(order.status),
  };

  const dataKeys = Object.keys(data);
  const dataValues = Object.values(data);

  return dataValues.reduce((acc, value, index) => {
    const key = dataKeys[index];
    if (key === 'products') {
      return acc + value;
    }

    return acc + (value ? `${i18n.t(`orderCard.${key}`, {[key]: value})}\n` : '')
  }, '');
};

export {
  masks,
  parseMode,
  actions
}