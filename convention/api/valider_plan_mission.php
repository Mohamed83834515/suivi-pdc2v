<?php
if(isset($_FILES['livrableFile'])){
    $filename = $_FILES['livrableFile']['name'];
    /* Location */
    $location = 'fichierSuiviMission/';
    $response = array();
    
    /* Upload file */
    if(move_uploaded_file($_FILES['livrableFile']['tmp_name'], $location.$filename)){
        $response['name'] = $filename; 
    } else {
        $response['name'] = "File not uploaded.";
    }
} else {
    $filename = $_POST['livrable'];
}
include 'server.php';
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Échec de la connexion à la base de données: " . $conn->connect_error);
}
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Vérifier si les paramètres requis sont présents
    if (isset($_POST['id_plan'])) {
        // Récupérer les valeurs des paramètres
        $id_plan = $_POST['id_plan'];
        $date_reelle = $_POST['date_reelle'];
        $observation = $_POST['observation'];
        $valider = $_POST['valider'];

       
        $updateQuery = "UPDATE mission_plan SET
            date_reelle = ?,
            valider = ?,
            livrable = ?,
            observation = ?
            WHERE id_plan = ?";
        // Préparation de la requête
        $stmt = $conn->prepare($updateQuery);
        
        // Vérification de la préparation de la requête
        if ($stmt === false) {
            die("Échec de la préparation de la requête : " . $conn->error);
        }
        
        // Liaison des paramètres et exécution de la requête
        $stmt->bind_param("sssss", $date_reelle, $valider, $filename, $observation, $id_plan);
        
        // Exécution de la requête
        if ($stmt->execute()) {
            // Insertion réussie
            http_response_code(200); // OK
            echo json_encode(['message' => 'mission validé avec succès', 'status' => 'success']);
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