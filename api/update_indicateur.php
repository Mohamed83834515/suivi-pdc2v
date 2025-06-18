<?php

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


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Vérifier si les paramètres requis sont présents
    if (isset($_POST['id_indicateur']) && isset($_POST['valeur_cibles'])) {
        // Récupérer les valeurs des paramètres
        $id_indicateur = json_decode($_POST['id_indicateur']);
        $id_indicateur2 = $_POST['id_indicateur2'];
        $date_reelle = date("Y-m-d");
        $valeur_cibles = json_decode($_POST['valeur_cibles']); 
        $commune_indicateur = json_decode($_POST['commune_indicateur']); 
        $mois = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];

        $insertQuery1 = "DELETE FROM `suivi_indicateur_tache` WHERE indicateur = $id_indicateur2 ";
        if ($conn->query($insertQuery1) === TRUE) {
            for ($i = 0; $i < count($valeur_cibles); $i++) {
                // $insertQuery = "UPDATE  suivi_indicateur_tache  SET  date_suivi = '$date_reelle', valeur_suivi = $valeur_cibles[$i] WHERE id_suivi = $id_indicateur[$i] ";
              
                $insertQuery = "INSERT INTO suivi_indicateur_tache (indicateur, date_suivi, valeur_suivi, mois, commune) VALUES ";
                 $insertQuery .= "('$id_indicateur2', '$date_reelle', '$valeur_cibles[$i]', '$mois[$i]', '$commune_indicateur[$i]')";
                if ($conn->query($insertQuery) === TRUE) {
                    // Mise à jour réussie
                    http_response_code(200); // OK
                    echo json_encode(['message' => "indicateur modifié avec succès", 'status' => 'success']);
                } else {
                    // Échec de la mise à jour
                    http_response_code(500); // Erreur interne du serveur
                    echo json_encode(['message' => 'Échec de la modification d\indicateur ', 'status' => 'error', 'error' => $conn->error]);
                }
            }
            http_response_code(200); // OK
            echo json_encode(['message' => "indicateur modifié avec succès", 'status' => 'success']);
        } else {
            // Échec de la mise à jour
            http_response_code(500); // Erreur interne du serveur
            echo json_encode(['message' => 'Échec de la modification d\indicateur ', 'status' => 'error', 'error' => $conn->error]);
        }    
           
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

