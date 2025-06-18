function Export2Word(element, filename = '') {
    var preHtml = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML To Doc</title></head><body>";
    var postHtml = "</body></html>";
    
    // Titre en haut de la page
    var titleHtml = "<h1 style='text-align: center;'>États des activités</h1>";
    
//    var link = ''
    // Créez un tableau HTML avec des en-têtes de colonne
    var html = preHtml + titleHtml +  "<table border='1'>" +
        "<tr>" +
        "<th>Code</th>" +
        "<th>Intitulé de l'activité</th>" +
        "<th>État d'avancement</th>" +
        "<th>Statut</th>" +
        "<th>Délai de Réalisation</th>" +
        "<th>Rétard accusé (jours)</th>" +
        "<th>Observations</th>" +
        "</tr>";

    // Récupérez les données de la liste et formatez-les en lignes de tableau
    var tableRows = document.getElementById(element).querySelectorAll("tr");
    for (var i = 1; i < tableRows.length; i++) { // Commencez à l'index 1 pour exclure la ligne d'en-tête
        var cells = tableRows[i].querySelectorAll("td");
        if (cells.length === 7) {
            html += "<tr>";
            for (var j = 0; j < cells.length; j++) {
                html += "<td>" + cells[j].textContent + "</td>";
            }
            html += "</tr>";
        }
    }
    
    html += "</table>";
    var date = new Date();
    var formattedDate = date.toLocaleDateString("fr-FR");
    var formattedTime = date.toLocaleTimeString("fr-FR");
    var dateTimeHtml = "<p style='text-align: right;'>Date : " + formattedDate + " à " + formattedTime + "</p>";
    html += dateTimeHtml + postHtml;
    var blob = new Blob(['\ufeff', html], {
        type: 'application/msword'
    });
    
    var url = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(html);
    
    filename = filename ? filename + '.doc' : 'document.doc';
    
    var downloadLink = document.createElement("a");

    document.body.appendChild(downloadLink);
    
    if (navigator.msSaveOrOpenBlob) {
        navigator.msSaveOrOpenBlob(blob, filename);
    } else {
        downloadLink.href = url;
        downloadLink.download = filename;
        downloadLink.click();
    }
    
    document.body.removeChild(downloadLink);
}
