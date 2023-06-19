export const CAKE_ORDERED = 'CAKE_ORDERED';

export function orderCake(){
    return {
        type: CAKE_ORDERED,
        quantity: 1,
    }
}