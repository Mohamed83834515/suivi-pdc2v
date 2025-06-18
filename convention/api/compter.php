<?php

// Connexion à la base de données (remplacez les informations d'accès avec les vôtres)

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
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Vérifier si le paramètre d'authentification (ID utilisateur) est présent
    if (isset($_GET['count'])) {
        // Récupérer l'ID de l'utilisateur
        $userId = $_GET['respon'];
        
        if($_GET['count']=='attente')
        {
            // Compter les tâches de l'utilisateur dans la base de données
            $query = "SELECT COUNT(*) AS task_count FROM groupe_tache WHERE responsable = '$userId' AND date_fin IS NULL";
            $result = $conn->query($query);
        }
        
        
        if($_GET['count']=='valide')
        {
            // Compter les tâches de l'utilisateur dans la base de données
            $query = "SELECT COUNT(*) AS task_count FROM groupe_tache WHERE responsable = '$userId' AND date_fin IS NOT NULL AND valider=1";
            $result = $conn->query($query);
        }
        if($_GET['count']=='suivi')
        {
            // Compter les tâches de l'utilisateur dans la base de données
            $query = "SELECT COUNT(*) AS task_count FROM groupe_tache WHERE responsable = '$userId' AND date_fin IS NOT NULL AND valider= 'non' ";
            $result = $conn->query($query);
        }

       

        if ($result && $result->num_rows > 0) {
            // Récupérer le nombre de tâches
            $row = $result->fetch_assoc();
            $taskCount = $row['task_count'];

            http_response_code(200); // OK
            echo json_encode(['message' => 'Nombre de tâches récupéré avec succès', 'status' => 'success', 'task_count' => $taskCount]);
        } else {
            // Aucune tâche trouvée
            http_response_code(404); // Non trouvé
            echo json_encode(['message' => 'Aucune tâche trouvée pour cet utilisateur', 'status' => 'error']);
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
