// On appelle le router express pour crée les routes
const router = require("express").Router();

const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");

//Routes auth (Connexion/Inscription et Déconnexion)
router.post("/register", authController.signUp); //  Route pour ajouter un utilisateur, on déclenche la fonction signUp du auth controller
router.post("/login", authController.signIn);   // Se loger
router.get("/logout", authController.logout); // Deconnexion

//Routes users
router.get("/", userController.getAllUsers); // Route pour avoir tout les user
router.get("/:id", userController.userInfo); // Route pour selectionner un seul utilisateur

module.exports = router;
