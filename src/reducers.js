import {SET_BREED} from './actions';

const setBreed = function(state, action) {
  // creates new object, copy old state and merge to new state
  // shallow checks newState and state to see if object has changed so need new object
  const newState = {};
  Object.assign(newState, state, {breed: action.breed});
  return newState;
}

const rootReducer = function(state, action) {
  if (!state) {
    state = {
      breed: 'Havanese'
    }
  }

  switch(action.type) {
    case SET_BREED:
      return setBreed(state, action); // dispatching a reducer
    default:
      return state;
  }
}

export default rootReducer;
