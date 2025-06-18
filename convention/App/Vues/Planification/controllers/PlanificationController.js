DECAISSEMENT.controller('PlanificationController', function ($rootScope, $scope, $http, $cookies, $filter, $location, $routeParams, $httpParamSerializer) {

	$scope.Titre = "Gestion des activités";//Titre du module
	$scope.nom1 = $cookies.get("NomUtilisateur");
	$scope.nomadmin = $cookies.get("Fonction");
	$scope.numeroAfficher = 5;
	$scope.InitialisePlanification = function () {
		if (!$cookies.get("Version")) {
			$scope.getListeActivite();
			$scope.getActivite();
		}
		else {
			$scope.ChangeVersion($cookies.get("Version"));
			$scope.getActiviteChange($cookies.get("Version"));
		}
		$scope.getVersion();
		$scope.InitialiseMotif();
		$scope.getListePlanification();
		$scope.getListeActivite1();
		
	}
	$scope.Motif = {
		IdTache: 0,
		Responsable: "",
		Delai: "",
		activite: "",
		tache: "",
	};
	$scope.InitialiseMotif = function () {

		$scope.Motif = {
			IdTache: 0,
			Responsable: [],
			Delai: "",
			activite: "",
			tache: "",
		};
	}
	// $('#selectElement').select2({
    //     dropdownParent: $('#exampleModal')
    // });
    // $('#selectElement').on('change', function() {
    //     $scope.$apply(function() {
    //       $scope.Motif.activite = $('#selectElement').val();
    //     });
    //   });
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
			url: $scope.link + '/convention/api/activite.php?responsable=' + $scope.nom + '&id_personnel=' + $scope.cokk + '&Fonction=' + $scope.Fonction + '&Partenaire=' + $scope.Partenaire,
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
	$scope.getActiviteChange = function (version) {
		$scope.totalJour = 0;
		$scope.ListeStatistique = [];
		// U$scope.nom = "admin";
		$scope.nom = $cookies.get("NomUtilisateur");
		$scope.Fonction = $cookies.get("Fonction");

		$http({
			method: 'GET',
			//url: 'https://sise-pdc2v.org/api/activite.php?responsable=' + $scope.nom,
			url: $scope.link + '/convention/api/activitestatistique.php?responsable=' + $scope.Fonction + '&executant=' + $scope.nom + '&annee='+version,
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
		}).success(function (data) {
			$scope.ListeStatistique = data.taches;
			console.log('stat', $scope.ListeStatistique);
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
			url: $scope.link + '/convention/api/activite.php?responsable=' + $scope.nom + '&id_personnel=' + $scope.cokk + '&Fonction=' + $scope.Fonction + '&Partenaire=' + $scope.Partenaire+ '&annee='+version,
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
			url: $scope.link + '/convention/api/version_ptba.php',
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
			url: $scope.link + '/convention/api/activitestatistique.php?responsable=' + $scope.Fonction + '&executant=' + $scope.nom + '',
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
				return $scope.ListeVerion[i].observation + ' ' + $scope.ListeVerion[i].version_ptba;
			}
		}
		// Si la version n'est pas trouvée, vous pouvez retourner une valeur par défaut ou gérer autrement.
		return "Version non trouvée";
	};
	$scope.getListePlanification = function () {
		$scope.totalJour = 0;
		$scope.ListePlanification = [];
		$scope.nom = $cookies.get("NomUtilisateur");
		
		console.log($scope.nom)
		$http({
			method: 'GET',
			url: $scope.link + '/convention/api/tacheByactivite.php?responsable=' + $scope.nom + '',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
		}).success(function (data) {
			$scope.ListePlanification = data.taches;
			// Une fois que vous avez récupéré les activités, appelez la fonction pour mettre à jour les tâches associées.
			// $scope.getListeTacheByUser();
		});
	}
	$scope.getListeActivite1 = function () {
		$scope.totalJour = 0;
		$scope.ListeActivite1 = [];
		$http({
			method: 'GET',
			url: $scope.link + '/convention/api/user.php',
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
	
	$scope.ValiderPlanification = function () {
		swal({
			title: "Etes vous sur?",
			text: "Les données seront enregistrées",
			icon: "warning",
			buttons: true,
			dangerMode: false,
		})
			.then((willEdit) => {
				if (willEdit) {

					$scope.AddPlanification();
					$('#exampleModal').modal('hide');

				}
			});
	}

	$scope.AddPlanification = function () {

		var dateReelleFormatted = formatDate($scope.Motif.Delai);
		var nom = $cookies.get("NomUtilisateur");
		var fd = new FormData();
		fd.append('ResponsableUCP', nom);
		fd.append('Responsable', $scope.Motif.Responsable);
		fd.append('Delai', dateReelleFormatted);
		fd.append('activite', $scope.Motif.activite);
		fd.append('tache', $scope.Motif.tache);
		$http({
			method: 'post',
			url: $scope.link + '/convention/api/insert_planification.php',
			data: fd,
			headers: { 'Content-Type': undefined },
		}).then(function successCallback(response) {
			$scope.response = response.data
			console.log('data', $scope.response)
			// console.log(response);
			if (response.data.status === "success") {

				$scope.InitialisePlanification();
				$scope.confirmationSwal("Tâche planifié avec succès", "success");
				$('#exampleModal').modal('hide');
			} else {

			}
		})
			.catch(function (error) {
				// console.log(error);
				$scope.confirmationSwal("erreur lors de l'enrégistrement", "error");
			});
	}
	$scope.getPlanificationById = function (IdMotif) {
		for (var i = 0; i <= $scope.ListePlanification.length - 1; i++) {
			if ($scope.ListePlanification[i].id_suivi == IdMotif) {
				$scope.Motif.IdTache = $scope.ListePlanification[i].id_suivi;
				$scope.Motif.Responsable = $scope.ListePlanification[i].numero_avenant;
				$scope.Motif.Delai = new Date($scope.ListePlanification[i].date_avenant);
				$scope.Motif.activite = $scope.ListePlanification[i].contrat;
				$scope.Motif.tache = $scope.ListePlanification[i].sous_activite;
				break;
			}
		}
	}
	$scope.ValideUpdatePlanification = function (id_activite_ptba_1) {
		swal({
			title: "Etes vous sur?",
			text: "Les données seront enregistrées",
			icon: "warning",
			buttons: true,
			dangerMode: false,
		})
			.then((willEdit) => {
				if (willEdit) {

					$scope.UpdatePlanification(id_activite_ptba_1);
					$('#exampleModal1').modal('hide');

				}
			});
	}
	$scope.UpdatePlanification = function () {

		var dateReelleFormatted = formatDate($scope.Motif.Delai);
		var nom = $cookies.get("NomUtilisateur");
		var fd = new FormData();
		fd.append('ResponsableUCP', nom);
		fd.append('id_suivi', $scope.Motif.IdTache);
		fd.append('Responsable', $scope.Motif.Responsable);
		fd.append('Delai', dateReelleFormatted);
		fd.append('activite', $scope.Motif.activite);
		fd.append('tache', $scope.Motif.tache);
		$http({
			method: 'post',
			url: $scope.link + '/convention/api/update_planification.php',
			data: fd,
			headers: { 'Content-Type': undefined },
		}).then(function successCallback(response) {
			$scope.response = response.data
			console.log('data', $scope.response)
			// console.log(response);
			if (response.data.status === "success") {

				$scope.InitialisePlanification();
				$scope.confirmationSwal("Planification modifié avec succès", "success");
				$('#exampleModal').modal('hide');
			} else {

			}
		})
			.catch(function (error) {
				// console.log(error);
				$scope.confirmationSwal("erreur lors de l'enrégistrement", "error");
			});
	}
	$scope.ValideDeleteById = function (id_activite_ptba_1) {
		swal({
			title: "Etes vous sur?",
			text: "La tâche sera supprimés",
			icon: "warning",
			buttons: true,
			dangerMode: false,
		})
			.then((willDelete) => {
				if (willDelete) {
					// Appel à l'API PHP pour supprimer l'élément
					$http.delete($scope.link + '/convention/api/supprimer_planification.php?id_suivi=' + id_activite_ptba_1)
						.then(function (response) {
							$scope.InitialisePlanification();
							$scope.confirmationSwal("Planification supprimé avec succès", "success");
						})
						.catch(function (error) {
							console.error("Erreur lors de la suppression:", error);
						});
				}
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