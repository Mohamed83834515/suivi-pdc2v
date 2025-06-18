
DECAISSEMENT.controller('IndicateurController', function ($rootScope,$scope, $http, $cookies, $httpParamSerializer, $routeParams) {

	$scope.ListeActivite = []; //Initialisation tableau liste Decaissement
	$scope.numeroAfficher = 10; 
    $scope.numero="";
	$scope.moisActuel = parseInt(new Date().getMonth()) + 1 ;
	$scope.InitialiseIndicateur = function () {
		if (!$cookies.get("Version")) {
			$scope.getListeActivite();
			$scope.getActivite();
			$scope.getTauxDecaisserByuser();
			$scope.getTauxIndicateurByuser();
		}
		else {
			$scope.ChangeVersion($cookies.get("Version"));
			$scope.getActiviteChange($cookies.get("Version"));
			$scope.getTauxDecaisserByuserVersion($cookies.get("Version"));
			$scope.getTauxIndicateurByuserVersion($cookies.get("Version"));
		}
		$scope.getListeActivite1();
		$scope.getIndicateur();
		$scope.getSuiviIndicateur();
		$scope.getTauxRealisation();
		$scope.InitialiseMotif();
		$scope.getVersion();
		$scope.getMonthActuelle();
		$scope.Version = $cookies.get("Version");
	}
	$scope.Motif = {
		IdTache: 0,
		Intitule: "",
		Proportion: "",
		CodeTache: "",
		Nlot: 0,
		DateReelle: "",
		Observation: "",
		Livrable: "",
		StatutTache: "",
		Retard: "",
		Difficultes: "",
		PisteSolutions: "",
		//idusrcreation: $cookies.get('IdUtilisateur')
	};
	//Fin Declaration de la classe Motif 

	//Initialisation de la classe Motif   
	$scope.InitialiseMotif = function () {

		$scope.Motif = {
			IdTache: 0,
			Intitule: "",
			Proportion: "",
			CodeTache: 0,
			Nlot: 0,
			DateReelle: "",
			Observation: "",
			Livrable: "",
			StatutTache: "",
			Retard: "",
			Difficultes: "",
			PisteSolutions: "",
			date_indicateur:0,
			id_indicateur:0,
			valeur_cible1:0,
			valeur_cible2:0,
			valeur_cible3:0,
			valeur_cible4:0,
			valeur_cible5:0,
			valeur_cible6:0,
			valeur_cible7:0,
			valeur_cible8:0,
			valeur_cible9:0,
			valeur_cible10:0,
			valeur_cible11:0,
			valeur_cible12:0,
			id_suivi_indicateur:[],
		};
	}
	$scope.getTauxIndicateurByuser = function () {
		$scope.totalJour = 0;
		$scope.ListeStatistique = [];
		// U$scope.nom = "admin";
		$scope.nom = $cookies.get("NomUtilisateur");
		$scope.Fonction = $cookies.get("Fonction");
		var partenaire = $cookies.get("checkActivite");

		$http({
			method: 'GET',
			//url: 'https://sise-pdc2v.org/api/activite.php?responsable=' + $scope.nom,
			url: $scope.link + '/api/TauxIndicateurByUser.php?responsable=' + $scope.Fonction + '&executant=' + $scope.nom + '' + '&Partenaire=' + partenaire,
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
		}).success(function (data) {
			$scope.ListeTauxIndic = data.taches;
			$scope.tauxByIndicateurUser = $scope.ListeTauxIndic[0].moyenne_taux_realisation;
			console.log('taux_indicateur', $scope.tauxByIndicateurUser)
		});
	}
	$scope.getTauxIndicateurByuserVersion = function (version) {
		$scope.totalJour = 0;
		$scope.ListeStatistique = [];
		$scope.tauxByIndicateurUser = 0;
		// U$scope.nom = "admin";
		$scope.nom = $cookies.get("NomUtilisateur");
		$scope.Fonction = $cookies.get("Fonction");
		var partenaire = $cookies.get("checkActivite");

		$http({
			method: 'GET',
			//url: 'https://sise-pdc2v.org/api/activite.php?responsable=' + $scope.nom,
			url: $scope.link + '/api/TauxIndicateurByUser.php?responsable=' + $scope.Fonction + '&executant=' + $scope.nom + '' + '&Partenaire=' + partenaire +'&annee=' + version,
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
		}).success(function (data) {
			$scope.ListeTauxIndic = data.taches;
			$scope.tauxByIndicateurUser = $scope.ListeTauxIndic[0].moyenne_taux_realisation;
			console.log('taux_indicateur', $scope.tauxByIndicateurUser)
		});
	}
	$scope.getListeActivite = function () {
		$scope.totalJour = 0;
		$scope.ListeActivite = [];
		// $scope.nom = "admin";
		$scope.nom = $cookies.get("NomUtilisateur");
		$scope.cokk = $cookies.get('IdUtilisateur');
		$scope.Fonction = $cookies.get("Fonction");
		$scope.Partenaire = $cookies.get("checkActivite");

		console.log($scope.nom);
		console.log($scope.cokk);
		console.log($scope.Fonction);
		console.log($scope.Partenaire);
		$http({
			method: 'GET',
			url: $scope.link + '/api/activite.php?responsable=' + $scope.nom + '&id_personnel=' + $scope.cokk + '&Fonction=' + $scope.Fonction + '&Partenaire=' + $scope.Partenaire,
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
		}).success(function (data) {
			$scope.ListeActivite = data.activites;
			$scope.ListeActivite1 = data.activites;
			
			$cookies.put('Version0', $scope.ListeActivite1[0].annee);
			$scope.Version = $scope.ListeActivite1[0].annee;
			$scope.VersionOne = $cookies.get("Version0");
			console.log($cookies.get("Version0"));
			console.log('liste des activités', $scope.ListeActivite)
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
		$scope.getListeActiviteChange(version);
		$scope.VersionOne = version;
		$cookies.put('Version', version);
	}
	$scope.getListeActiviteChange = function (version) {
		$scope.totalJour = 0;
		$scope.ListeActivite = [];
		// $scope.nom = "admin";

		$scope.nom = $cookies.get("NomUtilisateur");
		$scope.cokk = $cookies.get('IdUtilisateur');
		$scope.Fonction = $cookies.get("Fonction");
		$scope.Partenaire = $cookies.get("checkActivite");
		$scope.executant = $cookies.get("executant");

		//console.log("test",$scope.executant);

		$http({
			method: 'GET',
			url: $scope.link + '/api/activite.php?responsable=' + $scope.nom + '&id_personnel=' + $scope.cokk + '&Fonction=' + $scope.Fonction + '&Partenaire=' + $scope.Partenaire+ '&annee='+version,
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
		}).success(function (data) {
			$scope.ListeActivite = data.activites;
			console.log('actiite', $scope.ListeActivite);
			// Une fois que vous avez récupéré les activités, appelez la fonction pour mettre à jour les tâches associées.
			// $scope.getListeTacheByUser();
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
			// console.log('usersmon', $scope.ListeActivite)
		});
	}
	$scope.AddNotification = function (id_activite, description, message) {
		var fd = new FormData();
		var nom = $cookies.get("NomUtilisateur");
		var partenaire = $cookies.get("Partenaire");
		var responsable = "";
		var code_activite = "";
		var version_ptba = "";
		for (var i = 0; i < $scope.ListeActivite.length; i++) {
			if ($scope.ListeActivite[i].id_ptba == id_activite) {
				if (partenaire == "09") {
					responsable = $scope.ListeActivite[i].executant;
				} else {
					responsable = $scope.ListeActivite[i].responsable;
				}
				code_activite = $scope.ListeActivite[i].code_activite_ptba;
				version_ptba  = $scope.ListeActivite[i].annee;
			}
		}

		fd.append('Description', description);
		fd.append('Suivi', message);
		fd.append('Responsable', responsable);
		fd.append('code_activite', code_activite);
		fd.append('enregistrer_par', nom);
		fd.append('id_activite_ptba', id_activite);
		fd.append('version_ptba', version_ptba);
		$http({
			method: 'post',
			url: $scope.link + '/api/add_notification.php',
			data: fd,
			headers: { 'Content-Type': undefined },
		}).then(function successCallback(response) {
			$scope.response = response.data
			console.log('data', $scope.response)
			// console.log(response);
			if (response.data.status === "success") {
				// $scope.confirmationSwal("notifié avec succès", "success");
			} else {

			}
		}).catch(function (error) {
			// console.log(error);
			$scope.confirmationSwal("Echec modification sous activité", "error");
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
			url: $scope.link + '/api/activitestatistique.php?responsable=' + $scope.Fonction + '&executant=' + $scope.nom + ''  + '&Partenaire=' + partenaire,
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
		}).success(function (data) {
			$scope.ListeStatistique = data.taches;
			console.log('statistique', $scope.ListeStatistique)
		});
	}
	$scope.getMonthActuelle  = function() {
		var nombreTachesValides = 0;
		$scope.activitesEnCours1 = []; // Nouvelle variable pour stocker les activités en cours
		$scope.nom = $cookies.get("Version");
		var date = new Date().getFullYear();
		var annee = "";
		for (var i = 0; i < $scope.ListeVerion.length; i++) {
			if ($scope.ListeVerion[i].id_version_ptba == $scope.Version) {
				// Récupérer l'id activité en cours
				 annee = $scope.ListeVerion[i].annee_ptba;
			}
		}
		var oklm = 0;
		if(annee == date){
			oklm = parseInt( new Date().getMonth()) + 1;
		}else {
			oklm = 12;
		}
		
		return oklm;
		// console.log('en mois ', $scope.ListeVerion);
	};
	$scope.getLibelle = function () {

		if($cookies.get("Version"))
		{
			var versionFromCookies = $cookies.get("Version");
		}
		else
		{
			var versionFromCookies = $cookies.get("Version0");
		}
		
		
	
		for (var i = 0; i <= $scope.ListeVerion.length - 1; i++) {
			if ($scope.ListeVerion[i].id_version_ptba == versionFromCookies) {
				// Concaténer les observations
				return $scope.ListeVerion[i].observation + ' ' + $scope.ListeVerion[i].version_ptba;
			}
		}
		// Si la version n'est pas trouvée, vous pouvez retourner une valeur par défaut ou gérer autrement.
		return "Version non trouvée";
	};
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
			console.log('console',$scope.ListeIndicateur)
		});
	}
	$scope.getLastIntitule = function(IdActivite) {
		var etatAvancement1 = [];
		var etatAvancement = 0;
		var etat ;
	
		// Parcourez la liste des enregistrements de la table "suivi".
		for (var i = 0; i < $scope.ListeIndicateur.length; i++) {
			if ($scope.ListeIndicateur[i].id_ptba == IdActivite) {
				etatAvancement1.push($scope.ListeIndicateur[i].id_indicateur_tache);
				etatAvancement = Math.min.apply(null, etatAvancement1);
				if($scope.ListeIndicateur[i].id_indicateur_tache == etatAvancement){
					etat = $scope.ListeIndicateur[i].intitule_indicateur_tache;
				}
			}
		}
	
		return etat;
	};

	$scope.getLastValeur = function(IdActivite) {
		var etatAvancement1 = [];
		var etatAvancement = 0;
		var etat ;
	
		// Parcourez la liste des enregistrements de la table "suivi".
		for (var i = 0; i < $scope.ListeIndicateur.length; i++) {
			if ($scope.ListeIndicateur[i].id_ptba == IdActivite) {
				etatAvancement1.push($scope.ListeIndicateur[i].id_indicateur_tache);
				etatAvancement = Math.min.apply(null, etatAvancement1);
				if($scope.ListeIndicateur[i].id_indicateur_tache == etatAvancement){
					etat = $scope.ListeIndicateur[i].valeur_cible;
				}
			}
		}
	
		return etat;
	};
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
			url: $scope.link + '/api/activitestatistique.php?responsable=' + $scope.Fonction + '&executant=' + $scope.nom + '&annee='+version  + '&Partenaire=' + partenaire,
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
		}).success(function (data) {
			$scope.ListeStatistique = data.taches;
			console.log('stat', $scope.ListeStatistique);
		});
	}
	$scope.getLastIndicateur = function(IdActivite) {
		var etatAvancement1 = [];
		var etatAvancement = 0;
		var etat ;
	
		// Parcourez la liste des enregistrements de la table "suivi".
		for (var i = 0; i < $scope.ListeIndicateur.length; i++) {
			if ($scope.ListeIndicateur[i].id_ptba == IdActivite) {
				etatAvancement1.push($scope.ListeIndicateur[i].id_indicateur_tache);
				etatAvancement = Math.min.apply(null, etatAvancement1);
				if($scope.ListeIndicateur[i].id_indicateur_tache == etatAvancement){
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
	$scope.getIndicateurById = function (IdMotif,valeur,id) {
		$scope.id_activite_ptba_indicateur =  id;
		$scope.TotalValeurcible = valeur;
		$scope.Motif.id_indicateur= IdMotif;
		if ($scope.ListeSuiviIndicteur && $scope.ListeSuiviIndicteur.length > 0) {
			// Filtrez les indicateurs avec IdMotif
			var indicateurs = $scope.ListeSuiviIndicteur.filter(function (indicateur) {
				return indicateur.indicateur === IdMotif;
			});
	
			// Si des indicateurs sont trouvés, traitez-les
			if (indicateurs.length > 0) {
				$scope.alertID= 1;
				$scope.Motif.valeur_cible1 = indicateurs[0].valeur_suivi;
				$scope.Motif.valeur_cible2 = indicateurs[1].valeur_suivi;
				$scope.Motif.valeur_cible3 = indicateurs[2].valeur_suivi;
				$scope.Motif.valeur_cible4 = indicateurs[3].valeur_suivi;
				$scope.Motif.valeur_cible5 = indicateurs[4].valeur_suivi;
				$scope.Motif.valeur_cible6 = indicateurs[5].valeur_suivi;
				$scope.Motif.valeur_cible7 = indicateurs[6].valeur_suivi;
				$scope.Motif.valeur_cible8 = indicateurs[7].valeur_suivi;
				$scope.Motif.valeur_cible9 = indicateurs[8].valeur_suivi;
				$scope.Motif.valeur_cible10 = indicateurs[9].valeur_suivi;
				$scope.Motif.valeur_cible11 = indicateurs[10].valeur_suivi;
				$scope.Motif.valeur_cible12 = indicateurs[11].valeur_suivi;
				$scope.Motif.id_suivi_indicateur= [
					parseInt(indicateurs[0].id_suivi),
					parseInt(indicateurs[1].id_suivi),
					parseInt(indicateurs[2].id_suivi),
					parseInt(indicateurs[3].id_suivi),
					parseInt(indicateurs[4].id_suivi),
					parseInt(indicateurs[5].id_suivi),
					parseInt(indicateurs[6].id_suivi),
					parseInt(indicateurs[7].id_suivi),
					parseInt(indicateurs[8].id_suivi),
					parseInt(indicateurs[9].id_suivi),
					parseInt(indicateurs[10].id_suivi),
					parseInt(indicateurs[11].id_suivi),
				];
			}
			else{
				$scope.alertID= 0;
				$scope.Motif.valeur_cible1 = 0;
				$scope.Motif.valeur_cible2 = 0;
				$scope.Motif.valeur_cible3 = 0;
				$scope.Motif.valeur_cible4 = 0;
				$scope.Motif.valeur_cible5 = 0;
				$scope.Motif.valeur_cible6 = 0;
				$scope.Motif.valeur_cible7 = 0;
				$scope.Motif.valeur_cible8 = 0;
				$scope.Motif.valeur_cible9 = 0;
				$scope.Motif.valeur_cible10 = 0;
				$scope.Motif.valeur_cible11 = 0;
				$scope.Motif.valeur_cible12 =0;
			}
		}
	};
	$scope.getValeurRealise = function (id_fonction) {
		var sommeMontants = 0;
		for (var j = 0; j < $scope.ListeSuiviIndicteur.length; j++) {
			if ($scope.ListeSuiviIndicteur[j].indicateur == id_fonction) {
				sommeMontants += parseFloat($scope.ListeSuiviIndicteur[j].valeur_suivi);
			}
		}
	  
		return sommeMontants;
	};
	$scope.getTauxRealisation = function () {
		$scope.taux = [];

		$http({
			method: 'GET',
			url: $scope.link + '/api/taux_realisation.php',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
		}).success(function (data) {
			$scope.taux = data.users;
			// Une fois que vous avez récupéré les activités, appelez la fonction pour mettre à jour les tâches associées.
			// $scope.getListeTacheByUser();
		});
	}
	$scope.getTauxRealiser = function (IdStatut) {
		var sommeMontants  = 0; // Variable de comptage

		for (var i = 0; i < $scope.taux.length; i++) {
			if ($scope.taux[i].id_ptba == IdStatut){
				if ($scope.taux[i].moyenne_taux_realisation) {
					sommeMontants = $scope.taux[i].moyenne_taux_realisation;
				}
			}	
		}
		return sommeMontants ; // Renvoie le total des tâches correspondant à l'identifiant de statut
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
			// console.log('indicateur', $scope.ListeIndicateur  )
			// Une fois que vous avez récupéré les activités, appelez la fonction pour mettre à jour les tâches associées.
			// $scope.getListeTacheByUser();
		});
	}
	$scope.getMyIndicateur = function (id_ptba) {
		$scope.indicateurs = []; // Tableau pour stocker les tâches correspondantes
		$scope.id_activite_ptba_3 = id_ptba;
		for (var i = 0; i < $scope.ListeIndicateur.length; i++) {
			if ($scope.ListeIndicateur[i].id_ptba == id_ptba) {
				$scope.indicateurs.push($scope.ListeIndicateur[i]);
			}
		}
		// console.log('myindicateur',$scope.indicateurs);
	}
	
	$scope.ValiderEditionTache2 = function (id,valeurrur,id_ptba) {
		swal({
			title: "Etes vous sur?",
			text: "Les données seront enregistrées",
			icon: "warning",
			buttons: true,
			dangerMode: false,
		})
			.then((willEdit) => {
				if (willEdit) {
					var TotalValeurRealiser = parseInt($scope.Motif.valeur_cible1) +
											  parseInt($scope.Motif.valeur_cible2) +
											  parseInt($scope.Motif.valeur_cible3) +
											  parseInt($scope.Motif.valeur_cible4) +
											  parseInt($scope.Motif.valeur_cible5) +
											  parseInt($scope.Motif.valeur_cible6) +
											  parseInt($scope.Motif.valeur_cible7) +
											  parseInt($scope.Motif.valeur_cible8) +
											  parseInt($scope.Motif.valeur_cible9) +
											  parseInt($scope.Motif.valeur_cible10) +
											  parseInt($scope.Motif.valeur_cible11) +
											  parseInt($scope.Motif.valeur_cible12) ;
					if(TotalValeurRealiser > valeurrur){
						$scope.confirmationSwal(" ECHEC Le cumule des valeurs réalisées est plus grande que la valeur cible planifiée", "error");
					
					}else if (
						parseInt($scope.Motif.valeur_cible1) < 0 ||
						parseInt($scope.Motif.valeur_cible2) < 0 ||
						parseInt($scope.Motif.valeur_cible3) < 0 ||
						parseInt($scope.Motif.valeur_cible4) < 0 ||
						parseInt($scope.Motif.valeur_cible5) < 0 ||
						parseInt($scope.Motif.valeur_cible6) < 0 ||
						parseInt($scope.Motif.valeur_cible7) < 0 ||
						parseInt($scope.Motif.valeur_cible8) < 0 ||
						parseInt($scope.Motif.valeur_cible9) < 0 ||
						parseInt($scope.Motif.valeur_cible10) < 0 ||
						parseInt($scope.Motif.valeur_cible11) < 0 ||
						parseInt($scope.Motif.valeur_cible12) < 0
						){
						$scope.confirmationSwal("Veuillez inserer une bonne valeur de réalisation", "error");
					}
					else {
						if(id == 1){
							$scope.UpdateIndicateur(id_ptba);
							$('#exampleModalll').modal('hide');
							$('#exampleModal111').modal('show');
							}else {
							$scope.UpdateMotif2(id_ptba);
							$scope.InitialiseIndicateur();
							$('#exampleModal111').modal('show');
						}
					}
				}
			});


	}
	$scope.UpdateIndicateur = function (id_ptba) {
		var valeur_cibles= [
			$scope.Motif.valeur_cible1,
			$scope.Motif.valeur_cible2,
			$scope.Motif.valeur_cible3,
			$scope.Motif.valeur_cible4,
			$scope.Motif.valeur_cible5,
			$scope.Motif.valeur_cible6,
			$scope.Motif.valeur_cible7,
			$scope.Motif.valeur_cible8,
			$scope.Motif.valeur_cible9,
			$scope.Motif.valeur_cible10,
			$scope.Motif.valeur_cible11,
			$scope.Motif.valeur_cible12,
		];
		var fd = new FormData();
		fd.append('id_indicateur2', $scope.Motif.id_indicateur);
		fd.append('valeur_cibles', JSON.stringify(valeur_cibles));
		fd.append('id_indicateur',  JSON.stringify($scope.Motif.id_suivi_indicateur));
		var config = {
			headers: { 'Content-Type': undefined},
			transformRequest: $httpParamSerializer
		};
		//$http.post('https://sise-pdc2v.org/api/update_tache.php', donnee, config)
		$http({
			method: 'post',
			url: $scope.link + '/api/update_indicateur.php',
			data: fd,
			headers: { 'Content-Type': undefined},
		}).then(function successCallback(response){
			$scope.response = response.data
					// console.log(response);
						if (response.data.status === "success") {
							$scope.AddNotification(id_ptba, "mise à jour d'un indicateur", 3);
							$scope.InitialiseIndicateur();
							$scope.confirmationSwal("Suivi effectué avec succès", "success");
							$('#exampleModal').modal('hide');
						} else {
		
						}
					})
					.catch(function (error) {
						$scope.AddNotification(id_ptba, "mise à jour d'un indicateur", 3);
						$scope.confirmationSwal("Suivi effectué avec succès", "success");
						$scope.InitialiseIndicateur();
					});
	}
	$scope.UpdateMotif2 = function (id_ptba) {
		// console.log(dateReelleFormatted);
		// var donnee = {
		// 	id_indicateur: $scope.Motif.id_indicateur,
		// 	date_reelle: dateReelleFormatted,
			
		// }
		var valeur_cibles= [
			$scope.Motif.valeur_cible1,
			$scope.Motif.valeur_cible2,
			$scope.Motif.valeur_cible3,
			$scope.Motif.valeur_cible4,
			$scope.Motif.valeur_cible5,
			$scope.Motif.valeur_cible6,
			$scope.Motif.valeur_cible7,
			$scope.Motif.valeur_cible8,
			$scope.Motif.valeur_cible9,
			$scope.Motif.valeur_cible10,
			$scope.Motif.valeur_cible11,
			$scope.Motif.valeur_cible12,
		];
		var fd = new FormData();
		fd.append('id_indicateur', $scope.Motif.id_indicateur);
		fd.append('valeur_cibles', JSON.stringify(valeur_cibles));
		var config = {
			headers: { 'Content-Type': undefined},
			transformRequest: $httpParamSerializer
		};

		//$http.post('https://sise-pdc2v.org/api/update_tache.php', donnee, config)
		$http({
			method: 'post',
			url: $scope.link + '/api/insert_indicateur.php',
			data: fd,
			headers: { 'Content-Type': undefined},
		}).then(function successCallback(response){
			$scope.response = response.data
			console.log('data', $scope.response)
					// console.log(response);
						if (response.data.status === "success") {
							$scope.AddNotification(id_ptba, "Mise à jour d'un indicateur", 3);
							$scope.InitialiseIndicateur();
							$scope.confirmationSwal("Suivi effectué avec succès", "success");
							$('#exampleModalll').modal('hide');
						} else {
		
						}
					})
					.catch(function (error) {
						$scope.AddNotification(id_ptba, "Mise à jour d'un indicateur", 3);
						$scope.InitialiseIndicateur();
						$scope.confirmationSwal("Echec Ajout Suivi indicateur", "error");
					});
	}
	$scope.updateNumeroAfficher = function() {
		if (!$scope.numero || $scope.numero.trim() === '') {
			// Si le champ est vide, réinitialiser à 5
			$scope.numeroAfficher = 10;
		} else {
			// Sinon, définir sur 100
			$scope.numeroAfficher = $scope.ListeActivite.length;
		}
	};
});