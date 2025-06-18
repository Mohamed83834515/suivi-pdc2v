<?php
include 'server.php';
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Échec de la connexion à la base de données: " . $conn->connect_error);
}
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Vérifier si les paramètres requis sont présents
    if (isset($_POST['code_rec'])) {
        // Récupérer les valeurs des paramètres
        $code_rec = $_POST['code_rec'];
        $date_prevue = $_POST['date_prevue'];
        $proportion = $_POST['proportion'];
        $responsable = $_POST['responsable'];
        $phase = $_POST['phase'];
        $ordre = $_POST['ordre'];

       
        $insertQuery = "INSERT INTO mission_plan (code_rec, date_prevue, proportion, responsable, phase, ordre) VALUES (?, ?, ?, ?, ?, ?)";
        
        // Préparation de la requête
        $stmt = $conn->prepare($insertQuery);
        
        // Vérification de la préparation de la requête
        if ($stmt === false) {
            die("Échec de la préparation de la requête : " . $conn->error);
        }
        
        // Liaison des paramètres et exécution de la requête
        $stmt->bind_param("ssssss", $code_rec, $date_prevue, $proportion, $responsable, $phase, $ordre);
        
        // Exécution de la requête
        if ($stmt->execute()) {
            // Insertion réussie
            http_response_code(200); // OK
            echo json_encode(['message' => 'mission ajouté avec succès', 'status' => 'success']);
        } else {
            // Échec de l'insertion
            http_response_code(500); // Erreur interne du serveur
            echo json_encode(['message' => 'Échec de l\'ajout mission', 'status' => 'error', 'error' => $stmt->error]);
        }
    
    // Fermeture de la requête préparée
    $stmt->close();
       
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