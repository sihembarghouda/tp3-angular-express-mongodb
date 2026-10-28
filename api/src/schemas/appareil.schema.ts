
import { z } from 'zod';

export const appareilSchema = z.object({
  nom: z.string().trim().min(2, 'Le nom doit contenir au moins 2 caractères').max(100),
  marque: z.string().trim().min(1, 'La marque est obligatoire'),
  categorie: z.string().trim().min(1, 'La catégorie est obligatoire'),
  description: z.string().trim().optional().default(''),
  prix: z.coerce.number().min(0, 'Le prix doit être positif ou nul'),
  statut: z.enum(['On', 'Off']).optional().default('Off')
});

export type AppareilInput = z.infer<typeof appareilSchema>;
