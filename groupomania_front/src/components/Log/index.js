import React, { useState } from "react";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

const Log = () => {
  const [signUpModal, setSignUpModal] = useState(true);
  const [signInModal, setSignInModal] = useState(false); 

  // Si on clique sur un des boutons connexion/registre on passe l'autre sur false
  const handleModals = (e) => {
    if (e.target.id === "register") {
      setSignInModal(false);
      setSignUpModal(true);
    } else if (e.target.id === "login") {
      setSignInModal(true);
      setSignUpModal(false);
    }
  };
  return ( /// Ce que l'on retourne dans le navigateur
    <div className="connection-form">
      <div className="form-container">
        <ul>
          <li
            onClick={handleModals}
            id="register"
            className={signUpModal ? "active-btn" : null} /*Au clique déclanche handleModal*/
          >
            S'inscrire
          </li>
          <li
            onClick={handleModals}
            id="login"
            className={signInModal ? "active-btn" : null} /*Au clique déclanche handleModal  */
          >
            Se connecter
          </li>
        </ul>
        {signUpModal && <SignUpForm />}   {/* Si signUp est sur true alors on appelle la fonction signUpForm de la page correspondante  */}
        {signInModal && <SignInForm />}   {/* Même chose mais a l'inverse */}
      </div>
    </div>
  );
};
export default Log;
