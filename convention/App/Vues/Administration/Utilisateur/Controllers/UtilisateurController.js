
	DECAISSEMENT.controller('UtilisateurController', function($rootScope,$scope,$http,$cookies,$location, $routeParams){

	$scope.Titre = "Gestion des Utilisateurs";//Titre du module
	$scope.ListeUtilisateur = []; //Initialisation tableau liste Utilisateur
	$scope.currentUserId = null; // Selected user id on modal

    if ($rootScope.pagination) {
        $rootScope.pagination = $cookies.get("current"),
        console.log($rootScope.pagination,'initRootScope');
    } else {
        
        $cookies.put('current', 1);
        console.log($rootScope.pagination,'init');
    }

	$scope.InitialiseUtilisateurG = function(){

		$scope.InitialiseUtilisateur();
		$scope.getListeUtilisateur();
		$scope.getListeModule();		
		$scope.getListeDroit();		
		$scope.getListeProfil();		
	}

	$scope.InitialiseEditionUtilisateur = function(){
		if (!$routeParams.IdUtilisateur) {
			
		} else {
			$scope.getOneUser($routeParams.IdUtilisateur);
			$scope.getListeProfil();
		};
		
	}
	$scope.InitialiseEditionModule = function(){
		if (!$routeParams.IdUtilisateur) {
			// alert('pas de contenu');
			$location.path('/Utilisateur');
		} else {
			$scope.getListeModuleDroit($routeParams.IdUtilisateur)
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
	$scope.UtilisateurModule = {
		IdUtilisateur: 0,
		IdModule: 0,
	};
	//Fin Declaration de la classe utilisateurModule

	//Declaration de la classe Utilisateur   
		$scope.Utilisateur = {
			IdUtilisateur:0,
			IdProfil:0,
			Nom:"",
			Prenom:"",
			Pseudo:"",
			Email:"",
			Empty2:"",
			MotDePasse:"",
			Datecreation:"",
			IdUtilisateurCreation: $cookies.get('IdUtilisateur'),
		};
	//Fin Declaration de la classe Utilisateur 

	//Initialisation de la classe Utilisateur   
	$scope.InitialiseUtilisateur = function(){

		$scope.Utilisateur = {
			IdUtilisateur:0,
			IdProfil:0,
			Nom:"",
			Prenom:"",
			Pseudo:"",
			Email:"",
			Empty2:"",
			MotDePasse:"",
			Datecreation:"",
			IdUtilisateurCreation: $cookies.get('IdUtilisateur'),
		},
		$scope.UtilisateurModule = {
			IdUtilisateur: 0,
			IdModule: 0,
			IdUtilisateurCreation: $cookies.get('IdUtilisateur'),
		};
	}
	//Fin initialisation de la classe Utilisateur   

		
	//Debut fonction valider edition Utilisateur
		$scope.ValiderEditionUtilisateur = function () {
			swal({
				title: "Etes vous sur?",
				text: "Les données seront modifiées",
				icon: "warning",
				buttons: true,
				dangerMode: false,
			})
				.then((willEdit) => {
					if (willEdit) {
						$scope.UpdateUtilisateur();
						$location.path('/Utilisateur');
					}
				});
		}
	//Fin fonction valider edition Utilisateur

	//Debut fonction valider Utilisateur
	$scope.ConfirmerInsertUtilisateurModule = function (IdUtilisateur, IdModule) {
		swal({
			title: "Voulez-vous valider?",
			text: "Les données seront validées",
			icon: "warning",
			buttons: true,
			dangerMode: false,
		})
			.then((willEdit) => {
				if (willEdit) {
					$scope.InsertUtilisateurModule(IdUtilisateur, IdModule);
					$location.path('/Utilisateur');
					$scope.getListeUtilisateur();
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

	//Debut fonction valider suppression Utilisateur
	$scope.SuppressionUtilisateur = function(IdUtilisateur){
		
		swal({
			title: "Etes vous sur?",
			text: "Une fois supprimer vous perdez la donnée",
			icon: "warning",
			buttons: true,
			dangerMode: true,
		})
			.then((willDelete) => {
				if (willDelete) {
					$scope.DeleteUtilisateur(IdUtilisateur);
				}
			});
	}
	//Fin fonction valider suppression Utilisateur


	//Debut fonction insert Utilisateur
		$scope.InsertUtilisateur = function () {

			var donnee = $.param($scope.Utilisateur);
			$http({
				method: 'POST',
				url: $scope.link +'/convention/api/Controllers/UtilisateurController.php?Action=Add',
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
				data: donnee
			}).success(function (data) {

				if (data.Etat == "SUCCES") {
					$scope.getListeUtilisateur();
					$scope.InitialiseUtilisateur();
					$scope.confirmationSwal("Utilisateur ajouter", "success");
				$rootScope.IdUser=data.IdUtilisateur;
				} else {
					//alert(data.Message);
					$scope.confirmationSwal("Echec ajout Utilisateur", "error");
				}
			});
		}
	//Fin fonction insert Utilisateur

	//Debut fonction insert module Utilisateur
		$scope.InsertUtilisateurModule = function () {

			$scope.donnee = {
				Utilisateur: $scope.Utilisateur,
				Modules: $scope.ListeModuleParent,
				SousModules: $scope.ListeSousModule,
				Droits: $scope.ListeDroitSousModule
			}
			var donnee = $.param($scope.Utilisateur);
			$http({
				method: 'POST',
				url: $scope.link +'/convention/api/Controllers/UtilisateurController.php?Action=Add',
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
				data: donnee
			}).success(function (data) {

				if (data.Etat == "SUCCES") {

					$scope.getListeUtilisateur();
					$scope.InitialiseUtilisateur();
					$scope.confirmationSwal("Utilisateur ajouté", "success");
				} else {
					//alert(data.Message);
					$scope.confirmationSwal("Echec ajout utilisateur", "error");
				}
			});
		}
	//Fin fonction insert module Utilisateur

	//Debut fonction update Utilisateur
		$scope.UpdateUtilisateur = function () {

			var donnee = $.param($scope.Utilisateur);
			$http({
				method: 'POST',
				url: $scope.link +'/convention/api/Controllers/UtilisateurController.php?Action=Update&IdUtilisateur=' + $scope.Utilisateur.IdUtilisateur,
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
				data: donnee
			}).success(function (data) {

				if (data.Etat == "SUCCES") {

					$scope.getListeUtilisateur();
					$scope.confirmationSwal("Utilisateur modifier", "success");

				} else {
					$scope.confirmationSwal("Echec modification Utilisateur", "error");
				}
			});
		}
	//Fin fonction update Utilisateur

	//Debut fonction delete Utilisateur
		$scope.DeleteUtilisateur = function (IdUtilisateur) {

			var donnee = $.param($scope.Utilisateur);
			$http({
				method: 'POST',
				url: $scope.link +'/convention/api/Controllers/UtilisateurController.php?Action=Delete&IdUtilisateur=' + IdUtilisateur,
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
				data: donnee
			}).success(function (data) {

				if (data.Etat == "SUCCES") {

					$scope.getListeUtilisateur();
					$scope.confirmationSwal("Utilisateur supprimer", "success")

				} else {
					$scope.confirmationSwal("Echec suppression Utilisateur", "error");
				}
			});
		}
	//Fin fonction delete Utilisateur

	//Debut fonction obtenir liste des Utilisateurs
		$scope.getListeUtilisateur = function () {
      $scope.ListeUtilisateur = [];

      $http({
        method: "GET",
        url:
          $scope.link + "/Api/Controllers/UtilisateurController.php?Action=All",
      }).success(function (data, status, headers, config) {
        $scope.ListeUtilisateur = data;

        /* debu fonction pour conserver la pagination*/
        $scope.pageChangeHandler = function (num) {
          console.log("meals page changed to " + num);
          $cookies.put("current", num);
          $rootScope.pagination = $cookies.get("current");
          console.log($cookies.get("current"), "fonc");
        };

        $rootScope.pagination = $cookies.get("current");
        /**fin */

        console.log($cookies.get("current"), "cok");
        console.log($rootScope.pagination, "quiiiiiii");
      });
    };
	//Fin fonction obtenir liste des Utilisateurs

	
	//Debut fonction obtenir liste des modules
		$scope.getListeModule = function () {

			$scope.ListeModule = [];

			$http({ method: 'GET', url: $scope.link +'/convention/api/Controllers/ModuleController.php?Action=All' }).
				success(function (data, status, headers, config) {

					$scope.ListeModule = data;

				});
		}
	//Fin fonction obtenir liste des Modules
	
	$scope.ListeProfil = [];
	//Debut fonction obtenir liste des profils
		$scope.getListeProfil = function () {

			$scope.ListeProfil = [];

			$http({ method: 'GET', url: FFFF00 +'/convention/api/Controllers/ProfilController.php?Action=All' }).
				success(function (data, status, headers, config) {

					$scope.ListeProfil = data;

				});
		}
	//Fin fonction obtenir liste des Modules

	//Debut fonction obtenir un Utilisateur
	$scope.getUtilisateur = function(IdUtilisateur){

		for (var i = 0; i <= $scope.ListeUtilisateur.length - 1; i++) {
				if ($scope.ListeUtilisateur[i].IdUtilisateur == IdUtilisateur) {
					
					$scope.Utilisateur.IdUtilisateur = $scope.ListeUtilisateur[i].IdUtilisateur;
					$scope.Utilisateur.IdProfil = $scope.ListeUtilisateur[i].IdProfil;
					$scope.Utilisateur.Nom = $scope.ListeUtilisateur[i].Nom;
					$scope.Utilisateur.Prenom = $scope.ListeUtilisateur[i].Prenom;
					$scope.Utilisateur.Pseudo = $scope.ListeUtilisateur[i].Pseudo;
					$scope.Utilisateur.Email = $scope.ListeUtilisateur[i].Email;
					$scope.Utilisateur.Empty2 = $scope.ListeUtilisateur[i].Empty2;
					$scope.Utilisateur.MotDePasse = $scope.ListeUtilisateur[i].MotDePasse;
					$scope.Utilisateur.IdUtilisateurCreation = $scope.ListeUtilisateur[i].IdUtilisateurCreation;
					break;
				}
			}
	}
	//Fin fonction obtenir un Utilisateur

	//Debut fonction obtenir le nom du profil
	$scope.getLibelleProfil = function(IdProfil){

		for (var i = 0; i <= $scope.ListeProfil.length - 1; i++) {
			if ($scope.ListeProfil[i].IdProfil == IdProfil) {
				return $scope.ListeProfil[i].Libelle;
			}
		}

		return null;
	}
	//Fin fonction obtenir le nom du profil

	//Debut fonction obtenir le nom de utilisateur
	$scope.getOneUser = function (IdUser) {

		$http({ method: 'GET', url: $scope.link +'/convention/api/Controllers/UtilisateurController.php?Action=One&IdUtilisateur='+IdUser }).
			success(function (data, status, headers, config) {

				$scope.Utilisateur.IdUtilisateur = data.IdUtilisateur;
				$scope.Utilisateur.IdProfil = data.IdProfil;
					$scope.Utilisateur.Nom = data.Nom;
					$scope.Utilisateur.Prenom = data.Prenom;
					$scope.Utilisateur.Pseudo = data.Pseudo;
					$scope.Utilisateur.Email = data.Email;
					$scope.Utilisateur.Empty2 = data.Empty2;
					$scope.Utilisateur.IdUtilisateurCreation = data.IdUtilisateurCreation;
				
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
	$scope.getListeModuleDroit = function (IdUser) {

		$scope.currentUserId = IdUser;
		$scope.ListeModule = [];
		$scope.ListeDroit = [];

		$http({ method: 'GET', url: $scope.link +'/convention/api/Controllers/UtilisateurModuleDroitController.php?Action=AllModuleWithSelected&IdUtilisateur='+ IdUser}).
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

	//Debut fonction insert module Utilisateur
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
				url: $scope.link +'/convention/api/Controllers/UtilisateurModuleDroitController.php?Action=UpdateModuleDroit&IdUtilisateur='+IdUser,
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
				data: donnee
			}).success(function (data) {

				if (data.Etat == "SUCCES") {
					$scope.confirmationSwal("Module(s) et droit(s) modifié(s)", "success");
					$('#exampleModal').modal('hide');
				} else {
					//alert(" ajout Utilisateur");
					$scope.confirmationSwal("Echec modification", "error");
				}
			});
		}
	//Fin fonction insert module Utilisateur
	
	//pagination
	$scope.numeroAfficher = 5;
	
//fin

	
});