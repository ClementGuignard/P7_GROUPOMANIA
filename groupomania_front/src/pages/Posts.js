import React, { useContext, useEffect } from "react";
import { UidContext } from "../components/AppContext";
import NewPostForm from "../components/Post/NewPostForm";
import Thread from "../components/Thread";
import { useNavigate } from "react-router-dom";

const Posts = () => {
    const uid = useContext(UidContext);
    let navigate = useNavigate();

    // verifie si un utilisateur est connecté aucun utilisateur connecté renvoi sur la page de login
    useEffect(() => {
        const testUid = () => {
            if (!uid) {
                navigate("/");
            }
        };
        testUid();
    }, [uid, navigate]);

    // Component Thread (fil actualité) et Nouveau poste (NewPostForm)
    return (
        <div className="home" role="main" aria-label="Page d'accueil">
            <div className="main">
                <div className="home-header">
                    <NewPostForm />
                </div>
                <Thread />
            </div>
        </div>
    );
};
export default Posts;
