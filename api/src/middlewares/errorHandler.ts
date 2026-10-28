
import type { ErrorRequestHandler } from 'express';
import mongoose from 'mongoose';

export const errorHandler: ErrorRequestHandler = (
  error,
  _req,
  res,
  _next
) => {
  console.error(error);

  if (error instanceof mongoose.Error.ValidationError) {
    res.status(400).json({
      message: 'Erreur de validation',
      errors: error.message
    });
    return;
  }

  if (error instanceof mongoose.Error.CastError) {
    res.status(400).json({
      message: 'Valeur invalide'
    });
    return;
  }

  res.status(500).json({
    message: 'Erreur interne du serveur'
  });
};
