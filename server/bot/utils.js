import {i18n} from './i18n.js';

const masks = {
  order: new RegExp(/^order-/),
  shop: new RegExp(/^shop-/),
  phone: new RegExp(/^(\+)?((\d{2,3}) ?\d|\d)(([ -]?\d)|( ?(\d{2,3}) ?)){5,12}\d$/),
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

export const orderCardMessage = (order, type = 'user') => {
  let data = {
    id: order.id,
    title: type,
    products: JSON.parse(order.productsJson).reduce((acc, product) => {
      return acc + `${product.icon} ${product.name} (${product.count} x ${product.price})\n`;
    }, '') + '\n',
    count: order.count,
    price: order.price,
    deliveryPrice: order.deliveryPrice,
    phone: order.phone,
    address: order.address,
    username: order.username,
    comment: order.comment,
    status: i18n.t(`statuses.${order.status}`),
  };

  const dataKeys = Object.keys(data);
  const dataValues = Object.values(data);

  return dataValues.reduce((acc, value, index) => {
    const key = dataKeys[index];
    if (key === 'products') {
      return acc + value;
    }

    if(key === 'title') {
      switch(value) {
        case 'shop': return acc + i18n.t('orderCard.shopTitle')
        case 'delivery': return acc + i18n.t('orderCard.deliveryTitle')
        default: return acc + i18n.t('orderCard.userTitle')
      }
    }

    return acc + (value ? `${i18n.t(`orderCard.${key}`, {[key]: value})}\n` : '')
  }, '');
};

export {
  masks,
  actions
}