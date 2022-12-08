const {Markup} = require("telegraf");

const welcomeReply = (ctx) => {
    const message = 'С вами бот по доставке продуктов и блюд в Мириссе и Велигаме (скоро). Выберите позиции и закажите доставку используя приложение ⬇️';
    return ctx.reply(message, {
        ...Markup.keyboard([
            Markup.button.webApp("🥥 Открыть приложение", "https://lanka.cafe"),
        ])
    });
}

const orderWelcomeReply = (ctx, order) => {
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

    return ctx.reply(message, {
        one_time_keyboard: true,
        resize_keyboard: true,
        input_field_placeholder: 'Отправьте адрес или прикрепите локацию',
    });
}

module.exports = {
    orderWelcomeReply,
    welcomeReply
}