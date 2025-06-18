<?php

// Connexion à la base de données (remplacez les informations d'accès avec les vôtres)
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
    // Vérifier si les paramètres d'authentification sont présents

    

    if (isset($_POST['Pseudo']) && isset($_POST['MotDePasse'])) {
        // Récupérer les informations d'authentification
        $username = $_POST['Pseudo'];
        $password = $_POST['MotDePasse'];

        $hashedPassword = md5($password);

        // Vérifier les informations d'authentification dans la base de données
        $query = "SELECT * FROM personnel WHERE id_personnel = '$username' AND pass = '$hashedPassword'";
        $result = $conn->query($query);

        if ($result && $result->num_rows > 0) {
            // Authentification réussie
            $user = $result->fetch_assoc();
            $userId = $user['N'];
            $nom = $user['id_personnel'];
            $prenom = $user['prenom'];
            $fonction = $user['fonction'];
            $partenaire = $user['partenaire'];
            $id_personnel = $user['id_personnel'];
            $convention_active = $user['convention_active'];
            
            http_response_code(200); // OK
            echo json_encode(['message' => 'Authentification réussie', 'status' => 'success', 'user_id' => $userId,'nom' => $nom, 'prenom' => $prenom,'fonction' => $fonction,'partenaire' => $partenaire,'executant' => $nom, 'id_personnel' => $id_personnel, 'convention_active' => $convention_active]);
        } else {
            // Informations d'authentification incorrectes
            http_response_code(401); // Non autorisé
            echo json_encode(['message' => 'Identifiants invalides', 'status' => 'error']);
        }
    } else {
        // Paramètres d'authentification manquants
        http_response_code(400); // Mauvaise requête
        echo json_encode(['message' => 'Paramètres d\'authentification manquants', 'status' => 'error']);
    }
} else {
    // Méthode de requête invalide
    http_response_code(405); // Méthode non autorisée
    echo json_encode(['message' => 'Méthode de requête invalide', 'status' => 'error']);
}

// Fermer la connexion à la base de données
$conn->close();
