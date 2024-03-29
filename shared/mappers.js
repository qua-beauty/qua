import {statuses} from '../server/bot/utils.js';

export const shopMapper = (shop) => {
  return {
    id: shop.id,
    workTime: shop.fields['Work Time'] ? JSON.parse(shop.fields['Work Time']) : undefined,
    name: shop.fields['Name'],
    address: shop.fields['Address'],
    phone: shop.fields['Phone'],
    logo: shop.fields['Logotype'] ? shop.fields['Logotype'][0].url : undefined,
    avatar: shop.fields['Avatar'] ? shop.fields['Avatar'][0].url : undefined,
    categories: shop.fields['Catalog'],
    adminGroup: shop.fields['Admin Group'],
    instagram: shop.fields['Instagram'],
    username: shop.fields['Username'],
    commission: shop.fields['Commission'],
    available: shop.fields['Available'],
    about: shop.fields['About'],
    likes: shop.fields['Likes'] ? shop.fields['Likes'].map((id, index) => ({
      id,
      name: shop.fields['Likes Names'][index],
      avatar: shop.fields['Likes Avatars'][index]?.url
    })) : undefined,
    type: shop.fields['Type'].toLowerCase(),
    category: shop.fields['Category'] ? {
      id: shop.fields['Category'][0],
      name: shop.fields['Category Name'][0],
      color: shop.fields['Category Color'][0],
      textColor: shop.fields['Category Color Text'][0],
    } : undefined,
    portfolio: shop.fields['Portfolio'] ? shop.fields['Portfolio'].map((id, index) => ({
      id,
      image: shop.fields['Portfolio Images'][index]?.url,
      description: shop.fields['Portfolio Descriptions'][index]
    })) : undefined
  };
};

export const productMapper = (product) => {
  return {
    id: product.id,
    name: product.fields['Name'],
    category: product.fields['Category'] ? product.fields['Category'][0] : undefined,
    categoryName: product.fields['Category Name'] ? product.fields['Category Name'][0] : undefined,
    price: product.fields['Price'],
    about: product.fields['About'],
    image: product.fields['Image'] ? product.fields['Image'][0].url : undefined,
    icon: product.fields['Icon'],
    isAvailable: product.fields['isAvailable'],
    shop: product.fields['Master'] ? product.fields['Master'][0] : undefined,
    shopName: product.fields['Master Name'] ? product.fields['Master Name'][0] : undefined,
    shopUsername: product.fields['Master Username'] ? product.fields['Master Username'][0] : undefined,
    discountPrice: product.fields['Discount Price'],
    discount: product.fields['Discount'],
    time: product.fields['Time']
  };
}

export const categoryMapper = (category) => {
  return {
    id: category.id,
    name: category.fields['Name'],
    icon: category.fields['Icon'] ? category.fields['Icon'][0].url : undefined,
    shops: category.fields['Masters'],
    products: category.fields['Products']
  };
}

export const reviewMapper = (review) => {
  return {
    id: review.id,
    date: review.fields['Date'],
    rating: review.fields['Rating'],
    text: review.fields['Text'],
    shop: {
      id: review.fields['Master'][0]
    },
    from: {
      id: review.fields['From'][0],
      name: review.fields['From Name'][0]
    },
    order: review.fields['Order']
  };
}

export const orderMapper = (order) => {
  return {
    id: order.id,
    date: new Date(order.fields['Date']),
    bookTime: new Date(order.fields['Book Time']),
    status: order.fields['Status'].toLowerCase(),
    type: order.fields['Type'] ? order.fields['Type'].toLowerCase() : undefined,
    user: order.fields['User'] ?  order.fields['User'][0] : undefined,
    userChat: order.fields['User Chat'] ?  order.fields['User Chat'][0] : undefined,
    products: order.fields['Products'],
    address: order.fields['Address'],
    shop: order.fields['Master'] ? order.fields['Master'][0] : undefined,
    shopChat: order.fields['Master Chat'] ? order.fields['Master Chat'][0] : undefined,
    shopName: order.fields['Master Name'] ? order.fields['Master Name'][0] : undefined,
    shopTelegramId: order.fields['Master TelegramId'] ? order.fields['Master TelegramId'][0] : undefined,
    shopPosterPos: order.fields['Master PosterPos'] ? order.fields['Master PosterPos'][0] : undefined,
    shopAddress: order.fields['Master Address'] ? order.fields['Master Address'][0] : undefined,
    count: order.fields['Count'],
    price: order.fields['Price'],
    commission: order.fields['Commission'],
    deliveryPrice: order.fields['Delivery Price'],
    comment: order.fields['Comment'],
    phone: order.fields['Phone'],
    telegram: order.fields['Telegram'] ? JSON.parse(order.fields['Telegram']) : undefined,
    username: order.fields['Username'],
    distance: order.fields['Distance'],
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
    avatar: user.fields['Avatar'] ? user.fields['Avatar'][0].url : undefined,
    language: user.fields['Language'],
    referrer: user.fields['Referrer'] ? user.fields['Referrer'][0] : undefined,
    permissions: user.fields['Permissions']
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
