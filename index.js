const BASE_URL = "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m,rain,wind_speed_80m,soil_temperature_6cm";
import * as fs from 'fs';

// Fonction pour récupérer les données de l'API
async function getLucasClassical() {
    try {
        // Effectuer une requête fetch vers l'API
        const response = await fetch(BASE_URL);

        // Vérifier si la réponse est OK
        if (!response.ok) {
            throw new Error(`Erreur: ${response.status} - ${response.statusText}`);
        }

        // Convertir la réponse en JSON
        const data = await response.json();

        // Afficher les données dans la console
        console.log("Données reçues :", data);

        // Générer un horodatage pour le nom du fichier
        const now = new Date();
        const timestamp = now.toISOString().replace(/[:.]/g, '-'); // Format ISO ajusté pour les noms de fichiers
        const fileName = `sauvegarde_${timestamp}.json`; // Nom du fichier basé sur l'heure

        // Écrire les données dans un fichier avec le nom horodaté
        fs.writeFileSync(fileName, JSON.stringify(data, null, 2), 'utf-8');

        console.log(`Données enregistrées dans le fichier : ${fileName}`);
    } catch (error) {
        // Gérer les erreurs
        console.error("Erreur lors de l'appel à l'API :", error.message);
    }
}

// Appeler la fonction
getLucasClassical();

