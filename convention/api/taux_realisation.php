<?php

// Connexion à la base de données (remplacez les informations d'accès avec les vôtres)
// $servername = "localhost";
// $username = "root";
// $password = "";
// $dbname = "c0sis3854";
include 'server.php';

$conn = new mysqli($servername, $username, $password, $dbname);

// Vérifier si la connexion à la base de données a réussi
if ($conn->connect_error) {
    die("Échec de la connexion à la base de données: " . $conn->connect_error);
}

// Vérifier si la méthode de requête est GET




// Récupérer les tâches de l'utilisateur dans la base de données
$query = "SELECT 
indicateur_convention.code_activite,
AVG(vue_taux_indicateur_pdc2v.taux) AS moyenne_taux_realisation,
COUNT(*) AS nombre_indicateurs
FROM 
vue_taux_indicateur_pdc2v 
INNER JOIN 
indicateur_convention 
ON 
indicateur_convention.id_activite_convention = vue_taux_indicateur_pdc2v.id_activite_convention 
GROUP BY 
indicateur_convention.code_activite;
    
    ";
$result = $conn->query($query);

if ($result && $result->num_rows > 0) {
    // Tâches trouvées
    $sous_activites = array();

    while ($row = $result->fetch_assoc()) {
        $sous_activites[] = $row;
    }

    http_response_code(200); // OK
    echo json_encode(['message' => 'Structure récupérées avec succès', 'status' => 'success', 'users' => $sous_activites]);
} else {
    // Aucune tâche trouvée
    http_response_code(404); // Non trouvé
    echo json_encode(['message' => 'Aucune tâche trouvée pour cet utilisateur', 'status' => 'error']);
}




// Fermer la connexion à la base de données
$conn->close();
