const redux = require("redux");
const axios = require("axios");
const thunk = require("redux-thunk").default;

/*---------------------------
        Create actions
---------------------------*/
const FETCH_USERS_REQUESTED = "FETCH_USERS_REQUESTED";
function fetchUsersRequested() {
  return {
    type: FETCH_USERS_REQUESTED,
  };
}

const FETCH_USERS_SUCCESSFULL = "FETCH_USERS_SUCCESSFULL";
function fetchUsersSuccessful(data) {
  return {
    type: FETCH_USERS_SUCCESSFULL,
    payload: data,
  };
}

const FETCH_USERS_FAILED = "FETCH_USERS_FAILED";
function fetchUsersFailed(error) {
  return {
    type: FETCH_USERS_FAILED,
    payload: error,
  };
}

/*--------------------------------------
    Initial States of our application
--------------------------------------*/
const INITITAL_STATE = {
  loading: false,
  data: [],
  error: "",
};

/*--------------------------------------------------------------------------
    Create reducer for our application to change state based on the action
--------------------------------------------------------------------------*/
// (prevState, action) => new_state
const reducer = (state = INITITAL_STATE, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUESTED:
      return { ...state, loading: true };

    case FETCH_USERS_SUCCESSFULL:
      return { loading: false, error: '', data: action.payload };

    case FETCH_USERS_FAILED:
      return { loading: false, error: action.payload, data: [] };

    default:
      return state;
  }
};


/*------------------------------------------
    Fetch users list from an API endpoint 
------------------------------------------*/
// we have defined a action creator that will return a async action function instead of JS obj
// which will call 1)call fetch_user_requested action creator 2)call API and then 
// 3)call fetch_user_success or failed action creator accordingly
const fetchUsersList = ()=>{
    return async function(dispatch){
        dispatch(fetchUsersRequested())
        const {status, statusText, data} = await axios.get('https://jsonplaceholder.typicode.com/users')
        if(status === 200){
            const users = data.map(user=>user.id)
            dispatch(fetchUsersSuccessful(users))
        }
        else{
            // console.log("Status Text:\n", statusText)
            dispatch(fetchUsersFailed(statusText))
        }
    }
}

/*-------------------------------------------
    Create Store for our application
--------------------------------------------*/
//1st responsibility - Create a store by passing the root reducer obtained by combining multiple reducers so that states can be changed based on the action
const store = redux.createStore(reducer, redux.applyMiddleware(thunk));

//2nd responsibility - getState() to access states from the store
console.log("Initial State:", store.getState()); //this line not required if we have logger middleware

//4th responsibility - subscribe(listener), here listener func() is called when states is updated which can be as simple as logging the updated states
const unsubscribe = store.subscribe(() => {console.log("Updated state:", store.getState())});

//3rd responsibility - dispatch(action) is used to update the states based on the action passed to it
store.dispatch(fetchUsersList())

//5th responsibility - call func() returned by subscribe(listener) to unsubscribe the listener
.then(()=>unsubscribe())



