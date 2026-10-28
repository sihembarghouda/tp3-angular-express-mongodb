# Appareils — Gestion des appareils électroménagers

## 1. Présentation du projet

**Appareils** est une application web full-stack permettant de gérer une liste d'appareils électroménagers. Elle a été réalisée dans le cadre du TP3 de développement full-stack.

L'application utilise Angular pour l'interface utilisateur, Node.js et Express pour l'API REST, et MongoDB avec Mongoose pour la persistance des données.

## 2. Technologies utilisées

- **Frontend :** Angular, TypeScript, Bootstrap
- **Backend :** Node.js, Express
- **Base de données :** MongoDB, Mongoose
- **Validation :** Zod
- **Communication :** API REST, HttpClient, CORS
- **Conteneurisation :** Docker et Docker Compose
- **Gestion de versions :** Git et GitHub

## 3. Architecture du projet

```text
appareils-tp/
├── front/                 # Application Angular
├── api/                   # API REST Express
├── docker-compose.yml     # Configuration Docker
├── .gitignore
└── README.md
```

## 4. Fonctionnalités

L'application permet de :

- Afficher la liste des appareils.
- Ajouter un nouvel appareil.
- Modifier les informations d'un appareil.
- Supprimer un appareil.
- Changer le statut d'un appareil (On / Off).
- Changer le statut de tous les appareils.
- Valider les données reçues par l'API.
- Enregistrer les appareils dans MongoDB.

Les informations d'un appareil comprennent son nom, sa marque, sa catégorie, sa description, son prix et son statut.

## 5. Prérequis

Avant de lancer le projet, installer :

- Node.js et npm
- Docker Desktop
- Git

## 6. Installation et lancement

### Étape 1 — Démarrer le backend et MongoDB

Depuis le dossier racine du projet :

```bash
docker compose up --build -d
```

Cette commande démarre les conteneurs MongoDB et Express.

Vérifier leur état :

```bash
docker compose ps
```

L'API est accessible sur :

```text
http://localhost:3002
```

Vérifier que le serveur répond :

```text
http://localhost:3002/api/health
```

La route de santé doit retourner un statut indiquant que l'API fonctionne.

### Étape 2 — Installer les dépendances du frontend

Ouvrir un nouveau terminal :

```bash
cd front
npm install
```

### Étape 3 — Lancer Angular

Toujours depuis le dossier `front` :

```bash
npx ng serve
```

Ouvrir ensuite l'application dans le navigateur :

```text
http://localhost:4200
```

Le frontend communique avec l'API via :

```text
http://localhost:3002/api/appareils
```

## 7. Endpoints de l'API REST

Base URL : `http://localhost:3002/api`

| Méthode | Endpoint | Description |
|---|---|---|
| GET | `/health` | Vérifier l'état de l'API |
| GET | `/appareils` | Récupérer tous les appareils |
| GET | `/appareils/:id` | Récupérer un appareil par son identifiant |
| POST | `/appareils` | Ajouter un appareil |
| PUT | `/appareils/:id` | Modifier un appareil |
| DELETE | `/appareils/:id` | Supprimer un appareil |
| PATCH | `/appareils/switch-all` | Changer le statut de tous les appareils |

Les données sont stockées dans la base MongoDB `appareilsDB`.

## 8. Gestion des données

Mongoose définit le modèle des appareils et assure l'interaction avec MongoDB. Les données sont conservées dans une collection dédiée.

La validation des données entrantes permet de contrôler les informations envoyées à l'API avant leur traitement.

## 9. Arrêter le projet

Pour arrêter les conteneurs :

```bash
docker compose down
```

Les données MongoDB sont conservées dans le volume Docker `mongodata`. Pour supprimer également ce volume et les données qu'il contient, utiliser :

```bash
docker compose down -v
```

**Attention :** cette dernière commande supprime les données persistées dans le volume.

## 10. Dépôt GitHub

Le code source du projet est disponible sur GitHub :

https://github.com/sihembarghouda/tp3-angular-express-mongodb

## 11. Objectifs pédagogiques

Ce projet permet de mettre en pratique :

- La création de composants et de services Angular.
- Le data binding et la gestion des événements.
- La communication entre un frontend et une API REST.
- La création d'une API avec Express.
- La persistance des données avec MongoDB et Mongoose.
- La validation des données.
- L'utilisation de Docker Compose pour exécuter plusieurs services.
- La gestion du code source avec Git et GitHub.
