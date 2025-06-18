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
     


        // Récupérer les tâches de l'utilisateur dans la base de données
        $query = "SELECT * FROM suivi_avancement_contrat_convention ORDER BY DATE(date_suivi) DESC, id_suivi DESC;";
        $result = $conn->query($query);

        if ($result && $result->num_rows > 0) {
            // Tâches trouvées
            $sous_activites = array();

            while ($row = $result->fetch_assoc()) {
                $sous_activites[] = $row;
            }

            http_response_code(200); // OK
            echo json_encode(['message' => 'SOUS ACTIVITES récupérées avec succès', 'status' => 'success', 'sous_activites' => $sous_activites]);
        } else {
            // Aucune tâche trouvée
            http_response_code(404); // Non trouvé
            echo json_encode(['message' => 'Aucune tâche trouvée pour cet utilisateur', 'status' => 'error']);
        }
     

    // if (isset($_GET['id_activite'])) {
    //     // Récupérer l'ID de l'utilisateur
    //     $id_activite = $_GET['id_activite'];

    //     // Récupérer les tâches de l'utilisateur dans la base de données
    //     $query = "SELECT * FROM groupe_tache WHERE id_activite = '$id_activite'";
    //     $result = $conn->query($query);

    //     if ($result && $result->num_rows > 0) {
    //         // Tâches trouvées
    //         $taches = array();

    //         while ($row = $result->fetch_assoc()) {
    //             $taches[] = $row;
    //         }

    //         http_response_code(200); // OK
    //         echo json_encode(['message' => 'Tâches récupérées avec succès', 'status' => 'success', 'taches' => $taches]);
    //     } else {
    //         // Aucune tâche trouvée
    //         http_response_code(404); // Non trouvé
    //         echo json_encode(['message' => 'Aucune tâche trouvée pour cet utilisateur', 'status' => 'error']);
    //     }
    // } else {
    //     // Paramètre d'authentification manquant
    //     http_response_code(400); // Mauvaise requête
    //     echo json_encode(['message' => 'ID utilisateur manquant', 'status' => 'error']);
    // }
    // if ( isset($_GET['respon'])) {
    //     // Récupérer l'ID de l'utilisateur
         
    //     $userId = $_GET['respon'];
    //     // Récupérer les tâches de l'utilisateur dans la base de données
      
    //         $query = "SELECT COUNT(*) AS total_tache FROM groupe_tache WHERE  responsable = '$userId' AND date_fin IS NULL ";
    //         $result = $conn->query($query);
        
        

    //     if ($result && $result->num_rows > 0) {
    //         // Récupérer le nombre de tâches
    //         $row = $result->fetch_assoc();
    //         $taskCount = $row['task_count'];

    //         http_response_code(200); // OK
    //         echo json_encode(['message' => 'Nombre de tâches récupéré avec succès', 'status' => 'success', 'task_count' => $taskCount]);
    //     } else {
    //         // Aucune tâche trouvée
    //         http_response_code(404); // Non trouvé
    //         echo json_encode(['message' => 'Aucune tâche trouvée pour cet utilisateur', 'status' => 'error']);
    //     }
    // } else {
    //     // Paramètre d'authentification manquant
    //     http_response_code(400); // Mauvaise requête
    //     echo json_encode(['message' => 'ID utilisateur manquant', 'status' => 'error']);
    // }
} else {
    // Méthode de requête invalide
    http_response_code(405); // Méthode non autorisée
    echo json_encode(['message' => 'Méthode de requête invalide', 'status' => 'error']);
}

// Fermer la connexion à la base de données
$conn->close();
