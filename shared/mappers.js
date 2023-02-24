export const shopMapper = (shop) => {
  return {
    id: shop.id,
    name: shop.fields['Name'],
    title: shop.fields['Title'],
    address: shop.fields['Address'],
    about: shop.fields['About'],
    phone: shop.fields['Phone'],
    color: shop.fields['Color'],
    endTime: shop.fields['End Time'],
    startTime: shop.fields['Start Time'],
    workTime: `${shop.fields['Start Time']} - ${shop.fields['End Time']}`,
    image: shop.fields['Image'] ? shop.fields['Image'][0].url : undefined,
    background: shop.fields['Background'] ? shop.fields['Background'][0].url : undefined,
    categories: shop.fields['Categories'],
    adminGroup: shop.fields['Admin Group'],
    deliveryPrice: shop.fields['Delivery Price'],
    instagram: shop.fields['Instagram'],
  };
};

export const productMapper = (product) => {
  return {
    id: product.id,
    name: product.fields['Name'],
    category: product.fields['Category'] ? product.fields['Category'][0] : undefined,
    price: product.fields['Price'],
    about: product.fields['About'],
    image: product.fields['Image'] ? product.fields['Image'][0].url : undefined,
    icon: product.fields['Icon'],
    isVegan: product.fields['isVegan'],
    isGF: product.fields['isGF'],
    isVegetarian: product.fields['isVegetarian'],
    isAvailable: product.fields['isAvailable'],
    shop: product.fields['Shop'] ? product.fields['Shop'][0] : undefined,
  };
}

export const categoryMapper = (category) => {
  return {
    id: category.id,
    name: category.fields['Name'],
    icon: category.fields['Icon'],
    shops: category.fields['Shops'],
    products: category.fields['Products']
  };
}

export const orderMapper = (order) => {
  return {
    id: order.id,
    date: order.fields['Date'],
    status: order.fields['Status'].toLowerCase(),
    user: order.fields['User'] ?  order.fields['User'][0] : undefined,
    products: order.fields['Products'],
    address: order.fields['Address'],
    shop: order.fields['Shop'] ? order.fields['Shop'][0] : undefined,
    count: order.fields['Count'],
    price: order.fields['Price'],
    deliveryPrice: order.fields['Delivery Price'],
    comment: order.fields['Comment'],
    phone: order.fields['Phone'],
    productsJson: order.fields['Products JSON'],
    telegram: order.fields['Telegram'] ? JSON.parse(order.fields['Telegram']) : undefined,
    nickname: order.fields['Nickname']
  }
}

export const userMapper = (user) => {
  return {
    id: user.id,
    name: user.fields['Name'],
    phone: user.fields['Phone'],
    address: user.fields['Address'],
    username: user.fields['Telegram'],
    telegramId: user.fields['TelegramId'],
  };
}