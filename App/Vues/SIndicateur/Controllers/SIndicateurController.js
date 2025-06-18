
DECAISSEMENT.controller('SIndicateurController', function ($rootScope, $scope, $http, $cookies, $location, $routeParams) {

	$scope.ListeActivite = []; //Initialisation tableau liste Decaissement
	// $scope.numeroAfficher = 5; 
	$scope.numero = "";
	$scope.partenaire = $cookies.get("Partenaire");
	$scope.SInitialiseIndicateur = function () {
		if (!$cookies.get("Version")) {
			$scope.getListeActivite();
			$scope.getActivite();
			$scope.getTauxDecaisserByuser();
		}
		else {
			$scope.ChangeVersion($cookies.get("Version"));
			$scope.getActiviteChange($cookies.get("Version"));
			$scope.getTauxDecaisserByuserVersion($cookies.get("Version"));
		}
		
		$scope.Version = $cookies.get("Version");
		$scope.activitesChecked = $cookies.get("checkActivite");
		$scope.getVersion();
		$scope.getListeActivite1();
		$scope.getIndicateur();
		$scope.getSuiviIndicateur();
		$scope.getListeStructure();
	}

	$scope.getListeActivite = function () {
		$scope.totalJour = 0;
		$scope.ListeActivite = [];
		// $scope.nom = "admin";

		//console.log("test",$scope.executant);

		$http({
			method: 'GET',
			url: $scope.link + '/api/activite.php?responsable=' + $scope.nom + '&id_personnel=' + $scope.cokk + '&Fonction=' + $scope.Fonction + '&Partenaire=' + $scope.Partenaire,
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
		}).success(function (data) {
			$scope.ListeActivite = data.activites;
			$scope.ListeActivite2 = data.activites;
			$scope.ListeActivite1 = data.activites;

			$cookies.put('Version0', $scope.ListeActivite1[0].annee);
			$scope.VersionOne = $cookies.get("Version0");
			$scope.Version = $scope.ListeActivite1[0].annee;
		});
	}
	$scope.getListeActivite1 = function () {
		$scope.totalJour = 0;
		$scope.ListeActivite1 = [];
		$http({
			method: 'GET',
			url: $scope.link + '/api/user.php',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
		}).success(function (data) {
			$scope.ListeActivite1 = data;
			$scope.ListeActivite1 = data.users;
		});
	}
	$scope.getTauxDecaisserByuser = function () {
		$scope.totalJour = 0;
		$scope.ListeStatistique = [];
		// U$scope.nom = "admin";
		$scope.nom = $cookies.get("NomUtilisateur");
		$scope.Fonction = $cookies.get("Fonction");
		var partenaire = $cookies.get("checkActivite");

		$http({
			method: 'GET',
			//url: 'https://sise-pdc2v.org/api/activite.php?responsable=' + $scope.nom,
			url: $scope.link + '/api/tauxByUser.php?responsable=' + $scope.Fonction + '&executant=' + $scope.nom + '' + '&Partenaire=' + partenaire,
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
		}).success(function (data) {
			$scope.ListeTauxDecaisser = data.taches;
			var montant_decaisse = 0;
			var montant_total = 0;
			for (var i = 0; i < $scope.ListeTauxDecaisser.length; i++) {
				montant_decaisse += parseFloat($scope.ListeTauxDecaisser[i].total_montant);
				montant_total += parseFloat($scope.ListeTauxDecaisser[i].cout);
			}
			var taux = montant_decaisse / montant_total * 100 ;
			$scope.tauxByUser = taux;
			console.log('taux', $scope.tauxByUser)
		});
	}
	$scope.getTauxDecaisserByuserVersion = function (version) {
		$scope.totalJour = 0;
		$scope.ListeStatistique = [];
		$scope.tauxByUser = 0;
		// U$scope.nom = "admin";
		$scope.nom = $cookies.get("NomUtilisateur");
		$scope.Fonction = $cookies.get("Fonction");
		var partenaire = $cookies.get("checkActivite");

		$http({
			method: 'GET',
			//url: 'https://sise-pdc2v.org/api/activite.php?responsable=' + $scope.nom,
			url: $scope.link + '/api/tauxByUser.php?responsable=' + $scope.Fonction + '&executant=' + $scope.nom + '' + '&Partenaire=' + partenaire +'&annee=' + version,
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
		}).success(function (data) {
			$scope.ListeTauxDecaisser = data.taches;
			var montant_decaisse = 0;
			var montant_total = 0;
			for (var i = 0; i < $scope.ListeTauxDecaisser.length; i++) {
				montant_decaisse += parseFloat($scope.ListeTauxDecaisser[i].total_montant);
				montant_total += parseFloat($scope.ListeTauxDecaisser[i].cout);
			}
			var taux = montant_decaisse / montant_total * 100 ;
			$scope.tauxByUser = taux;
			console.log('taux', $scope.tauxByUser)
		});
	}
	$scope.ChangeVersion = function (version) {
		$scope.totalJour = 0;
		$scope.ListeActivite = [];
		$scope.ListeActivite2 = [];
		// $scope.nom = "admin";
		$scope.nom = $cookies.get("NomUtilisateur");
		$scope.cokk = $cookies.get('IdUtilisateur');
		$scope.Fonction = $cookies.get("Fonction");
		$scope.Partenaire = $cookies.get("checkActivite");
		$cookies.put('Version', version);
		$scope.versionsssss = $cookies.get("Version");
		$scope.VersionOne = version;
		var datas = [];
		$http({
			method: 'GET',
			url: $scope.link + '/api/activite.php?responsable=' + $scope.nom + '&id_personnel=' + $scope.cokk + '&Fonction=' + $scope.Fonction + '&Partenaire=' + $scope.Partenaire + '&annee=' + version,
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
		}).success(function (data) {
			$scope.ListeActivite = data.activites;
			$scope.ListeActivite1 = data.activites;
			$scope.ListeActivite2 = data.activites;
			console.log('iiiiiiiiii', data.activites)
		});
	}
	$scope.getVersion = function () {
		$scope.totalJour = 0;
		$scope.ListeVerion = [];
		// $scope.nom = "admin";
		$scope.nom = $cookies.get("NomUtilisateur");
		$scope.cokk = $cookies.get('IdUtilisateur');
		$scope.Fonction = $cookies.get("Fonction");
		$scope.Partenaire = $cookies.get("Partenaire");

		$http({
			method: 'GET',
			url: $scope.link + '/api/version_ptba.php',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
		}).success(function (data) {
			$scope.ListeVerion = data.commune;
			console.log('version', $scope.ListeVerion )
		});
	}
	$scope.getActivite = function () {
		$scope.totalJour = 0;
		$scope.ListeStatistique = [];
		// U$scope.nom = "admin";
		$scope.nom = $cookies.get("NomUtilisateur");
		$scope.Fonction = $cookies.get("Fonction");
		var partenaire = $cookies.get("checkActivite");

		$http({
			method: 'GET',
			//url: 'https://sise-pdc2v.org/api/activite.php?responsable=' + $scope.nom,
			url: $scope.link + '/api/activitestatistique.php?responsable=' + $scope.Fonction + '&executant=' + $scope.nom + '' + '&Partenaire=' + partenaire,
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
		}).success(function (data) {
			$scope.ListeStatistique = data.taches;
			console.log('statistique', $scope.ListeStatistique)
		});
	}
	$scope.getActiviteChange = function (version) {
		$scope.totalJour = 0;
		$scope.ListeStatistique = [];
		// U$scope.nom = "admin";
		$scope.nom = $cookies.get("NomUtilisateur");
		$scope.Fonction = $cookies.get("Fonction");
		var partenaire = $cookies.get("checkActivite");

		$http({
			method: 'GET',
			//url: 'https://sise-pdc2v.org/api/activite.php?responsable=' + $scope.nom,
			url: $scope.link + '/api/activitestatistique.php?responsable=' + $scope.Fonction + '&executant=' + $scope.nom + '&annee=' + version + '&Partenaire=' + partenaire,
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
		}).success(function (data) {
			$scope.ListeStatistique = data.taches;
			console.log('stat', $scope.ListeStatistique);
		});
	}
	$scope.getIndicateur = function () {
		$scope.totalJour = 0;
		$scope.ListeIndicateur = [];
		// $scope.nom = "admin";


		$http({
			method: 'GET',
			url: $scope.link + '/api/Indicateur.php',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
		}).success(function (data) {
			$scope.ListeIndicateur = data;
			$scope.ListeIndicateur = data.users;
			console.log('console', $scope.ListeIndicateur)
		});
	}
	$scope.getLastIntitule = function (IdActivite) {
		var etatAvancement1 = [];
		var etatAvancement = 0;
		var etat;

		// Parcourez la liste des enregistrements de la table "suivi".
		for (var i = 0; i < $scope.ListeIndicateur.length; i++) {
			if ($scope.ListeIndicateur[i].id_ptba == IdActivite) {
				etatAvancement1.push($scope.ListeIndicateur[i].id_indicateur_tache);
				etatAvancement = Math.min.apply(null, etatAvancement1);
				if ($scope.ListeIndicateur[i].id_indicateur_tache == etatAvancement) {
					etat = $scope.ListeIndicateur[i].intitule_indicateur_tache;
				}
			}
		}

		return etat;
	};

	$scope.getLastValeur = function (IdActivite) {
		var etatAvancement1 = [];
		var etatAvancement = 0;
		var etat;

		// Parcourez la liste des enregistrements de la table "suivi".
		for (var i = 0; i < $scope.ListeIndicateur.length; i++) {
			if ($scope.ListeIndicateur[i].id_ptba == IdActivite) {
				etatAvancement1.push($scope.ListeIndicateur[i].id_indicateur_tache);
				etatAvancement = Math.min.apply(null, etatAvancement1);
				if ($scope.ListeIndicateur[i].id_indicateur_tache == etatAvancement) {
					etat = $scope.ListeIndicateur[i].valeur_cible;
				}
			}
		}

		return etat;
	};
	$scope.getLastIndicateur = function (IdActivite) {
		var etatAvancement1 = [];
		var etatAvancement = 0;
		var etat;

		// Parcourez la liste des enregistrements de la table "suivi".
		for (var i = 0; i < $scope.ListeIndicateur.length; i++) {
			if ($scope.ListeIndicateur[i].id_ptba == IdActivite) {
				etatAvancement1.push($scope.ListeIndicateur[i].id_indicateur_tache);
				etatAvancement = Math.min.apply(null, etatAvancement1);
				if ($scope.ListeIndicateur[i].id_indicateur_tache == etatAvancement) {
					etat = $scope.ListeIndicateur[i].id_indicateur_tache;
				}
			}
		}

		return etat;
	};
	$scope.getSuiviIndicateur = function () {
		$scope.totalJour = 0;
		$scope.ListeSuiviIndicteur = [];
		// $scope.nom = "admin";


		$http({
			method: 'GET',
			url: $scope.link + '/api/suivi_indicateur.php',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
		}).success(function (data) {
			$scope.ListeSuiviIndicteur = data;
			$scope.ListeSuiviIndicteur = data.users;
			// console.log('indidididisui', $scope.ListeSuiviIndicteur  )
			// Une fois que vous avez récupéré les activités, appelez la fonction pour mettre à jour les tâches associées.
			// $scope.getListeTacheByUser();
		});
	}
	$scope.getListeStructure = function () {
		$scope.totalJour = 0;
		$scope.ListeStructure = [];
		// $scope.nom = "admin";


		$http({
			method: 'GET',
			url: $scope.link + '/api/structure.php',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
		}).success(function (data) {
			$scope.ListeStructure = data;
			$scope.ListeStructure = data.users;
			$scope.getStructure($scope.partenaire);
			$scope.part = $scope.getStructure($scope.partenaire);
			console.log('structure', $scope.part)
			// Une fois que vous avez récupéré les activités, appelez la fonction pour mettre à jour les tâches associées.
			// $scope.getListeTacheByUser();
		});
	}

	$scope.getStructure = function (fonction) {
		var structure; // Variable de comptage

		for (var i = 0; i < $scope.ListeStructure.length; i++) {
			if ($scope.ListeStructure[i].code_acteur == fonction) {

				structure = $scope.ListeStructure[i].nom_acteur
			}
		}
		console.log('sdc', structure);
		return structure; // Renvoie le total des tâches correspondant à l'identifiant de statut
	}
	$scope.getValeurRealise = function (id_fonction) {
		var sommeMontants = 0;
		for (var j = 0; j < $scope.ListeSuiviIndicteur.length; j++) {
			if ($scope.ListeSuiviIndicteur[j].indicateur == id_fonction) {
				sommeMontants += parseFloat($scope.ListeSuiviIndicteur[j].valeur_suivi);
			}
		}

		return sommeMontants;
	};
	$scope.TelechargerTableauEnExcel = function () {
		var downloadLink;
		var nom = $cookies.get("NomUtilisateur");
		var prenom = $cookies.get("PrenomsUtilisateur");
		var link = 'https://suivi-pdc2v.org';

		var tableSelect = `<style>
						.label {
							color: red !important;
							padding: 100px !important;
							margin-bottom: 20px !important;
							font-family: sans-serif !important;
							font-weight: bold !important;
							font-size: 12px !important;
							text-transform: uppercase !important;
						}
						
						th {
							color: black !important;
						}
						
						td {
							color: black !important;
							vertical-align: middle;
						}
						
						.container {
							width: 100%;
						}
						
						table tr {
							page-break-inside: avoid;
						}
					</style>
					<div style="text-align: center;">
						<div style='text-align: center; margin-bottom:5px; font-family: "Times New Roman"; font-size: 16px; height: 100px;color: black; font-weight: 700; text-transform: uppercase;'>* REPUBLIQUE DE LA CÔTE D'IVOIRE *</div>
						<div style='text-align: center; margin-bottom:5px; font-family: "Times New Roman"; font-size: 16px; height: 100px;color: black; font-weight: 700; text-transform: uppercase;'>MINISTÈRE DE L'AGRICULTURE ET DU DÉVELOPPEMENT RURAL</div>
						<div style='text-align: center; margin-bottom:5px; font-family: "Times New Roman"; font-size: 16px; height: 100px;color: #F5870E; font-weight: 700; text-transform: uppercase;'>PROJET DE DÉVELOPPEMENT DES CHAÎNES DE VALEURS VIVRIÈRES</div>
					</div>
					
					<table>

						<thead height='50'>
						<tr height='100'>
							<th style='text-align: left !important;' width='160'><img src="${link}/App/img/pdc.jpg" width="200" height="60" alt=""></th>
							<th></th>
							<th></th>
							<th></th>
							<th></th>
							<th></th>
							<th style='text-align: left !important;' width='130'><img src="${link}/App/img/banque.jpeg" width="180" height="70" alt=""></th>
						</tr>
						</thead>
					</table>
					<br>
					<table>
					<tr>
						<th style='text-align: right !important;' width='100'>Acteur : </th>
							<th style='text-align: left !important;'>${$scope.part}</th>
							<th></th>
							<th></th>
							<th></th>
							<th style='text-align: right !important;'>Responsable UCP :</th>
						<th style='text-align: left !important;'>${nom} ${prenom}</th>
					</tr>
					</table>`;
		// var tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');
		var preHtml = `<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:excel' xmlns='http://www.w3.org/TR/REC-html40'>
						<head>
							<meta charset='utf-8'>
							<title>Export HTML To Doc</title>
                            							<style>
							@page WordSection1{size: 841.95pt 595.35pt;mso-page-orientation: landscape;}
							div.WordSection1 {page: WordSection1;}
							</style>
						</head>
						<body>
						<div class="WordSection1">`;

		var postHtml = "</div></body></html>";
		var date = new Date();
		var formattedDate = date.toLocaleDateString("fr-FR");
		var titleHtml = "<h4 style='text-align: center;'>Rapports d'indicateur des activités du " + formattedDate + "</h4>";
		var html = titleHtml + "<table border='1' class='table table-striped table-bordered'> " +
			"<thead  height='60'>" +
			"<tr style='background-color: #bbd6a5;' height='45'>" +
			"<th>Code</th>" +
			"<th width='300'>Intitulé de l'activité</th>" +
			"<th>Indicateurs de résultats PTBA</th>" +
			"<th>Cible PTBA</th>" +
			"<th>Réalisation</th>" +
			"<th width='80'>Taux</th>" +
			"<th>Observations</th>" +
			"</tr>" +
			"</thead>";

		// Récupérez les données de la liste et formatez-les en lignes de tableau
		var tableRows = document.getElementById('yourTableId3').querySelectorAll("tr");
		for (var i = 0; i < tableRows.length; i++) {
			var cells = tableRows[i].querySelectorAll("tbody td");
			if (cells.length === 7) {
				html += "<tr>";
				for (var j = 0; j < cells.length; j++) {
					if (j === 0 || j === 3 || j === 4 || j === 5) { // Vérifiez si c'est la troisième colonne (index 2)
						
						html += "<td style='text-align: center;'>" + cells[j].textContent + "</td>";
					} else {
						html += "<td>" + cells[j].textContent + "</td>";
					}
				}
				html += "</tr>";
			}
		}

		html += "</table>";
		var combinedHTML = preHtml + tableSelect + html + postHtml;

		// Spécifiez le nom du fichier
		var filename = 'Indicateur' ? 'Indicateur' + '.xls' : 'document.xls';
		// Créez un élément de lien de téléchargement
		var downloadLink = document.createElement("a");

		document.body.appendChild(downloadLink);
		var blob = new Blob(['\ufeff', combinedHTML], {
			type: 'application/msexcel'
		});
		if (navigator.msSaveOrOpenBlob) {
			navigator.msSaveOrOpenBlob(blob, filename);
		} else {
			// Créez un lien vers le fichier
			downloadLink.href = 'data:application/vnd.ms-excel;charset=utf-8,' + encodeURIComponent(combinedHTML);

			// Définissez le nom du fichier
			downloadLink.download = filename;

			// Déclenchez la fonction
			downloadLink.click();
		}
		document.body.removeChild(downloadLink);
	};
	$scope.TelechargerEnPDF = function () {
		var tableData = [];
		// Sélectionnez le tableau par son ID (votreTableId)
		var table = document.getElementById('yourTableId3');

		// Parcourez les lignes du tableau
		for (var i = 1; i < table.rows.length; i++) {
			var rowData = [];
			var row = table.rows[i];

			// Parcourez les cellules de la ligne
			for (var j = 0; j < row.cells.length; j++) {
				rowData.push(row.cells[j].innerText);
			}

			tableData.push(rowData);
		}
		var today = moment().locale('fr').format('DD/MM/YYYY');

		// Obtenir l'heure actuelle au format français
		var currentHour = moment().locale('fr').format('HH[h]mm');

		// Créez la chaîne de date et heure au format souhaité
		var dateTimeString = 'Le ' + today + ' à ' + currentHour;
		// Définissez la structure de docDefinition
		var docDefinition = {
			content: [
				{ text: 'Indicateurs', style: 'header' },
				{
					table: {
						headerRows: 1,
						body: [
							// En-tête du tableau ici
							["Code", "Intitulé de l'activité", "Indicateurs de résultats PTBA", "Cible PTBA", "Réalisation", "Taux", "Observations"],
							// Ajoutez le tableau de données (toutes les lignes du tableau HTML)
							...tableData
						]
					}
				},
				{ text: 'Date : ' + dateTimeString, style: 'date' }
			],
			styles: {
				header: {
					fontSize: 18,
					bold: true,
					alignment: 'center',
					margin: [0, 0, 0, 10]
				},
				date: {
					alignment: 'right',
					margin: [0, 0, 40, 0]
				}
			}
		};

		// Générez le document PDF
		var pdfDoc = pdfMake.createPdf(docDefinition);

		// Téléchargez le fichier PDF
		pdfDoc.download('Indicateurs.pdf');
	};
	$scope.exportToWord1 = function () {
		// Export3Word('yourTableId1', 'DecaissementRapport', $scope.link);
		// var link = 'http://localhost/tache';
		var nom = $cookies.get("NomUtilisateur");
		var prenom = $cookies.get("PrenomsUtilisateur");
		var link = 'https://suivi-pdc2v.org';

		var preHtml = `<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
						<head>
							<meta charset='utf-8'>
							<title>Export HTML To Doc</title>
							<link href='${link}/App/assets/css/default/style.min.css' rel='stylesheet'/>
							<style>
							@page WordSection1{size: 841.95pt 595.35pt;mso-page-orientation: landscape;}
							div.WordSection1 {page: WordSection1;}
							</style>
						</head>
						<body>
						<div class="WordSection1">`;

		var postHtml = "</div></body></html>";

		var logo = `<style>
						.label {
							color: red !important;
							padding: 100px !important;
							margin-bottom: 20px !important;
							font-family: sans-serif !important;
							font-weight: bold !important;
							font-size: 12px !important;
							text-transform: uppercase !important;
						}
						
						th {
							color: black !important;
						}
						
						td {
							color: black !important;
						}
						
						.container {
							width: 100%;
						}
						
						table tr {
							page-break-inside: avoid;
						}
						thead th {
							background-color: #bbd6a5;
							border-bottom: 2px solid #dee2e6;
						}
					</style>
					<div style="text-align: center;">
						<div style='text-align: center; margin-bottom:5px; font-family: "Times New Roman"; color: black; font-weight: 700; text-transform: uppercase;'>* République de la côte d'ivoire *</div>
						<div style='text-align: center; margin-bottom:5px; font-family: "Times New Roman"; color: black; font-weight: 700; text-transform: uppercase;'>Ministère de l'agriculture et du développement rural</div>
						<div style='text-align: center; margin-bottom:5px; font-family: "Times New Roman"; color: #F5870E; font-weight: 700; text-transform: uppercase;'>Projet de développement des chaines de valeurs vivrières</div>
					</div>
					
					<table>
						<tr>
							<th style='text-align: left !important;' width='200'><img src="${link}/App/img/pdc.jpg" width="200" height="60" alt=""></th>
							<th width='540'></th>
							<th style='text-align: left !important;' width='180'><img src="${link}/App/img/banque.jpeg" width="180" height="70" alt=""></th>
						</tr>
					</table>`;

		var respon = `<table>
						<tr>
							<th style='text-align: right !important;' width='70'>Acteur : </th>
							<th style='text-align: left !important;' width='150'>${$scope.part}</th>
							<th width='500'></th>
							<th style='text-align: right !important;' width='120'>Responsable UCP : </th>
							<th style='text-align: left !important;' width='150'>${nom} ${prenom} </th>
						</tr>
					</table>`;
		var date = new Date();
		var formattedDate = date.toLocaleDateString("fr-FR");
		var formattedTime = date.toLocaleTimeString("fr-FR");
		// var dateTimeHtml = "<p style='text-align: right;'>Date : " + formattedDate + " à " + formattedTime + "</p>";
		var titleHtml = "<h4 style='text-align: center;'>Rapports d'indicateur des activités au " + formattedDate + "</h4>";


		// Créez un tableau HTML avec des en-têtes de colonne
		var html = preHtml + logo + respon + titleHtml + "<table border='1' class='table table-striped table-bordered'> " +
			"<thead  height='45'>" +
			"<tr>" +
			"<th>Code</th>" +
			"<th width='200'>Intitulé de l'activité</th>" +
			"<th width='200'>Indicateurs de résultats PTBA</th>" +
			"<th>Cible PTBA</th>" +
			"<th>Réalisation</th>" +
			"<th width='80'>Taux</th>" +
			"<th>Observations</th>" +
			"</tr>" +
			"</thead>";

		// Récupérez les données de la liste et formatez-les en lignes de tableau
		var tableRows = document.getElementById('yourTableId3').querySelectorAll("tr");
		for (var i = 0; i < tableRows.length; i++) {
			var cells = tableRows[i].querySelectorAll("tbody td");
			if (cells.length === 7) {
				html += "<tr>";
				for (var j = 0; j < cells.length; j++) {
					if (j === 0 || j === 3 || j === 4 || j === 5) { // Vérifiez si c'est la troisième colonne (index 2)
						
					html += "<td style='text-align: center;'>" + cells[j].textContent + "</td>";
					} else {
						html += "<td>" + cells[j].textContent + "</td>";
					}
				}
				html += "</tr>";
			}
		}

		html += "</table>";
		html += postHtml;
		var blob = new Blob(['\ufeff', html], {
			type: 'application/msword'
		});

		var url = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(html);

		var filename = 'IndicateurRapport' ? 'IndicateurRapport' + '.doc' : 'document.doc';

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
	};

	// PDF EXPORTATION

	$scope.TelechargerEnPDF1 = function () {
		var titleHtml = `
			<style>
			   label {
			   margin-top: -10px;
			   text-transform: uppercase;
			   font-family: 'Times New Roman', Times, serif;
			   font-weight: bold;
			   font-size: 14px;
			   color: #333;
			   text-align: center;
		   }
		   th{
			color: black ;
			margin: 5px;
			padding: 5px;
		   }
		   td{
			color: black ;
		   }
		   table tr {
			page-break-inside: avoid;
		  }
		  td{
			color: black ;
			margin: 4px;
			padding: 5px;
		   }
		  thead th {
			background-color: #bbd6a5;
			border-bottom: 2px solid #dee2e6;
		}
	   </style>
			<div style="text-align: center;font-weight: 700;">
			<label for="" style='font-weight: 700;'>* République de la côte d'ivoire *</label>
			</div>
			<div style="text-align: center;font-weight: 700;color: black">
			<label for="" style='font-weight: 700;'>Ministère de l'agriculture et du developpement rural</label>
			</div>
			<div style="text-align: center;font-weight: 700;">
			<label for=""  style="color: #F5870E !important;">Projet de développement des chaines de valeurs vivrières</label>
			</div>
						   <div class="row" style="display: flex; justify-content: space-between; width: 100%;">
								   <div>
									   <img src="${$scope.link}/App/img/pdc.jpg" width="200" height='60' alt="">
								   </div>
								   
								   <div >
									   <img src="${$scope.link}/App/img/banque.jpeg" width="180" height='60'  alt="">
								   </div>
						   </div>`;
		titleHtml += "<h4 style='text-align: center; font-familly: cursive;'>Rapport d'indicateur des activités</h4>";
		var html = titleHtml +
			"<table border='1'>" +
			"<thead  height='45'>" +
			"<th width='80'>Code</th>" +
			"<th width='300'>Intitulé de l'activité</th>" +
			"<th width='200'>Indicateurs de résultats PTBA</th>" +
			"<th>Cible PTBA</th>" +
			"<th>Réalisation</th>" +
			"<th width='70'>Taux</th>" +
			"<th width='170'>Observations</th>" +
			"</tr>" +
			"</thead>";
		// Récupérez les données de la liste et formatez-les en lignes de tableau
		var tableRows = document.getElementById('yourTableId3').querySelectorAll("tr");
		for (var i = 0; i < tableRows.length; i++) {
			var cells = tableRows[i].querySelectorAll("tbody td");
			if (cells.length === 7) {
				html += "<tr>";
				for (var j = 0; j < cells.length; j++) {
					if (j === 0 || j === 3 || j === 4 || j === 5) { // Vérifiez si c'est la troisième colonne (index 2)
						
						html += "<td style='text-align: center;'>" + cells[j].textContent + "</td>";
					} else {
						html += "<td>" + cells[j].textContent + "</td>";
					}
				}
				html += "</tr>";
			}
		}
		// Ajoutez la date à la fin de la liste

		html += "</table>";
		var date = new Date();
		var formattedDate = date.toLocaleDateString("fr-FR");
		var formattedTime = date.toLocaleTimeString("fr-FR");
		var dateTimeHtml = "<p style='text-align: right; color: black;'>Date : " + formattedDate + " à " + formattedTime + " <img src='" + $scope.link + "/App/img/ruchevert.png' width='80' height='80' alt=''>&nbsp; &nbsp; &nbsp; &nbsp;</p>";
		html += dateTimeHtml;
		// Utilisez html2pdf avec les styles CSS pour générer le PDF
		var pdfOptions = {
			margin: 10,
			filename: 'Indicateurs.pdf',
			image: { type: 'jpeg', quality: 0.98 },
			html2canvas: { scale: 4 },
			jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' }
		};

		html2pdf().set(pdfOptions).from(html).save();
	};
});