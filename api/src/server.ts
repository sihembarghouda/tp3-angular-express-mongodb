
import 'dotenv/config';
import mongoose from 'mongoose';
import app from './app.js';

const PORT = Number(process.env.PORT) || 3001;
const MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/appareilsDB';

async function startServer() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connexion à MongoDB réussie');

    app.listen(PORT, () => {
      console.log(`API démarrée sur http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Erreur de connexion à MongoDB :', error);
    process.exit(1);
  }
}

startServer();
