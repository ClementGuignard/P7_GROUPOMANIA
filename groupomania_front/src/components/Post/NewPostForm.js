import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost, getPosts } from "../../actions/post.actions";

const NewPostForm = () => {
    const [message, setMessage] = useState(""); // Variable qui contient du texte dans le message
    const [postPicture, setPostPicture] = useState(null); // Variable qui contient une image
    const [file, setFile] = useState(); // Fichier d'image qu'on envoie a la BDD pour qu'on puisse l'afficher
    const userData = useSelector((state) => state.userReducer); // Appelle du store state.userReducer
    const dispatch = useDispatch();

    // envoi de la publication aux Backend
    const handlePost = () => {
        if (message || postPicture) { // Si il y a un  message ou une image
            const data = new FormData();  /// Crée un formdata qui stock le message et la photo
            data.append("posterId", userData._id);
            data.append("message", message);
            if (file) data.append("file", file);

            dispatch(addPost(data)); /// Dispatch la data dans la BDD
            dispatch(getPosts()); /// Puis récupère dans la BDD les postes
            cancelPost();
        } else {
            alert("Veuillez entrer un message");
        }
    };

    // remise a zero des champs de texte
    const cancelPost = () => {  // Annule tout ce qui est dans les guillemets
        setMessage("");
        setPostPicture("");
        setFile("");
    };

    // Variable qui stock la photo en front et l'affiche en prévisualisation 
    const handlePicture = (e) => {
        setPostPicture(URL.createObjectURL(e.target.files[0])); // On incrémente setPostPictures
        setFile(e.target.files[0]); // On incrémente setFile
    };

    return (
        <div className="post-container">
            <>
                <div className="post-form">
                    <textarea /// Textarea ou on écrit nos postes
                        name="message"
                        id="message"
                        placeholder="..."
                        onChange={(e) => setMessage(e.target.value)} // Quand ça change on incremente la variable message
                        value={message}
                    />
                    { postPicture ? ( /// Prévisualisation de l'image sous le message
                        <li className="card-container">
                            <div className="card-right">
                                <div className="content">                                    
                                    <img
                                        src={postPicture}
                                        alt=''
                                    />
                                </div>
                            </div>
                        </li>
                    ) : null}
                    <div className="footer-form">
                        <div className="icon">
                            <>
                                <img
                                    src="./img/icons/picture.svg"
                                    alt="icone d'upload de fichier"
                                />
                                <input
                                    aria-label="upload-picture"
                                    type="file"
                                    id="file-upload"
                                    name="file"
                                    accept=".jpg, .jpeg, .png" // Accepte uniquement ce type de fichier
                                    onChange={(e) => handlePicture(e)} // Au changement appelle la fonction handlePicture
                                />
                            </>
                        </div>
                        <div className="btn-send">
                            <button className="cancel" onClick={cancelPost}>Annuler message</button>    {/*Au clique on déclanche cancelPost pour effacer*/}
                            <button className="send" onClick={handlePost}>Envoyer</button>    {/*Au clique on déclanche handlePost pour transmettre au back*/}
                        </div>
                    </div>
                </div>
            </>
        </div>
    );
};

export default NewPostForm;
