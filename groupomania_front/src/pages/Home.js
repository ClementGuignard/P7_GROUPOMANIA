import React, { useContext } from "react";
import { useEffect } from "react";
import { UidContext } from "../components/AppContext";
import Log from "../components/Log";   // Import du fichier directeur du Log
import { useNavigate } from "react-router-dom";

const Home = () => {
    const uid = useContext(UidContext);
    let navigate = useNavigate();

    // verifie si un utilisateur est connecté
    useEffect(() => {
        const testUid = () => {
            // si un utilisateur est connecté renvoi sur la page des publications
            if (uid) {
                navigate("/Publication");
            }
        };
        testUid();
    }, [uid, navigate]);
    return (
        <div className="home" role="main" aria-label="Page d'accueil">
            <div className="main">
                <div className="home-header">
                    <Log signin={true} signup={false} /> {/*Logique qui fait apparaitre le signup*/}
                </div>
            </div>
        </div>
    );
};

export default Home;
