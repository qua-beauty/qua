const statuses = {
  pending: 'В обработке',
  cooking: 'Готовится',
  complete: 'Выполнен',
  decline: 'Отклонен'
}

const getStatusTitle = (status) => {
  return statuses.hasOwnProperty(status) ? statuses[status] : status;
}

const Messages = {
  start: `С Вами Маркет! Привет! Я помогу вам оформить заказ на доставку блюда или продуктов!\n\nВы можете открыть приложение через кнопку Маркет или просто написать мне что вам нужно, я обязательно вам помогут!`,
  orderCreated: () => {
    const {products, comment, status, id} = order;

    const productsMessage = products.reduce((acc, product, index) => {
      return acc + `${index + 1}\\. ${product.title} \\(${product.count} x ${product.price}\\)\n`;
    }, '');

    const sum = products.reduce((acc, product) => acc + parseInt(product.count) * parseInt(product.price), 0);
    return `Заказ \\#${id}\n\nМой заказ:\\!\n${productsMessage}\n*Общая сумма: ${sum}*\n*Комментарий:* ${comment}\n*Статус*: ${getStatusTitle(status)}`;
  }
}

module.exports = {
  Message: Messages
};