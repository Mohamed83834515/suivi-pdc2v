<?php
include 'server.php';

$conn = new mysqli($servername, $username, $password, $dbname);

// Vérifier si la connexion à la base de données a réussi
if ($conn->connect_error) {
    die("Échec de la connexion à la base de données: " . $conn->connect_error);
}

// Vérifier si la méthode de requête est GET
 
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Vérifier si le paramètre d'authentification (ID utilisateur) est présent
    if (isset($_GET['id_mission'])) {
        // Récupérer l'ID de l'utilisateur
        $userId = $_GET['id_mission'];    


        // Récupérer les tâches de l'utilisateur dans la base de données
        $query = "SELECT * FROM `recommandation_mission` WHERE `mission` = $userId ORDER by id_recommandation ASC;
        ";
        $result = $conn->query($query);

        if ($result && $result->num_rows > 0) {
            // Tâches trouvées
            $sous_activites = array();

            while ($row = $result->fetch_assoc()) {
                $sous_activites[] = $row;
            }

            http_response_code(200); // OK
            echo json_encode(['message' => 'recommandation récupérées avec succès', 'status' => 'success', 'recommandation_mission' => $sous_activites]);
        } else {
            // Aucune tâche trouvée
            http_response_code(404); // Non trouvé
            echo json_encode(['message' => 'Aucune recommandation trouvée pour cet utilisateur', 'status' => 'error']);
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
