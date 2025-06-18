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
          if($partenaire == 1)  {
            if (isset($_GET['annee'])) {
                $annee = $_GET['annee'];
                $query = "SELECT
                p.annee,
                AVG(taux_realisation) AS moyenne_taux_realisation
            FROM (
                SELECT
                    v.id_ptba,
                    v.id_indicateur_tache,
                    SUM(s.valeur_suivi / v.valeur_cible * 100) AS taux_realisation
                FROM
                    v_liste_indicateur_ptba v
                INNER JOIN
                    suivi_indicateur_tache s
                ON
                    v.id_indicateur_tache = s.indicateur
                GROUP BY
                    v.id_ptba,
                    v.id_indicateur_tache
            ) AS subquery
            JOIN
                ptba p
            ON
                subquery.id_ptba = p.id_ptba
                WHERE  p.annee='$annee'
            GROUP BY
                p.annee;
            ";
              } else {
                  $query = "SELECT
                  p.annee,
                  AVG(taux_realisation) AS moyenne_taux_realisation
              FROM (
                  SELECT
                      v.id_ptba,
                      v.id_indicateur_tache,
                      SUM(s.valeur_suivi / v.valeur_cible * 100) AS taux_realisation
                  FROM
                      v_liste_indicateur_ptba v
                  INNER JOIN
                      suivi_indicateur_tache s
                  ON
                      v.id_indicateur_tache = s.indicateur
                  GROUP BY
                      v.id_ptba,
                      v.id_indicateur_tache
              ) AS subquery
              JOIN
                  ptba p
              ON
                  subquery.id_ptba = p.id_ptba
                  WHERE  p.annee = (SELECT MAX(annee) FROM ptba)
              GROUP BY
                  p.annee; 
                  ";
            }
        }else {
          if (isset($_GET['annee'])) {
            $annee = $_GET['annee'];
            $query = "SELECT
            p.annee,
            AVG(taux_realisation) AS moyenne_taux_realisation
        FROM (
            SELECT
                v.id_ptba,
                v.id_indicateur_tache,
                SUM(s.valeur_suivi / v.valeur_cible * 100) AS taux_realisation
            FROM
                v_liste_indicateur_ptba v
            INNER JOIN
                suivi_indicateur_tache s
            ON
                v.id_indicateur_tache = s.indicateur
            GROUP BY
                v.id_ptba,
                v.id_indicateur_tache
        ) AS subquery
        JOIN
            ptba p
        ON
            subquery.id_ptba = p.id_ptba
        WHERE
        (p.responsable = '$responsable' OR p.executant = '$executant') AND p.annee='$annee'
        GROUP BY
            p.annee;
        ";
          } else {
              $query = "SELECT
              p.annee,
              AVG(taux_realisation) AS moyenne_taux_realisation
          FROM (
              SELECT
                  v.id_ptba,
                  v.id_indicateur_tache,
                  SUM(s.valeur_suivi / v.valeur_cible * 100) AS taux_realisation
              FROM
                  v_liste_indicateur_ptba v
              INNER JOIN
                  suivi_indicateur_tache s
              ON
                  v.id_indicateur_tache = s.indicateur
              GROUP BY
                  v.id_ptba,
                  v.id_indicateur_tache
          ) AS subquery
          JOIN
              ptba p
          ON
              subquery.id_ptba = p.id_ptba
          WHERE
          (p.responsable = '$responsable' OR p.executant = '$executant') AND p.annee= (SELECT MAX(annee) FROM ptba WHERE responsable = '$responsable' OR executant = '$executant')
          GROUP BY
              p.annee;
        
        ";
        }
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
