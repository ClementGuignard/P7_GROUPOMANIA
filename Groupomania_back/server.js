// Appelle du module Express
const express = require("express");
// Gère les cookies
const cookieParser = require("cookie-parser");

// Apelle des routes
const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");

// Dotenv et DB visible dans le fichier config
require("dotenv").config({ path: "./config/.env" });
require("./config/db");

//Appelle du middleware de authentification
const { checkUser, requireAuth } = require("./middleware/auth.middleware");

// Appelle de CORS et rateLimiter
const cors = require("cors");

const app = express();

//Paramètre CORS
const corsOptions = {
  origin: ["http://localhost:3000", "*"],
  default: "http://localhost:3000",
  credentials: true,
  allowedHeaders: ["sessionId", "Content-Type"],
  exposedHeaders: ["sessionId"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//jwt
/// Sur n'importe quel route on déclanche le middleware checkUser
app.get("*", checkUser);
app.get("/jwtid", requireAuth, (req, res) => {
  res.status(200).send(res.locals.user._id);
});
// Quand on fait un GET sur /jwtid on déclanche le middleware requireAuth(qui controle le token) qui donne le ID du user

//Déclaration des routes :
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);

// Ecoute du serveur
app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
