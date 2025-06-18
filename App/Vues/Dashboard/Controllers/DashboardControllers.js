
DECAISSEMENT.controller('DashboardController', function ($rootScope, $scope, $http, $cookies, $routeParams, $httpParamSerializer, $q) {

	$scope.Titre = "Gestion des Dashboards";//Titre du module
	$scope.ListeDashboard = []; //Initialisation tableau liste Dashboard
	$scope.ListeActivite = [];
	$scope.numero = "";
	$scope.numeroAfficher = 5;
	$scope.ListeTacheByActivite = [];
	$scope.ListeSousActivite = [];
	$scope.ListeApiTache = [];
	$scope.ListeTacheByUser = [];
	$scope.ListeUsers = [];
	$scope.id = $routeParams.IdActivite;
	$scope.valide = 0;
	$scope.valide1 = 0;
	$scope.valide2 = 0;
	$scope.NomUser = $cookies.get("NomUtilisateur");
	$scope.PrenomUser = $cookies.get("PrenomsUtilisateur");
	$scope.FonctionUser = $cookies.get("Fonction");
	$scope.InitialiseDashboardG = function () {
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
		// $scope.getTacheSuivi();
		$scope.Version = $cookies.get("Version");
		$scope.getListeActivite1();
		$scope.getCommune();
		$scope.getTacheAttente();
		$scope.getTacheValide();
		$scope.getVersion();
		// $scope.getListeTache();
		// $scope.getObservation();
		// $scope.getDifficultes();
		// // $scope.getStatut();
		// $scope.getDifficultes();
		// $scope.getSolution();
		// $scope.getDate();
		$scope.getDecaissementTache();
		$scope.get_Tache_Attente();
		$scope.getListeApiTache();
		$scope.get_Tache_Valide();
		$scope.getListeTacheByUser();
		$scope.getListeStructure();
		$scope.getListeSousActivite();
		$scope.InitialiseMotif();
		$scope.getIndicateur();
		$scope.getSuiviIndicateur();
		$scope.getTauxRealisation();
		$scope.get_Tache_Echus();
		$scope.getMonthActuelle();
		// $scope.getTauxDecaissement();
		$scope.Motif.files = 0;
		$scope.activitesChecked = $cookies.get("checkActivite");
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
		ObservationGenerale: "",
		fin_activite: "",
		files: 0,
		commune: "",
		//idusrcreation: $cookies.get('IdUtilisateur')
	};

	$scope.Motif.files = 0;
	//Initialisation de la classe Motif   
	// $scope.InitialiseMotif = function () {

	// 	$scope.Motif = {
	// 		IdTache: 0,
	// 		Intitule: "",
	// 		Proportion: "",
	// 		CodeTache: 0,
	// 		Nlot: 0,
	// 		DateReelle: "",
	// 		Observation: "",
	// 		Livrable: "",
	// 		StatutTache: "",
	// 		Retard: "",
	// 		Difficultes: "",
	// 		PisteSolutions: "",
	// 		ObservationGenerale: "obbbmoozokszoskao",
	// 	};
	// }
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
			ObservationGenerale: "",
			fin_activite: "",
			commune: "",
			files: 0,
			date_indicateur: 0,
			id_indicateur: 0,
			valeur_cible1: 0,
			valeur_cible2: 0,
			valeur_cible3: 0,
			valeur_cible4: 0,
			valeur_cible5: 0,
			valeur_cible6: 0,
			valeur_cible7: 0,
			valeur_cible8: 0,
			valeur_cible9: 0,
			valeur_cible10: 0,
			valeur_cible11: 0,
			valeur_cible12: 0,
			id_suivi_indicateur: [],
			CommuneIndicateur: [],
		};
	}
	$scope.nom1 = $cookies.get("Fonction");
	// if($scope.ListeSousActivite[i].id_suivi == etatAvancement){
	// 	etat = $scope.ListeSousActivite[i].statut_activite;
	// }fileselected
	$scope.getLastAction = function (IdActivite) {
		var etatAvancement1 = [];
		var etatAvancement = 0;
		var etat;

		// Parcourez la liste des enregistrements de la table "suivi".
		for (var i = 0; i < $scope.ListeSuivi.length; i++) {
			// Vérifiez si l'ID d'activité de l'enregistrement correspond à l'ID d'activité donné.
			if ($scope.ListeSuivi[i].id_tache == IdActivite) {
				etatAvancement1.push($scope.ListeSuivi[i].id_suivi);
				etatAvancement = Math.max.apply(null, etatAvancement1);
				if ($scope.ListeSuivi[i].id_suivi == etatAvancement) {
					etat = $scope.ListeSuivi[i].ressources;
				}
			}
		}

		return etat;
	};
	
	$scope.getLibelle = function () {

		if ($cookies.get("Version")) {
			var versionFromCookies = $cookies.get("Version");
		}
		else {
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
			console.log('liste des statistiques',$scope.ListeStatistique);
		});
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
		});
	}
	$scope.getActiviteChange = function (version) {
		$scope.totalJour = 0;
		$scope.ListeStatistique = [];
		var vers = "";
		if(!version){
			vers = $cookies.get("Version");
	   }else {
		   vers = version;
	   }
		// U$scope.nom = "admin";
		$scope.nom = $cookies.get("NomUtilisateur");
		$scope.Fonction = $cookies.get("Fonction");
		var partenaire = $cookies.get("checkActivite");

		$http({
			method: 'GET',
			//url: 'https://sise-pdc2v.org/api/activite.php?responsable=' + $scope.nom,
			url: $scope.link + '/api/activitestatistique.php?responsable=' + $scope.Fonction + '&executant=' + $scope.nom + '&annee=' + vers + '&Partenaire=' + partenaire,
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
		}).success(function (data) {
			$scope.ListeStatistique = data.taches;
		});
	}
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
	$scope.getLastDateRealise = function (IdActivite) {
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
					etat = $scope.ListeSousActivite[i].date_suivi;
				}
			}
		}
		return etat;
	};

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

	// $scope.getTauxDecaissement = function () {

		
	// 	return taux;

	// }
	$scope.getTacheCount = function (IdStatut) {
		var count = 0; // Variable de comptage

		for (var i = 0; i < $scope.ListeSousActivite.length; i++) {
			if ($scope.ListeSousActivite[i].id_activite_ptba == IdStatut) {
				count++;
			}
		}
		return count; // Renvoie le total des tâches correspondant à l'identifiant de statut
	}
	$scope.getSuiviActivite = function (id) {
		$scope.suividata = [];
		$scope.id_activite_ptba_1 = id;
		for (var i = 0; i <= $scope.ListeSousActivite.length - 1; i++) {
			if ($scope.ListeSousActivite[i].id_activite_ptba == id) {
				$scope.suividata.push($scope.ListeSousActivite[i]);
			}

		}
	}
	$scope.getListeTacheByUser = function () {
		$scope.totalJour = 0;
		$scope.ListeTacheByUser = [];
		//$scope.nom =$cookies.get("NomUtilisateur");
		// $scope.nom = "nzue";
		//// console.log($scope.nom);
		$http({
			method: 'GET',

			url: $scope.link + '/api/tache_user.php',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
		}).
			success(function (data) {
				$scope.ListeTacheByUser = data.taches;
			});
	}

	$scope.getListeApiTache = function () {
		$scope.totalJour = 0;
		$scope.ListeApiTache = [];
		$scope.nom = $cookies.get("NomUtilisateur");

		$http({
			method: 'GET',
			url: $scope.link + '/api/Api_tache.php?responsable=' + $scope.nom,
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
		}).success(function (data) {
			$scope.ListeApiTache = data.activites;

		});
	}
	$scope.get_Tache_Valide1 = function() {
		var nombreTachesValides = 0;
		$scope.activitesEnCours = []; // Nouvelle variable pour stocker les activités en cours
	
		$scope.nom = $cookies.get("NomUtilisateur");
	
		for (var i = 0; i < $scope.ListeStatistique.length; i++) {
			if ($scope.ListeStatistique[i].statut == 'Achevé') {
				// Récupérer l'id activité en cours
				var idActiviteEnCours = $scope.ListeStatistique[i].id_ptba;
	
				// Filtrer ListeActivite pour récupérer la ligne correspondante à l'id activité en cours
				var activiteEnCours = $scope.ListeActivite2.find(function(activite) {
					return activite.id_ptba == idActiviteEnCours;
				});
	
				// Ajouter la ligne correspondante à la liste activitesEnCours
				$scope.activitesEnCours.push(activiteEnCours);
				console.log('en cours ', $scope.activitesEnCours);
			}
		}
	
		// Mettre à jour ListeActivite avec les activités en cours
		$scope.ListeActivite = $scope.activitesEnCours;
	};
	
	
	$scope.get_Tache_Valide = function () {
		var nombreTachesValides = 0;
		$scope.nom = $cookies.get("NomUtilisateur");
		for (var i = 0; i < $scope.ListeStatistique.length; i++) {
			if ($scope.ListeStatistique[i].statut == 'Achevé') {
				nombreTachesValides++;
			}
		}

		return nombreTachesValides;
	};
	$scope.get_Tache_Attente1 = function() {
		var nombreTachesValides = 0;
		$scope.activitesEnCours1 = []; // Nouvelle variable pour stocker les activités en cours
	
		$scope.nom = $cookies.get("NomUtilisateur");
	
		for (var i = 0; i < $scope.ListeStatistique.length; i++) {
			if ($scope.ListeStatistique[i].statut != 'Achevé' && new Date($scope.ListeStatistique[i].fin) > new Date()) {
				// Récupérer l'id activité en cours
				var idActiviteEnCours = $scope.ListeStatistique[i].id_ptba;
	
				// Filtrer ListeActivite pour récupérer la ligne correspondante à l'id activité en cours
				var activiteEnCours = $scope.ListeActivite2.find(function(activite) {
					return activite.id_ptba == idActiviteEnCours;
				});
	
				// Ajouter la ligne correspondante à la liste activitesEnCours
				$scope.activitesEnCours1.push(activiteEnCours);
				console.log('en cours ', $scope.activitesEnCours);
			}
		}
	
		// Mettre à jour ListeActivite avec les activités en cours
		$scope.ListeActivite = $scope.activitesEnCours1;
	};
	$scope.get_Tache_Attente = function () {
		var nombreTachesValides = 0;
		for (var i = 0; i < $scope.ListeStatistique.length; i++) {
			if ($scope.ListeStatistique[i].statut != 'Achevé' && new Date($scope.ListeStatistique[i].fin) > new Date()) {
				nombreTachesValides++;
			}
		}
		return nombreTachesValides;
	};
	$scope.get_Tache_Echus1 = function() {
		var nombreTachesValides = 0;
		$scope.activitesEnCours2 = []; // Nouvelle variable pour stocker les activités en cours
	
		$scope.nom = $cookies.get("NomUtilisateur");
	
		for (var i = 0; i < $scope.ListeStatistique.length; i++) {
			if ($scope.ListeStatistique[i].statut != 'Achevé' && new Date($scope.ListeStatistique[i].fin) < new Date()) {
				// Récupérer l'id activité en cours
				var idActiviteEnCours = $scope.ListeStatistique[i].id_ptba;
	
				// Filtrer ListeActivite pour récupérer la ligne correspondante à l'id activité en cours
				var activiteEnCours = $scope.ListeActivite2.find(function(activite) {
					return activite.id_ptba == idActiviteEnCours;
				});
	
				// Ajouter la ligne correspondante à la liste activitesEnCours
				$scope.activitesEnCours2.push(activiteEnCours);
				console.log('echusssss', $scope.activitesEnCours);
			}
		}
	
		// Mettre à jour ListeActivite avec les activités en cours
		$scope.ListeActivite = $scope.activitesEnCours2;
	};
	$scope.get_Tache_Echus = function () {
		var NbreTachesEchus = 0;
		for (var i = 0; i < $scope.ListeStatistique.length; i++) {
			if ($scope.ListeStatistique[i].statut != 'Achevé' && new Date($scope.ListeStatistique[i].fin) < new Date()) {
				NbreTachesEchus++;
			}
		}
		// console.log('jhajhjh',NbreTachesEchus)
		return NbreTachesEchus;
	};
	//Fin Declaration de la classe Motif 
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
					var files = document.getElementById('file').files[0];
					var dateActuelle = new Date();
					if (dateSaisieObj > dateActuelle) {
						$scope.confirmationSwal(" La date saisie est antérieure à la date actuelle. Veuillez saisir une date ultérieure.", "error");
					}
					// else if (!files) {
					// 	// $scope.Motif.files = 1;
					// 	$scope.confirmationSwal(" vous devez selectionnez un ficheir.", "error");
					// }
					else {
						$scope.UpdateMotif();
						$('#exampleModal').modal('hide');
						$scope.valide = id_activite_ptba_1;
						$('#exampleModal1').modal('show');
					}
				}
			});


	}
	$scope.getAlertValidationDecaiss = function (id_act, oklm, OK) {
		var message = "";
		if (OK == 1) {
			message = "Le décaissement sera validée";
		} else {
			message = "Le décaissement sera annulée"
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
					$scope.ValideDecaissement(id_act, oklm, OK);
					$('#exampleModal11').modal('show');
					$scope.valide1 = oklm;
				}
			});


	}

	$scope.ValideDecaissement = function (id_act, oklm, OK) {
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
		$http.post($scope.link + '/api/valide_decaissement.php', donnee, config)
			.then(function (response) {
				// console.log(response);
				if (response.data.status === "success") {
					var message = "";
					var messagevalidation = "";
					if (OK == 1) {
						messagevalidation = "Validation d'un décaissement";
						message = "Décaissement validée avec succès";
					} else {
						messagevalidation = "Annulation d'un décaissement";
						message = "Décaissement annulée avec succès";
					}
					$scope.AddNotification(oklm, messagevalidation, 2);
					$scope.InitialiseDashboardG();
					// var message = "";
					// if (OK == 1) {
					// 	message = "Décaissement validée avec succès";
					// } else {
					// 	message = "Décaissement annulée avec succès"
					// }
					$scope.confirmationSwal(message, "success");

				} else {

				}
			})
			.catch(function (error) {
				// console.log(error);
				$scope.confirmationSwal("Echec de la validation de l'activité", "error");
			});

	}
	$scope.getAlertValidationIndicateur = function (id_act, oklm, OK) {
		var message = "";
		if (OK == 1) {
			message = "L'indicateur sera validé";
		} else {
			message = "L'indicateur sera annulé";
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
					$scope.ValideIndicateur(id_act, oklm, OK);
					$('#exampleModal111').modal('show');
					$scope.valide2 = oklm;
				}
			});


	}
	$scope.AlertValideAllSuivis = function (IdActivite,OK) {
		var message = "";
		if (OK == 2) {
			message = "toutes les suivis de cette activités seront validés";
		} else {
			message = "toutes les suivis de cette activités seront annulés";
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
					$scope.ValideAllSuivis(IdActivite,OK);
				}
			});


	}

	$scope.ValideAllSuivis = function (id_act,OK) {
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
		$http.post($scope.link + '/api/valide_all_suivi.php', donnee, config)
			.then(function (response) {
				// console.log(response);
				if (response.data.status === "success") {
					var message = "";
					var messagevalidation = "";
					if (OK == 1) {
						messagevalidation = "Validation d'un indicateur";
						message = "Toutes les activités sont validée avec succès";
					} else {
						messagevalidation = "Annulation d'un indicateur";
						message = "Toutes les activités sont annulés avec succès";
					}
					// $scope.AddNotification(oklm, messagevalidation, 3);
					$scope.InitialiseDashboardG();
					// $scope.InitialiseDashboardG();
					// 
					// if (OK == 1) {
					// 	message = "Indicateur validée avec succès";
					// } else {
					// 	message = "Indicateur annulée avec succès"
					// }
					$scope.confirmationSwal(message, "success");

				} else {

				}
			})
			.catch(function (error) {
				// console.log(error);
				$scope.confirmationSwal("Echec de la validation de l'indicateur", "error");
			});

	}
	$scope.ValideIndicateur = function (id_act, oklm, OK) {
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
		$http.post($scope.link + '/api/valide_indicateur.php', donnee, config)
			.then(function (response) {
				// console.log(response);
				if (response.data.status === "success") {
					var message = "";
					var messagevalidation = "";
					if (OK == 1) {
						messagevalidation = "Validation d'un indicateur";
						message = "Indicateur validée avec succès";
					} else {
						messagevalidation = "Annulation d'un indicateur";
						message = "Indicateur annulée avec succès";
					}
					$scope.AddNotification(oklm, messagevalidation, 3);
					$scope.InitialiseDashboardG();
					// $scope.InitialiseDashboardG();
					// 
					// if (OK == 1) {
					// 	message = "Indicateur validée avec succès";
					// } else {
					// 	message = "Indicateur annulée avec succès"
					// }
					$scope.confirmationSwal(message, "success");

				} else {

				}
			})
			.catch(function (error) {
				// console.log(error);
				$scope.confirmationSwal("Echec de la validation de l'indicateur", "error");
			});

	}
	$scope.getAlertValidationTache = function (id_act, alert, OK) {
		var message = "";
		if (OK == 1) {
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
					$scope.ValideTache(id_act, alert,OK);
					$scope.valide = alert;
					$('#exampleModal1').modal('show');
				}
			});


	}

	$scope.ValideTache = function (id_act,alert, OK) {
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
					
					var message = "";
					var messagevalidation = "";
					if (OK == 1) {
						messagevalidation = "Validation d'une tâche";
						message = "Tâche validée avec succès";
					} else {
						messagevalidation = "Annulation d'une tâche";
						message = "Tâche annulée avec succès"
					}
					$scope.AddNotification(alert, messagevalidation, 1);
					$scope.InitialiseDashboardG();
					
					$scope.confirmationSwal(message, "success");

				} else {

				}
			})
			.catch(function (error) {
				// console.log(error);
				$scope.confirmationSwal("Echec de la validation de l'activité", "error");
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

		// console.log('idididididdididi',id_act);
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

					$scope.InitialiseDashboardG();
					$scope.confirmationSwal("Activité validée avec succès", "success");

				} else {
					$scope.confirmationSwal("Activité validée avec succès", "success");

				}
			})
			.catch(function (error) {
				// console.log(error);
				$scope.confirmationSwal("Echec de la validation de l'activité", "error");
			});
		$scope.verifierDateChoisie();

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
			$scope.response = response.data;
			console.log('data', $scope.response);
			$scope.Version = $cookies.get("Version");
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
		console.log($scope.Motif.files);
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
				$scope.InitialiseDashboardG();
				$scope.confirmationSwal("Suivi effectué avec succès", "success");
				$('#exampleModal').modal('hide');
			} else {

			}
		})
			.catch(function (error) {
				// console.log(error);
				$scope.confirmationSwal("Echec modification sous activité", "error");
			});

	}
	$scope.ValiderEditionTache2 = function (id, valeurrur,id_ptba,Version) {
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
							$scope.UpdateIndicateur(id_ptba,Version);
							$('#exampleModalll').modal('hide');
							$('#exampleModal111').modal('show');
							$scope.Version = Version;
							console.log("version", Version);
						} else {
							$scope.UpdateMotif2(id_ptba);
							$('#exampleModal111').modal('show');
						}
					}
				}
			});


	}
	$scope.UpdateIndicateur = function (id_indicateur,Version) {
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
		fd.append('commune_indicateur', JSON.stringify($scope.Motif.CommuneIndicateur));
		$scope.Version = Version;
		var config = {
			headers: { 'Content-Type': undefined },
			transformRequest: $httpParamSerializer
		};
		$http({
			method: 'post',
			url: $scope.link + '/api/update_indicateur.php',
			data: fd,
			headers: { 'Content-Type': undefined },
		}).then(function successCallback(response) {
			$scope.response = response.data
			// console.log(response);
			if (response.data.status === "success") {
				
				$scope.AddNotification(id_indicateur, "mise à jour d'un indicateur", 3);
				$scope.InitialiseDashboardG();
				$scope.confirmationSwal("Suivi effectué avec succès", "success");
				$('#exampleModal').modal('hide');
			} else {
			}
		})
			.catch(function (error) {
				$scope.AddNotification(id_indicateur, "mise à jour d'un indicateur", 3);
				$scope.InitialiseDashboardG();
				console.log("version", Version);
				$scope.confirmationSwal(" effectué avec succès", "success");
			});
	}
	$scope.StringToInt = function (str) {
		var intvalue = parseInt(str) ;
		return intvalue;
	}
	$scope.UpdateMotif2 = function (id_ptba) {
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
			// console.log('data',  response.data);  
			$scope.response = response.data
			console.log('data', $scope.response)
			// console.log(response);
			if (response.data.status === "success") {
				
				$scope.AddNotification(id_ptba, "Mise à jour d'un indicateur", 3);
				$scope.InitialiseDashboardG();
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
	$scope.getIndicateurById = function (IdMotif, valeur,id) {
		
		$scope.id_activite_ptba_indicateur =  id;
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
				$scope.Motif.CommuneIndicateur = [
					indicateurs[0].commune,
					indicateurs[1].commune,
					indicateurs[2].commune,
					indicateurs[3].commune,
					indicateurs[4].commune,
					indicateurs[5].commune,
					indicateurs[6].commune,
					indicateurs[7].commune,
					indicateurs[8].commune,
					indicateurs[9].commune,
					indicateurs[10].commune,
					indicateurs[11].commune,
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
	// $scope.getTache = function (IdStatut) {
	// 	var count = 0; // Variable de comptage

	// 	for (var i = 0; i < $scope.ListeTacheByUser.length; i++) {
	// 		if ($scope.ListeTacheByUser[i].contrat == IdStatut) {
	// 			count++;
	// 		}
	// 	}
	// 	// console.log('sdc',$scope.ListeActivite);
	// 	return count; // Renvoie le total des tâches correspondant à l'identifiant de statut
	// }

	//Initialisation de la classe Motif   

	$scope.getListeActivite = function () {
		$scope.totalJour = 0;
		$scope.ListeActivite = [];
		$scope.ListeActivite2 = [];
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
			$scope.ListeActivite2 = data.activites;
			$scope.ListeActivite1 = data.activites;

			$cookies.put('Version0', $scope.ListeActivite1[0].annee);
			$scope.VersionOne = $cookies.get("Version0");
			$scope.Version = $scope.ListeActivite1[0].annee;
			console.log($cookies.get("Version0"));
			// console.log('usersmon', $scope.ListeActivite)
		});
	}
	$scope.ChangeVersion = function (version) {
		$scope.totalJour = 0;
		$scope.ListeActivite = [];
		$scope.ListeActivite2 = [];
		// $scope.nom = "admin";var vers = 0;
		var vers = "";
		if(!version){
			vers = $cookies.get("Version");
	   }else {
		   vers = version;
	   }
	   $cookies.put('Version', vers);
	   $scope.Version = vers;
		$scope.nom = $cookies.get("NomUtilisateur");
		$scope.cokk = $cookies.get('IdUtilisateur');
		$scope.Fonction = $cookies.get("Fonction");
		$scope.Partenaire = $cookies.get("checkActivite");
		$scope.versionsssss = $cookies.get("Version");
		var datas = [];
		$http({
			method: 'GET',
			url: $scope.link + '/api/activite.php?responsable=' + $scope.nom + '&id_personnel=' + $scope.cokk + '&Fonction=' + $scope.Fonction + '&Partenaire=' + $scope.Partenaire + '&annee=' + vers,
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
		}).success(function (data) {
			$scope.ListeActivite = data.activites;
			$scope.ListeActivite1 = data.activites;
			$scope.ListeActivite2 = data.activites;
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
	$scope.getListeActivite1 = function () {
		$scope.totalJour = 0;
		$scope.ListeActivite1 = [];
		// $scope.nom = "admin";


		$http({
			method: 'GET',
			url: $scope.link + '/api/user.php',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
		}).success(function (data) {
			$scope.ListeActivite1 = data;
			$scope.ListeActivite1 = data.users;
			// console.log('users', $scope.ListeActivite1  )
			// Une fois que vous avez récupéré les activités, appelez la fonction pour mettre à jour les tâches associées.
			// $scope.getListeTacheByUser();
		});
	}
	$scope.getCommune = function () {
		$scope.totalJour = 0;
		$scope.Listecommune = [];
		// $scope.nom = "admin";


		$http({
			method: 'GET',
			url: $scope.link + '/api/commune.php',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
		}).success(function (data) {
			$scope.Listecommune = data.commune;
			// Une fois que vous avez récupéré les activités, appelez la fonction pour mettre à jour les tâches associées.
			// $scope.getListeTacheByUser();
		});
	}
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
	//     $scope.getListeTache = function () {
	// 	$scope.totalJour = 0;
	// 	$scope.ListeTacheByActivite = [];
	// 	//$scope.nom =$cookies.get("NomUtilisateur");
	// 	$scope.nom = $routeParams;
	// 	//// console.log($scope.nom);
	// 	$http({
	// 		method: 'GET',
	// 		//url: 'https://sise-pdc2v.org/api/tache_user.php?responsable=nzue',
	// 		url: $scope.link + '/api/tacheByactivite.php?responsable=' + 8,
	// 		headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
	// 	}).
	// 		success(function (data) {
	// 			$scope.ListeTacheByActivite = data.taches;
	// 		});
	// 		// console.log('scope : ', $scope.ListeTacheByActivite)
	// }
	$scope.getListeSousActivite = function () {
		$scope.totalJour = 0;
		$scope.ListeSousActivite = [];
		$scope.nom = $cookies.get("NomUtilisateur");
		// $scope.nom = "nzue";
		//// console.log($scope.nom);
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
				// // console.log('sous',$scope.ListeSousActivite);
			});
	}
	// $scope.getObservation = function (IdActivite, IdSousactivite) {
	// 	var observation = null;
	// 	var maxIdSuivi = -1;

	// 	for (var i = 0; i < $scope.ListeSousActivite.length; i++) {
	// 		if ($scope.ListeSousActivite[i].id_activite_ptba == IdActivite && $scope.ListeSousActivite[i].id_sous_activite == IdSousactivite) {
	// 			var currentIdSuivi = parseInt($scope.ListeSousActivite[i].id_suivi);
	// 			if (currentIdSuivi > maxIdSuivi) {
	// 				maxIdSuivi = currentIdSuivi;
	// 				observation = $scope.ListeSousActivite[i].observation;
	// 			}
	// 		}
	// 	}

	//             // // console.log('obs', observation)
	// 	return observation;
	// };
	// $scope.getDate = function (IdActivite, IdSousactivite) {
	// 	var dates = [];

	// 	for (var i = 0; i < $scope.ListeSousActivite.length; i++) {
	// 	  if ($scope.ListeSousActivite[i].id_activite_ptba == IdActivite && $scope.ListeSousActivite[i].id_sous_activite == IdSousactivite) {
	// 		dates.push($scope.ListeSousActivite[i].date_suivi);
	// 	  }
	// 	}

	// 	// Filtrer les doublons
	// 	dates = dates.filter(function(item, index, self) {
	// 	  return self.indexOf(item) === index;
	// 	});

	// 	return dates;
	// };
	$scope.getdateInfo = function (id_ptba, id_tache, date_suivi) {
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
		// console.log('tats',$scope.etat);
		// // console.log($scope.date);
	}
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

			// console.log('ss',$scope.ListeTacheByActivite);
			for (var j = 0; j < $scope.ListeTacheByActivite.length; j++) {
				if ($scope.ListeTacheByActivite[j].contrat == IdActivite && $scope.ListeTacheByActivite[j].id_suivi == IdSousactivite) {

					$scope.Motif.IdTache = $scope.ListeTacheByActivite[j].contrat;
					$scope.Motif.CodeTache = $scope.ListeTacheByActivite[j].id_suivi;

				}
			}
		}
	};
	// $scope.getDifficultes = function (IdActivite, IdSousactivite) {
	// 	var difficultes = null;
	// 	var maxIdSuivi = -1;

	// 	for (var i = 0; i < $scope.ListeSousActivite.length; i++) {
	// 		if ($scope.ListeSousActivite[i].id_activite_ptba == IdActivite && $scope.ListeSousActivite[i].id_sous_activite == IdSousactivite) {
	// 			var currentIdSuivi = parseInt($scope.ListeSousActivite[i].id_suivi);
	// 			if (currentIdSuivi > maxIdSuivi) {
	// 				maxIdSuivi = currentIdSuivi;
	// 				difficultes = $scope.ListeSousActivite[i].difficultes_rencontrees;
	// 			}
	// 		}
	// 	}

	// 	return difficultes;
	// };
	$scope.getMyIndicateur = function (id_ptba) {
		$scope.indicateurs = []; // Tableau pour stocker les tâches correspondantes
		$scope.id_activite_ptba_3 = id_ptba;
		for (var i = 0; i < $scope.ListeIndicateur.length; i++) {
			if ($scope.ListeIndicateur[i].id_ptba == id_ptba) {
				$scope.indicateurs.push($scope.ListeIndicateur[i]);
			}
		}
		console.log('myindicateur', $scope.indicateurs);
	}
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
	$scope.getTache1 = function (IdStatut) {
		var sommeMontants = 0; // Variable de comptage

		for (var i = 0; i < $scope.ListeDecaissementTache.length; i++) {
			if ($scope.ListeDecaissementTache[i].id_activite_ptba == IdStatut) {
				if ($scope.ListeDecaissementTache[i].montant_decaisse) {
					sommeMontants += parseFloat($scope.ListeDecaissementTache[i].montant_decaisse);
				}
			}
		}
		return sommeMontants; // Renvoie le total des tâches correspondant à l'identifiant de statut
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
			if ($scope.valide2 != 0) {
				$scope.getMyIndicateur($scope.valide2);
			}
			// console.log('indicateur', $scope.ListeIndicateur  )
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
			// console.log('structure', $scope.ListeStructure  )
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
	// $scope.getStatut = function (IdActivite, IdSousactivite) {
	// 	var statut = null;
	// 	var maxIdSuivi = -1;

	// 	for (var i = 0; i < $scope.ListeSousActivite.length; i++) {
	// 		if ($scope.ListeSousActivite[i].id_activite_ptba == IdActivite && $scope.ListeSousActivite[i].id_sous_activite == IdSousactivite) {
	// 			var currentIdSuivi = parseInt($scope.ListeSousActivite[i].id_suivi);
	// 			if (currentIdSuivi > maxIdSuivi) {
	// 				maxIdSuivi = currentIdSuivi;
	// 				statut = $scope.ListeSousActivite[i].statut_activite;
	// 			}
	// 		}
	// 	}

	// 	return statut;
	// };
	// $scope.getRetard = function (IdActivite, IdSousactivite) {
	// 	var retard = null;
	// 	var maxIdSuivi = -1;

	// 	for (var i = 0; i < $scope.ListeSousActivite.length; i++) {
	// 		if ($scope.ListeSousActivite[i].id_activite_ptba == IdActivite && $scope.ListeSousActivite[i].id_sous_activite == IdSousactivite) {
	// 			var currentIdSuivi = parseInt($scope.ListeSousActivite[i].id_suivi);
	// 			if (currentIdSuivi > maxIdSuivi) {
	// 				maxIdSuivi = currentIdSuivi;
	// 				retard = $scope.ListeSousActivite[i].retard_accuse;
	// 			}
	// 		}
	// 	}

	// 	return retard;
	// };
	// $scope.getSolution = function (IdActivite, IdSousactivite) {
	// 	var solution = null;
	// 	var maxIdSuivi = -1;

	// 	for (var i = 0; i < $scope.ListeSousActivite.length; i++) {
	// 		if ($scope.ListeSousActivite[i].id_activite_ptba == IdActivite && $scope.ListeSousActivite[i].id_sous_activite == IdSousactivite) {
	// 			var currentIdSuivi = parseInt($scope.ListeSousActivite[i].id_suivi);
	// 			if (currentIdSuivi > maxIdSuivi) {
	// 				maxIdSuivi = currentIdSuivi;
	// 				solution = $scope.ListeSousActivite[i].pistes_solutions;
	// 			}
	// 		}
	// 	}

	// 	return solution;
	// };
	//     $scope.getTacheSuivi = function () {
	// 	$scope.nom =$cookies.get("NomUtilisateur");
	//             // $scope.nom="nzue"
	//             $scope.CompteSuivi = [];

	//      //$http({ method: 'GET', url: "https://sise-pdc2v.org/api/compter.php?count=suivi&respon="+$scope.nom }).
	//      $http({ method: 'GET', url: $scope.link + "/api/compter.php?count=suivi&respon="+$scope.nom }).
	//             success(function (data, status, headers, config) {
	//                     // // console.log(data)
	// 		$scope.CompteSuivi = data.task_count;


	//             });
	//    }
	$scope.getTacheAttente = function () {
		$scope.nom = $cookies.get("NomUtilisateur");
		// $scope.nom="nzue"
		$scope.CompteAttente = [];

		// $http({ method: 'GET', url: "https://sise-pdc2v.org/api/compter.php?count=attente&respon="+$scope.nom }).
		$http({ method: 'GET', url: $scope.link + "/api/compter.php?count=attente&respon=" + $scope.nom }).
			success(function (data, status, headers, config) {
				// // console.log(data)
				$scope.CompteAttente = data.task_count;

			});

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
							$scope.InitialiseDashboardG();
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
	$scope.getTacheValide = function () {
		$scope.nom = $cookies.get("NomUtilisateur");
		// $scope.nom="nzue"
		// console.log('nom',$scope.nom)
		$scope.CompteValide = [];

		$http({ method: 'GET', url: $scope.link + "/api/compter.php?count=valide&respon=" + $scope.nom }).
			// $http({ method: 'GET', url: "https://sise-pdc2v.org/api/compter.php?count=valide&respon="+$scope.nom }).
			success(function (data, status, headers, config) {
				// // console.log(data)
				$scope.CompteValide = data.task_count;

			});

	}
	$scope.ValiderEditionObservation = function (Motif) {
		swal({
			title: "Etes vous sûr?",
			text: "L'observation sera ajoutée",
			icon: "warning",
			buttons: true,
			dangerMode: false,
		})
			.then((willDelete) => {
				if (willDelete) {
					var datereele = formatDate($scope.Motif.fin_activite);
					var donnee = {
						id_suivi: Motif,
						observation: $scope.Motif.ObservationGenerale,
						fin: datereele,
					};
					// console.log(donnee);
					var config = {
						headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
						transformRequest: $httpParamSerializer
					};

					//$http.post('https://sise-pdc2v.org/api/update_tache.php', donnee, config)
					$http.post($scope.link + '/api/ObservationActivite.php', donnee, config)
						.then(function (response) {
							// console.log(response);
							if (response.data.status === "success") {

								$scope.InitialiseDashboardG();
								$scope.confirmationSwal("Observation validée avec succès", "success");
								$('#exampleModaObs').modal('hide');

							} else {

							}
						})
						.catch(function (error) {
							// console.log(error);
							$scope.confirmationSwal("Echec de la mise à jour de l'observation", "error");
						});
					// Appel à l'API PHP pour supprimer l'élément

				}
			});
	};
	$scope.getTache2 = function (IdMotif, observation, fin) {
		$('#exampleModaObs').modal('show');
		$scope.Motif.ObservationGenerale = observation;
		$scope.Motif.fin_activite = new Date(fin);
		$scope.myid = IdMotif;
		// console.log('exemple', $scope.Motif.ObservationGenerale);
	}
	$scope.getTache3 = function (IdMotif, observation) {
		$scope.Motif.ObservationGenerale1 = observation;
		$scope.myindicateur = IdMotif;
		// console.log('exemple', $scope.Motif.ObservationGenerale);
	}
	$scope.getTacheById = function (IdMotif) {
		// console.log("ID du tache : ", IdMotif);
		// console.log("je : ", $scope.ListeSousActivite);

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
	$scope.validerHistorique = function (id) {
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
					$scope.valide = id;
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
				$scope.AddNotification($scope.Motif.IdTache, "mise à jour d'une tâche de l'activité", 1)
				$scope.InitialiseDashboardG();
				$scope.confirmationSwal("Suivi modifié avec succès", "success");
				$('#exampleModal3').modal('hide');
			} else {

			}
		})
			.catch(function (error) {
				// console.log(error);
				$scope.confirmationSwal("Echec modification sous activité", "error");
			});
	}
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




	// =================== DECAISSEMENT CONTROLLER IN DASHBOARD ================================== //




	$scope.getDecaissementTache = function () {
		$scope.totalJour = 0;
		$scope.ListeDecaissementTache = [];
		//$scope.nom =$cookies.get("NomUtilisateur");
		// $scope.nom = "nzue";
		//// console.log($scope.nom);
		$http({
			method: 'GET',
			//url: 'https://sise-pdc2v.org/api/tache_user.php?responsable=nzue',
			//url: 'https://sise-pdc2v.org/api/tache_user.php?responsable=' + $scope.nom,
			url: $scope.link + '/api/liste_decaissement.php',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
		}).
			success(function (data) {
				$scope.ListeDecaissementTache = data.sous_activites;
				if ($scope.valide1 != 0) {
					$scope.getMaTache($scope.valide1);
				}
				// console.log($scope.ListeDecaissementTache);
			});
	}

	$scope.getTache1 = function (IdStatut) {
		var sommeMontants = 0; // Variable de comptage

		for (var i = 0; i < $scope.ListeDecaissementTache.length; i++) {
			if ($scope.ListeDecaissementTache[i].id_activite_ptba == IdStatut) {
				if ($scope.ListeDecaissementTache[i].montant_decaisse) {
					sommeMontants += parseFloat($scope.ListeDecaissementTache[i].montant_decaisse);
				}
			}
		}
		return sommeMontants; // Renvoie le total des tâches correspondant à l'identifiant de statut
	}
	$scope.tacheValidee = false;
	$scope.getMaTache = function (id_ptba) {
		$scope.decaissements = []; // Tableau pour stocker les tâches correspondantes
		$scope.id_activite_ptba_2 = id_ptba;
		for (var i = 0; i < $scope.ListeDecaissementTache.length; i++) {
			if ($scope.ListeDecaissementTache[i].id_activite_ptba == id_ptba) {
				$scope.decaissements.push($scope.ListeDecaissementTache[i]);
			}
		}
		console.log($scope.decaissements);
		//// console.log($routeParams.IdActivite);
	}
	// $scope.showbutton1 = function (idbtn) {
	// 	var verifi = 1;
	// 	for (var i = 0; i < $scope.suividata.length; i++) {
	// 		if ($scope.suividata[i].id_activite_ptba == idbtn && $scope.suividata[i].etat != 1) {
	// 			verifi = 2;
	// 		}
	// 	}
	// 	return verifi;
	// };
	// $scope.showbutton = function (idbtn) {
	// 	var verifi = 1;
	// 	for (var i = 0; i < $scope.ListeDecaissementTache.length; i++) {
	// 		if ($scope.ListeDecaissementTache[i].id_activite_ptba == idbtn && $scope.ListeDecaissementTache[i].etat != 1) {
	// 			verifi = 2;
	// 		}
	// 	}
	// 	return verifi;
	// };
	$scope.getSomme = function () {
		var sommeMontants = 0;
		for (var j = 0; j < $scope.decaissements.length; j++) {
			sommeMontants += parseFloat($scope.decaissements[j].montant_decaisse);
		}

		return sommeMontants;
	};
	$scope.getDecaissementById = function (IdMotif, id_ptba) {
		// console.log("ID du motif : ", IdMotif);
		$scope.id_activite_ptba_decaissement = id_ptba;
		for (var i = 0; i <= $scope.ListeDecaissementTache.length - 1; i++) {
			if ($scope.ListeDecaissementTache[i].id_suivi == IdMotif) {
				$scope.Motif.CodeTache = $scope.ListeDecaissementTache[i].documents;
				$scope.Motif.StatutTache = $scope.ListeDecaissementTache[i].id_activite_ptba;
				$scope.Motif.Retard = $scope.ListeDecaissementTache[i].retard_accuse;
				$scope.Motif.IdTache = $scope.ListeDecaissementTache[i].id_suivi;
				$scope.Motif.DateReelle = new Date($scope.ListeDecaissementTache[i].date_suivi);
				$scope.Motif.Observation = $scope.ListeDecaissementTache[i].observation;
				$scope.Motif.Nlot = $scope.ListeDecaissementTache[i].code_suivi;
				$scope.Motif.Difficultes = $scope.ListeDecaissementTache[i].montant_decaisse;
				$scope.Motif.commune = $scope.ListeDecaissementTache[i].commune;
				break;
			}
		}


	}
	$scope.decaissementTache = function (id) {
		swal({
			title: "Etes vous sur?",
			text: "Les données seront enregistrées",
			icon: "warning",
			buttons: true,
			dangerMode: false,
		})
			.then((willEdit) => {
				if (willEdit) {

					$scope.UpdateDecaissement(id);
					$scope.valide1 = id;
					$('#exampleModal11').modal('show');
					// Appel de getMaTache ici après la mise à jour
					// $scope.getMaTache($scope.Motif.StatutTache, $scope.Motif.CodeTache);


				}
			});
	}
	$scope.UpdateDecaissement = function (id) {
		var dateReelleFormatted = formatDate($scope.Motif.DateReelle);
		var fd = new FormData();
		var files = document.getElementById('file22').files[0];
		fd.append('id_tache', $scope.Motif.IdTache);
		fd.append('lot', $scope.Motif.Nlot);
		fd.append('date_reelle', dateReelleFormatted);
		fd.append('observation', $scope.Motif.Observation);
		fd.append('code_tache', $scope.Motif.CodeTache);
		fd.append('statut_tache', $scope.Motif.StatutTache);
		fd.append('difficultes', $scope.Motif.Difficultes);
		fd.append('retard', $scope.Motif.Retard);
		fd.append('pistes_solutions', $scope.Motif.PisteSolutions);
		fd.append('commune', $scope.Motif.commune);
		fd.append('file', files);
		fd.append('id_personnel', $scope.NomUser);
		$http({
			method: 'post',
			url: $scope.link + '/api/update_modification.php',
			data: fd,
			headers: { 'Content-Type': undefined },
		}).then(function successCallback(response) {
			$scope.response = response.data
			console.log('data', $scope.response)
			// console.log(response);
			if (response.data.status === "success") {
					
				$scope.AddNotification( id, "mise à jour d'un décaissement", 2);
				$scope.InitialiseDashboardG();
				$scope.confirmationSwal("Décaissement modifiée avec succès", "success");
				$('#exampleModal33').modal('hide');

			} else {

			}
		}).catch(function (error) {
				// console.log(error);
				$scope.confirmationSwal("Echec modification décaissement" + $scope.Motif.IdTache, "error");
			});

	}

	$scope.confirmDelete1 = function (Motif, id_activite_ptba_2) {
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
					$http.delete($scope.link + '/api/supprimer_suivi_decaissement.php?id_suivi=' + Motif.id_suivi)
						.then(function (response) {
							$scope.InitialiseDashboardG();
							$scope.confirmationSwal("Sous activité supprimé avec succès", "success");
							$scope.valide1 = id_activite_ptba_2;
							$('#exampleModal11').modal('show');
						})
						.catch(function (error) {
							console.error("Erreur lors de la suppression:", error);
						});
				}
			});
	};
	$scope.ValiderEditionTache1 = function (id_activite_ptba_2) {
		swal({
			title: "Etes vous sur?",
			text: "Les données seront enregistrées",
			icon: "warning",
			buttons: true,
			dangerMode: false,
		})
			.then((willEdit) => {
				if (willEdit) {

					$scope.UpdateMotif1();
					$scope.valide1 = id_activite_ptba_2;
					$('#exampleModal11').modal('show');
				}
			});


	}
	$scope.UpdateMotif1 = function () {

		var dateReelleFormatted = formatDate($scope.Motif.DateReelle);
		var fd = new FormData();
		var files = document.getElementById('file1').files[0];
		fd.append('id_tache', $scope.Motif.IdTache);
		fd.append('lot', $scope.Motif.Nlot);
		fd.append('date_reelle', dateReelleFormatted);
		fd.append('observation', $scope.Motif.Observation);
		fd.append('code_tache', $scope.Motif.CodeTache);
		fd.append('statut_tache', $scope.Motif.StatutTache);
		fd.append('difficultes', $scope.Motif.Difficultes);
		fd.append('retard', $scope.Motif.Retard);
		fd.append('pistes_solutions', $scope.Motif.PisteSolutions);
		fd.append('commune', $scope.Motif.commune);
		fd.append('file', files);
		fd.append('id_personnel', $scope.NomUser);
		$http({
			method: 'post',
			url: $scope.link + '/api/decaissement.php',
			data: fd,
			headers: { 'Content-Type': undefined },
		}).then(function successCallback(response) {
			$scope.response = response.data
			console.log('data', $scope.response)
			// console.log(response);
			if (response.data.status === "success") {
				$scope.AddNotification($scope.Motif.IdTache, "Ajout d'un nouveau décaissement", 2);
				$scope.InitialiseDashboardG();
				$scope.confirmationSwal("Montant ajouté avec succès", "success");
				$('#exampleModall').modal('hide');
			} else {

			}
		})
			.catch(function (error) {
				// console.log(error);
				$scope.confirmationSwal("Echec modification décaissement", "error");
			});
	}
	$scope.getRetard = function (statut, delai, datereele) {
		var Delai = new Date(delai);
		var DateReelle = new Date(datereele);
		var dateActuelle = new Date();
		var datediff = 0;
		var date = "RAS";
		$scope.colorretard = "#7e7e8c";
		if (delai != null) {
			if (statut !== 'Achevé') {
				datediff = Delai - dateActuelle;
				// Convertir la différence en jours
				var daysDiff = Math.floor(datediff / (1000 * 60 * 60 * 24));
				var date6 = daysDiff;
				if(date6 == 0) {
					date = "Dernier jour"
					$scope.colorretard = "red";
				}else
					if (date6 < 0) {
						date = " " + $scope.removeNegativeSign(date6) + " " + "jrs dépassé";
						$scope.colorretard = "red";
					}
						else {
							date = "il reste" + " " + date6 + " " + "jrs";
							$scope.colorretard = "#168e37";
						}
			}
			else {
				datediff = Delai - DateReelle;
				var daysDiff = Math.floor(datediff / (1000 * 60 * 60 * 24));
				var date7 = daysDiff;
				if(date7 == 0) {
					date = "Réalisée au jr planifié"
					$scope.colorretard = "#168e37";
				} else
					if (date7 < 0) {
						$scope.colorretard = "red";
						date = "Réaliseé avec" + " " + $scope.removeNegativeSign(date7) + " " + "jrs dépassés";
					}   else {
							date = "Réaliseé avec" + " " + date7 + " " + "jrs en avance";
							$scope.colorretard = "#168e37";
						}
			}
		}
		return date;
	};
	$scope.removeNegativeSign = function (value) {
		if (value < 0) {
			// La valeur est négative, supprimez le signe négatif
			return Math.abs(value);
		} else {
			// La valeur est positive ou nulle, retournez-la telle quelle
			return value;
		}
	}
	$scope.formatAmount = function (amount) {
		return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
	};
	

	
	
		$scope.updateNumeroAfficher = function () {
		if (!$scope.numero || $scope.numero.trim() === '') {
			// Si le champ est vide, réinitialiser à 5
			$scope.numeroAfficher = 5;
		} else {
			// Sinon, définir sur 100
			$scope.numeroAfficher = $scope.ListeActivite.length;
		}
	};
});