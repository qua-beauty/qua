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
  CHANGE_LANGUAGE: 'CHANGE_LANGUAGE'
}

export const calculateDistance = (distance) => {
  if (!distance) {
    return -1;
  }
  distance = parseInt(distance);

  if (distance <= 10) {
    return 500;
  } else if (distance <= 30) {
    return 1000;
  } else {
    return 1500
  }
}

export const orderCardMessage = (order, ctx, type = 'user') => {
  const lng = ctx.session.language;
  
  let data = {
    id: `#${order.id}\n`,
    title: type,
    products: order.productsJson.reduce((acc, product) => {
      return acc + `${product.name} (${product.count} x ${product.price})\n`;
    }, '') + '\n',
    count: order.count,
    price: order.price,
    deliveryPrice: order.deliveryPrice,
    phone: order.phone,
    address: order.address,
    username: order.username,
    comment: order.comment,
    status: t(`status.${order.status}`, lng, {ns: 'common'}),
  };

  if (typeof data.deliveryPrice !== 'undefined') {
    data.deliveryPrice = data.deliveryPrice > 0
      ? `${data.deliveryPrice} ${t('currency.LKR', lng, {ns: 'common'})}`
      : data.deliveryPrice < 0 ? t('price.unknown', lng, {ns: 'common'}) : t('price.free', lng, {ns: 'common'});
  } else {
    delete data.deliveryPrice;
  }

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
          return acc + `${t('orderCard.shopTitle', lng)}\n`;
        case 'delivery':
          return acc + `${t('orderCard.deliveryTitle', lng)}\n`;
        default:
          return acc + `${t('orderCard.userTitle', lng)}\n`;
      }
    }

    return acc + (value ? `${t(`orderCard.${key}`, lng, {[key]: value})}\n` : '');
  })
};

export {
  masks,
  actions
}