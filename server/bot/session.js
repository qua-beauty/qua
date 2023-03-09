import {session as grammySession} from 'https://deno.land/x/grammy/mod.ts';

function getSessionKey(ctx) {
  return ctx.from?.id.toString();
}

export const session = () => grammySession({
  getSessionKey,
  initial() {
    return {
      newOrder: {
        products: [],
        price: null,
        count: null,
        address: null,
        phone: null,
        user: null,
        getPhoneMessage: null,
        getAddressMessage: null,
        phoneMessage: null,
        addressMessage: null,
        orderCreatedMessage: null
      },
      user: {
        name: null,
        username: null,
        address: null,
        phone: null,
        telegramId: null,
        language: null
      },
      language: 'en'
    };
  },
})