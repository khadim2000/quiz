const express = require('express');
const fs = require('fs');
const Papa = require('papaparse');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors()); // Autorise React à accéder à l'API

let playersData = [];

// Charger les données CSV au démarrage du serveur
fs.readFile('/home/khadim/fichier_avec_images.csv', 'utf8', (err, data) => {
    if (!err) {
        const result = Papa.parse(data, { header: true });
        playersData = result.data.filter(row => row.Name && row.image_url);
    }
});

// Route pour récupérer l’image d’un joueur par son nom
app.get('/player-image/:name', (req, res) => {
    const playerName = req.params.name.toLowerCase();

    const player = playersData.find(p => p.Name.toLowerCase() === playerName);

    if (player) {
        res.json({ image: player.image_url });
    } else {
        res.status(404).json({ error: "Joueur non trouvé" });
    }
});

// Lancer le serveur
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
