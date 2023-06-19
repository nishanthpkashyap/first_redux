const redux = require('redux');


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


const RESTOCK_CAKE = "RESTOCK_CAKE";
function restockCake(qty = 1){
    return {
        type: RESTOCK_CAKE,
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

        case RESTOCK_CAKE: return { ...state, no_of_cakes: state.no_of_cakes + action.payload}

        default: return state
    }
}


/*-------------------------------------------
    Create Store for our application
--------------------------------------------*/
//1st responsibility - Create a store by passing the root reducer obtained by combining multiple reducers so that states can be changed based on the action
const store = redux.createStore(cakeReducer)

//2nd responsibility - getState() to access states from the store
console.log("Initial State:", store.getState()); //this line not required if we have logger middleware

//4th responsibility - subscribe(listener), here listener func() is called when states is updated which can be as simple as logging the updated states
const unsubscribe = store.subscribe(()=>{console.log("Updated State:", store.getState())})

//3rd responsibility - dispatch(action) is used to update the states based on the action passed to it
store.dispatch(orderCake(2))
store.dispatch(orderCake(2)) 
store.dispatch(orderCake(2)) 
store.dispatch(restockCake(6)) 

//5th responsibility - call func() returned by subscribe(listener) to unsubscribe the listener
unsubscribe()

