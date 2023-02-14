const masks = {
  order: new RegExp(/^order-/),
  shop: new RegExp(/^shop-/),
  phone: new RegExp(/^(\+)?((\d{2,3}) ?\d|\d)(([ -]?\d)|( ?(\d{2,3}) ?)){5,12}\d$/),
}

const actions = {
  OPEN_SHOP: 'OPEN_SHOP',
  CANCEL_ORDER: 'CANCEL_ORDER',
  DELIVERY_ACCEPT_ORDER: 'DELIVERY_ACCEPT_ORDER',
  SHOP_DECLINE_ORDER: 'SHOP_DECLINE_ORDER',
  SHOP_ACCEPT_ORDER: 'SHOP_ACCEPT_ORDER',
  SHOP_DONE_ORDER: 'SHOP_DONE_ORDER',
  BACK_TO_HOME: 'BACK_TO_HOME',
}

const parseMode = {
  parse_mode: 'MarkdownV2',
};

Object.defineProperty(String.prototype, 'capitalize', {
  value: function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
  },
  enumerable: false
});

module.exports = {
  masks,
  parseMode,
  actions
}