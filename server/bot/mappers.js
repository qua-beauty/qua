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
    productsJson: order.fields['Products JSON'],
    chatId: order.fields['Chat Id'],
  }
}

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
    workTime: `${shop.fields['End Time']} - ${shop.fields['Start Time']}`,
    image: shop.fields['Image'] ? shop.fields['Image'][0].url : undefined,
    categories: shop.fields['Categories'],
    telegramGroupId: shop.fields['Admin Group'],
    deliveryPrice: shop.fields['Delivery Price'],
    adminGroup: shop.fields['Admin Group'],
  };
};

export {
  orderMapper
}