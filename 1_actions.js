/*---------------------------
        Create actions
---------------------------*/
const ORDER_CAKE = 'ORDER_CAKE';
function orderCake(qty = 1){
    return {
        type: ORDER_CAKE,
        payload: qty,
    }
}

