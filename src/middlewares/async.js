export default function({ dispatch }) {
  return next => action => {
    //If action does not have paylload
    // or does not have a .then
    //Send it on
    if (!action.payload || !action.payload.then) {
        return next(action);
    }

    // Make sure the action's promise resolves
    // Wait until the promise successfuly fetches list of users
    action.payload
      .then(function(response) {
        // create a new action with the old type
        // replace the promise with the response data
        const newAction = { ...action, payload: response}
        dispatch(newAction)
      });
  }
}
