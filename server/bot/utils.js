export const masks = {
  order: new RegExp(/^order-/),
  shop: new RegExp(/^shop-/),
  phone: new RegExp(/^(\+)?((\d{2,3}) ?\d|\d)(([ -]?\d)|( ?(\d{2,3}) ?)){5,12}\d$/),
};

export const statuses = {
  PENDING: 'pending',
  CANCELLED: 'cancelled',
  DECLINED: 'declined',
  COOK: 'cook',
  COOKED: 'cooked',
  DELIVERY: 'delivery',
  COMPLETE: 'complete',
  COMPLETE_PICKUP: 'completePickup',
  CLOSED: 'closed',
}

export const actions = {
  ABOUT: 'ABOUT',
  CONNECT: 'CONNECT',
  HOME: 'HOME',
  OPEN_SHOP: 'OPEN_SHOP',
  ORDER_PICKUP: 'ORDER_PICKUP',
  ORDER_CANCEL: 'ORDER_CANCEL',
  ORDER_DECLINE: 'ORDER_DECLINE',
  ORDER_COOK: 'ORDER_COOK',
  ORDER_COOKED: 'ORDER_COOKED',
  ORDER_DELIVERY: 'ORDER_DELIVERY',
  ORDER_COMPLETE: 'ORDER_COMPLETE',
  ORDER_CLOSED: 'ORDER_CLOSED',
  BACK_TO_HOME: 'BACK_TO_HOME',
  CHANGE_LANGUAGE: 'CHANGE_LANGUAGE'
}

export const statusByAction = {
  [actions.ORDER_CANCEL]: statuses.CANCELLED,
  [actions.ORDER_DECLINE]: statuses.DECLINED,
  [actions.ORDER_COOK]: statuses.COOK,
  [actions.ORDER_COOKED]: statuses.COOKED,
  [actions.ORDER_DELIVERY]: statuses.DELIVERY,
  [actions.ORDER_COMPLETE]: statuses.COMPLETE,
  [actions.ORDER_CLOSED]: statuses.CLOSED,
}

export const deliveryTypes = {
  DELIVERY: 'delivery',
  PICKUP: 'pickup'
}
export const calculateDistance = (distance) => {
  if (!distance) {
    return -1;
  }
  distance = parseInt(distance);

  if (distance <= 10) {
    return 500;
  } else if (distance <= 30) {
    return 1000;
  } else {
    return 1500
  }
}

export const getGoogleMapsLink = (lat, lng) => {
  const url = "https://www.google.com/maps?q=" + lat + "," + lng;

  return `<a href='${url}'>${lat}, ${lng}</a>`;
}