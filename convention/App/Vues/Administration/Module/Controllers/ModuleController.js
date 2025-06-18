
	DECAISSEMENT.controller('ModuleController', function($rootScope,$scope,$http,$cookies){

        $scope.Titre = "Gestion des Modules";//Titre du module
        $scope.ListeModule = []; //Initialisation tableau liste Module
        
        $scope.InitialiseModuleG = function(){
    
            $scope.InitialiseModule();
            $scope.getListeModule();
            
        }
    
        //Declaration de la classe Module   
            $scope.Module = {
                IdModule:0,
                IdSmo:null,
                Libelle:"",
                Icone:"",
                Lien:"",
                Class:"",
                Idusrcreation: $cookies.get('IdUtilisateur')
            };
        //Fin Declaration de la classe Module 
        
    
        //Initialisation de la classe Module   
        $scope.InitialiseModule = function(){
    
            $scope.Module = {
                IdModule:0,
                IdSmo:null,
                Libelle:"",
                Icone:"",
                Lien:"",
                Class:"",
                Idusrcreation: $cookies.get('IdUtilisateur')
            };
        }
        //Fin initialisation de la classe Module   
    
        //Debut fonction valider edition Module
        $scope.ValiderEditionModule = function()
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
                    if($scope.Module.IdModule === 0) {
                        $scope.InsertModule();
                        $('#exampleModal').modal('hide');
                        $scope.InitialiseModule();
                    
                    } else{
                        $scope.UpdateModule();
                        $('#exampleModal').modal('hide');
                        $scope.InitialiseModule();
                    }
                } 
            }); 
            
           
        }
    
    
        //Debut fonction valider suppression Module
        $scope.SuppressionModule = function (IdModule) {

            swal({
                title: "Etes vous sur?",
                text: "Une fois supprimer vous perdez la donnée",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then((willDelete) => {
                    if (willDelete) {
                        $scope.DeleteModule(IdModule);
                    }
                });
        }
        //Fin fonction valider suppression Module
    
    
    
        //Debut fonction insert Module
        $scope.InsertModule = function () {

            var donnee = $.param($scope.Module);
            $http({
                method: 'POST',
                url: $scope.link +'/convention/api/Controllers/ModuleController.php?Action=Add',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                data: donnee
            }).success(function (data) {

                if (data.Etat == "SUCCES") {

                    $scope.getListeModule();
                    $scope.InitialiseModule();
                    $scope.confirmationSwal("Module enregistré avec succès", "success");

                } else {
                    // alert(data.Message);
                    $scope.confirmationSwal("Echec d'enregistrement", "error");
                }
            });
        }
        //Fin fonction insert Module
    
        //Debut fonction update Module
        $scope.UpdateModule = function () {

            var donnee = $.param($scope.Module);
            $http({
                method: 'POST',
                url: $scope.link +'/convention/api/Controllers/ModuleController.php?Action=Update&IdModule=' + $scope.Module.IdModule,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                data: donnee
            }).success(function (data) {

                if (data.Etat == "SUCCES") {

                    $scope.getListeModule();
                    $scope.confirmationSwal("Module modifié avec succès", "success");

                } else {

                    $scope.confirmationSwal("Echec de modification", "error");
                }
            });
        }
        //Fin fonction update Module
    
        //Debut fonction delete Module
        $scope.DeleteModule = function (IdModule) {

            var donnee = $.param($scope.Module);
            $http({
                method: 'POST',
                url: $scope.link +'/convention/api/Controllers/ModuleController.php?Action=Geler&IdModule=' + IdModule,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                data: donnee
            }).success(function (data) {

                if (data.Etat == "SUCCES") {

                    $scope.getListeModule();
                    $scope.confirmationSwal("Module supprimé avec succès", "success");

                } else {

                    $scope.confirmationSwal("Echec suppression Module", "error");
                }
            });
        }
        //Fin fonction delete Module
    
        //Debut fonction obtenir liste des Modules
        $scope.getListeModule = function () {

            $scope.ListeModule = [];

            $http({ method: 'GET', url: $scope.link +'/convention/api/Controllers/ModuleController.php?Action=All' }).
                success(function (data, status, headers, config) {

                    $scope.ListeModule = data;

                });
        }
        //Fin fonction obtenir liste des Modules
    
        //Debut fonction obtenir un Module
        $scope.getModule = function (IdModule) {
            for (var i = 0; i <= $scope.ListeModule.length - 1; i++) {
                if ($scope.ListeModule[i].IdModule == IdModule) {

                    $scope.Module.IdModule = $scope.ListeModule[i].IdModule;
                    $scope.Module.IdSmo = $scope.ListeModule[i].IdSmo;
                    $scope.Module.Libelle = $scope.ListeModule[i].Libelle;
                    $scope.Module.Class = $scope.ListeModule[i].Class;
                    $scope.Module.Lien = $scope.ListeModule[i].Lien;
                    $scope.Module.Icone = $scope.ListeModule[i].Icone;
                    $scope.Module.Datecreation = $scope.ListeModule[i].Datecreation;
                    $scope.Module.idusrcreation = $scope.ListeModule[i].Idusrcreation;
                    break;
                }
            }
        }
        //Fin fonction obtenir un Module

        //Debut fonction obtenir un Module
        $scope.getlisteModuleParent = function () {
            $scope.ListeModuleParent = []
            for (var i = 0; i <= $scope.ListeModule.length - 1; i++) {
                if ($scope.ListeModule[i].IdSmo == "") {

                    $scope.ListeModuleParent.push($scope.ListeModule[i]);
                }
            }
        }
        //Fin fonction obtenir un Module
        
    //pagination
	$scope.numeroAfficher = 5;
	
//fin

    

});