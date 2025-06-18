<?php
include 'server.php';
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Échec de la connexion à la base de données: " . $conn->connect_error);
}
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Vérifier si les paramètres requis sont présents
    if (isset($_POST['Responsable']) && isset($_POST['id_suivi'])) {
        // Récupérer les valeurs des paramètres
        $id_suivi = $_POST['id_suivi'];
        $Responsable = $_POST['Responsable'];
        $etat_avancement = $_POST['etat_avancement'];
        $statut = $_POST['statut'];
        $date_projection = $_POST['date_projection'];
        $date_realisation = $_POST['date_realisation'];
        $ressources = $_POST['ressources'];

       
        $insertQuery = "INSERT INTO suivi_tache_hebdomadaire (id_tache, responsable, ressources, etat_avancement, date_realisation, date_projection, statut) VALUES (?, ?, ?, ?, ?, ?, ?)";
        
        // Préparation de la requête
        $stmt = $conn->prepare($insertQuery);
        
        // Vérification de la préparation de la requête
        if ($stmt === false) {
            die("Échec de la préparation de la requête : " . $conn->error);
        }
        
        // Liaison des paramètres et exécution de la requête
        $stmt->bind_param("sssssss", $id_suivi, $Responsable, $ressources, $etat_avancement, $date_realisation, $date_projection, $statut);
        
        // Exécution de la requête
        if ($stmt->execute()) {
            // Insertion réussie
            http_response_code(200); // OK
            echo json_encode(['message' => 'suivi ajouté avec succès', 'status' => 'success']);
        } else {
            // Échec de l'insertion
            http_response_code(500); // Erreur interne du serveur
            echo json_encode(['message' => 'Échec de l\'ajout suivi', 'status' => 'error', 'error' => $stmt->error]);
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