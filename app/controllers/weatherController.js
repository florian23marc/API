// controller/weatherController.js 
import * as fs from 'fs';
import * as path from 'path';

// Fonction pour lire les données météo depuis un fichier local
export function readWeatherData(filePath) {
    try {
        // Lire les données du fichier
        const data = fs.readFileSync(filePath, 'utf-8');

        // Convertir les données en objet JSON
        return JSON.parse(data);
    } catch (error) {
        console.error("Erreur lors de la lecture des données météo :", error.message);
        throw error; // Propager l'erreur
    }
}
