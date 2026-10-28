
import { Schema, model } from 'mongoose';

export interface IAppareil {
  nom: string;
  marque: string;
  categorie: string;
  description: string;
  prix: number;
  statut: 'On' | 'Off';
}

const appareilSchema = new Schema<IAppareil>(
  {
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
  },
  {
    timestamps: true
  }
);

export const Appareil = model<IAppareil>('Appareil', appareilSchema);
