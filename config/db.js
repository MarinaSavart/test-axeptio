const mongoose = require('mongoose');
const Grid = require('gridfs-stream');

const connectDB = async () => {
    try {
        // Connexion à MongoDB
        const conn = await mongoose.createConnection(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        // Initialisation de GridFS
        const gfs = Grid(conn.db, mongoose.mongo);
        gfs.collection('uploads');

        console.log('MongoDB connected');
        return { conn, gfs };
    } catch (err) {
        console.error('Error connecting to MongoDB', err);
        process.exit(1); // Sortie du processus en cas d'échec
    }
};

module.exports = connectDB;
