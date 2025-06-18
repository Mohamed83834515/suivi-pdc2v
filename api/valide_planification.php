<?php

// Connexion à la base de données (remplacez les informations d'accès avec les vôtres)
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

// Vérifier si la méthode de requête est POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Vérifier si les paramètres requis sont présents
    if (isset($_POST['id_suivi']) ) {
        $id_v = isset($_POST['id_suivi']) ? $_POST['id_suivi'] : null;
        // $pistes_solutions = isset($_POST['pistes_solutions']) ? $_POST['pistes_solutions'] : null;

        // Mettre à jour la tâche avec les nouvelles valeurs
        $updateQuery = "UPDATE suivi_tache_hebdomadaire SET
            etat = 1
            WHERE id_suivi = '$id_v'";

        if ($conn->query($updateQuery) === TRUE) {
            // Mise à jour réussie
            http_response_code(200); // OK
            echo json_encode(['message' => 'Décaissement modifié avec succès', 'status' => 'success']);
        } else {
            // Échec de la mise à jour
            http_response_code(500); // Erreur interne du serveur
            echo json_encode(['message' => 'Échec de la modification du décaissement', 'status' => 'error', 'error' => $conn->error]);
        }
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
