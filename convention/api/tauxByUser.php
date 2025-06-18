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
            $responsable = $_GET['responsable'];  // Vérifier si le paramètre d'authentification (ID utilisateur) est présent
            $executant = $_GET['executant'];  // Vérifier si le paramètre d'authentification (ID utilisateur) est présent
            $partenaire= $_GET['Partenaire'];
            if (isset($_GET['annee'])) {
                $annee = $_GET['annee'];
                $query = "SELECT `id_activite_convention`, cout_activite, convention,
                sum(montant_decaisse) as total_montant FROM `activite_convention` inner join 
                suivi_decaissement_contrat_convention on id_activite_convention = id_activite_ptba 
               
               WHERE convention='$annee'
               GROUP by id_activite_convention , cout_activite;
            ";
              } else {
                  $query = "SELECT `id_activite_convention`, cout_activite,  convention,
                  sum(montant_decaisse) as total_montant FROM `activite_convention` inner join 
                  suivi_decaissement_contrat_convention on id_activite_convention = id_activite_ptba 
                 
                
                 GROUP by id_activite_convention , cout_activite;
            
            ";
            }

        $result = $conn->query($query);

        if ($result && $result->num_rows > 0) {
            // Tâches trouvées
            $taches = array();

            while ($row = $result->fetch_assoc()) {
                $taches[] = $row;
            }

            http_response_code(200); // OK
            echo json_encode(['message' => 'Tâches récupérées avec succès', 'status' => 'success', 'taches' => $taches]);
        } else {
            // Aucune tâche trouvée
            http_response_code(404); // Non trouvé
            echo json_encode(['message' => 'Aucune tâche trouvée pour cet utilisateur', 'status' => 'error']);
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
