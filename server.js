require('dotenv').config(); // Chargement des variables d'environnement
const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const imageRoutes = require('./routes/imageRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
const port = process.env.PORT || 3000;

// Middleware pour parser le JSON
app.use(bodyParser.json());

// Middleware global pour la gestion des erreurs
app.use(errorHandler);

// Connexion à MongoDB et initialisation de GridFS
(async () => {
    const { gfs } = await connectDB();
    app.locals.gfs = gfs; // Stockage de gfs dans les locals de l'application

    // Utilisation des routes pour les images après la connexion à la base de données
    app.use('/images', imageRoutes);

    // Démarrage du serveur
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
})();

module.exports = app;
