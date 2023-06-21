async function insertToSessionCart(req, newOrder){

    if(!req.session.cart) req.session.cart = [];
    // check id is existing
    const existingItemIndex = req.session.cart.findIndex(item => item.id == newOrder.id);
    if (existingItemIndex != -1) {
        const existingItem = req.session.cart[existingItemIndex];

        // check size is existring
        const existingSizeIndex = existingItem.size.findIndex(currentSize => currentSize.size == newOrder.size);
        // size is existing
        if(existingSizeIndex != -1){
            const existingSize = existingItem.size[existingSizeIndex];
            existingSize.quantity += Number(newOrder.quantity);
        }else{
            existingItem.size.push({
                size: newOrder.size,
                quantity: Number(newOrder.quantity)
            })
        }
        existingItem.price += Number(newOrder.price);
        
    } else {
        // id is not existring
        req.session.cart.push({
            id: newOrder.id,
            size: [{
                size: newOrder.size,
                quantity: Number(newOrder.quantity)
            }],
            price: Number(newOrder.price)
        });
    }
    req.session.cart.forEach(element => {
        console.log(element);
    });

    return req.session.cart;
}

async function removeItemInSessionCart(req, id){
    const existingItemIndex = req.session.cart.findIndex(item => item.id == id);

    if(existingItemIndex != -1){
        req.session.cart.splice(existingItemIndex, 1);
    }

    return req.session.cart;
}
module.exports = {
    insertToSessionCart,
    removeItemInSessionCart,
}