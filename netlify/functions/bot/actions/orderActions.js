const {updateOrder, getOrder} = require('../services.js');
const {messages} = require('../messages.js');

const cancelOrder = async (ctx) => {
  const orderId = ctx.callbackQuery.data.split(' ')[1];
  const order = await getOrder(orderId);

  await updateOrder(orderId, {
    status: 'cancelled'
  });

  await ctx.editMessageText(messages.orderCard({
    ...order,
    status: 'cancelled'
  }), {
    parse_mode: 'MarkdownV2',
  });
};

module.exports = {
  cancelOrder
};