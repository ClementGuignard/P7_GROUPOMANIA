/// Page qui gère le fil d'actualité

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../actions/post.actions";
import Card from "./Post/Card";
import { isEmpty } from "./Utils";

const Thread = () => {
  const [loadPost, setLoadPost] = useState(true); // Fonction pour charger les messages qu'on met sur true par défault
  const [count, setCount] = useState(5); /// Compteur de post que l'on vas lire, on lui donne la valeur 5
  const dispatch = useDispatch();  // Lance l'action
  const posts = useSelector((state) => state.postReducer); // Recupère la data (donc les posts)

  const loadMore = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 > // 
      document.scrollingElement.scrollHeight // Quand on scroll la barre vers le bas on passe le setLoadPost sur true
    ) {
      setLoadPost(true);
    }
  };

  useEffect(() => {
    if (loadPost) { // Charge les messages
      dispatch(getPosts(count)); // Appelle dispatch qui vas envoyer l'action, on lui passe count en parametres
      setLoadPost(false); // On passe loadPost sur false pour ne plus l'utiliser
      setCount(count + 5); // On affichera les messages de 5 en 5 
    }

    window.addEventListener("scroll", loadMore); /// Des que l'on scroll on lance la fonction loadMore
    return () => window.removeEventListener("scroll", loadMore);
  }, [loadPost, dispatch, count]);

  return (
    <div className="thread-container">
      <ul>
        {!isEmpty(posts[0]) && // On vérifie qu'il y a de la data dans isEmpty
          posts.map((post) => { /// Methode map
            return <Card post={post} key={post._id} />; 
          })}
      </ul>
    </div>
  );
};

export default Thread;
