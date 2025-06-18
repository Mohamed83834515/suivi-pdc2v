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

// Vérifier si la méthode de requête est GET
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Vérifier si le paramètre d'authentification (ID utilisateur) est présent
    if (isset($_GET['annee'])) {
        // Récupérer l'ID de l'utilisateur
        $annee = $_GET['annee'];  // Vérifier si le paramètre d'authentification (ID utilisateur) est présent
        $query = "SELECT * FROM mission_supervision";
        // $query = "SELECT * FROM mission_supervision WHERE YEAR(debut) = $annee";
        $result = $conn->query($query);

        if ($result && $result->num_rows > 0) {
            // Tâches trouvées
            $taches = array();

            while ($row = $result->fetch_assoc()) {
                $taches[] = $row;
            }

            http_response_code(200); // OK
            echo json_encode(['message' => 'Mission supervision avec succès', 'status' => 'success', 'mission_supervision' => $taches]);
        } else {
            // Aucune tâche trouvée
            http_response_code(404); // Non trouvé
            echo json_encode(['message' => 'Aucune Mission supervision pour cet utilisateur', 'status' => 'error']);
        }
    } else {
        // Paramètre d'authentification manquant
        http_response_code(400); // Mauvaise requête
        echo json_encode(['message' => 'ID utilisateur manquant', 'status' => 'error']);
    }
   
} else {
    // Méthode de requête invalide
    http_response_code(405); // Méthode non autorisée
    echo json_encode(['message' => 'Méthode de requête invalide', 'status' => 'error']);
}

// Fermer la connexion à la base de données
$conn->close();