"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const errorHandler = (error, _req, res, _next) => {
    console.error(error);
    if (error instanceof mongoose_1.default.Error.ValidationError) {
        res.status(400).json({
            message: 'Erreur de validation',
            errors: error.message
        });
        return;
    }
    if (error instanceof mongoose_1.default.Error.CastError) {
        res.status(400).json({
            message: 'Valeur invalide'
        });
        return;
    }
    res.status(500).json({
        message: 'Erreur interne du serveur'
    });
};
exports.errorHandler = errorHandler;
