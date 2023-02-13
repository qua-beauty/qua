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
    shopId: product.fields['Shop'] ? product.fields['Shop'][0] : undefined,
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