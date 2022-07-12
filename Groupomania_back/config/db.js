const mongoose = require("mongoose")

mongoose
    .connect(`mongodb+srv://admin:admin77@p7db.v69ns89.mongodb.net/?retryWrites=true&w=majority`)
    .then(() => console.log('Connecté à MongoDB'))
    .catch((err) => console.log('La connexion à mongoDB à échoué', err))