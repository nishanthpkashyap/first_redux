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


/*--------------------------------------
    Initial States of our application
--------------------------------------*/
const INITITAL_CAKE_STATE = {
    no_of_cakes: 10,
}

/*--------------------------------------------------------------------------
    Create reducer for our application to change state based on the action
--------------------------------------------------------------------------*/
// (prevState, action) => new_state
const cakeReducer = (state = INITITAL_CAKE_STATE, action)=>{
    switch(action.type)
    {
        case ORDER_CAKE: return { ...state, no_of_cakes: state.no_of_cakes - action.payload}

        default: return state
    }
}

