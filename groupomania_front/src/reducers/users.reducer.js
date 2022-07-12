import { GET_USERS } from "../actions/users.actions";

const initialState = {};
// Data de tout les utilisateurs 
export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return action.payload;
    default:
      return state;
  }
}
