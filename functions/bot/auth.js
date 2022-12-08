const {createUserToken, updateOrder} = require("./services.js");

const connectTelegram = async (orderRef, user) => {
    const userToken = await createUserToken(user.id.toString());

    await updateOrder(orderRef, {
        user,
        userToken
    })
}

module.exports = {
    connectTelegram
}