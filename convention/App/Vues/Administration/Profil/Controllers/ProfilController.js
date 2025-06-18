
	DECAISSEMENT.controller('ProfilController', function($rootScope,$scope,$http,$cookies,$location, $routeParams){

	$scope.Titre = "Gestion des Profils";//Titre du module
	$scope.ListeProfil = []; //Initialisation tableau liste Profil
	$scope.currentUserId = null; // Selected user id on modal


	$scope.InitialiseProfilG = function(){

		$scope.InitialiseProfil();
		$scope.getListeProfil();
		$scope.getListeModule();		
		$scope.getListeDroit();		
	}

	$scope.InitialiseEditionProfil = function(){
		if (!$routeParams.IdProfil) {
			
		} else {
			$scope.getOneUser($routeParams.IdProfil);
		};
		
	}
	$scope.InitialiseEditionModule = function(){
		if (!$routeParams.IdProfil) {
			// alert('pas de contenu');
			$location.path('/Profil');
		} else {
			$scope.getListeModuleDroit($routeParams.IdProfil)
		};
		
	}

		//Fonction qui gere les etapes 
		$scope.VueCreationCompte = "Etape1";

		$scope.EtapeSuivante = function (Etape) {
		
			if (Etape == 1) {
		
				$scope.VueCreationCompte = "Etape1";
		
			} else if (Etape == 2) {
		
				$scope.VueCreationCompte = "Etape2";
			}
		}
	 
	//Declaration de la classe utilisateurModule   
	$scope.ProfilModule = {
		IdProfil: 0,
		IdModule: 0,
	};
	//Fin Declaration de la classe utilisateurModule

	//Declaration de la classe Profil   
		$scope.Profil = {
			IdProfil:0,
			Libelle:"",
			Datecreation:"",
			idusrcreation: $cookies.get('IdUtilisateur'),
		};
	//Fin Declaration de la classe Profil 

	//Initialisation de la classe Profil   
	$scope.InitialiseProfil = function(){

		$scope.Profil = {
			IdProfil:0,
			Libelle:"",
			Datecreation:"",
			idusrcreation: $cookies.get('IdUtilisateur'),
		},
		$scope.ProfilModule = {
			IdProfil: 0,
			IdModule: 0,
			idusrcreation: $cookies.get('IdUtilisateur'),
		};
	}
	//Fin initialisation de la classe Profil   

		
	//Debut fonction valider edition Profil
		$scope.ValiderEditionProfil = function () {
			swal({
				title: "Etes vous sur?",
				text: "Les données seront modifiées",
				icon: "warning",
				buttons: true,
				dangerMode: false,
			})
				.then((willEdit) => {
					if (willEdit) {
						$scope.UpdateProfil();
						$location.path('/Profil');
					}
				});
		}
	//Fin fonction valider edition Profil

	//Debut fonction valider Profil
	$scope.ConfirmerInsertProfilModule = function (IdProfil, IdModule) {
		swal({
			title: "Voulez-vous valider?",
			text: "Les données seront validées",
			icon: "warning",
			buttons: true,
			dangerMode: false,
		})
			.then((willEdit) => {
				if (willEdit) {
					$scope.InsertProfilModule(IdProfil, IdModule);
					$location.path('/Profil');
					$scope.getListeProfil();
				}
			});
	}
	//Debut fonction valider EditionModuleDroit
	$scope.ConfirmerEditionModuleDroit = function () {
		swal({
			title: "Voulez-vous valider?",
			text: "Les données seront validées",
			icon: "warning",
			buttons: true,
			dangerMode: false,
		})
			.then((willEdit) => {
				if (willEdit) {
					$scope.UpdateModuleDroit();
				}
			});
	}

	//Debut fonction valider suppression Profil
	$scope.SuppressionProfil = function(IdProfil){
		
		swal({
			title: "Etes vous sur?",
			text: "Une fois supprimer vous perdez la donnée",
			icon: "warning",
			buttons: true,
			dangerMode: true,
		})
			.then((willDelete) => {
				if (willDelete) {
					$scope.DeleteProfil(IdProfil);
				}
			});
	}
	//Fin fonction valider suppression Profil


	//Debut fonction insert Profil
		$scope.InsertProfil = function () {

			var donnee = $.param($scope.Profil);
			$http({
				method: 'POST',
				url: $scope.link +'/convention/api/Controllers/ProfilController.php?Action=Add',
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
				data: donnee
			}).success(function (data) {

				if (data.Etat == "SUCCES") {
					$scope.getListeProfil();
					$scope.InitialiseProfil();
					$scope.confirmationSwal("Profil ajouter", "success");
				$rootScope.IdUser=data.IdProfil;
				} else {
					//alert(data.Message);
					$scope.confirmationSwal("Echec ajout Profil", "error");
				}
			});
		}
	//Fin fonction insert Profil

	//Debut fonction insert module Profil
		$scope.InsertProfilModule = function () {

			$scope.donnee = {
				Profil: $scope.Profil,
				Modules: $scope.ListeModuleParent,
				SousModules: $scope.ListeSousModule,
				Droits: $scope.ListeDroitSousModule
			}
			var donnee = $.param($scope.donnee);
			$http({
				method: 'POST',
				url: $scope.link +'/convention/api/Controllers/ProfilModuleDroitController.php?Action=Add',
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
				data: donnee
			}).success(function (data) {

				if (data.Etat == "SUCCES") {

					$scope.getListeProfil();
					$scope.InitialiseProfil();
					$scope.confirmationSwal("Profil et module ajoutés", "success");
				} else {
					//alert(data.Message);
					$scope.confirmationSwal("Echec ajout module utilisateur", "error");
				}
			});
		}
	//Fin fonction insert module Profil

	//Debut fonction update Profil
		$scope.UpdateProfil = function () {

			var donnee = $.param($scope.Profil);
			$http({
				method: 'POST',
				url: $scope.link +'/convention/api/Controllers/ProfilController.php?Action=Update&IdProfil=' + $scope.Profil.IdProfil,
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
				data: donnee
			}).success(function (data) {

				if (data.Etat == "SUCCES") {

					$scope.getListeProfil();
					$scope.confirmationSwal("Profil modifier", "success");

				} else {
					$scope.confirmationSwal("Echec modification Profil", "error");
				}
			});
		}
	//Fin fonction update Profil

	//Debut fonction delete Profil
		$scope.DeleteProfil = function (IdProfil) {

			var donnee = $.param($scope.Profil);
			$http({
				method: 'POST',
				url: $scope.link +'/convention/api/Controllers/ProfilController.php?Action=Delete&IdProfil=' + IdProfil,
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
				data: donnee
			}).success(function (data) {

				if (data.Etat == "SUCCES") {

					$scope.getListeProfil();
					$scope.confirmationSwal("Profil supprimer", "success")

				} else {
					$scope.confirmationSwal("Echec suppression Profil", "error");
				}
			});
		}
	//Fin fonction delete Profil

	//Debut fonction obtenir liste des Profils
		$scope.getListeProfil = function () {

			$scope.ListeProfil = [];

			$http({ method: 'GET', url: $scope.link +'/convention/api/Controllers/ProfilController.php?Action=All' }).
				success(function (data, status, headers, config) {

					$scope.ListeProfil = data;

					
				});
		}
	//Fin fonction obtenir liste des Profils

	
	//Debut fonction obtenir liste des modules
		$scope.getListeModule = function () {

			$scope.ListeModule = [];

			$http({ method: 'GET', url: $scope.link +'/convention/api/Controllers/ModuleController.php?Action=All' }).
				success(function (data, status, headers, config) {

					$scope.ListeModule = data;

				});
		}
	//Fin fonction obtenir liste des Modules

	//Debut fonction obtenir un Profil
	$scope.getProfil = function(IdProfil){

		for (var i = 0; i <= $scope.ListeProfil.length - 1; i++) {
				if ($scope.ListeProfil[i].IdProfil == IdProfil) {
					
					$scope.Profil.IdProfil = $scope.ListeProfil[i].IdProfil;
					$scope.Profil.Libelle = $scope.ListeProfil[i].Libelle;
					$scope.Profil.idusrcreation = $scope.ListeProfil[i].idusrcreation;
					break;
				}
			}
	}
	//Fin fonction obtenir un Profil

	//Debut fonction obtenir le nom de utilisateur
	$scope.getOneUser = function (IdUser) {

		$http({ method: 'GET', url: $scope.link +'/convention/api/Controllers/ProfilController.php?Action=One&IdProfil='+IdUser }).
			success(function (data, status, headers, config) {

					$scope.Profil.IdProfil = data.IdProfil;
					$scope.Profil.Libelle = data.Libelle;
					$scope.Profil.idusrcreation = data.idusrcreation;
				
			});
	}
	//Fin fonction obtenir le nom de utilisateur

	//Debut fonction obtenir liste des Modules
	$scope.getListeModule = function () {

		$scope.ListeModule = [];

		$http({ method: 'GET', url: $scope.link +'/convention/api/Controllers/ModuleController.php?Action=All' }).
			success(function (data, status, headers, config) {

				$scope.ListeModule = data;
				$scope.getlisteModuleParent();

			});
	}
	//Fin fonction obtenir liste des Modules

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

	$scope.ListeSousModule = []
	//Debut fonction obtenir un Module
	$scope.getlisteSousModule = function (IdModule) {
		$scope.ListeSousModule[IdModule] = []
		for (var i = 0; i <= $scope.ListeModule.length - 1; i++) {
			if ($scope.ListeModule[i].IdSmo == IdModule) {

				$scope.ListeSousModule[IdModule].push($scope.ListeModule[i]);
			}
		}
	}
	//Fin fonction obtenir un Module

	//Debut fonction obtenir liste des Droits
	$scope.getListeDroit = function () {

		$scope.ListeDroit = [];

		$http({ method: 'GET', url: $scope.link +'/convention/api/Controllers/DroitController.php?Action=All' }).
			success(function (data, status, headers, config) {

				$scope.ListeDroit = data;

			});
	}
	//Fin fonction obtenir liste des Droits

	$scope.ListeDroitSousModule = []
	//Debut fonction obtenir un Module
	$scope.getListeDroitSousModule = function (IdSousModule) {
		$scope.ListeDroitSousModule[IdSousModule] = []

		for (let i = 0; i < $scope.ListeDroit.length; i++) {
			$scope.ListeDroitSousModule[IdSousModule].push({
				Commentaire: $scope.ListeDroit[i].Commentaire,
				IdModule: IdSousModule,
				Datecreation: $scope.ListeDroit[i].Datecreation,
				IdDroit: $scope.ListeDroit[i].IdDroit,
				Libelle: $scope.ListeDroit[i].Libelle,
				etat: false
			})
			
		}
	}
	//Fin fonction obtenir un Module

	//verifi le mot de passe et la confirmation
	$scope.error=false;
	$scope.VerifPass = function (MotDePasse,cf) {
		if (MotDePasse!=cf) {
			$scope.error=true;
		}
		else
		{
			$scope.error=false;
		}
	}

	//Debut fonction obtenir liste des Modules et droits
	$scope.getListeModuleDroit = function (userIdProfil) {

		$scope.currentUserId = userIdProfil;
		$scope.ListeModule = [];
		$scope.ListeDroit = [];
		// var userIdProfil = $cookies.get("IdProfil");

		$http({ method: 'GET', url: $scope.link +'/convention/api/Controllers/ProfilModuleDroitController.php?Action=AllModuleWithSelected&IdProfil='+ userIdProfil}).
			success(function (data, status, headers, config) {

				$scope.ListeModule = data.ListeModule;
				$scope.ListeDroit = data.ListeDroit;
				$scope.getlisteModuleParent();
				$scope.getListeDroitSousModuleWithSelected();

			});
	}
	//Fin fonction obtenir liste des Modules et droits

	$scope.getListeDroitSousModuleWithSelected = function () {
		
		for (let i = 0; i < $scope.ListeModule.length; i++) {

			$scope.ListeDroitSousModule[$scope.ListeModule[i].IdModule] = []
			
			for (let y = 0; y < $scope.ListeDroit.length; y++) {
				if ($scope.ListeModule[i].IdModule == $scope.ListeDroit[y].IdModule) {
					
					$scope.ListeDroitSousModule[$scope.ListeModule[i].IdModule].push($scope.ListeDroit[y])
				}
			}	
		}
	}

	//Debut fonction insert module Profil
		$scope.UpdateModuleDroit = function () {
			var IdUser = $scope.currentUserId
			$scope.donnee = {
				IdUsrCreation: $cookies.get('IdUtilisateur'),
				Modules: $scope.ListeModuleParent,
				SousModules: $scope.ListeSousModule,
				Droits: $scope.ListeDroitSousModule
			}
			var donnee = $.param($scope.donnee);
			$http({
				method: 'POST',
				url: $scope.link +'/convention/api/Controllers/ProfilModuleDroitController.php?Action=UpdateModuleDroit&IdProfil='+IdUser,
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
				data: donnee
			}).success(function (data) {

				if (data.Etat == "SUCCES") {
					$scope.confirmationSwal("Module(s) et droit(s) modifié(s)", "success");
					$('#exampleModal').modal('hide');
				} else {
					//alert(" ajout Profil");
					$scope.confirmationSwal("Echec modification", "error");
				}
			});
		}
	//Fin fonction insert module Profil
	
	//pagination
	$scope.numeroAfficher = 5;
	
//fin

	
});