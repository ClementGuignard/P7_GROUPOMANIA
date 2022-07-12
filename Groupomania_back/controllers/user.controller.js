// Appelle le UserModel de 
const UserModel = require("../models/user.model");
const ObjectID = require("mongoose").Types.ObjectId;

//Obtenir les données de tous les utilisateurs
module.exports.getAllUsers = async (req, res) => {
  const users = await UserModel.find({}, {pseudo:true, likes:true})
  //les données SAUF le mot de passe et email sont renvoyées
  res.status(200).json(users);
};

//Obtenir les données d'un seul utilisateur
module.exports.userInfo = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    //Si l'id de la requête n'est pas valide, je m'arrête là, et je réponds avec une erreur
    return res.status(400).send("ID inconnu : " + req.params.id);

  UserModel.findById(req.params.id, (err, docs) => {
    //Si l'id de la requête est valide je récupère les données de l'utilisateur concerné
    if (!err) res.send(docs);
    else console.log("ID inconnu : " + err);
  }).select("-password"); // on ne prend pas le mot de passe pour des raisons de sécurité.
};