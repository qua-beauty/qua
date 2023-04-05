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