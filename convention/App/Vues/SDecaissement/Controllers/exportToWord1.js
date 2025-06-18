// $scope.TelechargerTableauEnExcel = function () {
//     var downloadLink;
//     var dataType = 'application/vnd.ms-excel';
//     var tableSelect = document.getElementById('yourTableId1');
// 	var link = 'https://suivi-pdc2v.org';
	
//     var titleTable = document.createElement("table");
//     var titleRow = titleTable.insertRow(0);
//     var titleCell = titleRow.insertCell(0);
//     titleCell.innerHTML = "* RÉPUBLIQUE DU CAMEROUN * <br> MINISTÈRE DE L'AGRICULTURE ET DU DÉVELOPPEMENT RURAL <br> <div style='color: orange;'>PROJET D'APPUI AU DÉVELOPPEMENT DES FILIÈRES PHASE II</div>  "; // Remplacez "Votre Titre" par le titre souhaité
//     titleCell.colSpan = "6"; // Fusionnez la cellule sur 6 colonnes
//     titleCell.style.textAlign = "center"; // Centrez le texte
//     titleCell.style.fontWeight = "700"; // Centrez le texte
//     titleCell.style.height = "22px"; // Centrez le texte
//     titleCell.style.verticalAlign = "middle";
//     titleCell.style.textTransform = "uppercase"; // Centrez le texte
//     titleCell.style.fontSize = "16px";
//     titleCell.style.fontFamily = "Times New Roman";
//     titleCell.style.color = "black"; // Centrez le texte

// 	var titleProjet= document.createElement("table");
//     var titleRow1 = titleProjet.insertRow(0);
//     var titleCell1 = titleRow1.insertCell(0);
//     titleCell1.innerHTML = "PROJET D'APPUI AU DÉVELOPPEMENT DES FILIÈRES PHASE II"; // Fusionnez la cellule sur 6 colonnes
//     titleCell1.colSpan = "6"; // Fusionnez la cellule sur 6 colonnes
//     titleCell1.style.textAlign = "center"; // Fusionnez la cellule sur 6 colonnes
//     titleCell1.style.height = "26px"; // Centrez le texte
//     titleCell1.style.verticalAlign = "middle"; // Centrez le texte
//     titleCell1.style.fontSize = "20px"; // Centrez le texte
//     titleCell1.style.color = "#F5870E"; // Fusionnez la cellule sur 6 colonnes
//     titleCell1.style.fontFamily = "Times New Roman"; // Fusionnez la cellule sur 6 colonnes

// 	// var img = "<img src='http://localhost/tache/App/img/pdc.jpg' width='70' alt='my image'>";
// 	var nom = $cookies.get("NomUtilisateur");
// 	var prenom = $cookies.get("PrenomsUtilisateur");
// 	var titleProjet2= document.createElement("table");
//     var titleRow11 = titleProjet2.insertRow(0);
//     var titleCell11 = titleRow11.insertCell(0);
//     titleCell11.colSpan = "6"; // Fusionnez la cellule sur 6 colonnes
// 	titleCell11.innerHTML = `
// 	<table>
// 	<tr>
// 		<th style='text-align: left !important;' width='100'><img  src="${link}/App/img/pdc.jpg" width="200" height="60" alt=""> </th>
// 			<th></th>
// 			<th></th>
// 			<th></th>
// 			<th></th>
// 		<th><img style='margin-left: 20%' src="${link}/App/img/banque.jpeg" width="180" height="60" alt=""></th>
// 	</tr>
// 	</table> 
// 	<br> 
// 	<br>
// 	<table>
// 	<tr>
// 		<th style='text-align: right !important;' width='100'>Acteur : </th>
// 			<th style='text-align: left !important;'>${$scope.part}</th>
// 			<th></th>
// 			<th></th>
// 			<th style='text-align: right !important;'>Responsable UCP :</th>
// 		<th style='text-align: left !important;'>${nom} ${prenom}</th>
// 	</tr>
// 	</table>`;
//     titleCell11.style.height = "100px"; // Centrez le texte
//     titleCell11.style.display = "flex"; // Centrez le texte
//     titleCell11.style.justifyItems = "center"; // Centrez le texte
//     // Convertissez le tableau du titre en HTML

// 	var titleProjet3= document.createElement("table");
//     var titleRow3 = titleProjet3.insertRow(0);
//     var titleCell3 = titleRow3.insertCell(0);
// 	var date = new Date();
// 	var formattedDate = date.toLocaleDateString("fr-FR");
//     titleCell3.innerHTML = "Rapports de décaissement des activités du " + formattedDate +" <br>"; // Fusionnez la cellule sur 6 colonnes
//     titleCell3.colSpan = "6"; // Fusionnez la cellule sur 6 colonnes
//     titleCell3.style.textAlign = "center"; // Fusionnez la cellule sur 6 colonnes
//     titleCell3.style.height = "60px"; // Centrez le texte
//     titleCell3.style.verticalAlign = "middle"; // Centrez le texte
//     titleCell3.style.fontSize = "20px"; // Centrez le texte
//     titleCell3.style.fontFamily = "sans serif"; // Fusionnez la cellule sur 6 colonnes



//     var titleHTML = titleTable.outerHTML.replace(/ /g, '%20');

//     var titleProjet1 = titleProjet.outerHTML.replace(/ /g, '%20');

//     var titleProjet11 = titleProjet2.outerHTML.replace(/ /g, '%20');

//     var titleProjet33 = titleProjet3.outerHTML.replace(/ /g, '%20');

//     var tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');

//     // Combinez les deux tableaux en un seul
//     var combinedHTML =  titleHTML + titleProjet11 + titleProjet33 + tableHTML ;

//     // Spécifiez le nom du fichier
//     filename = 'decaissement.xls'; // Vous pouvez modifier le nom de fichier si nécessaire

//     // Créez un élément de lien de téléchargement
//     downloadLink = document.createElement("a");
// // 66253003
//     document.body.appendChild(downloadLink);

//     if (navigator.msSaveOrOpenBlob) {
//         var blob = new Blob(['\ufeff',  combinedHTML], {
//             type: dataType
//         });
//         navigator.msSaveOrOpenBlob(blob, filename);
//     } else {
//         // Créez un lien vers le fichier
//         downloadLink.href = 'data:' + dataType + ';charset=utf-8,'  + combinedHTML;

//         // Définissez le nom du fichier
//         downloadLink.download = filename;

//         // Déclenchez la fonction
//         downloadLink.click();
//     }