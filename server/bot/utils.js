import {t} from './i18n.js';

export const masks = {
  order: new RegExp(/^order-/),
  shop: new RegExp(/^shop-/),
  phone: new RegExp(/^(\+)?((\d{2,3}) ?\d|\d)(([ -]?\d)|( ?(\d{2,3}) ?)){5,12}\d$/),
};

export const statuses = {
  CANCELLED: 'cancelled',
  DECLINED: 'declined',
  COOK: 'cook',
  COOKED: 'cooked',
  DELIVERY: 'delivery',
  COMPLETE: 'complete',
  CLOSED: 'closed',
}

export const actions = {
  ABOUT: 'ABOUT',
  CONNECT: 'CONNECT',
  HOME: 'HOME',
  OPEN_SHOP: 'OPEN_SHOP',
  ORDER_CANCEL: 'ORDER_CANCEL',
  ORDER_DECLINE: 'ORDER_DECLINE',
  ORDER_COOK: 'ORDER_COOK',
  ORDER_COOKED: 'ORDER_COOKED',
  ORDER_DELIVERY: 'ORDER_DELIVERY',
  ORDER_COMPLETE: 'ORDER_COMPLETE',
  ORDER_CLOSED: 'ORDER_CLOSED',
  BACK_TO_HOME: 'BACK_TO_HOME',
  CHANGE_LANGUAGE: 'CHANGE_LANGUAGE'
}

export const statusByAction = {
  [actions.ORDER_CANCEL]: statuses.CANCELLED,
  [actions.ORDER_DECLINE]: statuses.DECLINED,
  [actions.ORDER_COOK]: statuses.COOK,
  [actions.ORDER_COOKED]: statuses.COOKED,
  [actions.ORDER_DELIVERY]: statuses.DELIVERY,
  [actions.ORDER_COMPLETE]: statuses.COMPLETE,
  [actions.ORDER_CLOSED]: statuses.CLOSED,
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

export const orderCardMessage = (order, type = 'user') => {
  const lng = 'ru';

  const sum = parseInt(order.price) + parseInt(order.deliveryPrice) + parseInt(order.commission);
  
  let data = {
    id: `#${order.id}\n`,
    title: type,
    products: order.productsJson.reduce((acc, product) => {
      return acc + `${product.name} (${product.count} x ${product.price})\n`;
    }, '') + '\n',
    count: order.count,
    phone: order.phone,
    address: order.address,
    username: order.username,
    comment: order.comment,
    price: order.price,
    deliveryPrice: order.deliveryPrice,
    commission: order.commission,
    sum,
    status: t(`status.${order.status}`, lng, {ns: 'common'}),
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