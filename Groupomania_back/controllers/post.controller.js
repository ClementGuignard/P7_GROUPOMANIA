const PostModel = require("../models/post.model");
const UserModel = require("../models/user.model");
const fs = require("fs");
const ObjectID = require("mongoose").Types.ObjectId;

//CRUD : Create
module.exports.createPost = async (req, res) => {
  let fileName;
  if (req.file) {
    try {
      if (
        req.file.mimetype !== "image/jpg" &&
        req.file.mimetype !== "image/png" &&
        req.file.mimetype !== "image/jpeg"
      )
        throw console.log("Type de fichier invalide");
      if (req.file.size > 500000) 
        throw console.log("Fichier trop volumineux");

    } catch (error) {
        return res.status(201).json({ error });
    }
    fileName = req.body.posterId + Date.now() + ".jpg";      //nouveau nom du fichier
    fs.writeFile(                                             // stockage de la nouvelle image
      `../groupomania_front/public/uploads/posts/${fileName}`,
      req.file.buffer,
      (err) => {
        if (err) throw err;
      }
    );
  }
  const newPost = new PostModel({
    posterId: req.body.posterId,
    message: req.body.message,
    picture: req.file ? `./uploads/posts/` + fileName : "",
    likers: [],
  });
  try {
    const post = await newPost.save();
    return res.status(201).json(post);
  } catch (err) {
    return res.status(400).send(err);
  }
};

//CRUD : Read
// Recupère toute la data des postes
module.exports.readPost = (req, res) => {  
  PostModel.find((err, docs) => {
    if (!err) res.send(docs);
    else console.log("Erreur dans l'obtention des données : " + err);
  }).sort({ createdAt: -1 });
};

//CRUD : Update
module.exports.updatePost = (req, res) => {
  if (!ObjectID.isValid(req.params.id)) // Controle l'ID
    return res.status(400).send("ID inconnu : " + req.params.id); 

  const updatedRecord = {
    message: req.body.message,
  };
  PostModel.findByIdAndUpdate(
    req.params.id,
    { $set: updatedRecord },
    { new: true },
    (err, docs) => {
      if (!err) res.status(200).send(docs);
      else console.log("Erreur lors de la mise à jour : " + err);
    }
  );
};

//CRUD : Update
module.exports.updateImage = (req, res) => {
  let fileName;
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID inconnu : " + req.params.id); //une erreur m'en informe
  if (req.file) {
    try {
      if (
        req.file.mimetype !== "image/jpg" &&
        req.file.mimetype !== "image/png" &&
        req.file.mimetype !== "image/jpeg"
      )
        console.log("Type de fichier invalide");
      if (req.file.size > 500000) console.log("Fichier trop volumineux");
    } catch (err) {
      return res.status(201).json({ errors });
    }
    fileName = req.body.posterId + Date.now() + ".jpg";
    fs.writeFile(
      `../groupomania_front/public/uploads/posts/${fileName}`,
      req.file.buffer,
      (err) => {
        if (err) throw err;
      }
    );
    const updatedRecord = {
      picture: `./uploads/posts/` + fileName,
    };
    PostModel.findByIdAndUpdate(
      req.params.id,
      { $set: updatedRecord },
      { new: true },
      (err, docs) => {
        if (!err) res.status(200).send(docs);
        else console.log("Erreur lors de la mise à jour : " + err);
      }
    );
  } else {
    return res.status(400).send("Erreur lors de la mise à jour");
  }
};

//CRUD : Delete
module.exports.deletePost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID inconnu : " + req.params.id); 

  PostModel.findByIdAndRemove(req.params.id, (err, docs) => {
    if (!err) {
      fs.unlink(docs.picture, () => {});
      res.send(docs);
    } else console.log("Erreur lors de la suppression : " + err);
  });
};

//like-post
module.exports.likePost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    //
    return res.status(400).send("ID inconnu : " + req.params.id); //

  try {
    let updatedLikers = await PostModel.findByIdAndUpdate(
      // mise à jour des utilisateurs ayant like ce post
      req.params.id, //identification du commentaire à modifier dans les parametres de la requete
      { $addToSet: { likers: req.body.id } }, //j'ajoute avec $addToSet l'id figurant dans le corps de la requête dans le tableau likers du post
      { new: true }
    );
    res.json({ updatedLikers });
    let updatedLikes = await UserModel.findByIdAndUpdate(
      req.body.id,
      { $addToSet: { likes: req.params.id } },
      { new: true }
    );
    res.json({ updatedLikes });
  } catch (err) {
    return;
  }
};

//unlike-post
module.exports.unlikePost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    //
    return res.status(400).send("ID inconnu : " + req.params.id); //

  try {
    let updatedLikers = await PostModel.findByIdAndUpdate(
      req.params.id,
      { $pull: { likers: req.body.id } },
      { new: true }
      );
    res.json({ updatedLikers });
    let updatedLikes = await UserModel.findByIdAndUpdate(
      req.body.id,
      { $pull: { likes: req.params.id } },
      { new: true }
      );
    res.json({ updatedLikes });
  } catch (err) {
    return;
  }
};