// Appelle mongoose pour les schema
const mongoose = require('mongoose')


// Création du schema des postes
const PostSchema = new mongoose.Schema(
    {
        posterId: {
            type: String,
            required: true
        },
        message: {
            type:String,
            trim: true,
            maxlength: 240,
        },
        picture: {
            type: String,
        },
        likers: {   // On incrémente un tableau avec les ID des personnes qui like les posts
            type: [String],
            required: true,
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('post', PostSchema)