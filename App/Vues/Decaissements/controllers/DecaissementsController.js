DECAISSEMENT.controller('DecaissementsController', function ($rootScope, $scope, $http, $cookies, $location, $routeParams, $httpParamSerializer) {

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
		$scope.getListeTacheByUser();
		$scope.InitialiseMotif();
		$scope.getListeTache();
		$scope.getListeActivite1();
		$scope.getVersion();
		// $scope.getCommune();
		$scope.getListeSousActivite();
		$scope.getDecaissementTache();
		$scope.getListeStructure();
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
		commune:"",
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
			commune:"",
		};
	}
	//Fin initialisation de la classe Motif 
	$scope.confirmDelete = function(Motif,id_activite_ptba) {
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
					.then(function(response) {
					$scope.InitialiseActivite();
					$scope.confirmationSwal("Sous activité supprimé avec succès", "success");
					$scope.valide = id_activite_ptba;
					$('#exampleModal11').modal('show');
					})
					.catch(function(error) {
						console.error("Erreur lors de la suppression:", error);
					});
			}
		});
	};
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
	$scope.getListeTacheByUser = function () {
		$scope.totalJour = 0;
		$scope.ListeTacheByUser = [];
		$scope.nom =$cookies.get("NomUtilisateur");
		// $scope.nom = "nzue";
		//// console.log($scope.nom);
		$http({
			method: 'GET',
			//url: 'https://sise-pdc2v.org/api/tache_user.php?responsable=nzue',
			//url: 'https://sise-pdc2v.org/api/tache_user.php?responsable=' + $scope.nom,
			url:$scope.link + '/api/tache_user.php',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
		}).
			success(function (data) {
				$scope.ListeTacheByUser = data.taches;
				//  // console.log($scope.ListeTacheByUser);
			});
	}
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
			url:$scope.link + '/api/liste_decaissement.php',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
		}).
			success(function (data) {
				$scope.ListeDecaissementTache = data.sous_activites;
				if($scope.valide != 0){
					$scope.getMaTache($scope.valide);
				}
			});
	}

	$scope.getListeSousActivite = function () {
		$scope.totalJour = 0;
		$scope.ListeSousActivite = [];
		$scope.nom =$cookies.get("NomUtilisateur");
		// $scope.nom = "nzue";
		//// console.log($scope.nom);
		$http({
			method: 'GET',
			//url: 'https://sise-pdc2v.org/api/tache_user.php?responsable=nzue',
			//url: 'https://sise-pdc2v.org/api/tache_user.php?responsable=' + $scope.nom,
			url:$scope.link + '/api/sous_activite.php',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
		}).
			success(function (data) {
				$scope.ListeSousActivite = data.sous_activites;
				// console.log($scope.ListeSousActivite);
			});
	}
	$scope.getListeDecaissement = function () {
		$scope.totalJour = 0;
		$scope.ListeDecaissement = [];
		//$scope.nom =$cookies.get("NomUtilisateur");
		// $scope.nom = "nzue";
		//// console.log($scope.nom);
		$http({
			method: 'GET',
			//url: 'https://sise-pdc2v.org/api/tache_user.php?responsable=nzue',
			//url: 'https://sise-pdc2v.org/api/tache_user.php?responsable=' + $scope.nom,
			url:$scope.link + '/api/sous_activite.php',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
		}).
			success(function (data) {
				$scope.ListeDecaissement = data.sous_activites;
				// console.log($scope.ListeDecaissement);
			});
	}


	$scope.getListeTache = function () {
		$scope.totalJour = 0;
		$scope.ListeTacheByActivite = [];
		//$scope.nom =$cookies.get("NomUtilisateur");
		$scope.nom = $routeParams.IdActivite;
		//// console.log($scope.nom);
		$http({
			method: 'GET',
			//url: 'https://sise-pdc2v.org/api/tache_user.php?responsable=nzue',
			url:$scope.link + '/api/tacheByactivite.php?responsable=' + $scope.nom,
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
		}).
			success(function (data) {
				$scope.ListeTacheByActivite = data.taches;
				//  // console.log($scope.ListeTacheByUser);
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

	$scope.getDecaissementById = function (IdMotif,id_ptba) {
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
				break;
			}
		}
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

		return observation;
	};
	$scope.getSousActivite = function (IdActivite, IdSousactivite) {
		var observation = null;
		var maxIdSuivi = -1;

		for (var i = 0; i < $scope.ListeTacheByActivite.length; i++) {
			if ($scope.ListeTacheByActivite[i].contrat == IdActivite && $scope.ListeTacheByActivite[i].id_suivi == IdSousactivite) {


				$scope.Motif.IdTache = $scope.ListeTacheByActivite[i].contrat;
				$scope.Motif.CodeTache = $scope.ListeTacheByActivite[i].id_suivi;
				// $scope.Motif.Livrable = $scope.ListeTacheByActivite[i].documents;
				// //$scope.Motif.Nlot = $scope.ListeTacheByUser[i].id_sous_activite;
				// $scope.Motif.DateReelle = $scope.ListeTacheByActivite[i].date_suivi;
				// $scope.Motif.Observation = $scope.ListeTacheByActivite[i].observation;
				// $scope.Motif.StatutTache = $scope.ListeTacheByActivite[i].statut_activite;
				// $scope.Motif.Retard = $scope.ListeTacheByActivite[i].retard_accuse;
				// $scope.Motif.Difficultes = $scope.ListeTacheByActivite[i].difficultes_rencontrees;
				// $scope.Motif.PisteSolutions = $scope.ListeTacheByActivite[i].pistes_solutions;



			}
		}


	};



	$scope.getMaTache = function (id_ptba) {
		$scope.decaissements = []; // Tableau pour stocker les tâches correspondantes$
		$scope.id_activite_ptba_2 = id_ptba;
		for (var i = 0; i < $scope.ListeDecaissementTache.length; i++) {
			if ($scope.ListeDecaissementTache[i].id_activite_ptba == id_ptba) {
				$scope.decaissements.push($scope.ListeDecaissementTache[i]);
			}
		}
		// console.log($scope.decaissements);
		//// console.log($routeParams.IdActivite);
	}
	$scope.getSomme = function () {
		var sommeMontants = 0;
		for (var j = 0; j < $scope.decaissements.length; j++) {
		  sommeMontants += parseFloat($scope.decaissements[j].montant_decaisse);
		}
	  
		return sommeMontants;
		
	  };
	  

	$scope.ValiderEditionTache = function (id_activite_ptba) {
		swal({
			title: "Etes vous sur?",
			text: "Les données seront enregistrées",
			icon: "warning",
			buttons: true,
			dangerMode: false,
		})
			.then((willEdit) => {
				if (willEdit) {

					$scope.UpdateMotif(id_activite_ptba);
					$scope.valide= id_activite_ptba;
					$('#exampleModal11').modal('show');


				}
			});


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
					$scope.valide = id;
					$('#exampleModal11').modal('show');


				}
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
	$scope.UpdateDecaissement = function (id) {

		var dateReelleFormatted = formatDate($scope.Motif.DateReelle);
			var fd= new FormData();
			var files = document.getElementById('file22').files[0];
			fd.append('id_tache',$scope.Motif.IdTache);
			fd.append('lot',$scope.Motif.Nlot);
			fd.append('date_reelle',dateReelleFormatted);
			fd.append('observation',$scope.Motif.Observation);
			fd.append('code_tache',$scope.Motif.CodeTache);
			fd.append('statut_tache',$scope.Motif.StatutTache);
			fd.append('difficultes',$scope.Motif.Difficultes);
			fd.append('retard',$scope.Motif.Retard);
			fd.append('pistes_solutions',$scope.Motif.PisteSolutions);
			fd.append('file',files);
			fd.append('id_personnel', $scope.NomUser);
			$http({
				method: 'post',
				url: $scope.link + '/api/update_modification.php',
				data: fd,
				headers: { 'Content-Type': undefined},
			}).then(function successCallback(response){
				$scope.response = response.data
				console.log('data', $scope.response)
						// console.log(response);
							if (response.data.status === "success") {
								$scope.AddNotification( id, "mise à jour d'un décaissement", 2);
								$scope.InitialiseActivite();
								$scope.confirmationSwal("Décaissement modifiée avec succès", "success");
								$('#exampleModal3').modal('hide');
							} else {
			
							}
						})
						.catch(function (error) {
							// console.log(error);
							$scope.confirmationSwal("Echec modification décaissement", "error");
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
			 console.log('usersiuiauiaua',$scope.ListeActivite1);
			// Une fois que vous avez récupéré les activités, appelez la fonction pour mettre à jour les tâches associées.
			// $scope.getListeTacheByUser();
		});
	}


	$scope.UpdateMotif = function (id) {

		var dateReelleFormatted = formatDate($scope.Motif.DateReelle);
			var fd= new FormData();
			var files = document.getElementById('file1').files[0];
			fd.append('id_tache',$scope.Motif.IdTache);
			fd.append('lot',$scope.Motif.Nlot);
			fd.append('date_reelle',dateReelleFormatted);
			fd.append('observation',$scope.Motif.Observation);
			fd.append('code_tache',$scope.Motif.CodeTache);
			fd.append('statut_tache',$scope.Motif.StatutTache);
			fd.append('difficultes',$scope.Motif.Difficultes);
			fd.append('retard',$scope.Motif.Retard);
			fd.append('pistes_solutions',$scope.Motif.PisteSolutions);
			fd.append('commune', $scope.Motif.commune);
			fd.append('file',files);
			fd.append('id_personnel', $scope.NomUser);
			$http({
				method: 'post',
				url: $scope.link + '/api/decaissement.php',
				data: fd,
				headers: { 'Content-Type': undefined},
			}).then(function successCallback(response){
				$scope.response = response.data
				console.log('data', $scope.response)
						// console.log(response);
							if (response.data.status === "success") {
							$scope.AddNotification( id, "Ajout d'un nouveau décaissement", 2);
							$scope.InitialiseActivite();
							$scope.confirmationSwal("Montant ajouté avec succès", "success");
							$('#exampleModal').modal('hide');
							} else {
			
							}
						})
						.catch(function (error) {
							// console.log(error);
							$scope.confirmationSwal("Echec modification décaissement", "error");
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

					$scope.InitialiseActivite();
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
			
		console.log('idididididdididi',id_act);
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