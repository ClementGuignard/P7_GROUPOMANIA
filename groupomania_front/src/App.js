import React, { useEffect, useState } from "react";

//Import du UidContext
import { UidContext } from "./components/AppContext";


// Import des routes car App.js est un components haut dans l'application
import Routes from "./components/Routes";   
import axios from "axios";
import { useDispatch } from "react-redux";
import { getUser } from "./actions/user.actions";

const App = () => {
  const [uid, setUid] = useState(null);
  const dispatch = useDispatch(); // 

  useEffect(() => {
    const fetchToken = async () => {
      await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}jwtid`,
        withCredentials: true,
      })
        .then((res) => {
          setUid(res.data); //j'attribue la data (l'id utilisateur) comme uid
        })
        .catch((err) => console.log("No token"));
    };
    fetchToken();

    if (uid) dispatch(getUser(uid)); // Si l'uid existe on appelle l'action getUser
  }, [uid, dispatch]);

  return (
    //Au plus haut de react l'uid qui permet de charger le contenu de l'utilisateur et la route
    ///
    <UidContext.Provider value={uid}>
      <Routes />
    </UidContext.Provider>
  );
};

export default App;
