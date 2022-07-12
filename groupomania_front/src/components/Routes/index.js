import React from "react";
// Import des dépendances
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

// Import des pages
import Home from "../../pages/Home";
import Navbar from "../Navbar";
import Posts from "../../pages/Posts";

// Création des différentes routes qui seront rendu sur le navigateur
const index = () => {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes> 
                <Route path="/" element={<Home />} />
                <Route path="/Publication" element={<Posts />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
    // <Route> définit une relation (mapping) entre une URL et un Component.
};

export default index;
