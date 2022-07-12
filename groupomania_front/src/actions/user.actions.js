import axios from "axios";

export const GET_USER = "GET_USER";
/// Fonctio valabre pour un seul utilisateur, a ne pas confondre avec userS.actions
// On prend le uid et on le passe sur App.js via le reducer
export const getUser = (uid) => {
  return (dispatch) => { // La methode dispatch envoie au reducer qui transmet au store
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/user/${uid}`)
      .then((res) => {
        dispatch({ type: GET_USER, payload: res.data }); // 
      })
      .catch((err) => console.log(err));
  };
};

