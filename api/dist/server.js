"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const mongoose_1 = __importDefault(require("mongoose"));
const app_js_1 = __importDefault(require("./app.js"));
const PORT = Number(process.env.PORT) || 3001;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/appareilsDB';
async function startServer() {
    try {
        await mongoose_1.default.connect(MONGODB_URI);
        console.log('Connexion à MongoDB réussie');
        app_js_1.default.listen(PORT, () => {
            console.log(`API démarrée sur http://localhost:${PORT}`);
        });
    }
    catch (error) {
        console.error('Erreur de connexion à MongoDB :', error);
        process.exit(1);
    }
}
startServer();
