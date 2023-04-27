export const serializeOrder = (orderData) => {
  return orderData.map((order) => {
    const fields = {
      Date: order.date,
      User: [order.user?.id || order.user],
      Phone: order.phone,
      Address: order.address,
      Username: order.username,
      Products: order.products?.map((p) => p?.id || p),
      Shop: [order.shop?.id || order.shop],
      Count: order.count,
      Price: order.price,
      Comment: order.comment,
      'Delivery Price': order.deliveryPrice,
      Commission: order.commission,
      Status: order.status.capitalize(),
      'Products JSON': order.productsJson ? JSON.stringify(order.productsJson) : undefined,
      Distance: order.distance,
      Telegram: order.telegram ? JSON.stringify(order.telegram) : undefined,
      'Poster ID': order.posterId,
      'Poster Transaction ID': order.posterTransactionId
    };

    Object.entries(fields).forEach(([key, value]) => {
      if (value === undefined || (Array.isArray(value) && value.some((v) => v === undefined))) {
        delete fields[key];
      }
    });

    return { fields };
  });
};

export const serializeUser = (userData) => {
  return userData.map(user => ({
    fields: {
      'TelegramId': user.id.toString(),
      'Name': user.name ? user.name : '',
      'Language': user.language ? user.language : 'ru',
      'Username': user.username ? user.username : '',
      'Phone': user.phone ? user.phone : '',
      'Address': user.location ? user.location : '',
      'Referrer': user.referrer ? [user.referrer] : ''
    }
  }));
}

export const serializePosterOrder = (orderData) => {
  const priceAppendix = 100;

  return orderData.map(order => ({
    spot_id: 1,
    service_mode: 3,
    products: order.productsJson.map(p => ({
      product_id: p.posterId,
      price: p.price*priceAppendix,
      count: p.weight ? (p.weight * p.count) : p.count // if weight product, 1 equals 1 gram
    })),
    phone: '+79956324351',
    delivery_price: order.deliveryPrice*priceAppendix
  }))[0];
};

export const serializePosterTransaction = (orderData) => {
  return orderData.map(order => ({
    transaction_id: order.posterTransactionId,
    spot_id: 1,
    spot_tablet_id: 1,
    courier_id: 1,
    processing_status: order.status === 'delivery' ? 40 : 50
  }))[0];
};