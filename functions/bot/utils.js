const masks = {
  order: new RegExp(/#([a-zA-Z0-9]){20}/),
  phoneNumber: new RegExp(/^(\+)?((\d{2,3}) ?\d|\d)(([ -]?\d)|( ?(\d{2,3}) ?)){5,12}\d$/)
}

const parseMode = {
  parse_mode: 'MarkdownV2',
};

module.exports = {
  masks,
  parseMode
}