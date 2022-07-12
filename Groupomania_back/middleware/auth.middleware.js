const jwt = require("jsonwebtoken");

// Modele des postes et des utilisateurs
const postModel = require("../models/post.model");
const UserModel = require("../models/user.model");

// Vérifie le token de l'user a chaque action
module.exports.checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => { // Vérifie le token en cookie grace a la clé
      if (err) {
        res.locals.user = null;
        res.cookie("jwt", "", { maxAge: 1 }); //  Passe le cookie a une milliseconde et le supprime 
        next();
      } else {
        let user = await UserModel.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

//Verification de l'existence et de la validité du token de l'utilisateur
module.exports.requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        res.send(200).json("Pas de token");
      } else {
        next();
      }
    });
  } else {
    return null;
  }
};

//vérification de la condition Administrateur de l'utilisateur
module.exports.isPostAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return console.log("Pas de token");
  } else {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      if (!err) {
        let user = await UserModel.findById(decodedToken.id);
        let poster = await postModel.findById(req.params.id);
        if (poster.posterId === user.id || user.isAdmin === true) {
          res.locals.user = user;
          next();
        } else {
          res.locals.user = null;
          res.cookie("jwt", "", { maxAge: 1 });
          res.sendStatus(401).json();
        }
      }
    });
  }
};