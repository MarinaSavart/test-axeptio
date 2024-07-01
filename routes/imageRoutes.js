const express = require('express');
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const { uploadImage, getImageById } = require('../controllers/imageController');
const connectDB = require('../config/db');

const router = express.Router();

(async () => {
    const { conn } = await connectDB(); // Connexion à la base de données

    // Configuration de GridFsStorage pour multer
    const storage = new GridFsStorage({
        db: conn.db, // Utilisation de l'instance de la base de données
        file: (req, file) => {
            return {
                filename: file.originalname,
                bucketName: 'uploads'
            };
        }
    });

    const upload = multer({ storage });

    // Route pour télécharger une image
    router.post('/upload', upload.single('file'), uploadImage);

    // Route pour récupérer une image par ID
    router.get('/:id', getImageById);
})();

module.exports = router;
