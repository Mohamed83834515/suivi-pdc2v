DECAISSEMENT.controller('HebdomadaireController', function ($rootScope, $scope, $http, $cookies, $filter, $location, $routeParams, $httpParamSerializer) {

	$scope.Titre = "Gestion des activités";//Titre du module
	$scope.nom1 = $cookies.get("NomUtilisateur");
	$scope.nom11=$cookies.get("Fonction");
	$scope.nomadmin = $cookies.get("Fonction");
	$scope.numeroAfficher = 5;
	$scope.valide= 0,
	$scope.InitialiseHebdomadaire = function () {
		if (!$cookies.get("Version")) {
			$scope.getListeActivite();
			$scope.getActivite();
		}
		else {
			$scope.ChangeVersion($cookies.get("Version"));
			$scope.getActiviteChange($cookies.get("Version"));
		}
		$scope.Version = $cookies.get("Version");
		$scope.activitesChecked = $cookies.get("checkActivite");
		$scope.getListeSousActivite();
		$scope.getVersion();
		$scope.InitialiseMotif();
		$scope.getListeActivite1();
		$scope.getListeActivite();
		$scope.getListePlanification();
		$scope.getSuiviPlanification();
		$scope.getListePlanification1();
	}
	$scope.Motif = {
		id_planification:0,
		IdTache: 0,
		etat_avancement: "",
		ressources: "",
		statut: "",
		date_realisation: "",
		date_projection: "",
	};
	$scope.InitialiseMotif = function () {

		$scope.Motif = {
			IdTache: 0,
			etat_avancement: "",
			ressources: "",
			statut: "",
			date_realisation: "",
			date_projection: "",
		};
	}
	$scope.getListeSousActivite = function () {
		$scope.totalJour = 0;
		$scope.ListeSousActivite = [];
		$http({
			method: 'GET',
			url: $scope.link + '/api/suivi_tache.php',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
		}).
			success(function (data) {
				$scope.ListeSousActivite = data.sous_activites;
				console.log('object', data.sous_activites);
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
			// Une fois que vous avez récupéré les activités, appelez la fonction pour mettre à jour les tâches associées.
			// $scope.getListeTacheByUser();
		});
	}
	$scope.getResponsableNoms = function(idResponsables) {
		var noms = [];
	
		angular.forEach(idResponsables, function(id) {
			// Parcourez la liste des utilisateurs pour trouver le nom du responsable par ID
			var responsable = $scope.ListeActivite1.find(function(utilisateur) {
				return utilisateur.N === id;
			});
	
			if (responsable) {
				noms.push(responsable.fonction); // Supposons que le nom de l'utilisateur soit stocké dans une propriété "nom"
			}
		});
	
		return noms.join('/ '); // Cette ligne peut être modifiée selon vos besoins d'affichage
	};
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
			url: $scope.link + '/api/prioritaire.php?responsable=' + $scope.nom + '&id_personnel=' + $scope.cokk + '&Fonction=' + $scope.Fonction + '&Partenaire=' + $scope.Partenaire,
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
		}).success(function (data) {
			$scope.ListeActivite = data.activites;
			$scope.ListeActivite2 = data.activites;

			$cookies.put('Version0', $scope.ListeActivite2[0].annee);
			$scope.VersionOne = $cookies.get("Version0");
			$scope.Version = $scope.ListeActivite2[0].annee;
		});
	}
	$scope.getActiviteChange = function (version) {
		$scope.totalJour = 0;
		$scope.ListeStatistique = [];
		// U$scope.nom = "admin";
		$scope.nom = $cookies.get("NomUtilisateur");
		$scope.Fonction = $cookies.get("Fonction");

		$http({
			method: 'GET',
			//url: 'https://sise-pdc2v.org/api/activite.php?responsable=' + $scope.nom,
			url: $scope.link + '/api/activitestatistique.php?responsable=' + $scope.Fonction + '&executant=' + $scope.nom + '&annee='+version,
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
			url: $scope.link + '/api/prioritaire.php?responsable=' + $scope.nom + '&id_personnel=' + $scope.cokk + '&Fonction=' + $scope.Fonction + '&Partenaire=' + $scope.Partenaire + '&annee=' + version,
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
		}).success(function (data) {
			$scope.ListeActivite = data.activites;
			 console.log('usersmon', $scope.ListeActivite)
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
	$scope.getActivite = function () {
		$scope.totalJour = 0;
		$scope.ListeStatistique = [];
		// U$scope.nom = "admin";
		$scope.nom = $cookies.get("NomUtilisateur");
		$scope.Fonction = $cookies.get("Fonction");

		$http({
			method: 'GET',
			//url: 'https://sise-pdc2v.org/api/activite.php?responsable=' + $scope.nom,
			url: $scope.link + '/api/activitestatistique.php?responsable=' + $scope.Fonction + '&executant=' + $scope.nom + '',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
		}).success(function (data) {
			$scope.ListeStatistique = data.taches;
			console.log('statistique', $scope.ListeStatistique)
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
				return $scope.ListeVerion[i].date_validation + ' ' + $scope.ListeVerion[i].version_ptba;
			}
		}
		// Si la version n'est pas trouvée, vous pouvez retourner une valeur par défaut ou gérer autrement.
		return "Version non trouvée";
	};
	$scope.getListePlanification1 = function () {
		$scope.totalJour = 0;
		$scope.ListePlanification1 = [];
		console.log($scope.nom)
		$http({
			method: 'GET',
			url: $scope.link + '/api/tacheByactivite.php?responsable=' + $scope.nom + '',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
		}).success(function (data) {
			$scope.ListePlanification1 = data.taches;
			// Une fois que vous avez récupéré les activités, appelez la fonction pour mettre à jour les tâches associées.
			// $scope.getListeTacheByUser();
		});
	}
	$scope.getListePlanification = function () {
		$scope.totalJour = 0;
		$scope.ListePlanification = [];
		console.log($scope.nom)
		$http({
			method: 'GET',
			url: $scope.link + '/api/tacheByactivite1.php',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
		}).success(function (data) {
			$scope.ListePlanification = data.taches;
			// Une fois que vous avez récupéré les activités, appelez la fonction pour mettre à jour les tâches associées.
		});
	}
	$scope.getSuiviPlanification = function () {
		$scope.ListeSuivi = [];
		$http({
			method: 'GET',
			url: $scope.link + '/api/suivi_planification.php',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
		}).success(function (data) {
			$scope.ListeSuivi = data.taches;
			console.log('liste de suivi', $scope.ListeSuivi)
			angular.forEach($scope.ListeSuivi, function(Planification) {
				Planification.intituleReduit = true;
			});
			if($scope.valide != 0){
				$scope.getSuiviById($scope.valide);
			}
		});
	}
	$scope.toggleIntitule = function (Planification) {
		Planification.intituleReduit = !Planification.intituleReduit;
	};
	
	$scope.getLastEtat = function (IdActivite) {
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
					etat = $scope.ListeSuivi[i].etat_avancement;
				}
			}
		}

		return etat;
	};
	$scope.getLastStatut = function (IdActivite) {
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
					etat = $scope.ListeSuivi[i].statut;
				}
			}
		}

		return etat;
	};
	$scope.getLastDateRealise = function (IdActivite) {
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
					etat = $scope.ListeSuivi[i].date_realisation;
				}
			}
		}

		return etat;
	};
	$scope.getLastDateProjetee = function (IdActivite) {
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
					etat = $scope.ListeSuivi[i].date_projection;
				}
			}
		}

		return etat;
	};
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
	$scope.getRetard = function (statut, delai,datereele) {
		var Delai = new Date(delai);
		var DateReelle = new Date(datereele);
		var dateActuelle = new Date();
		var datediff = 0;
		var date = 0;

		if (statut !== 'Achevée') {
			datediff = Delai - dateActuelle; 
			// Convertir la différence en jours
			var daysDiff = Math.floor(datediff / (1000 * 60 * 60 * 24));
			date= daysDiff;
		}else {
			datediff = Delai - DateReelle;
			var daysDiff = Math.floor(datediff / (1000 * 60 * 60 * 24));
			date= daysDiff;
			if(date > 0){
				date = 0;
			}
		}
		// console.log('date', date)
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
	$scope.getPlanificationById = function (IdMotif) {
		$scope.Motif.IdTache = IdMotif;
	}
	$scope.confirmDelete = function(Motif,id_activite_ptba_1) {
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
				$http.delete($scope.link + '/api/supprimer_suivi_hebdomadaire.php?id_suivi=' + id_activite_ptba_1)
					.then(function(response) {
						$scope.InitialiseHebdomadaire();
					$scope.confirmationSwal("Sous activité supprimé avec succès", "success");
					$scope.valide = Motif;
					$('#exampleModal').modal('show');
					})
					.catch(function(error) {
						console.error("Erreur lors de la suppression:", error);
					});
			}
		});
	};
	$scope.ValideUpdatePlanification = function (idtache) {
		swal({
			title: "Etes vous sur?",
			text: "Les données seront enregistrées",
			icon: "warning",
			buttons: true,
			dangerMode: false,
		})
			.then((willEdit) => {
				if (willEdit) {

					$scope.UpdatePlanification(idtache);
					$scope.InitialiseHebdomadaire();
					$scope.valide = idtache;
					$('#exampleModal').modal('show');

				}
			});
	}
	$scope.UpdatePlanification = function (idtache) {

		var dateReelleFormatted = formatDate($scope.Motif.date_projection);
		var currentDate = new Date();
		var dateReelleFormatted1 = currentDate.toISOString().slice(0, 10);
		var nom = $cookies.get("NomUtilisateur");
		var fd = new FormData();
		fd.append('Responsable', nom);
		fd.append('id_suivi', idtache);
		fd.append('etat_avancement', $scope.Motif.etat_avancement);
		fd.append('statut', $scope.Motif.statut);
		fd.append('date_realisation', dateReelleFormatted1);
		fd.append('date_projection', dateReelleFormatted);
		fd.append('ressources', $scope.Motif.ressources);
		$http({
			method: 'post',
			url: $scope.link + '/api/insert_suivi_planification.php',
			data: fd,
			headers: { 'Content-Type': undefined },
		}).then(function successCallback(response) {
			$scope.response = response.data
			console.log('data', response.status)
			if (response.status === 200) {

				$scope.InitialiseHebdomadaire();
				$scope.confirmationSwal("Suivi ajouté avec succès", "success");
				$('#exampleModal1').modal('hide');
			} else {

			}
		})
			.catch(function (error) {
				$scope.confirmationSwal("error", "error");
			});
	}
	$scope.ValideUpdatePlanificationSuivi = function (idtache) {
		swal({
			title: "Etes vous sur?",
			text: "Les données seront enregistrées",
			icon: "warning",
			buttons: true,
			dangerMode: false,
		})
			.then((willEdit) => {
				if (willEdit) {

					$scope.UpdatePlanificationSuivi();
					$scope.InitialiseHebdomadaire();
					$scope.valide = idtache ;
					$('#exampleModal').modal('show');
				}
			});
	}
	$scope.UpdatePlanificationSuivi = function () {
		var dateReelleFormatted = formatDate($scope.Motif.date_projection);
		var fd = new FormData();
		fd.append('id_suivi', $scope.Motif.IdTache);
		fd.append('etat_avancement', $scope.Motif.etat_avancement);
		fd.append('statut', $scope.Motif.statut);
		fd.append('date_projection', dateReelleFormatted);
		fd.append('ressources', $scope.Motif.ressources);
		$http({
			method: 'post',
			url: $scope.link + '/api/update_suivi_planification.php',
			data: fd,
			headers: { 'Content-Type': undefined },
		}).then(function successCallback(response) {
			$scope.response = response.data
			console.log('data', response.status)
			if (response.status === 200) {

				$scope.InitialiseHebdomadaire();
				$scope.confirmationSwal("Suivi ajouté avec succès", "success");
				$('#exampleModall1').modal('hide');
			} else {

			}
		})
			.catch(function (error) {
				$scope.confirmationSwal("error", "error");
			});
	}
	$scope.getPlanById = function (IdMotif) {
		for (var i = 0; i <= $scope.ListeSuivi.length - 1; i++) {
			if ($scope.ListeSuivi[i].id_suivi == IdMotif) {
				$scope.Motif.IdTache = $scope.ListeSuivi[i].id_suivi;
				$scope.Motif.statut = $scope.ListeSuivi[i].statut;
				$scope.Motif.date_realisation = $scope.ListeSuivi[i].date_realisation;
				$scope.Motif.date_projection = new Date($scope.ListeSuivi[i].date_projection);
				$scope.Motif.etat_avancement = $scope.ListeSuivi[i].etat_avancement;
				$scope.Motif.ressources = $scope.ListeSuivi[i].ressources;
				break;
			}
		}
	}
	$scope.getSuiviById = function (id) {
		$scope.suividata = [];
		$scope.Motif.id_planification = id;
		for (var i = 0; i <= $scope.ListeSuivi.length - 1; i++) {
			if ($scope.ListeSuivi[i].id_tache == id) {
				$scope.suividata.push($scope.ListeSuivi[i]);
			}
			console.log('suivi', $scope.suividata);
		}
	}

	$scope.getAlertValider = function (id_act,alert) {
		swal({
			title: "Etes vous sur?",
			text: "La tâche sera validé",
			icon: "warning",
			buttons: true,
			dangerMode: false,
		})
		.then((willEdit) => {
			if (willEdit) {
				$scope.ValideTache(alert);
				$scope.valide = id_act;
				$('#exampleModal').modal('show');
			}
		});
	}
	
	$scope.ValideTache = function (id_act) {
		var donnee = {
			id_suivi: id_act,
		};
		// console.log(donnee);
		var config = {
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			transformRequest: $httpParamSerializer
		};
		$http.post($scope.link + '/api/valide_planification.php', donnee, config)
			.then(function (response) {
			// console.log(response);
				if (response.data.status === "success") {

					$scope.InitialiseHebdomadaire();
					$scope.confirmationSwal("Tache validée avec succès", "success");

				} else {

				}
			})
			.catch(function (error) {
				// console.log(error);
				$scope.confirmationSwal("Echec de la validation de l'activité", "error");
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
});