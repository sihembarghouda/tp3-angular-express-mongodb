"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Appareil = void 0;
const mongoose_1 = require("mongoose");
const appareilSchema = new mongoose_1.Schema({
    nom: {
        type: String,
        required: [true, 'Le nom est obligatoire'],
        trim: true,
        minlength: 2,
        maxlength: 100
    },
    marque: {
        type: String,
        required: [true, 'La marque est obligatoire'],
        trim: true
    },
    categorie: {
        type: String,
        required: [true, 'La catégorie est obligatoire'],
        trim: true
    },
    description: {
        type: String,
        default: '',
        trim: true
    },
    prix: {
        type: Number,
        required: [true, 'Le prix est obligatoire'],
        min: [0, 'Le prix doit être positif ou nul']
    },
    statut: {
        type: String,
        enum: ['On', 'Off'],
        default: 'Off',
        required: true
    }
}, {
    timestamps: true
});
exports.Appareil = (0, mongoose_1.model)('Appareil', appareilSchema);
