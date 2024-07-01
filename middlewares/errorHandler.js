// Middleware global de gestion des erreurs
const errorHandler = (err, req, res, next) => {
    console.error(err.stack); // Affichage de la pile d'erreurs dans la console
    res.status(500).send({ message: err.message }); // Envoi de l'erreur au client
};

module.exports = errorHandler;
