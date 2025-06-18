DECAISSEMENT.controller('ActiviteController', function ($rootScope, $scope, $http, $cookies, $filter, $location, $routeParams, $httpParamSerializer) {

	$scope.Titre = "Gestion des activités";//Titre du module
	$scope.ListeActivite = []; //Initialisation tableau liste Utilisateur
	$scope.currentUserId = null; // Selected user id on modal
	$scope.ListeTacheByUser = [];
	$scope.ListeSousActivite = [];
	$scope.ListeUsers = [];
	$scope.numero = "";
	$scope.Existe = false;
	$scope.numeroAfficher = 10;
	$scope.valide = 0
	$scope.id = $routeParams.IdActivite;
	$scope.dateChoisie = false;
	$scope.nom1 = $cookies.get("NomUtilisateur");
	$scope.nomadmin = $cookies.get("Fonction");
	$scope.NomUser = $cookies.get("NomUtilisateur");
	$scope.InitialiseActivite = function () {
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
		// $scope.getListeActivite();
		$scope.getVersion();
		$scope.getListeActivite1();
		$scope.getListeTacheByUser();
		$scope.InitialiseMotif();
		$scope.getListeTache();
		$scope.getListeSousActivite();
		$scope.getTauxRealisation();
		$scope.getIndicateur();
		$scope.getNom();
		$scope.getListeStructure();
		$scope.getSuiviIndicateur();
		//$scope.getUsers();
		// // console.log( $scope.getTache($routeParams.IdActivite));
	}

	//// console.log($routeParams.IdActivite);
	// Définition de la classe Tache


	//Declaration de la classe Motif   
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
		};
	}
	//Fin initialisation de la classe Motif 

	$scope.getListeTacheByUser = function () {
		$scope.totalJour = 0;
		$scope.ListeTacheByUser = [];
		$http({
			method: 'GET',
			url: $scope.link + '/api/tache_user.php',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
		}).
			success(function (data) {
				$scope.ListeTacheByUser = data.taches;
			});
	}

	$scope.getListeSousActivite = function () {
		$scope.totalJour = 0;
		$scope.ListeSousActivite = [];
		$http({
			method: 'GET',
			url: $scope.link + '/api/sous_activite.php',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
		}).
			success(function (data) {
				$scope.ListeSousActivite = data.sous_activites;
				if ($scope.valide != 0) {
					$scope.getSuiviActivite($scope.valide);
				}
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
	$scope.getSuiviActivite = function (id) {
		$scope.suividata = [];
		$scope.id_activite_ptba_1 = id;
		for (var i = 0; i <= $scope.ListeSousActivite.length - 1; i++) {
			if ($scope.ListeSousActivite[i].id_activite_ptba == id) {
				$scope.suividata.push($scope.ListeSousActivite[i]);
			}

		}
		console.log('mon suivi', $scope.suividata);
	}

	$scope.getListeTache = function () {
		$scope.totalJour = 0;
		$scope.ListeTacheByActivite = [];
		$scope.nom = $routeParams.IdActivite;
		$http({
			method: 'GET',
			url: $scope.link + '/api/tacheByactivite.php?responsable=' + $scope.nom,
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
		}).
			success(function (data) {
				$scope.ListeTacheByActivite = data.taches;
			});
	}
	$scope.getListeTaches = function (nom) {
		$scope.totalJour = 0;
		$scope.ListeTacheByActivite = [];
		// $scope.nom = $routeParams.IdActivite;
		$http({
			method: 'GET',
			url: $scope.link + '/api/tacheByactivite.php?responsable=' + nom,
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
		}).
			success(function (data) {
				$scope.ListeTacheByActivite = data.taches;
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
			$scope.VersionOne = $cookies.get("Version0");
			console.log($cookies.get("Version0"));
			console.log('liste des activités', $scope.ListeActivite)
		});
	}
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
	$scope.ChangeVersion = function (version) {
		$scope.totalJour = 0;
		$scope.ListeActivite = [];
		// $scope.nom = "admin";
		$scope.nom = $cookies.get("NomUtilisateur");
		$scope.cokk = $cookies.get('IdUtilisateur');
		$scope.Fonction = $cookies.get("Fonction");
		$scope.Partenaire = $cookies.get("checkActivite");
		$cookies.put('Version', version);
		$scope.VersionOne = version;
		$scope.versionsssss = $cookies.get("Version");
		console.log( $cookies.get("Version"));
		console.log($scope.nom);
		console.log($scope.cokk);
		console.log($scope.Fonction);
		console.log($scope.Partenaire);
		$http({
			method: 'GET',
			url: $scope.link + '/api/activite.php?responsable=' + $scope.nom + '&id_personnel=' + $scope.cokk + '&Fonction=' + $scope.Fonction + '&Partenaire=' + $scope.Partenaire + '&annee=' + version,
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
		}).success(function (data) {
			$scope.ListeActivite = data.activites;
			$scope.ListeActivite1 = data.activites;
			 console.log('usersmon', $scope.ListeActivite)
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
			console.log('actuiu', $scope.ListeActivite1);
			// Une fois que vous avez récupéré les activités, appelez la fonction pour mettre à jour les tâches associées.
			// $scope.getListeTacheByUser();
		});
	}



	$scope.getMotif = function (IdMotif) {
		// // console.log("ID du motif : ", IdMotif);
		for (var i = 0; i <= $scope.ListeTacheByUser.length - 1; i++) {
			if ($scope.ListeTacheByUser[i].id_suivi == IdMotif) {

				$scope.Motif.IdTache = $scope.ListeTacheByUser[i].id_activite_ptba;
				$scope.Motif.CodeTache = $scope.ListeTacheByUser[i].id_sous_activite;
				$scope.Motif.Livrable = $scope.ListeTacheByUser[i].documents;
				//$scope.Motif.Nlot = $scope.ListeTacheByUser[i].id_sous_activite;
				$scope.Motif.DateReelle = $scope.ListeTacheByUser[i].date_suivi;
				$scope.Motif.Observation = $scope.ListeTacheByUser[i].observation;
				$scope.Motif.StatutTache = $scope.ListeTacheByUser[i].statut_activite;
				$scope.Motif.Retard = $scope.ListeTacheByUser[i].retard_accuse;
				$scope.Motif.Difficultes = $scope.ListeTacheByUser[i].difficultes_rencontrees;
				$scope.Motif.PisteSolutions = $scope.ListeTacheByUser[i].pistes_solutions;
				break;
			}
		}


	}
	$scope.confirmDelete = function (Motif, id_activite_ptba_1) {
		swal({
			title: "Etes vous sûr?",
			text: "Les données seront supprimés",
			icon: "warning",
			buttons: true,
			dangerMode: false,
		})
			.then((willDelete) => {
				if (willDelete) {
					// Appel à l'API PHP pour supprimer l'élément
					$http.delete($scope.link + '/api/supprimer_suivi.php?id_suivi=' + Motif.id_suivi)
						.then(function (response) {
							$scope.InitialiseActivite();
							$scope.confirmationSwal("Sous activité supprimé avec succès", "success");
							$scope.valide = id_activite_ptba_1;
							$('#exampleModal1').modal('show');
						})
						.catch(function (error) {
							console.error("Erreur lors de la suppression:", error);
						});
				}
			});
	};
	$scope.validerHistorique = function (id_activite_ptba_1) {
		swal({
			title: "Etes vous sur?",
			text: "Les données seront enregistrées",
			icon: "warning",
			buttons: true,
			dangerMode: false,
		})
			.then((willEdit) => {
				if (willEdit) {

					$scope.UpdateHistorique();
					$scope.valide = id_activite_ptba_1;
					$('#exampleModal1').modal('show');


				}
			});


	}
	$scope.UpdateHistorique = function () {

		var dateReelleFormatted = formatDate($scope.Motif.DateReelle);
		var fd = new FormData();
		var files = document.getElementById('file12').files[0];
		fd.append('id_tache', $scope.Motif.IdTache);
		fd.append('lot', $scope.Motif.Nlot);
		fd.append('date_reelle', dateReelleFormatted);
		fd.append('observation', $scope.Motif.Observation);
		fd.append('code_tache', $scope.Motif.CodeTache);
		fd.append('statut_tache', $scope.Motif.StatutTache);
		fd.append('difficultes', $scope.Motif.Difficultes);
		fd.append('retard', $scope.Motif.Retard);
		fd.append('pistes_solutions', $scope.Motif.PisteSolutions);
		fd.append('file', files);
		fd.append('id_personnel', $scope.NomUser);
		$http({
			method: 'post',
			url: $scope.link + '/api/update_suivi_avancement.php',
			data: fd,
			headers: { 'Content-Type': undefined },
		}).then(function successCallback(response) {
			$scope.response = response.data
			console.log('data', $scope.response)
			// console.log(response);
			if (response.data.status === "success") {
				$scope.AddNotification($scope.Motif.IdTache, "Mise à jour d'une tâche", 1)
				$scope.InitialiseActivite();
				$scope.confirmationSwal("Suivi modifié avec succès", "success");
				$('#exampleModal3').modal('hide');
			} else {

			}
		})
			.catch(function (error) {
				// console.log(error);
				$scope.confirmationSwal("Echec modification sous activité", "error");
			});
		$scope.verifierDateChoisie();

	}
	$scope.getTacheById = function (IdMotif) {
		for (var i = 0; i <= $scope.ListeSousActivite.length - 1; i++) {
			if ($scope.ListeSousActivite[i].id_suivi == IdMotif) {
				$scope.Motif.IdTache = $scope.ListeSousActivite[i].id_activite_ptba;
				$scope.Motif.CodeTache = $scope.ListeSousActivite[i].documents;
				$scope.Motif.Livrable = $scope.ListeSousActivite[i].documents;
				$scope.Motif.Nlot = $scope.ListeSousActivite[i].id_suivi;
				$scope.Motif.DateReelle = new Date($scope.ListeSousActivite[i].date_suivi);
				$scope.Motif.Observation = $scope.ListeSousActivite[i].observation;
				$scope.Motif.StatutTache = $scope.ListeSousActivite[i].statut_activite;
				$scope.Motif.Retard = $scope.ListeSousActivite[i].retard_accuse;
				$scope.Motif.Difficultes = $scope.ListeSousActivite[i].difficultes_rencontrees;
				$scope.Motif.PisteSolutions = $scope.ListeSousActivite[i].pistes_solutions;
				break;
			}
		}
	}
	$scope.getLastEtat = function (IdActivite) {
		var etatAvancement = null; // Pour stocker la date la plus récente.
		var etat = null;
		for (var i = 0; i < $scope.ListeSousActivite.length; i++) {
			if ($scope.ListeSousActivite[i].id_activite_ptba == IdActivite) {
				var dateSuivi = new Date($scope.ListeSousActivite[i].date_suivi);

				if (isNaN(dateSuivi)) {
					console.error("Date invalide : " + $scope.ListeSousActivite[i].date_suivi);
					continue;
				}

				if (etatAvancement === null || dateSuivi > etatAvancement) {
					etatAvancement = dateSuivi;
					etat = $scope.ListeSousActivite[i].observation;
				}
			}
		}
		return etat;

	};
	$scope.getTache = function (IdActivite) {
		var etatAvancement = null; // Pour stocker la date la plus récente.
		var etat = null;
		for (var i = 0; i < $scope.ListeSousActivite.length; i++) {
			if ($scope.ListeSousActivite[i].id_activite_ptba == IdActivite) {
				var dateSuivi = new Date($scope.ListeSousActivite[i].date_suivi);

				if (isNaN(dateSuivi)) {
					console.error("Date invalide : " + $scope.ListeSousActivite[i].date_suivi);
					continue;
				}

				if (etatAvancement === null || dateSuivi > etatAvancement) {
					etatAvancement = dateSuivi;
					etat = $scope.ListeSousActivite[i].statut_activite;
				}
			}
		}

		// console.log('etat:', etat);
		return etat;
	};


	$scope.getTacheCount = function (IdStatut) {
		var count = 0; // Variable de comptage

		for (var i = 0; i < $scope.ListeSousActivite.length; i++) {
			if ($scope.ListeSousActivite[i].id_activite_ptba == IdStatut) {
				count++;
			}
		}
		return count; // Renvoie le total des tâches correspondant à l'identifiant de statut
	}


	$scope.getObservation = function (IdActivite, IdSousactivite) {
		var observation = null;
		var maxIdSuivi = -1;

		for (var i = 0; i < $scope.ListeSousActivite.length; i++) {
			if ($scope.ListeSousActivite[i].id_activite_ptba == IdActivite && $scope.ListeSousActivite[i].id_sous_activite == IdSousactivite) {
				var currentIdSuivi = parseInt($scope.ListeSousActivite[i].id_suivi);
				if (currentIdSuivi > maxIdSuivi) {
					maxIdSuivi = currentIdSuivi;
					observation = $scope.ListeSousActivite[i].observation;
				}
			}
		}
		//console.log($scope.ListeSousActivite);
		return observation;
	};
	$scope.getActiviteIntitutile = function (IdActivite) {
		var Intitule = null;
		var data = $scope.ListeActivite;
		for (var i = 0; i < data.length; i++) {
			if (data[i].id_ptba == IdActivite) {
				Intitule = data[i].intitule_activite_ptba;
			}
		}

		return Intitule;
	};
	$scope.getdateInfo = function (id_ptba, id_tache, date_suivi) {
		$scope.etat = null
		getdateInfo("test");
		$scope.date = []; // Tableau pour stocker les tâches correspondantes
		for (var i = 0; i < $scope.ListeSousActivite.length; i++) {
			if ($scope.ListeSousActivite[i].id_activite_ptba == id_ptba && $scope.ListeSousActivite[i].id_sous_activite == id_tache && $scope.ListeSousActivite[i].date_suivi == date_suivi) {
				$scope.date.push($scope.ListeSousActivite[i]);
			}

		}
		for (var j = 0; j < $scope.ListeTacheByUser.length; j++) {
			if ($scope.ListeTacheByUser[j].id_suivi == id_tache && $scope.ListeTacheByUser[j].contrat == id_ptba) {
				$scope.etat = $scope.ListeTacheByUser[j].etat;
			}
		}
		$scope.date_suivis = date_suivi;
		// // console.log ('tacheby acttt',$scope.ListeTacheByUser)
		// // console.log('tats',$scope.etat);
	}
	$scope.getDate = function (IdActivite, IdSousactivite) {
		var dates = [];

		for (var i = 0; i < $scope.ListeSousActivite.length; i++) {
			if ($scope.ListeSousActivite[i].id_activite_ptba == IdActivite && $scope.ListeSousActivite[i].id_sous_activite == IdSousactivite) {
				dates.push($scope.ListeSousActivite[i].date_suivi);
			}
		}

		// Filtrer les doublons
		dates = dates.filter(function (item, index, self) {
			return self.indexOf(item) === index;
		});

		// Formater les dates dans le format "dd/MM/yyyy"
		// dates = dates.map(function(date) {
		//   return $filter('date')(date, 'dd/MM/yyyy');
		// });

		return dates;
	};




	$scope.getDifficultes = function (IdActivite, IdSousactivite) {
		var difficultes = null;
		var maxIdSuivi = -1;

		for (var i = 0; i < $scope.ListeSousActivite.length; i++) {
			if ($scope.ListeSousActivite[i].id_activite_ptba == IdActivite && $scope.ListeSousActivite[i].id_sous_activite == IdSousactivite) {
				var currentIdSuivi = parseInt($scope.ListeSousActivite[i].id_suivi);
				if (currentIdSuivi > maxIdSuivi) {
					maxIdSuivi = currentIdSuivi;
					difficultes = $scope.ListeSousActivite[i].difficultes_rencontrees;
				}
			}
		}

		return difficultes;
	};
	$scope.getStatut = function (IdActivite, IdSousactivite) {
		var statut = null;
		var maxIdSuivi = -1;

		for (var i = 0; i < $scope.ListeSousActivite.length; i++) {
			if ($scope.ListeSousActivite[i].id_activite_ptba == IdActivite && $scope.ListeSousActivite[i].id_sous_activite == IdSousactivite) {
				var currentIdSuivi = parseInt($scope.ListeSousActivite[i].id_suivi);
				if (currentIdSuivi > maxIdSuivi) {
					maxIdSuivi = currentIdSuivi;
					statut = $scope.ListeSousActivite[i].statut_activite;
				}
			}
		}

		return statut;
	};
	$scope.getRetard = function (IdActivite, IdSousactivite) {
		var retard = null;
		var maxIdSuivi = -1;

		for (var i = 0; i < $scope.ListeSousActivite.length; i++) {
			if ($scope.ListeSousActivite[i].id_activite_ptba == IdActivite && $scope.ListeSousActivite[i].id_sous_activite == IdSousactivite) {
				var currentIdSuivi = parseInt($scope.ListeSousActivite[i].id_suivi);
				if (currentIdSuivi > maxIdSuivi) {
					maxIdSuivi = currentIdSuivi;
					retard = $scope.ListeSousActivite[i].retard_accuse;
				}
			}
		}

		return retard;
	};
	$scope.getSolution = function (IdActivite, IdSousactivite) {
		var solution = null;
		var maxIdSuivi = -1;

		for (var i = 0; i < $scope.ListeSousActivite.length; i++) {
			if ($scope.ListeSousActivite[i].id_activite_ptba == IdActivite && $scope.ListeSousActivite[i].id_sous_activite == IdSousactivite) {
				var currentIdSuivi = parseInt($scope.ListeSousActivite[i].id_suivi);
				if (currentIdSuivi > maxIdSuivi) {
					maxIdSuivi = currentIdSuivi;
					solution = $scope.ListeSousActivite[i].pistes_solutions;
				}
			}
		}

		return solution;
	};
	$scope.getSousActivite = function (IdActivite, IdSousactivite) {
		var observation = null;
		var maxIdSuivi = -1;
		var foundInListeSousActivite = false;



		for (var i = 0; i < $scope.ListeSousActivite.length; i++) {
			if ($scope.ListeSousActivite[i].id_activite_ptba == IdActivite && $scope.ListeSousActivite[i].id_sous_activite == IdSousactivite) {
				$scope.Existe = true;
				var currentIdSuivi = parseInt($scope.ListeSousActivite[i].id_suivi);
				if (currentIdSuivi > maxIdSuivi) {
					maxIdSuivi = currentIdSuivi;
					$scope.Motif.IdTache = $scope.ListeSousActivite[i].id_activite_ptba;
					$scope.Motif.CodeTache = $scope.ListeSousActivite[i].id_sous_activite;
					$scope.Motif.Livrable = $scope.ListeSousActivite[i].documents;
					//$scope.Motif.Nlot = $scope.ListeTacheByUser[i].id_sous_activite;
					$scope.Motif.DateReelle = $scope.ListeSousActivite[i].date_suivi;
					$scope.Motif.Observation = $scope.ListeSousActivite[i].observation;
					$scope.Motif.StatutTache = $scope.ListeSousActivite[i].statut_activite;
					$scope.Motif.Retard = $scope.ListeSousActivite[i].retard_accuse;
					$scope.Motif.Difficultes = $scope.ListeSousActivite[i].difficultes_rencontrees;
					$scope.Motif.PisteSolutions = $scope.ListeSousActivite[i].pistes_solutions;

					foundInListeSousActivite = true;
				}
			}
		}

		if (!foundInListeSousActivite) {

			// console.log($scope.ListeTacheByActivite);
			for (var j = 0; j < $scope.ListeTacheByActivite.length; j++) {
				if ($scope.ListeTacheByActivite[j].contrat == IdActivite && $scope.ListeTacheByActivite[j].id_suivi == IdSousactivite) {

					$scope.Motif.IdTache = $scope.ListeTacheByActivite[j].contrat;
					$scope.Motif.CodeTache = $scope.ListeTacheByActivite[j].id_suivi;

				}
			}
		}
	};


	$scope.getNom = function (IdStatut) {
		var Nom; // Variable de comptage

		for (var i = 0; i < $scope.ListeActivite1.length; i++) {
			if ($scope.ListeActivite1[i].id_personnel == IdStatut) {

				Nom = $scope.ListeActivite1[i].nom
			}
		}
		// console.log('sdc',$scope.ListeActivite);
		return Nom; // Renvoie le total des tâches correspondant à l'identifiant de statut
	}
	$scope.getPrenom = function (IdStatut) {
		var prenom; // Variable de comptage

		for (var i = 0; i < $scope.ListeActivite1.length; i++) {
			if ($scope.ListeActivite1[i].id_personnel == IdStatut) {

				prenom = $scope.ListeActivite1[i].prenom
			}
		}
		// console.log('sdc',$scope.ListeActivite);
		return prenom; // Renvoie le total des tâches correspondant à l'identifiant de statut
	}
	$scope.getFonction = function (IdStatut) {
		var fonction; // Variable de comptage

		for (var i = 0; i < $scope.ListeActivite1.length; i++) {
			if ($scope.ListeActivite1[i].id_personnel == IdStatut) {

				fonction = $scope.ListeActivite1[i].fonction
			}
		}
		// console.log('sdc',$scope.ListeActivite);
		return fonction; // Renvoie le total des tâches correspondant à l'identifiant de statut
	}


	$scope.getMaTache = function () {
		$scope.taches = []; // Tableau pour stocker les tâches correspondantes
		for (var i = 0; i < $scope.ListeTacheByUser.length; i++) {
			if ($scope.ListeTacheByUser[i].id_activite == $routeParams.IdActivite) {
				$scope.taches.push($scope.ListeTacheByUser[i]);
			}
		}
		//// console.log($scope.taches);

	}

	$scope.ValiderEditionTache = function (id_activite_ptba_1) {
		swal({
			title: "Etes vous sur?",
			text: "Les données seront enregistrées",
			icon: "warning",
			buttons: true,
			dangerMode: false,
		})
			.then((willEdit) => {
				if (willEdit) {
					var dateReelleFormatted = formatDate($scope.Motif.DateReelle);
					var dateSaisieObj = new Date(dateReelleFormatted);

					// Obtenir la date actuelle
					var dateActuelle = new Date();
					if (dateSaisieObj > dateActuelle) {
						$scope.confirmationSwal(" La date saisie est antérieure à la date actuelle. Veuillez saisir une date ultérieure.", "error");
					} else {
						console.log('date', dateReelleFormatted);
						$scope.UpdateMotif();
						$scope.valide = id_activite_ptba_1;
						$('#exampleModal1').modal('show');
					}

				}
			});


	}

	$scope.validerTache = function (Motif) {
		var dateReelleFormatted = new Date(Motif.date_reelle).toISOString();
		//	// console.log(dateReelleFormatted);
		var donnee = {
			id_tache: Motif.id_groupe_tache,
			lot: Motif.n_lot,
			date_reelle: dateReelleFormatted,
			observation: Motif.observation,
			livrable: Motif.livrable,
			code_tache: Motif.code_tache
		};

		var config = {
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			transformRequest: $httpParamSerializer
		};

		//$http.post('https://sise-pdc2v.org/api/update_tache.php', donnee, config)
		$http.post($scope.link + '/api/update_tache.php', donnee, config)
			.then(function (response) {
				if (data.status == "success") {
					$scope.getMaTache();
					$('#exampleModal').modal('hide');
					$scope.confirmationSwal("Tache modifiée avec succès", "success");
				} else {
					$scope.confirmationSwal("Tache modifiée avec succès", "success");
				}
			})
			.catch(function (error) {
				// console.log(error);
				$scope.confirmationSwal("Tache modifiée avec succès", "success");
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
	$scope.UpdateMotif = function () {

		var dateReelleFormatted = formatDate($scope.Motif.DateReelle);
		var fd = new FormData();
		var files = document.getElementById('file').files[0];
		fd.append('id_tache', $scope.Motif.IdTache);
		fd.append('lot', $scope.Motif.Nlot);
		fd.append('date_reelle', dateReelleFormatted);
		fd.append('observation', $scope.Motif.Observation);
		fd.append('code_tache', $scope.Motif.CodeTache);
		fd.append('statut_tache', $scope.Motif.StatutTache);
		fd.append('difficultes', $scope.Motif.Difficultes);
		fd.append('retard', $scope.Motif.Retard);
		fd.append('pistes_solutions', $scope.Motif.PisteSolutions);
		fd.append('file', files);
		fd.append('id_personnel', $scope.NomUser);
		$http({
			method: 'post',
			url: $scope.link + '/api/update_tache.php',
			data: fd,
			headers: { 'Content-Type': undefined },
		}).then(function successCallback(response) {
			$scope.response = response.data
			console.log('data', $scope.response)
			// console.log(response);
			if (response.data.status === "success") {
				$scope.AddNotification($scope.Motif.IdTache, "Ajout d'une nouvelle tâche", 1)
				$scope.InitialiseActivite();
				$scope.confirmationSwal("Suivi effectué avec succès", "success");
				$('#exampleModal').modal('hide');
			} else {

			}
		})
			.catch(function (error) {
				// console.log(error);
				$scope.confirmationSwal("Suivi effectué avec succès", "success");
			});
		$scope.verifierDateChoisie();

	}
	$scope.verifierDateChoisie = function () {
		// Vérifier si la date est choisie
		if ($scope.Motif.DateReelle) {
			$scope.dateChoisie = true;
		} else {
			$scope.dateChoisie = false;
		}
	};
	function formatDate(date) {
		// Convertir la date en objet Date JavaScript
		var jsDate = new Date(date);

		// Obtenir les parties de la date (année, mois et jour)
		var year = jsDate.getFullYear();
		var month = jsDate.getMonth() + 1; // Notez que les mois commencent à 0 dans JavaScript
		var day = jsDate.getDate();

		// Ajouter un zéro devant le mois et le jour si nécessaire
		if (month < 10) {
			month = '0' + month;
		}
		if (day < 10) {
			day = '0' + day;
		}

		// Retourner la date formatée au format YYYY-MM-DD
		return year + '-' + month + '-' + day;
	}

	$scope.getAlertValidationTache = function (id_act, modal,ok) {
		if (ok == 1) {
			message = "La tâche sera validée";
		} else {
			message = "La tâche sera annulée"
		}
		swal({
			title: "Etes vous sur?",
			text: message,
			icon: "warning",
			buttons: true,
			dangerMode: false,
		})
			.then((willEdit) => {
				if (willEdit) {
					$scope.ValideTache(id_act,ok);
					$scope.valide = modal;
					$('#exampleModal1').modal('show');
				}
			});


	}

	$scope.ValideTache = function (id_act,OK) {
		var donnee = {
			id_suivi: id_act,
			validation: OK,
		};
		// console.log(donnee);
		var config = {
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			transformRequest: $httpParamSerializer
		};

		//$http.post('https://sise-pdc2v.org/api/update_tache.php', donnee, config)
		$http.post($scope.link + '/api/valide_tache.php', donnee, config)
			.then(function (response) {
				// console.log(response);
				if (response.data.status === "success") {

					$scope.InitialiseActivite();
					var message = "";
					if (OK == 1) {
						message = "Tâche validée avec succès";
					} else {
						message = "Tâche annulée avec succès"
					}
					$scope.confirmationSwal(message, "success");


				} else {

				}
			})
			.catch(function (error) {
				// console.log(error);
				$scope.confirmationSwal("Tache validée avec succès", "success");
			});

	}
	$scope.getAlertValidation = function (id_act) {
		swal({
			title: "Etes vous sur?",
			text: "L'activité sera validé",
			icon: "warning",
			buttons: true,
			dangerMode: false,
		})
			.then((willEdit) => {
				if (willEdit) {
					$scope.ValideActivite(id_act);

				}
			});


	}

	$scope.ValideActivite = function (id_act) {

		console.log('idididididdididi', id_act);
		var donnee = {
			id_ptba_activite: id_act,
		};
		// console.log(donnee);
		var config = {
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			transformRequest: $httpParamSerializer
		};

		//$http.post('https://sise-pdc2v.org/api/update_tache.php', donnee, config)
		$http.post($scope.link + '/api/valide_activite.php', donnee, config)
			.then(function (response) {
				// console.log(response);
				if (response.data.status === "success") {

					$scope.InitialiseActivite();
					$scope.confirmationSwal("Activité validée avec succès", "success");

				} else {

				}
			})
			.catch(function (error) {
				// console.log(error);
				$scope.confirmationSwal("Activité validée avec succès", "success");
			});
		$scope.verifierDateChoisie();

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
			// Une fois que vous avez récupéré les activités, appelez la fonction pour mettre à jour les tâches associées.
			// $scope.getListeTacheByUser();
		});
	}
	$scope.getStructure = function (IdStatut) {
		var structure; // Variable de comptage

		for (var i = 0; i < $scope.ListeStructure.length; i++) {
			if ($scope.ListeStructure[i].id_acteur == IdStatut) {

				structure = $scope.ListeStructure[i].nom_acteur
			}
		}
		// console.log('sdc',$scope.ListeActivite);
		return structure; // Renvoie le total des tâches correspondant à l'identifiant de statut
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
	$scope.ValiderEditionTache2 = function (id, valeurrur) {
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
						parseInt($scope.Motif.valeur_cible12);
					if (TotalValeurRealiser > valeurrur) {
						$scope.confirmationSwal(" ECHEC Le cumule des valeurs réalisées est plus grande que la valeur cible planifiée", "error");

					} else {
						if (id == 1) {
							$scope.UpdateIndicateur();
							$('#exampleModalll').modal('hide');
							$('#exampleModal111').modal('show');
						} else {
							$scope.UpdateMotif2();
							$scope.InitialiseActivite();
							$('#exampleModal111').modal('show');
						}
					}
				}
			});


	}
	$scope.UpdateIndicateur = function () {
		var valeur_cibles = [
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
		fd.append('id_indicateur', JSON.stringify($scope.Motif.id_suivi_indicateur));
		var config = {
			headers: { 'Content-Type': undefined },
			transformRequest: $httpParamSerializer
		};
		//$http.post('https://sise-pdc2v.org/api/update_tache.php', donnee, config)
		$http({
			method: 'post',
			url: $scope.link + '/api/update_indicateur.php',
			data: fd,
			headers: { 'Content-Type': undefined },
		}).then(function successCallback(response) {
			$scope.response = response.data
			// console.log(response);
			if (response.data.status === "success") {

				$scope.InitialiseActivite();
				$scope.confirmationSwal("Suivi effectué avec succès", "success");
				$('#exampleModal').modal('hide');
			} else {

			}
		})
			.catch(function (error) {
				$scope.confirmationSwal("Suivi effectué avec succès", "success");
				$scope.InitialiseActivite();
			});
	}
	$scope.UpdateMotif2 = function () {
		// console.log(dateReelleFormatted);
		// var donnee = {
		// 	id_indicateur: $scope.Motif.id_indicateur,
		// 	date_reelle: dateReelleFormatted,

		// }
		var valeur_cibles = [
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
			headers: { 'Content-Type': undefined },
			transformRequest: $httpParamSerializer
		};

		//$http.post('https://sise-pdc2v.org/api/update_tache.php', donnee, config)
		$http({
			method: 'post',
			url: $scope.link + '/api/insert_indicateur.php',
			data: fd,
			headers: { 'Content-Type': undefined },
		}).then(function successCallback(response) {
			$scope.response = response.data
			console.log('data', $scope.response)
			// console.log(response);
			if (response.data.status === "success") {
				$scope.InitialiseActivite();
				$scope.confirmationSwal("Suivi effectué avec succès", "success");
				$('#exampleModalll').modal('hide');
			} else {

			}
		})
			.catch(function (error) {
				$scope.confirmationSwal("Echec Ajout Suivi indicateur", "error");
			});
	}
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
	$scope.getValeurRealise = function (id_fonction) {
		var sommeMontants = 0;
		for (var j = 0; j < $scope.ListeSuiviIndicteur.length; j++) {
			if ($scope.ListeSuiviIndicteur[j].indicateur == id_fonction) {
				sommeMontants += parseFloat($scope.ListeSuiviIndicteur[j].valeur_suivi);
			}
		}

		return sommeMontants;
	};
	$scope.getIndicateurById = function (IdMotif, valeur) {
		$scope.TotalValeurcible = valeur;
		$scope.Motif.id_indicateur = IdMotif;
		if ($scope.ListeSuiviIndicteur && $scope.ListeSuiviIndicteur.length > 0) {
			// Filtrez les indicateurs avec IdMotif
			var indicateurs = $scope.ListeSuiviIndicteur.filter(function (indicateur) {
				return indicateur.indicateur === IdMotif;
			});

			// Si des indicateurs sont trouvés, traitez-les
			if (indicateurs.length > 0) {
				$scope.alertID = 1;
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
				$scope.Motif.id_suivi_indicateur = [
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
			else {
				$scope.alertID = 0;
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
				$scope.Motif.valeur_cible12 = 0;
			}
		}
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
		var sommeMontants = 0; // Variable de comptage

		for (var i = 0; i < $scope.taux.length; i++) {
			if ($scope.taux[i].id_ptba == IdStatut) {
				if ($scope.taux[i].moyenne_taux_realisation) {
					sommeMontants = $scope.taux[i].moyenne_taux_realisation;
				}
			}
		}
		return sommeMontants; // Renvoie le total des tâches correspondant à l'identifiant de statut
	}
	// $scope.showbutton1 = function (idbtn) {
	// 	var verifi = 1;
	// 	for (var i = 0; i < $scope.ListeSousActivite.length; i++) {
	// 		if ($scope.ListeSousActivite[i].id_activite_ptba == idbtn && $scope.ListeSousActivite[i].etat != 1) {
	// 			verifi = 2;
	// 		}
	// 	}
	// 	return verifi;
	// };
	$scope.moisActuel = parseInt(new Date().getMonth()) + 1;
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