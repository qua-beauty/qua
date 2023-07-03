import {t} from './i18n.js';
import {getGoogleMapsLink} from './utils.js';

export const defaultOrderTemplate = (order, type = 'user', lng = 'en') => {
  const sum = parseInt(order.price) + parseInt(order.deliveryPrice) + parseInt(order.commission);
  const location = order.address?.split(', ');
  let status = order.status;

  let data = {
    id: `#${order.number}\n`,
    title: type,
    productName: order.phone,
    phone: order.phone,
    username: order.username,
    comment: order.comment,
    price: order.price,
    commission: order.commission,
    bookTime: order.bookTime,
    sum,
    address: location ? getGoogleMapsLink(location[0], location[1]) : '',
    status: t(`status.${status}`, lng, {ns: 'common'})
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
        default:
          return acc + `${t('orderCard.userTitle', lng)}\n`;
      }
    }

    if(key === 'address') {
      return acc + (value ? `\n${t('orderCard.' + key)}📍${value}\n` : '');
    }

    return acc + (value ? `${t(`orderCard.${key}`, lng, {[key]: value})}\n` : '');
  })
};