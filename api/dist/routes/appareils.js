"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mongoose_1 = __importDefault(require("mongoose"));
const Appareil_js_1 = require("../models/Appareil.js");
const appareil_schema_js_1 = require("../schemas/appareil.schema.js");
const router = (0, express_1.Router)();
// GET : récupérer tous les appareils
router.get('/', async (_req, res, next) => {
    try {
        const appareils = await Appareil_js_1.Appareil.find().sort({ createdAt: -1 });
        res.status(200).json(appareils);
    }
    catch (error) {
        next(error);
    }
});
// GET : récupérer un appareil par son identifiant
router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!mongoose_1.default.isValidObjectId(id)) {
            res.status(400).json({ message: 'Identifiant invalide' });
            return;
        }
        const appareil = await Appareil_js_1.Appareil.findById(id);
        if (!appareil) {
            res.status(404).json({ message: 'Appareil introuvable' });
            return;
        }
        res.status(200).json(appareil);
    }
    catch (error) {
        next(error);
    }
});
// POST : créer un appareil avec validation Zod
router.post('/', async (req, res, next) => {
    try {
        const validation = appareil_schema_js_1.appareilSchema.safeParse(req.body);
        if (!validation.success) {
            res.status(400).json({
                message: 'Données invalides',
                errors: validation.error.issues
            });
            return;
        }
        const appareil = await Appareil_js_1.Appareil.create(validation.data);
        res.status(201).json(appareil);
    }
    catch (error) {
        next(error);
    }
});
// PUT : modifier un appareil avec validation Zod
router.put('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!mongoose_1.default.isValidObjectId(id)) {
            res.status(400).json({ message: 'Identifiant invalide' });
            return;
        }
        const validation = appareil_schema_js_1.appareilSchema.safeParse(req.body);
        if (!validation.success) {
            res.status(400).json({
                message: 'Données invalides',
                errors: validation.error.issues
            });
            return;
        }
        const appareil = await Appareil_js_1.Appareil.findByIdAndUpdate(id, validation.data, {
            new: true,
            runValidators: true
        });
        if (!appareil) {
            res.status(404).json({ message: 'Appareil introuvable' });
            return;
        }
        res.status(200).json(appareil);
    }
    catch (error) {
        next(error);
    }
});
// DELETE : supprimer un appareil
router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!mongoose_1.default.isValidObjectId(id)) {
            res.status(400).json({ message: 'Identifiant invalide' });
            return;
        }
        const appareil = await Appareil_js_1.Appareil.findByIdAndDelete(id);
        if (!appareil) {
            res.status(404).json({ message: 'Appareil introuvable' });
            return;
        }
        res.status(200).json({
            message: 'Appareil supprimé avec succès'
        });
    }
    catch (error) {
        next(error);
    }
});
// PATCH : inverser le statut de tous les appareils
router.patch('/switch-all', async (_req, res, next) => {
    try {
        const appareils = await Appareil_js_1.Appareil.find();
        for (const appareil of appareils) {
            appareil.statut = appareil.statut === 'On' ? 'Off' : 'On';
            await appareil.save();
        }
        res.status(200).json({
            message: 'Statut de tous les appareils inversé',
            count: appareils.length
        });
    }
    catch (error) {
        next(error);
    }
});
exports.default = router;
