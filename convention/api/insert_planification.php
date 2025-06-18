<?php
include 'server.php';
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Échec de la connexion à la base de données: " . $conn->connect_error);
}
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Vérifier si les paramètres requis sont présents
    if (isset($_POST['ResponsableUCP']) && isset($_POST['Delai'])) {
        // Récupérer les valeurs des paramètres
        $ResponsableUCP = $_POST['ResponsableUCP'];
        $Responsable = $_POST['Responsable'];
        $Delai = $_POST['Delai'];
        $activite = $_POST['activite'];
        $tache = $_POST['tache'];

       
        $insertQuery = "INSERT INTO suivi_avenant (id_personnel, numero_avenant, date_avenant, contrat, sous_activite) VALUES (?, ?, ?, ?, ?)";
        
        // Préparation de la requête
        $stmt = $conn->prepare($insertQuery);
        
        // Vérification de la préparation de la requête
        if ($stmt === false) {
            die("Échec de la préparation de la requête : " . $conn->error);
        }
        
        // Liaison des paramètres et exécution de la requête
        $stmt->bind_param("sssss", $ResponsableUCP, $Responsable, $Delai, $activite, $tache);
        
        // Exécution de la requête
        if ($stmt->execute()) {
            // Insertion réussie
            http_response_code(200); // OK
            echo json_encode(['message' => 'Décaissement ajouté avec succès', 'status' => 'success']);
        } else {
            // Échec de l'insertion
            http_response_code(500); // Erreur interne du serveur
            echo json_encode(['message' => 'Échec de l\'ajout decaissement', 'status' => 'error', 'error' => $stmt->error]);
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