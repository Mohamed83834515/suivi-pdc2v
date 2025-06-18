<?php
// Connexion à la base de données (assurez-vous d'avoir vos propres identifiants)
include 'server.php';

$conn = new mysqli($servername, $username, $password, $dbname);

// Vérifier la connexion
if ($conn->connect_error) {
    die("Connexion échouée: " . $conn->connect_error);
}

// Requête pour récupérer les sous-activités groupées par activité
$query = "SELECT * FROM suivi_avancement_contrat_convention GROUP BY activite where ";

$result = $conn->query($query);

if ($result->num_rows > 0) {
    $data = array();
    while ($row = $result->fetch_assoc()) {
        $activite = array(
            'activite' => $row['activite'],
            'sous_activites' => $row['sous_activites']
        );
        $data[] = $activite;
    }
    echo json_encode($data);
} else {
    echo "Aucune donnée trouvée.";
}

// Fermer la connexion
$conn->close();
?>
