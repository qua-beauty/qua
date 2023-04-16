export const serializeOrder = (orderData) => {
  return orderData.map(order => ({
    fields: {
      'Date': order.date,
      'User': [order.user.id],
      'Products': order.products.map(p => p.id),
      'Shop': [order.shop.id],
      'Count': order.count,
      'Price': order.price,
      'Comment': order.comment,
      'Delivery Price': order.deliveryPrice,
      'Status': order.status.capitalize(),
      'Products JSON': order.productsJson,
      'Distance': order.distance
    }
  }));
}

export const serializeUser = (userData) => {
  return userData.map(user => ({
    fields: {
      'TelegramId': user.id.toString(),
      'Name': user.name ? user.name : '',
      'Language': user.language ? user.language : 'ru',
      'Username': user.username ? user.username : '',
      'Phone': user.phone ? user.phone : '',
      'Address': user.location ? user.location : ''
    }
  }));
}

export const serializePosterOrder = (orderData) => {
  const priceAppendix = 100;

  return orderData.map(order => ({
    spot_id: 1,
    type: 1,
    products: JSON.parse(order.productsJson).map(p => ({
      product_id: p.posterId,
      price: p.price*priceAppendix,
      count: p.count
    })),
    phone: '+79956324351',
    service_mode: 3,
    delivery_price: order.deliveryPrice*priceAppendix
  }))[0];
};