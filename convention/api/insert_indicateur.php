<?php
include 'server.php';
// $servername = "localhost";
// $username = "c0sis3854";
// $password = "Mim4H6quA_";
// $dbname = "c0sis3854";

$conn = new mysqli($servername, $username, $password, $dbname);

// Vérifier si la connexion à la base de données a réussi
if ($conn->connect_error) {
    die("Échec de la connexion à la base de données: " . $conn->connect_error);
}
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Vérifier si les paramètres requis sont présents
    if (isset($_POST['id_indicateur']) && isset($_POST['valeur_cibles'])) {
        // Récupérer les valeurs des paramètres
        $id_indicateur = $_POST['id_indicateur'];
        $date_reelle = date("Y-m-d");
        $valeur_cibles = json_decode($_POST['valeur_cibles']); // Décoder les valeurs en tant que tableau
        $mois = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
        // Mettre à jour la tâche avec les nouvelles valeurs
        for ($i = 0; $i < count($valeur_cibles); $i++) {
            $insertQuery = "INSERT INTO suivi_indicateur_convention (indicateur, date_suivi, valeur_suivi, mois) VALUES ";
            $insertQuery .= "('$id_indicateur', '$date_reelle', '$valeur_cibles[$i]', '$mois[$i]')";

            if ($conn->query($insertQuery) === TRUE) {
                // Insertion réussie
                continue; // Passez à l'itération suivante
            } else {
                // Échec de l'insertion
                http_response_code(500); // Erreur interne du serveur
                echo json_encode(['message' => 'Échec de l\'ajout Indicateur', 'status' => 'error', 'error' => $conn->error]);
                exit; // Arrêtez le script en cas d'erreur
            }
        }

        // Si toutes les insertions réussissent, renvoyer une réponse réussie
        http_response_code(200); // OK
        echo json_encode(['message' => 'Indicateur ajoutée avec succès', 'status' => 'success']);
    } else {
        // Paramètres manquants
        http_response_code(400); // Mauvaise requête
        echo json_encode(['message' => 'Paramètres manquants', 'status' => 'error']);
    }
} else {
    // Méthode de requête invalide
    http_response_code(405); // Méthode non autorisée
    echo json_encode(['message' => 'Méthode de requête invalide', 'status' => 'error']);
}


// Fermer la connexion à la base de données
$conn->close();