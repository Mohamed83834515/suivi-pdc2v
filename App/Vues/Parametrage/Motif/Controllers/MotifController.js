
	DECAISSEMENT.controller('MotifController', function($rootScope,$scope,$http,$cookies){

        $scope.Titre = "Gestion des Motifs";//Titre du module
        $scope.ListeMotif = []; //Initialisation tableau liste Motif
        
        $scope.InitialiseMotifG = function(){
    
            $scope.InitialiseMotif();
            $scope.getListeMotif();
            
        }
    
        //Declaration de la classe Motif   
            $scope.Motif = {
                IdMotif:0,
                Libelle:"",
                Datecreation:"",
                idusrcreation: $cookies.get('IdUtilisateur')
            };
        //Fin Declaration de la classe Motif 
        
    
        //Initialisation de la classe Motif   
        $scope.InitialiseMotif = function(){
    
            $scope.Motif = {
                IdMotif:0,
                Libelle:"",
                Datecreation:"",
                idusrcreation: $cookies.get('IdUtilisateur')
            };
        }
        //Fin initialisation de la classe Motif   
    
        //Debut fonction valider edition Motif
        $scope.ValiderEditionMotif = function()
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
                    if($scope.Motif.IdMotif === 0) {
                        $scope.InsertMotif();
                        $('#exampleModal').modal('hide');
                        $scope.InitialiseMotif();
                    
                    } else{
                        $scope.UpdateMotif();
                        $('#exampleModal').modal('hide');
                        $scope.InitialiseMotif();
                    }
                } 
            }); 
            
           
        }
    
    
        //Debut fonction valider suppression Motif
        $scope.SuppressionMotif = function (IdMotif) {

            swal({
                title: "Etes vous sur?",
                text: "Une fois supprimer vous perdez la donnée",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then((willDelete) => {
                    if (willDelete) {
                        $scope.DeleteMotif(IdMotif);
                    }
                });
        }
        //Fin fonction valider suppression Motif
    
    
    
        //Debut fonction insert Motif
        $scope.InsertMotif = function () {

            var donnee = $.param($scope.Motif);
            $http({
                method: 'POST',
                url: $scope.link +'/Api/Controllers/MotifController.php?Action=Add',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                data: donnee
            }).success(function (data) {

                if (data.Etat == "SUCCES") {

                    $scope.getListeMotif();
                    $scope.InitialiseMotif();
                    $scope.confirmationSwal("Motif enregistré avec succès", "success");

                } else {
                    // alert(data.Message);
                    $scope.confirmationSwal("Echec d'enregistrement", "error");
                }
            });
        }
        //Fin fonction insert Motif
    
        //Debut fonction update Motif
        $scope.UpdateMotif = function () {

            var donnee = $.param($scope.Motif);
            $http({
                method: 'POST',
                url: $scope.link +'/Api/Controllers/MotifController.php?Action=Update&IdMotif=' + $scope.Motif.IdMotif,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                data: donnee
            }).success(function (data) {

                if (data.Etat == "SUCCES") {

                    $scope.getListeMotif();
                    $scope.confirmationSwal("Motif modifié avec succès", "success");

                } else {

                    $scope.confirmationSwal("Echec de modification", "error");
                }
            });
        }
        //Fin fonction update Motif
    
        //Debut fonction delete Motif
        $scope.DeleteMotif = function (IdMotif) {

            var donnee = $.param($scope.Motif);
            $http({
                method: 'POST',
                url: $scope.link +'/Api/Controllers/MotifController.php?Action=Geler&IdMotif=' + IdMotif,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                data: donnee
            }).success(function (data) {

                if (data.Etat == "SUCCES") {

                    $scope.getListeMotif();
                    $scope.confirmationSwal("Motif supprimé avec succès", "success");

                } else {

                    $scope.confirmationSwal("Echec suppression Motif", "error");
                }
            });
        }
        //Fin fonction delete Motif
    
        //Debut fonction obtenir liste des Motifs
        $scope.getListeMotif = function () {

            $scope.ListeMotif = [];

            $http({ method: 'GET', url: $scope.link +'/Api/Controllers/MotifController.php?Action=All' }).
                success(function (data, status, headers, config) {

                    $scope.ListeMotif = data;

                });
        }
        //Fin fonction obtenir liste des Motifs
    
        //Debut fonction obtenir un Motif
        $scope.getMotif = function (IdMotif) {
            console.log(IdMotif)
            for (var i = 0; i <= $scope.ListeMotif.length - 1; i++) {
                if ($scope.ListeMotif[i].IdMotif == IdMotif) {

                    $scope.Motif.IdMotif = $scope.ListeMotif[i].IdMotif;
                    $scope.Motif.Libelle = $scope.ListeMotif[i].Libelle;
                    $scope.Motif.Datecreation = $scope.ListeMotif[i].Datecreation;
                    $scope.Motif.idusrcreation = $scope.ListeMotif[i].idusrcreation;
                    break;
                }
            }
        }
        //Fin fonction obtenir un Motif
        
    //pagination
		$scope.numeroAfficher = 5;
    
    //fin
    

});