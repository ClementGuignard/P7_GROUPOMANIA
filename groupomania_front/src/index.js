//Import React
import React from "react";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.scss";
import App from "./App";

// Import librairie REDUX
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import { configureStore } from "@reduxjs/toolkit";
import { getUsers } from "./actions/users.actions";



// Création du Store
const store = configureStore({
  reducer: rootReducer, // Recupère tout les reducers
  middleware: [thunk], // permet de faire des requêtes async avec redux
});

store.dispatch(getUsers()); /// Des que on lance l'application on appelle tout les utilisateurs des qu'on lance l'application ce qui affichera les postes et leur contenue


// Ici on prend tout ce que l'on a fait en react et on l'injecte dans la div root de l'index ce qui nous donne le rendu front du site.
// On crée le store avec Provider
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
