import * as https from 'https';
import * as fs from 'fs';

// Fonction pour récupérer les données depuis une API
export async function fetchWeatherData(baseUrl) {
    return new Promise((resolve, reject) => {
        https.get(baseUrl, (res) => {
            let data = '';

            // Accumuler les données reçues
            res.on('data', (chunk) => {
                data += chunk;
            });

            // Terminer la réception et résoudre la promesse
            res.on('end', () => {
                try {
                    const parsedData = JSON.parse(data);
                    resolve(parsedData);
                } catch (err) {
                    reject(new Error(`Erreur de parsing JSON : ${err.message}`));
                }
            });
        }).on('error', (err) => {
            reject(new Error(`Erreur lors de la requête HTTP : ${err.message}`));
        });
    });
}

// Fonction pour lire les données depuis un fichier JSON local
export function readWeatherData(filePath) {
    try {
        // Vérifier si le fichier existe
        if (!fs.existsSync(filePath)) {
            throw new Error(`Fichier introuvable : ${filePath}`);
        }

        // Lire les données du fichier
        const data = fs.readFileSync(filePath, 'utf-8');
        // Convertir les données en objet JSON
        return JSON.parse(data);
    } catch (error) {
        console.error("Erreur lors de la lecture des données météo :", error.message);
        throw error; // Propager l'erreur
    }
}
