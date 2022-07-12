// Package mongoose pour crée les schemas
const mongoose = require("mongoose");
// Appelle la fonction isEmail de validator
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    pseudo: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 20,
      unique: true,
      trim: true, //Le trim supprime les espaces
    },
    email: {
      type: String,
      required: true,
      validate: [isEmail], // Fonction de la bibliotheque validator qui vérifie l'email
      lowercase: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      max: 1024,
      minlength: 3,
    },
    likes: {
      type: [String], // Incrémente le tableau de like par l'id du user pour éviter des likes a l'infini
    },
    isAdmin: { // Donne l'accès a des options de modifications de post dans
      type: Boolean,
    }
  },
);


// Fonction jouer avant d'être stocker dans la BDD
userSchema.pre("save", async function (next) { // methode .pre pour être utiliser avant de stocker dans la bdd
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt); // hash du password
  next();
});

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw console.log("Mauvais mot de passe");
  }
  throw console.log("E-mail incorrect");
};

const UserModel = mongoose.model("user", userSchema); // On incrémente userSchema dans la table user de la BDD

module.exports = UserModel;
