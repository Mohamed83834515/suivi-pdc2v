DECAISSEMENT.controller('MissionController', function ($rootScope, $scope, $http, $cookies, $location, $routeParams, $httpParamSerializer) {

	$scope.Titre = "Gestion des activités";//Titre du module
	$scope.ListeActivite = []; //Initialisation tableau liste Utilisateur
	$scope.currentUserId = null; // Selected user id on modal
	$scope.ListeTacheByUser = [];
	$scope.ListeDecaissementTache = [];
	$scope.ListeSousActivite = [];
	$scope.numero = "";
	$scope.numeroAfficher = 10;
	$scope.id = $routeParams.IdActivite;
	$scope.dateChoisie = false;
	$scope.nom2=$cookies.get("Fonction");
	$scope.NomUser = $cookies.get("NomUtilisateur");
	$scope.valide = 0;
	$scope.InitialiseMission = function () {
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
		// $scope.getListeTacheByUser();
		$scope.InitialiseMotif();
		// $scope.getListeTache();
		$scope.getListeUsers();
		$scope.getVersion();
		$scope.getListeMission();
		$scope.getListeSuiviMission();
	}

	//// console.log($routeParams.IdActivite);
	// Définition de la classe Tache


	//Declaration de la classe Motif   
	$scope.Motif = {
		id_suivi: 0,
		mission: "",
		nbr_nuitee: 0,
		date_suivi: "",
		resultats: "",
		date_depot: "",
		resume_mission: "",
		observation: "",
	};
	//Fin Declaration de la classe Motif 


	//Initialisation de la classe Motif   
	$scope.InitialiseMotif = function () {

		$scope.Motif = {
			id_suivi: 0,
			mission: "",
			nbr_nuitee: 0,
			date_suivi: "",
			resultats: "",
			date_depot: "",
			resume_mission: "",
			observation: "",
		};
	}
	//Fin initialisation de la classe Motif 
	$scope.confirmDelete = function(Motif,mission) {
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
				$http.delete($scope.link + '/api/supprimer_suivi_mission.php?id_suivi=' + Motif)
					.then(function(response) {
					$scope.InitialiseMission();
					$scope.confirmationSwal("suivi de mission supprimé avec succès", "success");
					$scope.valide = mission;
					$('#exampleModal1').modal('show');
					})
					.catch(function(error) {
						console.error("Erreur lors de la suppression:", error);
					});

			}
		});
	};
	$scope.getSuiviByMission = function (code) {
		$scope.suivimission = [];
		for (var i = 0; i <= $scope.ListeSuiviMission.length - 1; i++) {
			if ($scope.ListeSuiviMission[i].mission == code) {
				$scope.suivimission.push($scope.ListeSuiviMission[i]);
			}
			console.log('suivi', $scope.suivimission);
		}
		
		$('#exampleModal1').modal('show');
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
		});
	}
	$scope.getLastResult = function (result) {
		var results1 = [];
		var results = 0;
		var etat;

		// Parcourez la liste des enregistrements de la table "suivi".
		for (var i = 0; i < $scope.ListeSuiviMission.length; i++) {
			// Vérifiez si l'ID d'activité de l'enregistrement correspond à l'ID d'activité donné.
			if ($scope.ListeSuiviMission[i].mission == result) {
				results1.push($scope.ListeSuiviMission[i].id_suivi);
				results = Math.max.apply(null, results1);
				if ($scope.ListeSuiviMission[i].id_suivi == results) {
					etat = $scope.ListeSuiviMission[i].resultats;
				}
			}
		}

		return etat;
	};
	$scope.getLastresume = function (result) {
		var results1 = [];
		var results = 0;
		var etat;

		// Parcourez la liste des enregistrements de la table "suivi".
		for (var i = 0; i < $scope.ListeSuiviMission.length; i++) {
			// Vérifiez si l'ID d'activité de l'enregistrement correspond à l'ID d'activité donné.
			if ($scope.ListeSuiviMission[i].mission == result) {
				results1.push($scope.ListeSuiviMission[i].id_suivi);
				results = Math.max.apply(null, results1);
				if ($scope.ListeSuiviMission[i].id_suivi == results) {
					etat = $scope.ListeSuiviMission[i].resume_mission;
				}
			}
		}

		return etat;
	};
	$scope.getLastDepot = function (result) {
		var results1 = [];
		var results = 0;
		var etat;

		// Parcourez la liste des enregistrements de la table "suivi".
		for (var i = 0; i < $scope.ListeSuiviMission.length; i++) {
			// Vérifiez si l'ID d'activité de l'enregistrement correspond à l'ID d'activité donné.
			if ($scope.ListeSuiviMission[i].mission == result) {
				results1.push($scope.ListeSuiviMission[i].id_suivi);
				results = Math.max.apply(null, results1);
				if ($scope.ListeSuiviMission[i].id_suivi == results) {
					etat = $scope.ListeSuiviMission[i].date_depot;
				}
			}
		}

		return etat;
	};
	$scope.getLastNuitee = function (result) {
		var results1 = [];
		var results = 0;
		var etat;

		// Parcourez la liste des enregistrements de la table "suivi".
		for (var i = 0; i < $scope.ListeSuiviMission.length; i++) {
			// Vérifiez si l'ID d'activité de l'enregistrement correspond à l'ID d'activité donné.
			if ($scope.ListeSuiviMission[i].mission == result) {
				results1.push($scope.ListeSuiviMission[i].id_suivi);
				results = Math.max.apply(null, results1);
				if ($scope.ListeSuiviMission[i].id_suivi == results) {
					etat = $scope.ListeSuiviMission[i].nbr_nuitee;
				}
			}
		}

		return etat;
	};
	$scope.ModalAdd = function (){
		$scope.actionverified = false;
		$scope.label = "Nouvelle suivi de la mission :";
		// $scope.InitialiseMotif();
		$('#exampleModal').modal('show');
	}
	$scope.getSuiviById = function (IdMotif) {
		$scope.actionverified = true;
		$scope.label = "Modifier le suivi de la mission :";
		$('#exampleModal').modal('show');
		for (var i = 0; i <= $scope.ListeSuiviMission.length - 1; i++) {
			if ($scope.ListeSuiviMission[i].id_suivi == IdMotif) {
				$scope.Motif.id_suivi = IdMotif;
				$scope.Motif.mission = $scope.ListeSuiviMission[i].mission;
				$scope.Motif.nbr_nuitee = parseInt($scope.ListeSuiviMission[i].nbr_nuitee);
				$scope.Motif.date_depot = new Date($scope.ListeSuiviMission[i].date_depot);
				$scope.Motif.date_suivi = new Date($scope.ListeSuiviMission[i].date_suivi);
				$scope.Motif.resultats = $scope.ListeSuiviMission[i].resultats;
				$scope.Motif.resume_mission = $scope.ListeSuiviMission[i].resume_mission;
				break;
			}
		}

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
	$scope.ValiderSuivi = function (id) {
		swal({
			title: "Etes vous sur?",
			text: "Les données seront enregistrer",
			icon: "warning",
			buttons: true,
			dangerMode: false,
		})
		.then((willEdit) => {
			if (willEdit) {
				if(!$scope.actionverified){
				 $scope.AddSuiviMission();
				}else{
					$scope.UpdateSuiviMission();
				}
				$scope.valide = id;
				$('#exampleModal1').modal('show');
			}
		});


	}
	$scope.UpdateSuiviMission = function () {

		var date_depot = formatDate($scope.Motif.date_depot);
		var date_suivi = formatDate($scope.Motif.date_suivi);
			var fd= new FormData();
			fd.append('id_suivi',$scope.Motif.id_suivi);
			fd.append('date_depot',date_depot);
			fd.append('date_suivi',date_suivi);
			fd.append('nbr_nuitee',$scope.Motif.nbr_nuitee);
			fd.append('resultats',$scope.Motif.resultats);
			fd.append('resume_mission',$scope.Motif.resume_mission);
			$http({
				method: 'post',
				url: $scope.link + '/api/update_suivi_mission.php',
				data: fd,
				headers: { 'Content-Type': undefined},
			}).then(function successCallback(response){
				$scope.response = response.data
				console.log('data', $scope.response)
						// console.log(response);
							if (response.data.status === "success") {
								$scope.InitialiseMission();
								$scope.confirmationSwal("Mission modifié avec succès", "success");
								$('#exampleModal').modal('hide');
							} else {
			
							}
						})
						.catch(function (error) {
							// console.log(error);
							$scope.confirmationSwal("Echec modification mission", "error");
						});
	}
	$scope.AddSuiviMission = function () {

		var date_depot = formatDate($scope.Motif.date_depot);
		var date_suivi = formatDate($scope.Motif.date_suivi);
			var fd= new FormData();
			fd.append('mission',$scope.Motif.mission);
			fd.append('date_depot',date_depot);
			fd.append('date_suivi',date_suivi);
			fd.append('nbr_nuitee',$scope.Motif.nbr_nuitee);
			fd.append('resultats',$scope.Motif.resultats);
			fd.append('resume_mission',$scope.Motif.resume_mission);
			$http({
				method: 'post',
				url: $scope.link + '/api/inser_suivi_mission.php',
				data: fd,
				headers: { 'Content-Type': undefined},
			}).then(function successCallback(response){
				$scope.response = response.data
				console.log('data', $scope.response)
						// console.log(response);
							if (response.data.status === "success") {
								$scope.InitialiseMission();
								$scope.confirmationSwal("Mission ajoutée avec succès", "success");
								$('#exampleModal').modal('hide');
							} else {
			
							}
						})
						.catch(function (error) {
							// console.log(error);
							$scope.confirmationSwal("Echec modification mission", "error");
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
		$http.post('/api/update_tache.php', donnee, config)
			.then(function (response) {
				if (data.status == "success") {
					$scope.getMaTache();

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


	$scope.getListeSuiviMission = function () {
		$scope.totalJour = 0; 
		$scope.ListeSuiviMission = [];
		// $scope.nom = "admin";
		 

		$http({
			method: 'GET',
			url: $scope.link + '/api/Suivi_Mission.php',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
		}).success(function (data) {
			$scope.ListeSuiviMission = data.suivi_mission;
			if($scope.valide != 0){
				$scope.getSuiviByMission($scope.valide);
			}
			 console.log('mission',$scope.ListeSuiviMission);
			// Une fois que vous avez récupéré les activités, appelez la fonction pour mettre à jour les tâches associées.
			// $scope.getListeTacheByUser();
		});
	}
	$scope.getListeMission = function () {
		$scope.totalJour = 0; 
		$scope.ListeMission = [];
		// $scope.nom = "admin";
		 

		$http({
			method: 'GET',
			url: $scope.link + '/api/Mission.php',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
		}).success(function (data) {
			$scope.ListeMission = data.mission;
		});
	}
	$scope.getListeUsers = function () {
		$scope.totalJour = 0; 
		$scope.ListeUsers = [];
		// $scope.nom = "admin";
		 

		$http({
			method: 'GET',
			url: $scope.link + '/api/user.php',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
		}).success(function (data) {
			$scope.ListeUsers = data.users;
			console.log('users',data.users);
		});
	}

	$scope.getNameFonc = function(idResponsables) {
		var noms = [];
		var idArray = idResponsables.split(',');
	
		// Parcourez chaque ID dans le tableau
		idArray.forEach(function(id) {
			// Parcourez la liste des utilisateurs pour trouver le nom du responsable par ID
			var responsable = $scope.ListeUsers.find(function(utilisateur) {
				return utilisateur.fonction === id; // Assurez-vous de comparer avec un nombre
			});
	
			if (responsable) {
				noms.push(responsable);
			}
		});
		return noms; // Cette ligne peut être modifiée selon vos besoins d'affichage
	};
	
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
	$scope.getTache = function (IdStatut) {
		var sommeMontants  = 0; // Variable de comptage

		for (var i = 0; i < $scope.ListeDecaissementTache.length; i++) {
			if ($scope.ListeDecaissementTache[i].id_activite_ptba == IdStatut) {
				if ($scope.ListeDecaissementTache[i].montant_decaisse) {
					sommeMontants += parseFloat($scope.ListeDecaissementTache[i].montant_decaisse);
				}
			}
		}
		// console.log("Somme des montants pour IdStatut " + IdStatut + ": " + sommeMontants);
		return sommeMontants ; // Renvoie le total des tâches correspondant à l'identifiant de statut
	}
	$scope.getNom = function (IdStatut) {
		var Nom ; // Variable de comptage

		for (var i = 0; i < $scope.ListeActivite1.length; i++) {
			if ($scope.ListeActivite1[i].id_personnel == IdStatut) {
				
				Nom = $scope.ListeActivite1[i].nom 
			}
		}
		// console.log('sdc',$scope.ListeActivite);
		return Nom; // Renvoie le total des tâches correspondant à l'identifiant de statut
	}
	$scope.getPrenom = function (IdStatut) {
		var prenom ; // Variable de comptage

		for (var i = 0; i < $scope.ListeActivite1.length; i++) {
			if ($scope.ListeActivite1[i].id_personnel == IdStatut) {
				
				prenom = $scope.ListeActivite1[i].prenom 
			}
		}
		// console.log('sdc',$scope.ListeActivite);
		return prenom; // Renvoie le total des tâches correspondant à l'identifiant de statut
	}
	$scope.getFonction= function (IdStatut) { 
		var fonction ; // Variable de comptage

		for (var i = 0; i < $scope.ListeActivite1.length; i++) {
			if ($scope.ListeActivite1[i].id_personnel == IdStatut) {
				
				fonction = $scope.ListeActivite1[i].fonction 
			}
		}
		// console.log('sdc',$scope.ListeActivite);
		return fonction; // Renvoie le total des tâches correspondant à l'identifiant de statut
	}
	$scope.getAlertValidationDecaiss = function (id_act,modal,Ok) {
		var message = "";
		if(Ok == 1){
			message = "Le décaissement sera validé";
		}else {
			message = "Le décaissement sera annulé";
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
				$scope.ValideDecaissement(id_act,Ok);
				$scope.valide = modal;
				$('#exampleModal11').modal('show');
			}
		});


	}
	
	$scope.ValideDecaissement = function (id_act,Ok) {
		var donnee = {
			id_suivi: id_act,
			validation: Ok,
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

					$scope.InitialiseMission();
					if (Ok == 1) {
						message = "Décaissement validée avec succès";
					} else {
						message = "Décaissement annulée avec succès"
					}
					$scope.confirmationSwal(message, "success");

				} else {
					
					$scope.confirmationSwal("Décaissement validé avec succès", "success");
				}
			})
			.catch(function (error) {
				// console.log(error);
				$scope.confirmationSwal("Décaissement validé avec succès", "success");
			});
		$scope.verifierDateChoisie();

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

					$scope.InitialiseMission();
					$scope.confirmationSwal("Activité validée avec succès", "success");

				} else {
					$scope.confirmationSwal("Activité validée avec succès", "success");
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
	$scope.getStructure =  function (IdStatut) { 
		var structure ; // Variable de comptage

		for (var i = 0; i < $scope.ListeStructure.length; i++) {
			if ($scope.ListeStructure[i].id_acteur == IdStatut) {
				
				structure = $scope.ListeStructure[i].nom_acteur 
			}
		}
		// console.log('sdc',$scope.ListeActivite);
		return structure; // Renvoie le total des tâches correspondant à l'identifiant de statut
	}
	// $scope.showbutton1 = function(idbtn) {
	// 	var verifi = 1;
	// 	for (var i = 0; i < $scope.ListeDecaissementTache.length; i++) {
	// 		if ($scope.ListeDecaissementTache[i].id_activite_ptba == idbtn && $scope.ListeDecaissementTache[i].etat != 1) {
	// 			verifi = 2;
	// 		}
	// 	}
	// 	return verifi;
	// };
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
	$scope.formatAmount = function(amount) {
		return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
	};
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