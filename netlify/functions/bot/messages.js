const statuses = {
  pending: 'В обработке',
  cooking: 'Готовится',
  complete: 'Выполнен',
  decline: 'Отклонен'
}

const getStatusTitle = (status) => {
  return statuses.hasOwnProperty(status) ? statuses[status] : status;
}

const messages = {
  start: `С Вами Маркет! Привет!\n\nЯ помогу вам оформить заказ на доставку блюда или продуктов!\n\nВы можете открыть приложение через кнопку Маркет или просто напишите мне что вам нужно, я обязательно вам помогу!`,
  orderCreated: (data) => {
    if(!data) {
      return 'Произошло что-то странное, я не могу найти заказ. Отправил ошибку человеку, скоро он с вами свяжется.'
    }

    const {products, comment, status} = data;

    const productsMessage = products.reduce((acc, product, index) => {
      return acc + `${index + 1}\\. ${product.title} \\(${product.count} x ${product.price}\\)\n`;
    }, '');

    const sum = products.reduce((acc, product) => acc + parseInt(product.count) * parseInt(product.price), 0);
    return `Ваш заказ:\n${productsMessage}\n*Общая сумма: ${sum}*\n*Комментарий:* ${comment}\n*Статус*: ${getStatusTitle(status)}`;
  },
  orderWhereToDelivery: 'Куда доставить заказ?',
  orderPhoneNumber: 'Как с вами связаться?',
  orderPhoneNumberInvalid: 'Телефон введен неправильно, попробуйте еще раз!'
}

module.exports = {
  messages
};