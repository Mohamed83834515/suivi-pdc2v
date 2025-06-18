
	DECAISSEMENT.controller('DroitController', function($rootScope,$scope,$http,$cookies){

        $scope.Titre = "Gestion des Droits";//Titre du module
        $scope.ListeDroit = []; //Initialisation tableau liste Droit
        
        $scope.InitialiseDroitG = function(){
    
            $scope.InitialiseDroit();
            $scope.getListeDroit();
            
        }
    
        //Declaration de la classe Droit   
            $scope.Droit = {
                IdDroit:0,
                Libelle:"",
                Datecreation:"",
                idusrcreation: $cookies.get('IdUtilisateur')
            };
        //Fin Declaration de la classe Droit 
        
    
        //Initialisation de la classe Droit   
        $scope.InitialiseDroit = function(){
    
            $scope.Droit = {
                IdDroit:0,
                Libelle:"",
                Datecreation:"",
                idusrcreation: $cookies.get('IdUtilisateur')
            };
        }
        //Fin initialisation de la classe Droit   
    
        //Debut fonction valider edition Droit
        $scope.ValiderEditionDroit = function()
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
                    if($scope.Droit.IdDroit === 0) {
                        $scope.InsertDroit();
                        $('#exampleModal').modal('hide');
                        $scope.InitialiseDroit();
                    
                    } else{
                        $scope.UpdateDroit();
                        $('#exampleModal').modal('hide');
                        $scope.InitialiseDroit();
                    }
                } 
            });    
        }
    
    
        //Debut fonction valider suppression Droit
        $scope.SuppressionDroit = function (IdDroit) {

            swal({
                title: "Etes vous sur?",
                text: "Une fois supprimer vous perdez la donnée",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then((willDelete) => {
                    if (willDelete) {
                        $scope.DeleteDroit(IdDroit);
                    }
                });
        }
        //Fin fonction valider suppression Droit
    
    
    
        //Debut fonction insert Droit
        $scope.InsertDroit = function () {

            var donnee = $.param($scope.Droit);
            $http({
                method: 'POST',
                url: $scope.link +'/convention/api/Controllers/DroitController.php?Action=Add',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                data: donnee
            }).success(function (data) {

                if (data.Etat == "SUCCES") {

                    $scope.getListeDroit();
                    $scope.InitialiseDroit();
                    $scope.confirmationSwal("Droit enregistré avec succès", "success");

                } else {
                    // alert(data.Message);
                    $scope.confirmationSwal("Echec d'enregistrement", "error");
                }
            });
        }
        //Fin fonction insert Droit
    
        //Debut fonction update Droit
        $scope.UpdateDroit = function () {

            var donnee = $.param($scope.Droit);
            $http({
                method: 'POST',
                url: $scope.link +'/convention/api/Controllers/DroitController.php?Action=Update&IdDroit=' + $scope.Droit.IdDroit,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                data: donnee
            }).success(function (data) {

                if (data.Etat == "SUCCES") {

                    $scope.getListeDroit();
                    $scope.confirmationSwal("Droit modifié avec succès", "success");

                } else {

                    $scope.confirmationSwal("Echec de modification", "error");
                }
            });
        }
        //Fin fonction update Droit
    
        //Debut fonction delete Droit
        $scope.DeleteDroit = function (IdDroit) {

            var donnee = $.param($scope.Droit);
            $http({
                method: 'POST',
                url: $scope.link +'/convention/api/Controllers/DroitController.php?Action=Geler&IdDroit=' + IdDroit,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                data: donnee
            }).success(function (data) {

                if (data.Etat == "SUCCES") {

                    $scope.getListeDroit();
                    $scope.confirmationSwal("Droit supprimé avec succès", "success");

                } else {

                    $scope.confirmationSwal("Echec suppression Droit", "error");
                }
            });
        }
        //Fin fonction delete Droit
    
        //Debut fonction obtenir liste des Droits
        $scope.getListeDroit = function () {

            $scope.ListeDroit = [];

            $http({ method: 'GET', url: $scope.link +'/convention/api/Controllers/DroitController.php?Action=All' }).
                success(function (data, status, headers, config) {

                    $scope.ListeDroit = data;

                });
        }
        //Fin fonction obtenir liste des Droits
    
        //Debut fonction obtenir un Droit
        $scope.getDroit = function (IdDroit) {
            for (var i = 0; i <= $scope.ListeDroit.length - 1; i++) {
                if ($scope.ListeDroit[i].IdDroit == IdDroit) {

                    $scope.Droit.IdDroit = $scope.ListeDroit[i].IdDroit;
                    $scope.Droit.Libelle = $scope.ListeDroit[i].Libelle;
                    $scope.Droit.Datecreation = $scope.ListeDroit[i].Datecreation;
                    $scope.Droit.idusrcreation = $scope.ListeDroit[i].idusrcreation;
                    break;
                }
            }
        }
        //Fin fonction obtenir un Droit
        

        //pagination
	$scope.numeroAfficher = 5;
	
//fin

    

});