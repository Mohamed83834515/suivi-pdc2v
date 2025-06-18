DECAISSEMENT.controller('RecommandationController', function ($rootScope, $scope, $http, $cookies, $filter, $location, $routeParams, $httpParamSerializer) {

	$scope.Titre = "Gestion des activités";//Titre du module
	$scope.nom1 = $cookies.get("NomUtilisateur");
	$scope.nomadmin = $cookies.get("Fonction");
	$scope.numeroAfficher = 5;
	$scope.Id_mission = "";
	$scope.InitialiseRecommandation = function () {
		if (!$cookies.get("Version")) {
			$scope.getListeActivite();
			$scope.getActivite();
		}
		else {
			$scope.ChangeVersion($cookies.get("Version"));
			$scope.getActiviteChange($cookies.get("Version"));
		}
		$scope.getVersion();
		$scope.getListeMissionPlan();
		$scope.InitialiseMotif();
		$scope.Mission = date;
		$scope.getYearsFrom2021();
		var date = new Date().getFullYear();
		$scope.getListeMissionSupervision();
		$scope.getListeUsers();
		$scope.getListeRubrique();
	}
	$scope.Motif = {
		id_plan: 0,
		ordre: 0,
		phase: "",
		responsable: "",
		proportion: 0,
		date_prevue: "",
		code_rec: 0,
	};
	$scope.InitialiseMotif = function () {

		$scope.Motif = {
			id_plan: 0,
			ordre: 0,
			phase: "",
			responsable: "",
			proportion: 0,
			date_prevue: "",
			code_rec: 0,
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
			url: $scope.link + '/convention/api/activitestatistique.php?responsable=' + $scope.Fonction + '&executant=' + $scope.nom + '&annee=' + version,
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
		}).success(function (data) {
			$scope.ListeStatistique = data.taches;
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
			url: $scope.link + '/convention/api/activite.php?responsable=' + $scope.nom + '&id_personnel=' + $scope.cokk + '&Fonction=' + $scope.Fonction + '&Partenaire=' + $scope.Partenaire + '&annee=' + version,
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
		}).success(function (data) {
			$scope.ListeActivite = data.activites;
			console.log('actiite', $scope.ListeActivite);
			// Une fois que vous avez récupéré les activités, appelez la fonction pour mettre à jour les tâches associées.
			// $scope.getListeTacheByUser();
		});
	}
	$scope.verf = function () {
		$scope.verifie = true;
	}
	$scope.verf1 = function () {
		$scope.verifie = false;
	}
	$scope.converToDate = function (value) {
		var date = new Date(value);
		return date;
	}
	$scope.getSuiviPlanMission = function (code) {
		$scope.suivimission = [];
		$scope.TotalProp = 0;
		$scope.total_proportion = 0;
		$scope.Motif.code_rec = code;
		for (var i = 0; i <= $scope.ListeMissionPlan.length - 1; i++) {
			if ($scope.ListeMissionPlan[i].code_rec == code) {
				$scope.suivimission.push($scope.ListeMissionPlan[i]);
			}
		}

		// Convertir les dates après les avoir ajoutées
		for (var i = 0; i < $scope.suivimission.length; i++) {
			$scope.suivimission[i].date_reelle = $scope.converToDate($scope.suivimission[i].date_reelle);
			$scope.suivimission[i].valider_bool = $scope.suivimission[i].valider == 1;
		}


		for (var i = 0; i <= $scope.suivimission.length - 1; i++) {
			$scope.total_proportion += parseInt($scope.suivimission[i].proportion);
		}
		$scope.TotalProp = 100 - $scope.total_proportion;
		$scope.Motif.proportion = 100 - $scope.total_proportion;
		console.log("Total Proportion", $scope.suivimission);
	}
	$scope.getMonatantProp = function (code) {
		var total = 0;
		for (var i = 0; i <= $scope.ListeMissionPlan.length - 1; i++) {
			if ($scope.ListeMissionPlan[i].code_rec == code) {
				total += parseInt($scope.ListeMissionPlan[i].proportion);
			}
		}
		return total;
	}
	$scope.getListeUsers = function () {
		$scope.totalJour = 0; 
		$scope.ListeUsers = [];
		$http({
			method: 'GET',
			url: $scope.link + '/convention/api/user.php',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
		}).success(function (data) {
			$scope.ListeUsers = data.users;
		});
	}
	$scope.getListeRubrique = function () {
		$scope.totalJour = 0; 
		$scope.ListeRubrique = [];
		$http({
			method: 'GET',
			url: $scope.link + '/convention/api/Rubrique.php',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
		}).success(function (data) {
			$scope.ListeRubrique = data.Rubrique;
		});
	}
	$scope.getNomRurbique = function (code) {
		var total = "";
		for (var i = 0; i <= $scope.ListeRubrique.length - 1; i++) {
			if ($scope.ListeRubrique[i].code_rub == code) {
				total = $scope.ListeRubrique[i].nom_rubrique;
			}
		}
		return total;
	}
	$scope.getNomRes = function (code) {
		var total = "";
		for (var i = 0; i <= $scope.ListeUsers.length - 1; i++) {
			if ($scope.ListeUsers[i].id_personnel == code) {
				total = $scope.ListeUsers[i].fonction;
			}
		}
		return total;
	}

	$scope.confirmDelete = function (Motif, mission) {
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
					$http.delete($scope.link + '/convention/api/supprimer_suivi_plan_mission.php?id_suivi=' + mission)
						.then(function (response) {
							$scope.InitialiseRecommandation();
							$scope.confirmationSwal("suivi de mission supprimé avec succès", "success");
							$scope.valide = Motif;
							$scope.verifie = false;
							$('#exampleModal1').modal('show');

						})
						.catch(function (error) {
							console.error("Erreur lors de la suppression:", error);
						});

				}
			});
	};

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
					if (!$scope.actionverified) {
						$scope.AddSuiviMission();
					} else {
						$scope.UpdateSuiviMission();
					}
					$scope.valide = id;
					$('#exampleModal1').modal('show');
					$scope.verifie = false;
				}
			});


	}
	$scope.ResetSuiviReele = function (id, suivi) {
		swal({
			title: "Etes vous sur?",
			text: "Les données seront enregistrer",
			icon: "warning",
			buttons: true,
			dangerMode: false,
		})
			.then((willEdit) => {
				if (willEdit) {
					var fd = new FormData();
					fd.append('id_plan', suivi);
					$http({
						method: 'post',
						url: $scope.link + '/convention/api/reset_plan_mission.php',
						data: fd,
						headers: { 'Content-Type': undefined },
					}).then(function successCallback(response) {
						$scope.response = response.data
						console.log('data', $scope.response)
						// console.log(response);
						if (response.data.status === "success") {
							$scope.InitialiseRecommandation();
							$scope.verifie = true;
							$scope.confirmationSwal("Mission annuler avec succès", "success");
						} else {

						}
					})
						.catch(function (error) {
							// console.log(error);
							$scope.confirmationSwal("Echec modification mission", "error");
						});
					$scope.valide = id;
					$('#exampleModal1').modal('show');

				}
			});
	}
	$scope.ValiderSuiviReele = function (id, suivi) {
		swal({
			title: "Etes vous sur?",
			text: "Les données seront enregistrer",
			icon: "warning",
			buttons: true,
			dangerMode: false,
		})
			.then((willEdit) => {
				if (willEdit) {
					$scope.ValiderSuiviMission(suivi);
					$scope.valide = id;
					$('#exampleModal1').modal('show');

				}
			});
	}
	$scope.ValiderSuiviMission = function (suivi) {
		var date_reelle = formatDate(suivi.date_reelle);
		var files = document.getElementById('file-'+suivi.id_plan).files[0];
		var fd = new FormData();
		fd.append('id_plan', suivi.id_plan);
		fd.append('date_reelle', date_reelle);
		fd.append('observation', suivi.observation);
		fd.append('valider', 1);
		fd.append('livrableFile', files);
		fd.append('livrable', suivi.livrable);
		$http({
			method: 'post',
			url: $scope.link + '/convention/api/valider_plan_mission.php',
			data: fd,
			headers: { 'Content-Type': undefined },
		}).then(function successCallback(response) {
			$scope.response = response.data
			// console.log(response);
			if (response.data.status === "success") {
				$scope.InitialiseRecommandation();
				$scope.verifie = true;
				$scope.confirmationSwal("Mission validé avec succès", "success");
			} else {

			}
		})
			.catch(function (error) {
				// console.log(error);
				$scope.confirmationSwal("Echec modification mission", "error");
			});
	}
	$scope.getSuiviById = function (IdMotif) {
		$scope.actionverified = true;
		$scope.label = "Modifier le suivi de la mission :";
		$('#exampleModal').modal('show');
		for (var i = 0; i <= $scope.ListeMissionPlan.length - 1; i++) {
			if ($scope.ListeMissionPlan[i].id_plan == IdMotif) {
				$scope.Motif.id_plan = IdMotif;
				$scope.Motif.ordre = parseInt($scope.ListeMissionPlan[i].ordre);
				$scope.Motif.phase = $scope.ListeMissionPlan[i].phase;
				$scope.Motif.responsable = $scope.ListeMissionPlan[i].responsable;
				$scope.Motif.proportion = parseInt($scope.ListeMissionPlan[i].proportion);
				$scope.TotalProp +=  parseInt($scope.ListeMissionPlan[i].proportion);

				$scope.Motif.date_prevue = new Date($scope.ListeMissionPlan[i].date_prevue);
				break;
			}
		}
	}
	$scope.telechargerFichier = function (nomFichier) {
		// Créez un lien invisible dans le DOM
		var a = document.createElement('a');
		a.style.display = 'none';
	
		// Définissez l'URL du fichier que vous souhaitez télécharger
		a.href =$scope.link + '/convention/api/fichierSuiviMission/' + nomFichier;
		// console.log(  'http://localhost/tache/api/fichierSuiviMission/' + nomFichier);
		// Définissez le nom du fichier à télécharger
		a.download = nomFichier;
	
		// Ajoutez le lien au DOM et déclenchez le téléchargement
		document.body.appendChild(a);
		a.click();
	
		// Nettoyez le lien du DOM
		document.body.removeChild(a);
	}
	
	$scope.UpdateSuiviMission = function () {
		var date_prevue = formatDate($scope.Motif.date_prevue);
		var fd = new FormData();
		fd.append('id_plan', $scope.Motif.id_plan);
		fd.append('ordre', $scope.Motif.ordre);
		fd.append('phase', $scope.Motif.phase);
		fd.append('date_prevue', date_prevue);
		fd.append('proportion', $scope.Motif.proportion);
		fd.append('responsable', $scope.Motif.responsable);
		$http({
			method: 'post',
			url: $scope.link + '/convention/api/update_plan_mission.php',
			data: fd,
			headers: { 'Content-Type': undefined },
		}).then(function successCallback(response) {
			$scope.response = response.data
			console.log('data', $scope.response)
			// console.log(response);
			if (response.data.status === "success") {
				$scope.InitialiseRecommandation();
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

		var date_prevue = formatDate($scope.Motif.date_prevue);
		var fd = new FormData();
		fd.append('ordre', $scope.Motif.ordre);
		fd.append('phase', $scope.Motif.phase);
		fd.append('date_prevue', date_prevue);
		fd.append('proportion', $scope.Motif.proportion);
		fd.append('responsable', $scope.Motif.responsable);
		fd.append('code_rec', $scope.Motif.code_rec);
		$http({
			method: 'post',
			url: $scope.link + '/convention/api/inser_suivi_plan_mission.php',
			data: fd,
			headers: { 'Content-Type': undefined },
		}).then(function successCallback(response) {
			$scope.response = response.data
			console.log('data', $scope.response)
			// console.log(response);
			if (response.data.status === "success") {
				$scope.InitialiseRecommandation();
				$scope.confirmationSwal("Mission  planifié avec succès", "success");
				$('#exampleModal').modal('hide');
			} else {

			}
		})
			.catch(function (error) {
				// console.log(error);
				$scope.confirmationSwal("Echec modification mission", "error");
			});
	}
	$scope.ModalAdd = function () {
		$scope.actionverified = false;
		$scope.label = "Nouvelle suivi de la mission :";
		$('#exampleModal').modal('show');
	}
	$scope.Modifieaction = function () {
		if($scope.actionverified){
			$scope.TotalProp -= $scope.Motif.proportion;

		}
	}
	$scope.getListeMissionPlan = function () {
		$scope.ListeMissionPlan = [];
		$http({
			method: 'GET',
			url: $scope.link + '/convention/api/mission_plan.php',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
		}).success(function (data) {
			$scope.ListeMissionPlan = data.mission_plan;
			if ($scope.valide != 0) {
				$scope.getSuiviPlanMission($scope.valide)
			}
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
	$scope.getListeRecommandation = function (mission_id) {
		$scope.totalJour = 0;
		$scope.ListeRecommandation = [];
		$scope.nom = $cookies.get("NomUtilisateur");

		console.log($scope.nom)
		$http({
			method: 'GET',
			url: $scope.link + '/convention/api/recommandation.php?id_mission=' + mission_id,
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
		}).success(function (data) {
			$scope.ListeRecommandation = data.recommandation_mission;
			// console.log('recommandation', $scope.ListeRecommandation);
			// Une fois que vous avez récupéré les activités, appelez la fonction pour mettre à jour les tâches associées.
			// $scope.getListeTacheByUser();
		});
	}
	$scope.getYearsFrom2021 = function () {
		var currentYear = new Date().getFullYear();
		var startYear = 2021;
		var years = [];

		for (var year = startYear; year <= currentYear; year++) {
			years.push(year);
		}
		return years;
	};

	// Utilisation de la fonction pour obtenir la liste des années
	$scope.yearsList = $scope.getYearsFrom2021();

	$scope.getListeMissionSupervision = function () {
		$scope.totalJour = 0;
		$scope.ListeMissionSupervision = [];
		$http({
			method: 'GET',
			url: $scope.link + '/convention/api/mission_supervision.php?annee=' + 1,
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
		}).success(function (data) {
			$scope.ListeMissionSupervision = data.mission_supervision;
			console.log(data.mission_supervision);
		});
	}

	$scope.ValideUpdateRecommandation = function (id_activite_ptba_1) {
		swal({
			title: "Etes vous sur?",
			text: "Les données seront enregistrées",
			icon: "warning",
			buttons: true,
			dangerMode: false,
		})
			.then((willEdit) => {
				if (willEdit) {

					$scope.UpdateRecommandation(id_activite_ptba_1);
					$('#exampleModal1').modal('hide');

				}
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
					$http.delete($scope.link + '/convention/api/supprimer_Recommandation.php?id_suivi=' + id_activite_ptba_1)
						.then(function (response) {
							$scope.InitialiseRecommandation();
							$scope.confirmationSwal("Recommandation supprimé avec succès", "success");
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