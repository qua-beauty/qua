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

    const {id, comment, status, address, price, count, phone, name, deliveryPrice, productsJson} = data;
    const products = JSON.parse(productsJson);
    const productsText = products.reduce((acc, product) => {
      return acc + `${product.icon} ${product.name} (${product.count} x ${product.price})\n`;

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
  about: `
    @swamimarketbot - Телеграм-бот платформа для заказа и доставки вашей продукции 🍓\n
    *Преимущества платформы:* \n
    - Встроенное в телеграмм приложение\n 
    - Удобный интерфейс для оформление заказа\n 
    - Быстрая поддержка \n
    - Онлайн-оплата (скоро)\n 

    *Мы предоставляем услуги:*\n
    - Размещение и продвижение вашей продукции\n 
    - Сбор и обработка заказов\n
    - Доставка на территории Шри-Ланки от Матары до Хиккадувы\n
    - Оперативная поддержка клиентов в случае возникновения каких-либо вопросов\n 
    - Предоставление отчетности о продажах \n

    У нас есть два варианта сотрудничества: \n

*🤙 Freemium based*\n
- Стоимость использования платформы - бесплатно\n
- Комиссия от продаж 10%\n

*🦾 Premium подписка:* \n
- Стоимость подписки 100000 рупий / месяц\n
- Комиссия от продаж 5% \n
- Оформление вашей продукции (профессиональная фото-съемка продуктов, дизайн логотипа)\n 
- Возможность запрашивать новую функциональность\n

Будем рады сотрудничеству и коллаборации ❤️🌞\n
  `.replace(/[.#+?!^$%*@{}()|\-[\]\\]/g, '\\$&'),
  saveAddress: (name) => `Благодарим за авторизацию ${name}.\nКуда доставляем заказ? 📍`,
  saveOrder: 'Заказ передан ресторану.\nОжидаем подтверждения (в среднем до 5 минут)',
  declineOrder: 'Заказ отменен рестораном',
  cookOrder: `Заказ подтвердили и начали готовить!`,
  deliveryOrder: 'Заказ готов и спешит к вам!',
  doneOrder: 'Заказ выполнен!',
  auth: 'Ваш заказ создан, для продолжения поделитесь телефоном',
  authInvalid: 'Введите актуальный номер телефона',
  botError: 'От вашего сообщения бот упал, мы скоро исправим это!'
};

export {
  messages
};