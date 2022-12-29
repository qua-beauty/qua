const statuses = {
  pending: 'В обработке',
  moderate: 'Отправлен в ресторан',
  cooking: 'Готовится',
  complete: 'Выполнен',
  decline: 'Отклонен',
  cancelled: 'Отменен'
};

const getStatusTitle = (status) => {
  return statuses.hasOwnProperty(status) ? statuses[status] : status;
};

const messages = {
  start: `С Вами Маркет! Привет!\n\nЯ помогу вам оформить заказ на доставку блюда или продуктов!\n\nВы можете открыть приложение через кнопку Маркет или просто напишите мне что вам нужно, я обязательно вам помогу!`,
  orderCard: (data) => {
    if (!data) {
      return 'Произошло что-то странное, я не могу найти заказ. Отправил ошибку людям, скоро с вами свяжутся.';
    }

    const {id, products, comment, status, location, locationAddress, phoneNumber} = data;
    const sum = products.reduce((acc, product) => acc + parseInt(product.count) * parseInt(product.price), 0);

    const productsText = products.reduce((acc, product) => {
      return acc + `${product.icon} ${product.title} \\(${product.count} x ${product.price}\\)\n`;
    }, '') + '\n';
    const idText = `*ID*: \\#${id}\n`;
    const sumText = `*Общая сумма*: ${sum}\n`;
    const commentText = comment ? `*Комментарий:* ${comment}\n` : '';
    const locationText = location ? `*Координаты:* ${location.latitude.toString()
      .replace('.', '\\.')}\\,${location.longitude.toString().replace('.', '\\.')}\n` : '';
    const locationAddressText = locationAddress ? `*Адрес для доставки:* ${locationAddress}\n` : '';
    const phoneNumberText = phoneNumber ? `*Телефон для связи:* ${phoneNumber.replace('+', '\\+')}\n` : '';
    const statusText = `*Статус*: ${getStatusTitle(status)}`;

    return `*Ваш заказ:*\n\n${productsText}${idText}${sumText}${commentText}${locationText}${locationAddressText}${phoneNumberText}${statusText}`;
  },
  orderWhereToDelivery: 'Куда доставить заказ?',
  orderPhoneNumber: 'Как с вами связаться?',
  orderPhoneNumberInvalid: 'Телефон введен неправильно, попробуйте еще раз!',
  orderCreated: 'Отлично! Заказ создан и отправлен в ресторан. Скоро мы обновим статус заказа на Готовится'
};

module.exports = {
  messages
};