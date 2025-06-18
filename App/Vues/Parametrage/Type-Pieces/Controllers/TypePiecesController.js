
DECAISSEMENT.controller('TypePieceController', function ($rootScope,$scope, $http, $cookies) {

	$scope.Titre = "Gestion des type de pieces";//Titre du module
	$scope.ListeTypePiece = []; //Initialisation tableau liste TypePiece

	$scope.InitialiseTypePieceG = function () {

		$scope.InitialiseTypePiece();
		$scope.getListeTypePiece();

	}

	//Declaration de la classe TypePiece   
	$scope.TypePiece = {
		IdTypePiece: 0,
		Libelle: "",
		Datecreation: "",
		IdUtilisateurCreation: $cookies.get('IdUtilisateur')
	};
	//Fin Declaration de la classe TypePiece 

	//Initialisation de la classe TypePiece   
	$scope.InitialiseTypePiece = function () {

		$scope.TypePiece = {
			IdTypePiece: 0,
			Libelle: "",
			Datecreation: "",
			IdUtilisateurCreation: $cookies.get('IdUtilisateur')
		};
	}
	//Fin initialisation de la classe TypePiece   

	//Debut fonction valider edition TypePiece
	$scope.ValiderEditionTypePiece = function () {
		swal({
			title: "Etes vous sur?",
			text: "Les données seront enregistrées",
			icon: "warning",
			buttons: true,
			dangerMode: false,
		})
			.then((willEdit) => {
				if (willEdit) {
					if ($scope.TypePiece.IdTypePiece === 0) {
						$scope.InsertTypePiece();
						$('#exampleModal').modal('hide');
						$scope.InitialiseTypePiece();

					} else {
						$scope.UpdateTypePiece();
						$('#exampleModal').modal('hide');
						$scope.InitialiseTypePiece();
					}
				}
			});

	}


	//Debut fonction valider suppression TypePiece
	$scope.SuppressionTypePiece = function (IdTypePiece) {

		swal({
			title: "Etes vous sur?",
			text: "Une fois supprimer vous perdez la donnée",
			icon: "warning",
			buttons: true,
			dangerMode: true,
		})
			.then((willDelete) => {
				if (willDelete) {
					$scope.DeleteTypePiece(IdTypePiece);
				}
			});

	}
	//Fin fonction valider suppression TypePiece



	//Debut fonction insert TypePiece
	$scope.InsertTypePiece = function () {

		var donnee = $.param($scope.TypePiece);
		$http({
			method: 'POST',
			url: $scope.link +'/Api/Controllers/TypePieceController.php?Action=Add',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			data: donnee
		}).success(function (data) {

			if (data.Etat == "SUCCES") {

				$scope.getListeTypePiece();
				$scope.InitialiseTypePiece();
				$scope.confirmationSwal("Pièce enregistré avec succès", "success");

			} else {
				// alert(data.Message);
				$scope.confirmationSwal("Echec d'enregistrement", "error");
			}
		});
	}
	//Fin fonction insert TypePiece

	//Debut fonction update TypePiece
	$scope.UpdateTypePiece = function () {

		var donnee = $.param($scope.TypePiece);
		$http({
			method: 'POST',
			url: $scope.link +'/Api/Controllers/TypePieceController.php?Action=Update&IdTypePiece=' + $scope.TypePiece.IdTypePiece,
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			data: donnee
		}).success(function (data) {

			if (data.Etat == "SUCCES") {

				$scope.getListeTypePiece();
				$scope.confirmationSwal("Pièce modifié avec succès", "success");

			} else {

				$scope.confirmationSwal("Echec de modification", "success");
			}
		});
	}
	//Fin fonction update TypePiece

	//Debut fonction delete TypePiece
	$scope.DeleteTypePiece = function (IdTypePiece) {

		var donnee = $.param($scope.TypePiece);
		$http({
			method: 'POST',
			url: $scope.link +'/Api/Controllers/TypePieceController.php?Action=Delete&IdTypePiece=' + IdTypePiece,
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			data: donnee
		}).success(function (data) {

			if (data.Etat == "SUCCES") {

				$scope.getListeTypePiece();
				$scope.confirmationSwal("Pièce supprimé avec succès", "success");

			} else {

				$scope.confirmationSwal("Echec suppresion", "error");
			}
		});
	}
	//Fin fonction delete TypePiece

	//Debut fonction obtenir liste des TypePieces
	$scope.getListeTypePiece = function () {

		$scope.ListeTypePiece = [];

		$http({ method: 'GET', url: $scope.link +'/Api/Controllers/TypePieceController.php?Action=All' }).
			success(function (data, status, headers, config) {

				$scope.ListeTypePiece = data;
				
			});
	}
	//Fin fonction obtenir liste des TypePieces

	//Debut fonction obtenir un TypePiece
	$scope.getTypePiece = function (IdTypePiece) {
		//console.log(IdTypePiece)
		for (var i = 0; i <= $scope.ListeTypePiece.length - 1; i++) {
			if ($scope.ListeTypePiece[i].IdTypePiece == IdTypePiece) {

				$scope.TypePiece.IdTypePiece = $scope.ListeTypePiece[i].IdTypePiece;
				$scope.TypePiece.Libelle = $scope.ListeTypePiece[i].Libelle;
				$scope.TypePiece.Datecreation = $scope.ListeTypePiece[i].Datecreation;
				$scope.TypePiece.IdUtilisateurCreation = $scope.ListeTypePiece[i].IdUtilisateur;
				break;
			}
		}
	}
	//Fin fonction obtenir un TypePiece

	//pagination
	$scope.numeroAfficher = 5;
//fin

});