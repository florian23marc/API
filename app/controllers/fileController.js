import * as fs from 'fs';
import * as path from 'path';

// Fonction pour sauvegarder les données dans un fichier
export function saveDataToFile(data, folderPath = 'data') {
    try {
        // Générer un horodatage pour le nom du fichier, le nom est généré en fonction de la date et heure, a chaque lancement du prog
        const now = new Date();
        const timestamp = now.toISOString().replace(/[:.]/g, '-'); // Format ISO ajusté pour les noms de fichiers
        const fileName = `sauvegarde_${timestamp}.json`; // Nom du fichier basé sur l'heure, assure un nom différent et donc empèche l'écrasement des data dans le meme fichier

        // Définir le chemin du dossier et créer le dossier "data" s'il n'existe pas
        const folderFullPath = path.resolve(folderPath);
        if (!fs.existsSync(folderFullPath)) {
            fs.mkdirSync(folderFullPath);
        }

        // Définir le chemin complet du fichier
        const filePath = path.join(folderFullPath, fileName);

        // Écrire les données dans un fichier JSON dans le dossier "data"
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');

        console.log(`Données enregistrées dans le fichier : ${filePath}`);
    } catch (error) {
        console.error("Erreur lors de l'enregistrement des données dans le fichier :", error.message);
        throw error; // Propager l'erreur
    }
}
