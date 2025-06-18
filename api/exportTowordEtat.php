<?php
// require_once 'vendor/autoload.php';
require_once __DIR__ . '/vendor/autoload.php';
$filenam = 'EtatActivites.docx';
$filepath = __DIR__ . '/' . $filenam;
if (file_exists($filepath)) {
    unlink($filepath);
}
$input = file_get_contents('php://input');
$data = json_decode($input, true);

// Assurez-vous que les données sont dans le format attendu
if (isset($data['tableData']) && is_array($data['tableData'])) {
    $tableData = $data['tableData'];

    // Créez un nouveau document Word avec PHPWord
    $phpWord = new \PhpOffice\PhpWord\PhpWord();
    $section = $phpWord->addSection();

    // Créez un tableau Word
    $table = $section->addTable();
    
    // Parcourir les données du tableau et ajouter chaque ligne au tableau Word
    foreach ($tableData as $rowData) {
        $table->addRow();
        foreach ($rowData as $cellData) {
            $table->addCell()->addText($cellData);
        }
    }

    // Enregistrez le document Word
    $filename = 'EtatActivites.docx';
    $phpWord->save($filepath);

    // Répondez avec le chemin du fichier ou autre traitement nécessaire
    header('Content-Type: application/json');
    echo json_encode(['downloadLink' => "/EtatActivites.docx"]);

    // Supprimez le fichier après le téléchargement
    
} else {
    // Gérez l'erreur si les données ne sont pas dans le format attendu
    header('HTTP/1.1 400 Bad Request');
    echo json_encode(['error' => 'Données non valides']);
}
