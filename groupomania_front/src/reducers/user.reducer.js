import { GET_USER } from "../actions/user.actions";

const initialState = {};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return action.payload; // Récupère toute la data et le transmet dans le initialState
    default:
      return state;
  }
}
