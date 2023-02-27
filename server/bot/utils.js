import {t} from './i18n.js';

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
  CHANGE_LANGUAGE: "CHANGE_LANGUAGE"
}

export const orderCardMessage = (order, type = 'user', ctx) => {
  const lng = ctx.session.language;

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
    status: t(`status.${order.status}`, lng, { ns: 'common' }),
  };

  const dataKeys = Object.keys(data);
  const dataValues = Object.values(data);

  return dataValues.reduce((acc, value, index) => {
    const key = dataKeys[index];
    if (key === 'products') {
      return acc + value;
    }

    if (key === 'title') {
      switch (value) {
        case 'shop':
          return acc + t('orderCard.shopTitle', lng)
        case 'delivery':
          return acc + t('orderCard.deliveryTitle', lng)
        default:
          return acc + t('orderCard.userTitle', lng)
      }
    }

    return acc + (value ? `${t(`orderCard.${key}`, lng, {[key]: value})}` : '');
  })
};

export {
  masks,
  actions
}