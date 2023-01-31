const statuses = {
  pending: 'В обработке',
  moderate: 'Ожидаем ответа от Ресторана',
  cooking: 'Готовится',
  complete: 'Выполнен',
  declined: 'Отклонен Рестораном',
  cancelled: 'Отменен'
};

const orderTitles = {
  shop: 'Новый заказ:',
  user: 'Ваш заказ:',
  delivery: 'Новый заказ на доставку:',
}

const getOrderTitle = (type) => {
  return orderTitles.hasOwnProperty(type) ? orderTitles[type] : type;
}

const getStatusTitle = (status) => {
  return statuses.hasOwnProperty(status) ? statuses[status] : status;
};

const messages = {
  start: `С Вами Маркет! Привет!\n\nЯ помогу вам оформить заказ на доставку блюда или продуктов!\n\nВы можете открыть приложение через кнопку Маркет или просто напишите мне что вам нужно, я обязательно вам помогу!`,
  orderCard: (data, type = 'user') => {
    if (!data) {
      return 'Произошло что-то странное, я не могу найти заказ. Отправил ошибку людям, скоро с вами свяжутся.';
    }

    const {id, products, comment, status, location, locationAddress, phoneNumber, name} = data;
    const sum = products.reduce((acc, product) => acc + parseInt(product.count) * parseInt(product.price), 0);

    const productsText = products.reduce((acc, product) => {
      return acc + `${product.icon} ${product.title} (${product.count} x ${product.price})\n`;
    }, '') + '\n';

    return [
      `*${getOrderTitle(type)}*\n\n`,
      productsText,
      `*ID*: #${id}\n`,
      `*Общая сумма*: ${sum}\n`,
      comment ? `*Комментарий:* ${comment}\n` : '',
      location ? `*Координаты:* ${location.latitude},${location.longitude}\n` : '',
      locationAddress ? `*Адрес для доставки:* ${locationAddress}\n` : '',
      phoneNumber ? `*Телефон для связи:* ${phoneNumber}\n` : '',
      `*Статус*: ${getStatusTitle(status)}`,
    ]
      .join('')
      .replace(/[.#+?!^${}()|[\]\\]/g, '\\$&');
  },
  saveAddress: (name) => `Благодарим за авторизацию ${name} ✅ \n 
  \nвы можете сохранить местоположение для доставки 📍 
  \nДоставка начнет работу во вторник, 7 февраля 2023 в 8:00 🚀`,
  saveOrder: 'Данные сохранили',
  auth: 'Добро пожаловать в swami.market \n🍥 Ваш заказ создан, для продолжения авторизуйтесь',
  authInvalid: 'Телефон введен неправильно, попробуйте еще раз!',
};

module.exports = {
  messages
};