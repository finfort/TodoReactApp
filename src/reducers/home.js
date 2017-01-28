import {
    FETCH_MESSAGE
} from '../actions/types';

const postsInitialState = {};
const home = (state = postsInitialState, action) => {
    switch (action.type) {
        case FETCH_MESSAGE:
            return {...state, message: action.payload }; // return existing users along with new users
        //return new state with taked action
        //just make new state without any other side calls
        default:
            return state;
    }
};

export default home;