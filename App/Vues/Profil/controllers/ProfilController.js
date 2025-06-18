DECAISSEMENT.controller('ProfilControllers', function ($rootScope, $scope, $http, $cookies, $location, $routeParams, $httpParamSerializer) {

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
	$scope.nom2 = $cookies.get("Fonction");
	$scope.NomUser = $cookies.get("NomUtilisateur");
	$scope.valide = 0;
	$scope.InitialiseProfils = function () {

		$scope.InitialiseMotif();
		$scope.getListeUsers();
	}

	//// console.log($routeParams.IdActivite);
	// Définition de la classe Tache


	//Declaration de la classe Motif   
	$scope.Motif = {
		Password: "",
		ConPassword: "",
	};
	//Fin Declaration de la classe Motif 


	//Initialisation de la classe Motif   
	$scope.InitialiseMotif = function () {

		$scope.Motif = {
			Password: "",
			ConPassword: "",
		};
	}

	$scope.getListeUsers = function () {
		$scope.totalJour = 0;
		$scope.ListeUsers = [];
		$scope.ListeUsersId = {};
		var id = $cookies.get("IdUtilisateur");
		$http({
			method: 'GET',
			url: $scope.link + '/api/user.php',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
		}).success(function (data) {
			$scope.ListeUsers = data.users;
			for (var j = 0; j < $scope.ListeUsers.length; j++) {
				if ($scope.ListeUsers[j].N == id) {
					$scope.ListeUsersId = $scope.ListeUsers[j];
				}
			}
			console.log('id', $scope.ListeUsersId)
		});
	}
	$scope.getAlertValidation = function () {
		swal({
			title: "Etes vous sur?",
			text: "Le mot de passe sera mis à jour",
			icon: "warning",
			buttons: true,
			dangerMode: false,
		})
			.then((willEdit) => {
				if (willEdit) {
					$scope.ValideActivite();

				}
			});
	}
	$scope.ValideActivite = function () {

		var id = $cookies.get("IdUtilisateur");
		var donnee = {
			Password: $scope.Motif.Password,
			id_users: id,
		};
		// console.log(donnee);
		var config = {
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			transformRequest: $httpParamSerializer
		};

		//$http.post('https://sise-pdc2v.org/api/update_tache.php', donnee, config)
		$http.post($scope.link + '/api/update_password.php', donnee, config)
			.then(function (response) {
				// console.log(response);
				if (response.data.status === "success") {

					$scope.InitialiseDashboardG();
					$scope.confirmationSwal("Mot de passe modifié avec succès", "success");

				} else {
					$scope.confirmationSwal("Mot de passe modifié avec succès", "success");

				}
			})
			.catch(function (error) {
				$scope.InitialiseMotif();
				$('#exampleModal').modal('hide');
				// console.log(error);
				$scope.confirmationSwal("Mot de passe modifié avec succès", "success");
			});
		$scope.verifierDateChoisie();

	}
	$scope.getFirstCharacter = function(chaine) {
		var char= chaine.charAt(0);
		return char;
	};
	$scope.formatAmount = function (amount) {
		return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
	};
	
});