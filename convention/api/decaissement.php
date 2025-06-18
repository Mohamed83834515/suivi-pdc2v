<?php
if(isset($_FILES['file'])){
    $filename = $_FILES['file']['name'];
    /* Location */
    $location = 'fichierdecaissement/';
    $response = array();
    
    /* Upload file */
    if(move_uploaded_file($_FILES['file']['tmp_name'], $location.$filename)){
        $response['name'] = $filename; 
    } else {
        $response['name'] = "File not uploaded.";
    }
} else {
    $filename = "";
}

// Connexion à la base de données (remplacez les informations d'accès par les vôtres)
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

// Vérifier si la méthode de requête est POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Vérifier si les paramètres requis sont présents
    if (isset($_POST['id_tache']) && isset($_POST['code_tache']) && isset($_POST['lot'])) {
        // Récupérer les valeurs des paramètres
        $taskId = $_POST['id_tache'];
        $lot = $_POST['lot'];
        $newDateFin = isset($_POST['date_reelle']) ? $_POST['date_reelle'] : null;
        $newObservation = isset($_POST['observation']) ? $_POST['observation'] : null;
        $newLivrable = isset($_POST['livrable']) ? $_POST['livrable'] : null;
        $code_tache = $_POST['code_tache'];
        $statut_tache = isset($_POST['statut_tache']) ? $_POST['statut_tache'] : null;
        $difficultes = isset($_POST['difficultes']) ? $_POST['difficultes'] : null;
        $retard = isset($_POST['retard']) ? $_POST['retard'] : null;
        $pistes_solutions = isset($_POST['pistes_solutions']) ? $_POST['pistes_solutions'] : null;
        $commune = isset($_POST['commune']) ? $_POST['commune'] : null;
        $id_personnel = isset($_POST['id_personnel']) ? $_POST['id_personnel'] : null;

        // Requête préparée avec des instructions paramétrées
        $insertQuery = "INSERT INTO suivi_decaissement_contrat_convention
            (id_activite_ptba, date_suivi, code_suivi, montant_decaisse, observation, documents,commune,id_personnel)
            VALUES (?, ?, ?, ?, ?, ?,?, ?)";
        
        // Préparation de la requête
        $stmt = $conn->prepare($insertQuery);
        
        // Vérification de la préparation de la requête
        if ($stmt === false) {
            die("Échec de la préparation de la requête : " . $conn->error);
        }
        
        // Liaison des paramètres et exécution de la requête
        $stmt->bind_param("ssssssss", $taskId, $newDateFin, $lot, $difficultes, $newObservation, $filename,$commune, $id_personnel);
        
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
?>
