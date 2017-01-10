const todo = (state = {}, action) => {

    switch (action.type) {
        case 'ADD_TODO':
        //return new state with taked action
        //just make new state without any other side calls
            return {
                id: action.id,
                text: action.text,
                completed: false
            }
        case 'TOGGLE_TODO':
            if (state.id !== action.id) {
                return state
            }

            return Object.assign({}, state, {
                completed: !state.completed
            })

        default:
            return state
    }
}

const todos = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return [
                ...state, // return array with existing items
                todo(undefined, action) // and return new todo with action properties
            ];
        case 'TOGGLE_TODO':
            return state.map(t =>
                todo(t, action)
            );
        default:
            return state;

    }
};

export default todos;

