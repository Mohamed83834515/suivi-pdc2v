
DECAISSEMENT.controller('TypeBeneficiaireController', function ($rootScope,$scope, $http, $cookies) {

	$scope.Titre = "Gestion des types de bénéficiaires";//Titre du module
	$scope.ListeTypeBeneficiaire = []; //Initialisation tableau liste TypeBeneficiaire

	$scope.InitialiseTypeBeneficiaireG = function () {

		$scope.InitialiseTypeBeneficiaire();
		$scope.getListeTypeBeneficiaire();

	}

	//Declaration de la classe TypeBeneficiaire   
	$scope.TypeBeneficiaire = {
		IdTypeBeneficiaire: 0,
		Libelle: "",
		Datecreation: "",
		Idusrcreation: $cookies.get('IdUtilisateur')
	};
	//Fin Declaration de la classe TypeBeneficiaire 

	//Initialisation de la classe TypeBeneficiaire   
	$scope.InitialiseTypeBeneficiaire = function () {

		$scope.TypeBeneficiaire = {
			IdTypeBeneficiaire: 0,
			Libelle: "",
			Datecreation: "",
			Idusrcreation: $cookies.get('IdUtilisateur')
		};
	}
	//Fin initialisation de la classe TypeBeneficiaire   

	//Debut fonction valider edition TypeBeneficiaire
	$scope.ValiderEditionTypeBeneficiaire = function () {
		swal({
			title: "Etes vous sur?",
			text: "Les données seront enregistrées",
			icon: "warning",
			buttons: true,
			dangerMode: false,
		})
			.then((willEdit) => {
				if (willEdit) {
					if ($scope.TypeBeneficiaire.IdTypeBeneficiaire === 0) {
						$scope.InsertTypeBeneficiaire();
						$('#exampleModal').modal('hide');
						$scope.InitialiseTypeBeneficiaire();

					} else {
						$scope.UpdateTypeBeneficiaire();
						$('#exampleModal').modal('hide');
						$scope.InitialiseTypeBeneficiaire();
					}
				}
			});

	}


	//Debut fonction valider suppression TypeBeneficiaire
	$scope.SuppressionTypeBeneficiaire = function (IdTypeBeneficiaire) {

		swal({
			title: "Etes vous sur?",
			text: "Une fois supprimer vous perdez la donnée",
			icon: "warning",
			buttons: true,
			dangerMode: true,
		})
			.then((willDelete) => {
				if (willDelete) {
					$scope.DeleteTypeBeneficiaire(IdTypeBeneficiaire);
				}
			});

	}
	//Fin fonction valider suppression TypeBeneficiaire



	//Debut fonction insert TypeBeneficiaire
	$scope.InsertTypeBeneficiaire = function () {

		var donnee = $.param($scope.TypeBeneficiaire);
		$http({
			method: 'POST',
			url: $scope.link +'/convention/api/Controllers/TypeBeneficiaireController.php?Action=Add',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			data: donnee
		}).success(function (data) {

			if (data.Etat == "SUCCES") {

				$scope.getListeTypeBeneficiaire();
				$scope.InitialiseTypeBeneficiaire();
				$scope.confirmationSwal("Type Bénéficiaire enregistré avec succès", "success");

			} else {
				// alert(data.Message);
				$scope.confirmationSwal("Echec d'enregistrement", "error");
			}
		});
	}
	//Fin fonction insert TypeBeneficiaire

	//Debut fonction update TypeBeneficiaire
	$scope.UpdateTypeBeneficiaire = function () {

		var donnee = $.param($scope.TypeBeneficiaire);
		$http({
			method: 'POST',
			url: $scope.link +'/convention/api/Controllers/TypeBeneficiaireController.php?Action=Update&IdTypeBeneficiaire=' + $scope.TypeBeneficiaire.IdTypeBeneficiaire,
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			data: donnee
		}).success(function (data) {

			if (data.Etat == "SUCCES") {

				$scope.getListeTypeBeneficiaire();
				$scope.confirmationSwal("Type Bénéficiaire modifié avec succès", "success");

			} else {

				$scope.confirmationSwal("Echec de modification", "success");
			}
		});
	}
	//Fin fonction update TypeBeneficiaire

	//Debut fonction delete TypeBeneficiaire
	$scope.DeleteTypeBeneficiaire = function (IdTypeBeneficiaire) {

		var donnee = $.param($scope.TypeBeneficiaire);
		$http({
			method: 'POST',
			url: $scope.link +'/convention/api/Controllers/TypeBeneficiaireController.php?Action=Delete&IdTypeBeneficiaire=' + IdTypeBeneficiaire,
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			data: donnee
		}).success(function (data) {

			if (data.Etat == "SUCCES") {

				$scope.getListeTypeBeneficiaire();
				$scope.confirmationSwal("Type Bénéficiaire supprimé avec succès", "success");

			} else {

				$scope.confirmationSwal("Echec suppresion", "error");
			}
		});
	}
	//Fin fonction delete TypeBeneficiaire

	//Debut fonction obtenir liste des TypeBeneficiaires
	$scope.getListeTypeBeneficiaire = function () {

		$scope.ListeTypeBeneficiaire = [];

		$http({ method: 'GET', url: $scope.link +'/convention/api/Controllers/TypeBeneficiaireController.php?Action=All' }).
			success(function (data, status, headers, config) {

				$scope.ListeTypeBeneficiaire = data;
			});
	}
	//Fin fonction obtenir liste des TypeBeneficiaires

	//Debut fonction obtenir un TypeBeneficiaire
	$scope.getTypeBeneficiaire = function (IdTypeBeneficiaire) {
		//console.log(IdTypeBeneficiaire)
		for (var i = 0; i <= $scope.ListeTypeBeneficiaire.length - 1; i++) {
			if ($scope.ListeTypeBeneficiaire[i].IdTypeBeneficiaire == IdTypeBeneficiaire) {

				$scope.TypeBeneficiaire.IdTypeBeneficiaire = $scope.ListeTypeBeneficiaire[i].IdTypeBeneficiaire;
				$scope.TypeBeneficiaire.Libelle = $scope.ListeTypeBeneficiaire[i].Libelle;
				$scope.TypeBeneficiaire.Datecreation = $scope.ListeTypeBeneficiaire[i].Datecreation;
				$scope.TypeBeneficiaire.Idusrcreation = $scope.ListeTypeBeneficiaire[i].IdUtilisateur;
				break;
			}
		}
	}
	//Fin fonction obtenir un TypeBeneficiaire

	//pagination
	$scope.numeroAfficher = 5;
//fin

});