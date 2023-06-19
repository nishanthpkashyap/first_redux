import { CAKE_ORDERED } from "./actions"

const INITITAL_STATE = {
    no_of_cakes: 10
}
// (prevState, action) => new_state
export const reducers = (state = INITITAL_STATE, action)=>{
    switch(action.type)
    {
        case CAKE_ORDERED: return { ...state, no_of_cakes: state.no_of_cakes - 1}
        default: return state

    }
}