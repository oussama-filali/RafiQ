const express = require('express');
const app = express();
const path = require('path');

// Servir les fichiers statiques (CSS, JS, images)
app.use(express.static(path.join(__dirname, 'public')));

// Middleware pour parser les données JSON (pour les API)
app.use(express.json());

// Route pour la page d'accueil
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Route pour la page d'inscription
app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'signup.html'));
});

// Route pour la page des ressources
app.get('/resources', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'resources.html'));
});

// API fictive pour la recherche (à remplacer par une vraie API plus tard)
app.get('/api/search', (req, res) => {
    const query = req.query.q;
    // Exemple de données fictives
    const results = [
        { id: 1, type: 'restaurant', name: 'Restaurant Solidaire', lat: 48.8566, lng: 2.3522, description: 'Repas gratuits' },
        { id: 2, type: 'benevole', name: 'Marie D.', lat: 48.8600, lng: 2.3500, description: 'Aide administrative' }
    ].filter(item => item.description.toLowerCase().includes(query.toLowerCase()));
    res.json(results);
});

// API fictive pour les profils des aidants
app.get('/api/profiles', (req, res) => {
    const profiles = [
        { id: 1, name: 'Marie D.', description: 'Aide administrative, accompagnement social', location: 'À 1 km de vous' },
        { id: 2, name: 'Ahmed K.', description: 'Propose des repas gratuits', location: 'À 2 km de vous' }
    ];
    res.json(profiles);
});

// Démarrer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});