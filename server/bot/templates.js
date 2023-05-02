import {t} from './i18n.js';
import {getGoogleMapsLink} from './utils.js';

export const defaultOrderTemplate = (order, type = 'user') => {
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

export const deliveryOrderTemplate = (order) => {
  const lng = 'ru';
  const location = order.address.split(', ')
  const sum = parseInt(order.price) + parseInt(order.deliveryPrice) + parseInt(order.commission);

  let data = {
    id: `#${order.id}\n`,
    count: order.count,
    username: order.username,
    sum,
    status: t(`status.${order.status}`, lng, {ns: 'common'}),
    address: getGoogleMapsLink(location[0], location[1])
  };

  const dataKeys = Object.keys(data);
  const dataValues = Object.values(data);

  return dataValues.reduce((acc, value, index) => {
    const key = dataKeys[index];

    if(key === 'address') {
      return `\n\n${value}`;
    }

    return acc + (value ? `${t(`orderCard.${key}`, lng, {[key]: value})}\n` : '');
  })
};