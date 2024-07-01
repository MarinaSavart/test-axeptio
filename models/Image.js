const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    filename: {
        type: String,
        required: true
    },
    contentType: {
        type: String,
        required: true
    },
    uploadDate: {
        type: Date,
        default: Date.now
    },
    metadata: {
        type: Object,
        required: false
    }
});

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;
