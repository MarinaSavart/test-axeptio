const mongoose = require('mongoose');
const Image = require('../models/Image');
const { gfs } = require('../server');

// Contrôleur pour télécharger une image
exports.uploadImage = async (req, res) => {
    try {
        // Créer une nouvelle instance de Image avec les métadonnées
        const newImage = new Image({
            filename: req.file.filename,
            contentType: req.file.mimetype,
            metadata: req.file.metadata
        });

        // Sauvegarder les métadonnées dans la base de données
        const savedImage = await newImage.save();
        res.json({ file: req.file, imageMetadata: savedImage });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Contrôleur pour récupérer une image par ID
exports.getImageById = async (req, res) => {
    try {
        
        // Recherche du fichier dans GridFS
        const file = await gfs.files.findOne({ _id: mongoose.Types.ObjectId(req.params.id) });
        if (!file || file.length === 0) {
            return res.status(404).json({ err: 'No file exists' });
        }

        // Recherche des métadonnées associées dans la collection Image
        const imageMetadata = await Image.findOne({ filename: file.filename });
        if (!imageMetadata) {
            return res.status(404).json({ err: 'No metadata found for this file' });
        }

        // Création d'un flux de lecture pour envoyer le fichier au client
        const readstream = gfs.createReadStream(file.filename);
        res.set('Content-Type', file.contentType);
        res.set('Content-Disposition', `attachment; filename="${file.filename}"`);
        readstream.pipe(res);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
