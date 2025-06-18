
	DECAISSEMENT.controller('BeneficiaireController', function($rootScope,$scope,$http,$cookies){

        $scope.Titre = "Gestion des Beneficiaires";//Titre du module
        $scope.ListeBeneficiaire = []; //Initialisation tableau liste Beneficiaire
        $scope.myVar = false;
        $scope.InitialiseBeneficiaireG = function(){
    
            $scope.InitialiseBeneficiaire();
            $scope.getListeBeneficiaire();
            $scope.getListeTypePiece();
            $scope.getListeTypeBeneficiaire();
        }
    
        //Declaration de la classe Beneficiaire   
            $scope.Beneficiaire = {
                IdBeneficiaire:0,
                Reference:"",
                IdTyb:"",
                IdTyp:"",
                Nom :"",
                NumeroPiece :"",
                Telephone : "",
                Empty1 :"",
                Empty2 : "",
                Empty3 : "",
                Geler : "",
                Datecreation : "",
                Idusrcreation : $cookies.get('IdUtilisateur')
            };
        //Fin Declaration de la classe Beneficiaire 
        
    
        //Initialisation de la classe Beneficiaire   
        $scope.InitialiseBeneficiaire = function(){
    
            $scope.Beneficiaire = {
                IdBeneficiaire:0,
                Reference:"",
                IdTyb :"",
                IdTyp : "",
                Nom : "",
                NumeroPiece : "",
                Telephone : "",
                Empty1 : "",
                Empty2 : "",
                Empty3 : "",
                Geler :"",
                Datecreation : "",
                Idusrcreation : $cookies.get('IdUtilisateur')
            };
            $scope.myVar = false;
        }
        //Fin initialisation de la classe Beneficiaire   
    
        //Debut fonction valider edition Beneficiaire
        $scope.ValiderEditionBeneficiaire = function()
        {
            swal({
                title: "Etes vous sur?",
                text: "Les données seront enregistrées",
                icon: "warning",
                buttons: true,
                dangerMode: false,
            })
            .then((willEdit) => {
                if (willEdit) {
                    if($scope.Beneficiaire.IdBeneficiaire === 0) {
                        $scope.InsertBeneficiaire();
                        $('#exampleModal').modal('hide');
                        $scope.InitialiseBeneficiaire();
                    
                    } else{
                        $scope.UpdateBeneficiaire();
                        $('#exampleModal').modal('hide');
                        $scope.InitialiseBeneficiaire();
                    }
                } 
            }); 
            
           
        }
    
    
        //Debut fonction valider suppression Beneficiaire
        $scope.SuppressionBeneficiaire = function (IdBeneficiaire) {

            swal({
                title: "Etes vous sur?",
                text: "Une fois supprimer vous perdez la donnée",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then((willDelete) => {
                    if (willDelete) {
                        $scope.DeleteBeneficiaire(IdBeneficiaire);
                    }
                });
        }
        //Fin fonction valider suppression Beneficiaire
    
    
    
        //Debut fonction insert Beneficiaire
        $scope.InsertBeneficiaire = function () {

            var donnee = $.param($scope.Beneficiaire);
            $http({
                method: 'POST',
                url: $scope.link +'/convention/api/Controllers/BeneficiaireController.php?Action=Add',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                data: donnee
            }).success(function (data) {

                if (data.Etat == "SUCCES") {

                    $scope.getListeBeneficiaire();
                    $scope.InitialiseBeneficiaire();
                    $scope.confirmationSwal("Beneficiaire enregistré avec succès", "success");

                } else {
                    // alert(data.Message);
                    $scope.confirmationSwal("Echec d'enregistrement", "error");
                }
            });
        }
        //Fin fonction insert Beneficiaire
    
        //Debut fonction update Beneficiaire
        $scope.UpdateBeneficiaire = function () {

            var donnee = $.param($scope.Beneficiaire);
            $http({
                method: 'POST',
                url: $scope.link +'/convention/api/Controllers/BeneficiaireController.php?Action=Update&IdBeneficiaire=' + $scope.Beneficiaire.IdBeneficiaire,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                data: donnee
            }).success(function (data) {

                if (data.Etat == "SUCCES") {

                    $scope.getListeBeneficiaire();
                    $scope.confirmationSwal("Beneficiaire modifié avec succès", "success");

                } else {

                    $scope.confirmationSwal("Echec de modification", "error");
                }
            });
        }
        //Fin fonction update Beneficiaire
    
        //Debut fonction delete Beneficiaire
        $scope.DeleteBeneficiaire = function (IdBeneficiaire) {

            var donnee = $.param($scope.Beneficiaire);
            $http({
                method: 'POST',
                url: $scope.link +'/convention/api/Controllers/BeneficiaireController.php?Action=Delete&IdBeneficiaire=' + IdBeneficiaire,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                data: donnee
            }).success(function (data) {

                if (data.Etat == "SUCCES") {

                    $scope.getListeBeneficiaire();
                    $scope.confirmationSwal("Beneficiaire supprimé avec succès", "success");

                } else {

                    $scope.confirmationSwal("Echec suppression Beneficiaire", "error");
                }
            });
        }
        //Fin fonction delete Beneficiaire
    
        //Debut fonction obtenir liste des Beneficiaires
        $scope.getListeBeneficiaire = function () {

            $scope.ListeBeneficiaire = [];

            $http({ method: 'GET', url: $scope.link +'/convention/api/Controllers/BeneficiaireController.php?Action=All' }).
                success(function (data, status, headers, config) {

                    $scope.ListeBeneficiaire = data;
                });
        }
        //Fin fonction obtenir liste des Beneficiaires
    
        //Debut fonction obtenir un Beneficiaire
        $scope.getBeneficiaire = function (IdBeneficiaire) {
            console.log(IdBeneficiaire)
            for (var i = 0; i <= $scope.ListeBeneficiaire.length - 1; i++) {
                if ($scope.ListeBeneficiaire[i].IdBeneficiaire == IdBeneficiaire) {

                    $scope.Beneficiaire.IdBeneficiaire = $scope.ListeBeneficiaire[i].IdBeneficiaire;
                    $scope.Beneficiaire.Reference = $scope.ListeBeneficiaire[i].Reference;
                    $scope.Beneficiaire.Nom = $scope.ListeBeneficiaire[i].Nom;
                    $scope.Beneficiaire.IdTyb = $scope.ListeBeneficiaire[i].IdTyb;
                    $scope.Beneficiaire.IdTyp = $scope.ListeBeneficiaire[i].IdTyp;
                    $scope.Beneficiaire.NumeroPiece = $scope.ListeBeneficiaire[i].NumeroPiece;
                    $scope.Beneficiaire.Telephone = $scope.ListeBeneficiaire[i].Telephone;
                    $scope.Beneficiaire.Empty1 = $scope.ListeBeneficiaire[i].Empty1;
                    $scope.Beneficiaire.Datecreation = $scope.ListeBeneficiaire[i].Datecreation;
                    $scope.Beneficiaire.Idusrcreation = $scope.ListeBeneficiaire[i].Idusrcreation;

                    if ($scope.Beneficiaire.Telephone.length>0) {
                        $scope.myVar = true
                    }else{
                        $scope.myVar = false
                    }

                    break;
                }
            }
        }
        //Fin fonction obtenir un Beneficiaire
        

        //Debut fonction obtenir le Libelle de TypePiece
	$scope.getTypePiece = function (IdTyp) {

		for (var i = 0; i <= $scope.ListeTypePiece.length - 1; i++) {
			if ($scope.ListeTypePiece[i].IdTypePiece == IdTyp) {

				return $scope.ListeTypePiece[i].Libelle;

			}
		}
    }
        //Debut fonction obtenir le Libelle de TypeBeneficiaire
	$scope.getTypeBeneficiaire = function (IdTypb) {

		for (var i = 0; i <= $scope.ListeTypeBeneficiaire.length - 1; i++) {
			if ($scope.ListeTypeBeneficiaire[i].IdTypeBeneficiaire == IdTypb) {

				return $scope.ListeTypeBeneficiaire[i].Libelle;

			}
		}
    }
    
    //Debut fonction obtenir liste des TypePieces
	$scope.getListeTypePiece = function () {

		$scope.ListeTypePiece = [];

		$http({ method: 'GET', url: $scope.link +'/convention/api/Controllers/TypePieceController.php?Action=All' }).
			success(function (data, status, headers, config) {

				$scope.ListeTypePiece = data;

			});
	}
    //Fin fonction obtenir liste des TypePieces

    
    //Debut fonction obtenir liste des TypeBeneficiaire
	$scope.getListeTypeBeneficiaire = function () {

		$scope.ListeTypeBeneficiaire = [];

		$http({ method: 'GET', url: $scope.link +'/convention/api/Controllers/TypeBeneficiaireController.php?Action=All' }).
			success(function (data, status, headers, config) {

				$scope.ListeTypeBeneficiaire = data;

			});
	}
	//Fin fonction obtenir liste des TypeBeneficiaire
    

    //pagination
		$scope.numeroAfficher = 5;
    //fin

});