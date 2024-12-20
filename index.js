import express from 'express'; // Framework pour créer l'API
import { fetchWeatherData } from './app/controllers/weatherController.js';
import { saveDataToFile } from './app/controllers/fileController.js';
import { logData, logError } from './app/controllers/loggerController.js';
import { readWeatherData } from './app/controllers/weatherController.js'; // Importer la fonction de lecture des données
/*import { nom des fonctions } from ' chemin vers le controller qui contien la/les fonctions' */

const BASE_URL = "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m,rain,wind_speed_80m,soil_temperature_6cm";
const API_PORT = 3000; // Port de l'API

// Fonction principale pour obtenir et sauvegarder les données
async function main() {
    try {
        logData("Récupération des données météo...");
        const weatherData = await fetchWeatherData(BASE_URL); /*On récupère les data météo de l'api et on stock dans une fonction -> Dans weatherController.js*/

        logData("Sauvegarde des données dans un fichier...");
        saveDataToFile(weatherData); /*On sauvegarde les données récoltées de l'API et on les mets dans un fichier -> Dans fileController.js*/

        logData("Lancement de l'API...");
        startWeatherAPI(); /*Fonction qui permet de config la route pour avoir les données du fichier json */

        logData("Processus terminé avec succès.");
    } catch (error) {
        logError("Une erreur est survenue lors du processus.");
        logError(error.message);
    }
}

// Fonction pour démarrer l'API, ce que l'on va affiché dans le navigateur
function startWeatherAPI() {
    const app = express();

    // Route pour obtenir les données du fichier JSON, on configure la route pour récupéré les data depuis le lien qui fait office d'API
    app.get('/api/weather/:path', (req, res) => {
        const filePath = `./data/${req.params.path}`;
        logData(`Chemin demandé : ${filePath}`);

        try {
            const data = readWeatherData(filePath); // Lire les données JSON, Fonction pour lire les données depuis un fichier JSON local -> weatherController.js
            logData(`Données récupérées : ${JSON.stringify(data)}`);
            res.json(data); // Renvoyer les données au client
        } catch (error) {
            logError(`Erreur lors de la récupération des données pour le fichier : ${filePath}`);
            logError(error.message);
            res.status(500).json({ error: "Erreur lors de la récupération des données." });
        }
    });

    // Lancer le serveur
    app.listen(API_PORT, () => {
        logData(`API démarrée sur http://localhost:${API_PORT}`);
    });
}

// Appeler la fonction principale
main();
