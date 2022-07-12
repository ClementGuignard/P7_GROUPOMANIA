import axios from "axios";

// posts
export const GET_POSTS = "GET_POSTS";
export const ADD_POST = "ADD_POST";
export const LIKE_POST = "LIKE_POST";
export const UNLIKE_POST = "UNLIKE_POST";
export const UPDATE_POST = "UPDATE_POST";
export const DELETE_POST = "DELETE_POST";
export const UPDATE_IMAGE = "UPDATE_IMAGE";

//errors
export const GET_POST_ERRORS = "GET_POST_ERRORS";


// Recupère tout les post avec une methode GET et les dispatch
export const getPosts = (num) => { // On recoit le num comme number et on le traite
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/post/`)
      .then((res) => {
        const array = res.data.slice(0, num); /// On garde les postes du 0 au num (5)
        dispatch({ type: GET_POSTS, payload: array }); /// On renvoie la contenance de array dans le payload
      })
      .catch((err) => console.log(err));
  };
};

export const addPost = (data) => {
  return (dispatch) => {
    return axios
      .post(`${process.env.REACT_APP_API_URL}api/post/`, data)
      .then((res) => {
        if (res.data.errors) {
          dispatch({ type: GET_POST_ERRORS, payload: res.data.errors });
        } else {
          dispatch({ type: GET_POST_ERRORS, payload: "" });
        }
      });
  };
};

// Pour like un post
export const likePost = (postId, userId) => { // On passe l'ID du post et du user
  return (dispatch) => {
    return axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}api/post/like-post/` + postId, // methode patch sur cette url
      data: { id: userId },
    })
      .then((res) => {
        dispatch({ type: LIKE_POST, payload: { postId, userId } });
      })
      .catch((err) => console.log(err));
  };
};

// Meme logique que pour le post au dessus
export const unlikePost = (postId, userId) => {
  return (dispatch) => {
    return axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}api/post/unlike-post/` + postId,
      data: { id: userId },
    })
      .then((res) => {
        dispatch({ type: UNLIKE_POST, payload: { postId, userId } });
      })
      .catch((err) => console.log(err));
  };
};


// Modifier un post
export const updatePost = (postId, message) => { // Prendre l'ID du post et le message
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}api/post/${postId}`, // Faire une requete GET sur cette url
      data: { message },
      withCredentials: true,
    })
      .then((res) => {
        dispatch({ type: UPDATE_POST, payload: { message, postId } });
      })
      .catch((err) => console.log(err));
  };
};

export const updateImage = (postId, fileData) => {
  return (dispatch) => {
    return axios.put(`${process.env.REACT_APP_API_URL}api/post/update-image/${postId}`, fileData, {
      withCredentials: true,
    }).then((res) => {
        dispatch({ type: UPDATE_IMAGE, payload: { picture: res.data.picture, postId } });
      })
      .catch((err) => console.log(err));
  };
}


// Supprime le post
export const deletePost = (postId) => {
  return (dispatch) => {
    return axios({ // Envoie une requête delete sur cette url 
      method: "delete",
      url: `${process.env.REACT_APP_API_URL}api/post/${postId}`,
      withCredentials: true,
    })
      .then((res) => {
        dispatch({ type: DELETE_POST, payload: { postId } });
      })
      .catch((err) => console.log(err));
  };
};

