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
 
    // Vérifier si le paramètre d'authentification (ID utilisateur) est présent
     
        // Récupérer l'ID de l'utilisateur
        //$userId = $_GET['responsable'];

        // Récupérer les tâches de l'utilisateur dans la base de données
        $query = "SELECT * FROM suivi_avenant";
        $result = $conn->query($query);

        if ($result && $result->num_rows > 0) {
            // Tâches trouvées
            $taches = array();

            while ($row = $result->fetch_assoc()) {
                $taches[] = $row;
            }

            http_response_code(200); // OK
            echo json_encode(['message' => 'Tâches récupérées avec succès', 'status' => 'success', 'taches' => $taches]);
        } else {
            // Aucune tâche trouvée
            http_response_code(404); // Non trouvé
            echo json_encode(['message' => 'Aucune tâche trouvée pour cet utilisateur', 'status' => 'error']);
        }
    

    
 

// Fermer la connexion à la base de données
$conn->close();
