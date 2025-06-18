<?php
include 'server.php';

$conn = new mysqli($servername, $username, $password, $dbname);

// Vérifier si la connexion à la base de données a réussi
if ($conn->connect_error) {
    die("Échec de la connexion à la base de données: " . $conn->connect_error);
}

// Vérifier si la méthode de requête est GET
 
     


        // Récupérer les tâches de l'utilisateur dans la base de données
        $query = "SELECT * FROM rubrique_projet ";
        $result = $conn->query($query);

        if ($result && $result->num_rows > 0) {
            // Tâches trouvées
            $sous_activites = array();

            while ($row = $result->fetch_assoc()) {
                $sous_activites[] = $row;
            }

            http_response_code(200); // OK
            echo json_encode(['message' => 'SOUS ACTIVITES récupérées avec succès', 'status' => 'success', 'Rubrique' => $sous_activites]);
        } else {
            // Aucune tâche trouvée
            http_response_code(404); // Non trouvé
            echo json_encode(['message' => 'Aucune tâche trouvée pour cet utilisateur', 'status' => 'error']);
        }
     

 

// Fermer la connexion à la base de données
$conn->close();
