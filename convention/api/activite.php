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

// Vérifier si la méthode de requête est GET
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Vérifier si le paramètre d'authentification (ID utilisateur) est présent
    if (isset($_GET['responsable'])) {
        // Récupérer l'ID de l'utilisateur
        $userId = $_GET['responsable'];
        $Id = $_GET['id_personnel'];
        $fonction= $_GET['Fonction'];
        $partenaire= $_GET['Partenaire'];
   // echo $fonction;
        // Récupérer les tâches de l'utilisateur dans la base de données
        if($partenaire == 1)
            if(isset($_GET['convention_active']))
            {
                $annee= $_GET['convention_active'];
                $query = "SELECT * FROM activite_convention WHERE convention='$annee'  ORDER BY code_activite_ptba ASC";  
            }
            else
            {
                $query = " SELECT * FROM activite_convention   ORDER BY code_activite_ptba ASC";
            }
        else {
            if(isset($_GET['convention_active']))
            {
                $annee= $_GET['convention_active'];
                $query = "SELECT * FROM activite_convention WHERE convention='$annee'  ORDER BY code_activite_ptba ASC";  
            }
            else
            {
                $query = " SELECT * FROM activite_convention   ORDER BY code_activite_ptba ASC";
            }
        }    
        $result = $conn->query($query);
        if ($result && $result->num_rows > 0) {
            // Tâches trouvées
            $activites = array();

            while ($row = $result->fetch_assoc()) {
                $activites[] = $row;
            }

            http_response_code(200); // OK
            echo json_encode(['message' => 'Activités récupérées avec succès', 'status' => 'success', 'activites' => $activites]);
        } else {
            // Aucune tâche trouvée
            http_response_code(404); // Non trouvé
            echo json_encode(['message' => 'Aucune Activités trouvée pour cet utilisateur', 'status' => 'error']);
        }
       

    } else {
        // Paramètre d'authentification manquant
        http_response_code(400); // Mauvaise requête
        echo json_encode(['message' => 'ID utilisateur manquant', 'status' => 'error']);
    }

} else {
    // Méthode de requête invalide
    http_response_code(405); // Méthode non autorisée
    echo json_encode(['message' => 'Méthode de requête invalide', 'status' => 'error']);
}

// Fermer la connexion à la base de données
$conn->close();


 
 