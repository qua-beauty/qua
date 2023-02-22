const orderMapper = (order) => {
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
    productsJson: order.fields['Products JSON']
  }
}

export {
  orderMapper
}