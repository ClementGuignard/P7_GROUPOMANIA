// index qui regroupe tout les reducer, les combines et les export dans le store

// Librairie qui combien les reducers
import { combineReducers } from "redux";

//Reducers
import userReducer from "./user.reducer";
import usersReducer from "./users.reducer";
import postReducer from "./post.reducer";


export default combineReducers({
  userReducer,
  usersReducer,
  postReducer,
});
