const redux = require('redux');
const produce = require('immer').produce;

const INITIAL_STATE = {
    name: "Saitama",
    address: {
        street: "Monster St",
        city: "Z",
        state: "Tokyo"
    }
}

const UPDATE_STREET = 'UPDATE_STREET';
function updateStreet(street){
    return {
        type: UPDATE_STREET,
        payload: street,
    }
}

const reducer = (state = INITIAL_STATE, action)=>{
    switch(action.type){
        case UPDATE_STREET:
            //without immer
            /* return {
                ...state, 
                address: {
                    ...state.address,
                    street: action.payload
                },
            } */

            //with immer
            return produce(state, (draft)=>{
                draft.address.street = action.payload
            })
        default: return state;
    }
}

const store = redux.createStore(reducer);
console.log("Initial state:", store.getState());
const unsubscribe = store.subscribe(()=>{console.log("Updated State:", store.getState())});
const actions = redux.bindActionCreators({updateStreet}, store.dispatch);
actions.updateStreet('Hero St');
unsubscribe();