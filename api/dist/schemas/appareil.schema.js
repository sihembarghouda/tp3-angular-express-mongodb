"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appareilSchema = void 0;
const zod_1 = require("zod");
exports.appareilSchema = zod_1.z.object({
    nom: zod_1.z.string().trim().min(2, 'Le nom doit contenir au moins 2 caractères').max(100),
    marque: zod_1.z.string().trim().min(1, 'La marque est obligatoire'),
    categorie: zod_1.z.string().trim().min(1, 'La catégorie est obligatoire'),
    description: zod_1.z.string().trim().optional().default(''),
    prix: zod_1.z.coerce.number().min(0, 'Le prix doit être positif ou nul'),
    statut: zod_1.z.enum(['On', 'Off']).optional().default('Off')
});
