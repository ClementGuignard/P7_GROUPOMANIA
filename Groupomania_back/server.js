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
const rateLimit = require("express-rate-limit");

const app = express();

//Ratelimiter
// La limitation du débit empêche la même adresse IP de faire trop de demandes, ce qui nous aidera à prévenir les attaques brute forces.
const limiter = rateLimit({
  windowMs: 1000 /*ms*/ * 60 /*secondes*/ * 15 /*minutes*/,
  max: 25, // Limite chaque IP a 25 requêtes par tranche de 15 minutes
  standardHeaders: true, 
  legacyHeaders: false, 
});

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
app.use("/api/user/register", limiter);
app.use("/api/user/login", limiter);
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);

// Ecoute du serveur
app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
