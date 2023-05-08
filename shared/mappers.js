import {statuses} from '../server/bot/utils.js';

export const shopMapper = (shop) => {
  return {
    id: shop.id,
    name: shop.fields['Name'],
    address: shop.fields['Address'],
    delivery: {
      ru: shop.fields['Delivery'],
      en: shop.fields['Delivery En']
    },
    phone: shop.fields['Phone'],
    textColor: shop.fields['Text Color'],
    backgroundColor: shop.fields['Background Color'],
    endTime: shop.fields['End Time'],
    startTime: shop.fields['Start Time'],
    workTime: `${shop.fields['Start Time']} - ${shop.fields['End Time']}`,
    logo: shop.fields['Logotype'] ? shop.fields['Logotype'][0].url : undefined,
    thumbnail: shop.fields['Thumbnail'] ? shop.fields['Thumbnail'][0].url : undefined,
    categories: shop.fields['Categories'],
    adminGroup: shop.fields['Admin Group'],
    instagram: shop.fields['Instagram'],
    commission: shop.fields['Commission'],
    available: shop.fields['Available']
  };
};

export const productMapper = (product) => {
  return {
    id: product.id,
    name: {
      ru: product.fields['Name'],
      en: product.fields['Name En']
    },
    category: product.fields['Category'] ? product.fields['Category'][0] : undefined,
    price: product.fields['Price'],
    about: {
      ru: product.fields['About'],
      en: product.fields['About En'],
    },
    ingredients: {
      ru: product.fields['Ingredients'],
      en: product.fields['Ingredients En'],
    },
    image: product.fields['Image'] ? product.fields['Image'][0].url : undefined,
    icon: product.fields['Icon'],
    isVegan: product.fields['isVegan'],
    isGF: product.fields['isGF'],
    isVegetarian: product.fields['isVegetarian'],
    isAvailable: product.fields['isAvailable'],
    shop: product.fields['Shop'] ? product.fields['Shop'][0] : undefined,
    posterId: product.fields['Poster ID'],
    weight: product.fields['Weight'],
    discountPrice: product.fields['Discount Price'],
    discount: product.fields['Discount']
  };
}

export const categoryMapper = (category) => {
  return {
    id: category.id,
    name: {
      ru: category.fields['Name'],
      en: category.fields['Name En']
    },
    icon: category.fields['Icon'],
    shops: category.fields['Shops'],
    products: category.fields['Products']
  };
}

export const orderMapper = (order) => {
  return {
    id: order.id,
    date: new Date(order.fields['Date']),
    status: order.fields['Status'].toLowerCase(),
    type: order.fields['Type'] ? order.fields['Type'].toLowerCase() : undefined,
    user: order.fields['User'] ?  order.fields['User'][0] : undefined,
    userChat: order.fields['User Chat'] ?  order.fields['User Chat'][0] : undefined,
    products: order.fields['Products'],
    address: order.fields['Address'],
    shop: order.fields['Shop'] ? order.fields['Shop'][0] : undefined,
    shopChat: order.fields['Shop Chat'] ? order.fields['Shop Chat'][0] : undefined,
    shopPosterPos: order.fields['Shop PosterPos'] ? order.fields['Shop PosterPos'][0] : undefined,
    shopAddress: order.fields['Shop Address'] ? order.fields['Shop Address'][0] : undefined,
    count: order.fields['Count'],
    price: order.fields['Price'],
    commission: order.fields['Commission'],
    deliveryPrice: order.fields['Delivery Price'],
    comment: order.fields['Comment'],
    phone: order.fields['Phone'],
    productsJson: order.fields['Products JSON'] ? JSON.parse(order.fields['Products JSON']) : undefined,
    telegram: order.fields['Telegram'] ? JSON.parse(order.fields['Telegram']) : undefined,
    username: order.fields['Username'],
    distance: order.fields['Distance'],
    posterId: order.fields['Poster ID'],
    posterTransactionId: order.fields['Poster Transaction ID'],
    number: order.fields['Number']
  }
}

export const userMapper = (user) => {
  return {
    id: user.id,
    name: user.fields['Name'],
    phone: user.fields['Phone'],
    address: user.fields['Address'],
    username: user.fields['Username'],
    telegramId: user.fields['TelegramId'],
    language: user.fields['Language'],
    referrer: user.fields['Referrer'] ? user.fields['Referrer'][0] : undefined
  };
}

export const posterPosMapper = (poster) => {
  return {
    id: poster.id,
    account: poster.fields['Account'],
    accountNumber: poster.fields['Account Number'],
    accessToken: poster.fields['Access Token'],
    status: poster.fields['Status'],
    shop: poster.fields['Shop'],
  };
}

export const telegramUserMapper = (user) => {
  return {
    id: user.id.toString(),
    name: `${user.first_name}${user.last_name ? ` ${user.last_name}` : ''}`,
    firstName: user.first_name,
    lastName: user.last_name,
    language: user.language_code,
    username: user.username
  }
}

export const posterOrderMapper = (posterOrder) => {
  const priceAppendix = 100;

  return {
    id: posterOrder.incoming_order_id,
    status: posterOrder.status === 7 ? statuses.DECLINED : statuses.COOK,
    deliveryPrice: 0,
    products: posterOrder.products.map(p => ({
      posterId: p.product_id,
      count: parseInt(p.count),
      price: p.price / priceAppendix
    }))
  };
}
