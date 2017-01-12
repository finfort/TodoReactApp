import {
    FETCH_USERS
} from '../actions/types';

const usersInitialState = [];
const users = (state = usersInitialState, action) => {
    switch (action.type) {
        case FETCH_USERS:
            return [...state, ...action.payload]; // return existing users along with new users
        //return new state with taked action
        //just make new state without any other side calls
        default:
            return state
    }
    // return state;
}

export default users;