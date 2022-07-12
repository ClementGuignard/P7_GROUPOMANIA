import React, { useState } from "react";
import axios from "axios";  // Librairie qui permet de faire des requêtes a une API ou un BDD

// Fonction qui permet grace a useState de modifier les élements de email/password
const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //Prend en charge la connexion
  const handleLogin = (e) => {
    e.preventDefault();
    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/user/login`,
      withCredentials: true,
      data: {
        email,
        password,
      },
    })
      .then((res) => {  
        console.log(res);
        if (res.data.errors) {
          console.log("Echec de la connexion")
        } else {                    // Si pas d'erreur dans la réponse, redirection vers la page d'accueil
          window.location = "/";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // Ici on joint le router.post("/login", authController.signIn) du fichier back user.route.
  return (
    <form action="" onSubmit={handleLogin} id="sign-up-form">  {/* Quand on submit le form, on déclanche handleLogin. */}
      <label htmlFor="email">Email</label>
      <br />
      <input
        type="text"
        name="email"
        id="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <div className="SignInfo">
        <p>Merci d'utiliser votre email de service.</p>
      </div>
      <br />
      <label htmlFor="password">Mot de passe</label>
      <br />
      <input
        type="password"
        name="password"
        id="password"
        onChange={(e) => setPassword(e.target.value)}   ///onChange =  On récupère ce qui est écrit dans le input et on le stock (voir dans le react dev tool)
        value={password}
      />
      <div className="SignInfo">
        <p>Attention, le site se bloquera en cas de tentative de connexion répété.</p>
      </div>
      <br />
      <input type="submit" value="Se connecter" />
    </form>
  );
};
export default SignInForm;
