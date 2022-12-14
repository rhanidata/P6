const express = require('express');
const app = express();
const mongoose = require("mongoose");
const userRoutes = require("./Routeurs/RtUser");
const saucesRoutes = require('./Routeurs/RtSauce');
const path = require('path');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URL,
{ useNewUrlParser: true,
useUnifiedTopology: true})
.then(() => console.log("Connexion à MongoDB réussie"))
.catch(() => console.log("Connexion à MongoDB échouée"));


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Routes créées pour l'application
app.use("/api/auth", userRoutes);
app.use("/api/sauces", saucesRoutes);

//Pour fournir les images : 
app.use('/images', express.static(path.join(__dirname, 'images')));


module.exports = app;