export const serializeOrder = (orderData) => {
  return orderData.map(order => ({
    fields: {
      'Date': order.date,
      'User': [order.user.id],
      'Products': order.products.map(p => p.id),
      'Shop': [order.shop.id],
      'Count': order.count,
      'Price': order.price,
      'Delivery Price': order.deliveryPrice,
      'Status': order.status.capitalize(),
      'Comment': order.comment
    }
  }));
}