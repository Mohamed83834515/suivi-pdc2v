<?php

// $servername = "localhost";
// $username = "c0sis3854";
// $password = "Mim4H6quA_";
// $dbname = "c0sis3854";
include 'server.php';

$conn = new mysqli($servername, $username, $password, $dbname);

// Vérifier si la connexion à la base de données a réussi
if ($conn->connect_error) {
    die("Échec de la connexion à la base de données: " . $conn->connect_error);
}

// Vérifier si la méthode de requête est GET
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    // Vérifier si le paramètre "id_suivi" est présent dans l'URL
    if (isset($_GET['id_suivi'])) {
        // Récupérer la valeur du paramètre "id_suivi"
        $taskId = $_GET['id_suivi'];

        // Supprimer la tâche correspondante
        $deleteQuery = "DELETE FROM suivi_avancement_contrat WHERE id_suivi = '$taskId'";

        if ($conn->query($deleteQuery) === TRUE) {
            // Suppression réussie
            http_response_code(200); // OK
            echo json_encode(['message' => 'Décaissement supprimé avec succès', 'status' => 'success']);
        } else {
            // Échec de la suppression
            http_response_code(500); // Erreur interne du serveur
            echo json_encode(['message' => 'Échec de la suppression du décaissement', 'status' => 'error', 'error' => $conn->error]);
        }
    } else {
        // Paramètre "id_suivi" manquant
        http_response_code(400); // Mauvaise requête
        echo json_encode(['message' => 'Paramètre "id_suivi" manquant', 'status' => 'error']);
    }
} else {
    // Méthode de requête invalide
    http_response_code(405); // Méthode non autorisée
    echo json_encode(['message' => 'Méthode de requête invalide', 'status' => 'error']);
}

// Fermer la connexion à la base de données
$conn->close();