// index.js
import { readWeatherData } from './app/controllers/weatherController.js';
import { saveDataToFile } from './app/controllers/fileController.js';
import { logData, logError } from './app/controllers/loggerController.js';

// Chemin vers le fichier JSON contenant les données météo simulées
const WEATHER_DATA_FILE = './data/weatherData.json';

// Fonction principale pour obtenir et sauvegarder les données
async function main() {
    try {
        // Lire les données météo depuis le fichier local
        logData("Lecture des données météo...");
        const weatherData = readWeatherData(WEATHER_DATA_FILE);

        // Sauvegarder les données dans un fichier
        logData("Sauvegarde des données dans un fichier...");
        saveDataToFile(weatherData);

        // Log de succès
        logData("Processus terminé avec succès.");
    } catch (error) {
        // Log des erreurs
        logError("Une erreur est survenue lors du processus.");
        logError(error.message);
    }
}

// Appeler la fonction principale
main();
