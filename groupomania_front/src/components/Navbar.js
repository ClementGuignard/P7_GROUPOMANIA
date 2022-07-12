import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { UidContext } from "./AppContext";
import Logout from "./Log/Logout";

const Navbar = () => {
  const uid = useContext(UidContext); // Affichage de la navbar celon le statut connexion/deconnexion
  const userData = useSelector((state) => state.userReducer); /// Affichage du pseudo

  return (
    <nav>
      <div className="nav-container">
          <div className="nav-logo">
            <div className="logo">
              <img src="./img/icon.png" alt="logo groupomania" />
            </div>
            <h1>Groupomania</h1>
          </div>
        {uid ? (
          <ul>
            <li></li>
            <li className="welcome"><h2> Bienvenue {userData.pseudo}</h2></li>
            <Logout />
          </ul>
        ) : (
          <ul>
            <li></li>
            <li>
            <p>Connectez-vous !</p>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
