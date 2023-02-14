const statuses = {
  pending: null,
  moderate: 'Ожидаем ответа от Ресторана',
  preorder: 'Добавлен в предзаказ',
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
  startShop: (shopId) => `С Вами Маркет! Привет!\n\n Вижу что с вами поделились ссылкой на магазин, чтобы открыть его, нажмите кнопку Маркет`,
  orderCard: (data, type = 'user') => {
    if (!data) {
      return 'Произошло что-то странное, я не могу найти заказ. Отправил ошибку людям, скоро с вами свяжутся.';
    }

    const {id, products, comment, status, address, price, count, phone, name, deliveryPrice} = data;

    const productsText = products.reduce((acc, product) => {
      return acc + `${product}\n`;
    }, '') + '\n';

    return [
      `*ID*: #${id}\n`,
      `*${getOrderTitle(type)}*\n\n`,
      productsText,
      `*Количество*: ${count}\n`,
      `*Стоимость продуктов*: ${price} рупий\n`,
      deliveryPrice ? `*Стоимость доставки*: ${deliveryPrice} рупий\n` : '',
      comment ? `*Комментарий:* ${comment}\n` : '',
      address ? `*Адрес:* ${address}\n` : '',
      name ? `*Никнейм:* @${name}\n` : '',
      phone ? `*Телефон:* ${phone}\n` : '',
      getStatusTitle(status) ? `*Статус*: ${getStatusTitle(status)}`: '',
    ]
      .join('')
      .replace(/[.#+?!^${}()|\-[\]\\]/g, '\\$&');
  },
  saveAddress: (name) => `Благодарим за авторизацию ${name}.\nКуда доставляем заказ? 📍`,
  saveOrder: 'Заказ передан ресторану.\nОжидаем подтверждения (в среднем до 5 минут)',
  doneOrder: 'Заказ готов и спешит к вам!',
  approveOrder: `Заказ подтвердили. В ближайшее время с вами свяжутся`,
  auth: 'Ваш заказ создан, для продолжения поделитесь телефоном',
  authInvalid: 'Введите актуальный номер телефона',
  botError: 'От вашего сообщения бот упал, мы скоро исправим это!'
};

module.exports = {
  messages
};