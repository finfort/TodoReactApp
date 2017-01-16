//middlewares made specifically for resolving promises and sending back data
export default function ({dispatch}) {
    return next => action => {
        if (!action.payload || !action.payload.then)
            return next(action);

        action.payload
            .then(response => { 
                dispatch({ ...action, payload: response.data }) 
                //discpatch because send this data payload all over
                // again, and it will be not promise but response object
            });

        
    }
}