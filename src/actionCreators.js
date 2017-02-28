import {SET_BREED} from './actions';

export function setBreed(breed) {
  return {
    type: SET_BREED,
    breed
  }
}

// export function search() {
//   return function (dispatch, getState) {
//     const state = getState(); // returns state of redux store
//     const {breed, animal, location} = state;
//     pf.pet.find({animal, breed, location, output: 'full'})
//   }
// }
