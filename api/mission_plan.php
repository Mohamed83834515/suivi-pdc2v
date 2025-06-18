<?php
include 'server.php';

$conn = new mysqli($servername, $username, $password, $dbname);

// Vérifier si la connexion à la base de données a réussi
if ($conn->connect_error) {
    die("Échec de la connexion à la base de données: " . $conn->connect_error);
}

$query = "SELECT * FROM `mission_plan`";
$result = $conn->query($query);

if ($result && $result->num_rows > 0) {
    // Tâches trouvées
    $sous_activites = array();

    while ($row = $result->fetch_assoc()) {
        $sous_activites[] = $row;
    }

    http_response_code(200); // OK
    echo json_encode(['message' => 'SOUS ACTIVITES récupérées avec succès', 'status' => 'success', 'mission_plan' => $sous_activites]);
} else {
    // Aucune tâche trouvée
    http_response_code(404); // Non trouvé
    echo json_encode(['message' => 'Aucune tâche trouvée pour cet utilisateur', 'status' => 'error']);
}




// Fermer la connexion à la base de données
$conn->close();
