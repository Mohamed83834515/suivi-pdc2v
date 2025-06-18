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
        id_ptba,
        AVG(taux_realisation) AS moyenne_taux_realisation
    FROM (
        SELECT
            id_ptba,
            id_indicateur_tache,
            SUM(valeur_suivi / valeur_cible * 100) AS taux_realisation
        FROM
            v_liste_indicateur_ptba
        INNER JOIN
            suivi_indicateur_tache
        ON
            v_liste_indicateur_ptba.id_indicateur_tache = suivi_indicateur_tache.indicateur
       
        GROUP BY
            id_ptba,
            id_indicateur_tache
    ) AS subquery
    GROUP BY
        id_ptba ";
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
