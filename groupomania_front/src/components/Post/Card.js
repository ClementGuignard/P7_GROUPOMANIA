import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateImage, updatePost } from "../../actions/post.actions";
import { dateParser, isEmpty } from "../Utils";
import DeleteCard from "./DeleteCard";
import LikeButton from "./LikeButton";

const Card = ({post}) => {
  const [isUpdated, setIsUpdated] = useState(false);
  const [textUpdate, setTextUpdate] = useState(null);
  const [postPicture, setPostPicture] = useState(null); // Image que l'on affiche sur le front
  const [file, setFile] = useState(); // Fichier d'image qu'on envoie a la BDD

  const usersData = useSelector((state) => state.usersReducer);
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch(); // Déclanche les actions

  const updateItem = () => { // 
    if (textUpdate) {
      dispatch(updatePost(post._id, textUpdate));
    }
    setIsUpdated(false);
  };

  const handlePicture = (e) => {
    setPostPicture(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
  };

  const cancelImageUpdate = () => {
    setPostPicture(null);
    setFile(null);
  }

  const handleImageUpdate = () => {
    if (postPicture && file) {
      const data = new FormData();
      data.append("posterId", userData._id);
      data.append("file", file);

      dispatch(updateImage(post._id, data));
      cancelImageUpdate();
  } else {
      alert("Please choose image first");
  }
  };
  
  return (
    <li className="card-container" key={post._id}>
        <i className="test"/>
          <>
            <div className="card-left">
            </div>
            <div className="card-right">
              <div className="card-header">
                <div className="pseudo">
                  <h3>
                    {!isEmpty(usersData[0]) && //si isEmpty de user data est pas vide : 
                      usersData
                        .map((user) => { // - On map toute les données utilisateurs
                          if (user._id === post.posterId) return user.pseudo; /// On compare le user et le poster id. et quand on trouve le bon on retourne le pseudo
                          else return null;
                        })
                        .join("")}
                  </h3>
                  <span>{dateParser(post.createdAt)}</span> {/*Appelle la fonction dans utils qui donne la date*/}
                </div>
              </div>
              <br />
              {isUpdated === false && <p>{post.message}</p>} {/*Si isUpdated est false on affiche le message*/}
              {isUpdated && (  // Si il est sur true on affiche la textarea pour modifier notre post
                <div className="update-post">
                  <textarea
                    defaultValue={post.message} // Par défault on aura le message initiable
                    onChange={(e) => setTextUpdate(e.target.value)} // A chaque changement on change la valeur
                  />
                  <div className="button-container">
                    <button className="btn" onClick={updateItem}> {/*onClick sur btn on lancera updateItem*/}
                      Valider Modifications
                    </button>
                  </div>
                </div>
              )}
              {(postPicture || post.picture) && (
                <img src={postPicture || post.picture} alt="contenu du post" className="card-pic"/>
              )}
              {(userData._id === post.posterId || userData.isAdmin === true) && ( // Si c'est l'auteur du post en comparant ou qu'il a admin en true on lui donne le droit
                <div className={`button-container ${postPicture ? 'update-image' : ''}`}>
                  {post.picture && (
                    <>
                      <div>
                        <span className="icon">
                          <img src="./img/icons/photo-editor.svg" alt=""/>
                          <input
                            aria-label="upload-picture"
                            type="file"
                            id="file-upload"
                            name="file"
                            accept=".jpg, .jpeg, .png"
                            onChange={(e) => handlePicture(e)}
                          />
                        </span>
                      </div>
                      {postPicture ? (
                        <div>
                          <button onClick={cancelImageUpdate}>Cancel</button>
                          <button onClick={handleImageUpdate}>Update Image</button>
                        </div>
                      ) : null}
                    </>
                  )}
                  <div onClick={() => setIsUpdated(!isUpdated)}> {/*Change la valeur au click sur le btn*/}
                    <img src="./img/icons/edit.svg" alt="modifier le post"/>
                  </div>
                  <DeleteCard id={post._id}/>  {/*Compenent de suppression de poste*/}
                </div>
              )}
              <div className="card-footer">
                <LikeButton post={post} />
              </div>
            </div>
          </>
        
      </li>
  );
};

export default Card;
