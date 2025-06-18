<?php
include 'server.php';
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Échec de la connexion à la base de données: " . $conn->connect_error);
}
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Vérifier si les paramètres requis sont présents
    if (isset($_POST['Description'])) {
        // Récupérer les valeurs des paramètres
        $Description = $_POST['Description'];
        $Suivi = $_POST['Suivi'];
        $Responsable = $_POST['Responsable'];
        $code_activite = $_POST['code_activite'];
        $enregistrer_par = $_POST['enregistrer_par'];
        $version_ptba = $_POST['version_ptba'];
        $id_activite_ptba = $_POST['id_activite_ptba'];

       
        $insertQuery = "INSERT INTO notifications (Description, Suivi, Responsable, code_activite, enregistrer_par, id_activite_ptba, version_ptba) VALUES (?, ?, ?, ?, ?, ?, ?)";
        
        // Préparation de la requête
        $stmt = $conn->prepare($insertQuery);
        
        // Vérification de la préparation de la requête
        if ($stmt === false) {
            die("Échec de la préparation de la requête : " . $conn->error);
        }
        
        // Liaison des paramètres et exécution de la requête
        $stmt->bind_param("sssssss", $Description, $Suivi, $Responsable, $code_activite, $enregistrer_par, $id_activite_ptba, $version_ptba);
        
        // Exécution de la requête
        if ($stmt->execute()) {
            // Insertion réussie
            http_response_code(200); // OK
            echo json_encode(['message' => 'notifications ajouté avec succès', 'status' => 'success']);
        } else {
            // Échec de l'insertion
            http_response_code(500); // Erreur interne du serveur
            echo json_encode(['message' => 'Échec de l\'ajout notifications', 'status' => 'error', 'error' => $stmt->error]);
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