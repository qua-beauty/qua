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
      'Products JSON': order.productsJson
    }
  }));
}

export const serializeUser = (userData) => {
  return userData.map(user => ({
    fields: {
      'TelegramId': user.id,
      'Name': user.name,
      'Language': user.language,
      'Username': user.username,
      'Phone': user.phone,
      'Address': user.location
    }
  }));
}