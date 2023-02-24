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

export const getOrderVars = (order, type) => {
  const {id, comment, status, address, price, count, phone, name, deliveryPrice, productsJson} = order;
  const products = JSON.parse(productsJson);
  const productsText = products.reduce((acc, product) => {
    return acc + `${product.icon} ${product.name} (${product.count} x ${product.price})\n`;
  }, '') + '<br>';

  return {
    id,
    comment,
    products: productsText,
    title: getOrderTitle(type),
    status: getStatusTitle(status),
    address,
    price,
    count,
    phone,
    name,
    deliveryPrice,
  };
};

export {
  masks,
  parseMode,
  actions
}