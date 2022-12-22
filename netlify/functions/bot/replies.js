const welcomeReply = (ctx) => {
  const message = 'Привеет! с вами Маркет Продуктов на Шри-Ланке. выбирайте продукты и заказывайте доставку ;). \n Нажмите на меню (☰) чтобы открыть маркет!';
  return ctx.reply(message);
};

const orderWelcomeReply = async (ctx, order) => {
  const {products} = order;

  const productsMessage = products.reduce((acc, product) => {
    return acc + `${product.count} ${product.title} \n `;
  }, '');

  const sum = products.reduce((acc, product) => acc + parseInt(product.count) * parseInt(product.price), 0);

  const message = `Здравствуйте, мы сформировали ваш заказ \n
${productsMessage}
на общую сумму ${sum} \n
Подскажите куда привезти товар? \n
(можете прикрепить локацию или отправить адрес)`;
  return ctx.reply(message);
};

module.exports = {
  orderWelcomeReply,
  welcomeReply
};