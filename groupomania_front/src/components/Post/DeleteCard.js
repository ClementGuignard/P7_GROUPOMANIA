import React from "react";
import { useDispatch } from "react-redux";
import { deletePost } from "../../actions/post.actions";

const DeleteCard = (props) => {
  const dispatch = useDispatch();

  const deleteQuote = () => dispatch(deletePost(props.id)); // Dispatch lance deletePost

  return (
    <div
      onClick={() => {
        if (window.confirm("Voulez-vous supprimer cet article?")) { // Au clique on demande une confirmation dans une fenêtre
          deleteQuote(); // Si OK on lance la fonction deleteQuote
        }
      }}
    >
      <img src="./img/icons/trash.svg" alt="supprimer le post" />
    </div>
  );
};

export default DeleteCard;
