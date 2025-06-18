
DECAISSEMENT.controller('DecaissementController', function ($rootScope,$scope, $http, $cookies, $location, $routeParams) {

	$scope.Titre = "Gestion des Decaissements";//Titre du module
	$scope.ListeDecaissement = []; //Initialisation tableau liste Decaissement
	$scope.numeroAfficher = 5; 
	$scope.myVar = false; //statut champ commentaire
	$scope.currentPath = $location.path(); // page actuelle
	$scope.QueryParams = null; // Page vers laquelle rediriger avec le bouton retour.
    $scope.photo ="logo-oec.png";
    $scope.numero=""
    // console.log($scope.photo,'init photo');

    // if ($rootScope.pagination) {
    //     $rootScope.pagination = $cookies.get("current");
    //     // console.log($rootScope.pagination,'initRootScope');
    // } else {
        
    //     $cookies.put('current', 1);
    //     // console.log($rootScope.pagination,'init');
    // }

    
	$scope.InitialiseDecaissementG = function (IdStatut) {
        $scope.QueryParams = $location.search();

        $scope.QueryParams.page ? $rootScope.pagination = $scope.QueryParams.page : $rootScope.pagination = $cookies.get("current");
        $scope.QueryParams.recherche ? $scope.numero = $scope.QueryParams.recherche : $scope.numero = "";

        $scope.InitialiseDecaissement();
		$scope.getListeDecaissement(IdStatut);
		$scope.getListeMotif();
		$scope.getListeBeneficiaire();
		$scope.getListeTypePiece();
		$scope.getListeStatut();
		$scope.getUser(); //la fonction pour recuperer tous les utilisateur
        $scope.photoDec =false
	}

	$scope.InitialiseDetail = function () {
		if (!$routeParams.IdDecaissement) {
			alert('pas de contenu');
			$location.path('/Decaissement');
		} else {
			$scope.QueryParams = $location.search();

			$scope.getOneDecaissement($routeParams.IdDecaissement);
		};
		$scope.getListeMotif();
		$scope.getListeBeneficiaire();
		$scope.getListeTypePiece();
		$scope.myVar = false;
	}


	$scope.InitialiseEditionDecaissementG = function () {

		if (!$routeParams.IdDecaissement) {
			$scope.InitialiseDecaissement();
		} else {
			$scope.getOneDecaissement($routeParams.IdDecaissement);
		}
		$scope.getListeMotif();
		$scope.getListeTypePiece();
		$scope.getListeBeneficiaire();
		$
	}

	//Declaration de la classe statut   
	$scope.Statut = {
		IdTypeStatut: 0,
		IdDecaissement: 0,
	};
	//Fin Declaration de la classe Decaissement

	//Declaration de la classe Decaissement   
	$scope.Decaissement = {
		IdDecaissement: 0,
		IdMtf: "",
		IdBnf:"",
		Montant: "",
		Commentaire: "",
		DateRealisation: new Date(),
		CommentaireStatut:"",
		Empty1:"",
		Datecreation: "",
		NumeroDecaissement: "",
		Idusrcreation: "",
		IdusrcreationStatut: "",
        ListePhoto: []
	};
	//Fin Declaration de la classe Decaissement 

	// Initialisattion de la classe Statut
	$scope.InitialiseStatutDecaissement = function () {

		$scope.Statut = {
			IdTypeStatut: 0,
			IdDecaissement: 0,
			Empty1: "",
			Empty2: "",
			Empty3: "",
			Empty4: "",
			Empty5: "",
			Empty6: "",
			Empty7: "",
			IdUtilisateurCreation: $cookies.get('IdUtilisateur'),
		};
	}
	// Fin initialisation


	//Initialisation de la classe Decaissement   
	$scope.InitialiseDecaissement = function () {

        blah.src = "../img/logo-oec.png"

		$scope.Decaissement = {
			IdDecaissement: 0,
			IdMtf: "",
			IdBnf:"",
			Montant: "",
			Commentaire: "",
			DateRealisation: new Date(),
			CommentaireStatut:"",
			Empty1:"",
			Datecreation: "",
			NumeroDecaissement: "",
			Idusrcreation: $cookies.get('IdUtilisateur'),
			IdusrcreationStatut:"" ,
            ListePhoto: []

		};
		$scope.Statut = {
			IdTypeStatut: 0,
			IdDecaissement: 0,
			Empty1: "",
			Empty2: "",
			Empty3: "",
			Empty4: "",
			Empty5: "",
			Empty6: "",
			Empty7: "",
			IdUtilisateurCreation: $cookies.get('IdUtilisateur'),
		};
	}
	//Fin initialisation de la classe Decaissement   

	//Debut fonction valider edition Decaissement
	$scope.ValiderEditionDecaissement = function () {

		swal({
			title: "Etes vous sur?",
			text: "Les données seront enregistrées",
			icon: "warning",
			buttons: true,
			dangerMode: false,
		})
			.then((willEdit) => {
				if (willEdit) {
					if ($scope.Decaissement.IdDecaissement === 0) {
						$scope.InsertDecaissement();
						$('#exampleModal').modal('hide');
						$scope.InitialiseDecaissement();
						
				
					} else {
						$scope.UpdateDecaissement();
						$('#exampleModal').modal('hide');
						$scope.InitialiseDecaissement();

					}
				}
			});
	}
	//Fin fonction valider edition Decaissement

	//Debut fonction valider suppression Decaissement
	$scope.SuppressionDecaissement = function (IdDecaissement) {

		swal({
			title: "Etes vous sur?",
			text: "Une fois supprimer vous perdez la donnée",
			icon: "warning",
			buttons: true,
			dangerMode: true,
		})
			.then((willDelete) => {
				if (willDelete) {
					$scope.DeleteDecaissement(IdDecaissement);
				}
			});
	}
	//Fin fonction valider suppression Decaissement

	//Debut fonction Publier Decaissement
	$scope.ValidePublierDecaissement = function (IdDecaissement,Montant,NumeroDecaissement,DateRealisation,Commentaire, idtys_sta) {

		swal({
			title: "Voulez-vous publier?",
			text: "Les données seront publiées",
			icon: "warning",
			buttons: true,
			dangerMode: false,
		})
			.then((willEdit) => {
				if (willEdit) {
					if ($scope.Decaissement.IdDecaissement === 0) {
						$scope.PublierDecaissement(IdDecaissement,Montant,NumeroDecaissement,DateRealisation,Commentaire, idtys_sta);

					}
				}
			});

	}
	//Fin fonction Publier Decaissement

	//Debut fonction valider Decaissement
	$scope.ConfirmerValiderDecaissement = function (IdDecaissement,Idusrcreation,NumeroDecaissement, idtys_sta) {
		swal({
			title: "Voulez-vous valider?",
			text: "Les données seront validées",
			icon: "warning",
			buttons: true,
			dangerMode: false,
		})
			.then((willEdit) => {
				if (willEdit) {
					//on retourne : id du decaissement, id de l'utilisateur qui la creer et le numero du decaissement
					$scope.ValiderDecaissement(IdDecaissement,Idusrcreation,NumeroDecaissement, idtys_sta);
					$scope.getListeDecaissement(2);
				}
			});
	}
	//Debut fonction Rejeter Decaissement
	$scope.ValiderRejeterDecaissement = function (IdDecaissement, idtys_sta) {
		swal({
			title: "Voulez-vous rejeter?",
			text: "Les données seront rejetées",
			icon: "warning",
			buttons: true,
			dangerMode: false,
		})
			.then((willEdit) => {
				if (willEdit) {

					$scope.RejeterDecaissement(IdDecaissement, idtys_sta);
				}
			});
	}
	//Fin fonction Rejeter Decaissement

	//Debut fonction Relance Decaissement
	$scope.RelanceDecaissement = function () {

		$scope.Decaissement.ListePhoto = $scope.ListePhoto;

		// ici on retoure l'email de l'utilisateur rejeteur
		for (var i = 0; i <= $rootScope.ListeUser.length - 1; i++) {
			if ($rootScope.ListeUser[i].IdUtilisateur == $rootScope.id) {

				$rootScope.EmailRejeteur = $rootScope.ListeUser[i].Email;
			}
		}
		// console.log('retour email',$rootScope.EmailRejeteur);

		$scope.Decaissement.Empty1=$rootScope.Utilisateur.Email // on retourne l'email de l'user qui veut relancé le decaissement
		$scope.Decaissement.Empty2 = $rootScope.EmailRejeteur //on retourne l'email du rejeteur a empty2
		$scope.Decaissement.Empty3 = $rootScope.Utilisateur.Nom+' '+$rootScope.Utilisateur.Prenom //on retourne le nom et prenom de l'user relanceur
		// console.log('nom retour',$scope.Decaissement.Empty3+' '+$scope.Decaissement.Empty2);

		var donnee = $.param($scope.Decaissement);
		$http({
			method: 'POST',
			url: $scope.link +'/Api/Controllers/DecaissementStatutController.php?Action=RelanceWeb&IdDecaissement=' + $scope.Decaissement.IdDecaissement,
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			data: donnee
		}).success(function (data) {

			if (data.Etat == "SUCCES") {

				$scope.getListeDecaissement(4);
				$scope.confirmationSwal("Décaissement relancé avec succès", "success");
				$('#exampleModal').modal('hide');
				$location.path('/Decaissement-refuser');

			} else {

				$scope.confirmationSwal("Échec modification", "error");
			}
		});
	}
	//Fin fonction Relance Decaissement

//Debut fonction valider relance Decaissement
	$scope.ValiderRelanceDecaissement = function (IdDecaissement) {

		swal({
			title: "Etes vous sur?",
			text: "Les données seront enregistrées",
			icon: "warning",
			buttons: true,
			dangerMode: true,
		})
			.then((willDelete) => {
				if (willDelete) {
					$scope.RelanceDecaissement(IdDecaissement);
				}
			});
	}
	//Fin fonction valider relance Decaissement
    $scope.ListePhoto = [];
    $scope.getBase64 = function(file) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = error => reject(error);
        });
      }

      decimage.onchange = evt => {
        const [file] = decimage.files
        if (file) {
          blah.src = URL.createObjectURL(file)
          $scope.ListePhoto = [];
        }
      }

    $scope.upload = function(){

        var fichierSelectionnes = document.getElementById('decimage').files;
        // console.log(fichierSelectionnes);
       
        for (let i = 0; i < fichierSelectionnes.length; i++) {
            const element = fichierSelectionnes[i];
            $scope.getBase64(element).then(
                data => {
                    // console.log(data);
                    $scope.ListePhoto.push(data);
                }
              );
            }
            console.log($scope.ListePhoto);

    }

	//Debut fonction insert Decaissement
	$scope.InsertDecaissement = function () {

        // $scope.upload();

		$scope.Decaissement.ListePhoto = $scope.ListePhoto;
        
		var donnee = $.param($scope.Decaissement);
		$http({
			method: 'POST',
			url: $scope.link +'/Api/Controllers/DecaissementStatutController.php?Action=AddWeb',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			data: donnee
		}).success(function (data) {

			if (data.Etat == "SUCCES") {

				$scope.getListeDecaissement(1);
				$scope.InitialiseDecaissement();
				$scope.confirmationSwal("Décaissement enregistré avec succès", "success");
				$location.path('/Decaissement');
			} else {
				// alert(data.Message);
				$scope.confirmationSwal("Échec d'enregistrement", "error");
			}
		});
	}
	//Fin fonction insert Decaissement

	//Debut fonction update Decaissement
	$scope.UpdateDecaissement = function () {

		$scope.Decaissement.ListePhoto = $scope.ListePhoto;

		var donnee = $.param($scope.Decaissement);
		$http({
			method: 'POST',
			url: $scope.link +'/Api/Controllers/DecaissementController.php?Action=Update&IdDecaissement=' + $scope.Decaissement.IdDecaissement, 
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			data: donnee
		}).success(function (data) {

			if (data.Etat == "SUCCES") {
				$scope.getListeDecaissement(1);
				$scope.confirmationSwal("Décaissement modifié avec succès", "success");
				$location.path('/Decaissement');

			} else {

				$scope.confirmationSwal("Échec modification", "error");
			}
		});
	}
	//Fin fonction update Decaissement

	//Debut fonction delete Decaissement
	$scope.DeleteDecaissement = function (IdDecaissement) {

		var donnee = $.param($scope.Decaissement);
		$http({
			method: 'POST',
			url: $scope.link +'/Api/Controllers/DecaissementController.php?Action=Geler&IdDecaissement=' + IdDecaissement,
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			data: donnee
		}).success(function (data) {

			if (data.Etat == "SUCCES") {

				$scope.getListeDecaissement(1);
				$scope.confirmationSwal("Décaissement supprimé avec succès", "success");

			} else {

				$scope.confirmationSwal("Échec de suppresion décaissement", "error");
			}
		});
	}
	//Fin fonction delete Decaissement

	//Debut fonction Publier Decaissement
	$scope.PublierDecaissement = function (IdDecaissement,Montant,NumeroDecaissement,DateRealisation,Commentaire) {

		$scope.Statut.IdTypeStatut = 2
		$scope.Statut.IdDecaissement = IdDecaissement
		$scope.Statut.Empty1 = $rootScope.Utilisateur.Email // on returne l'email de l'utilisateur connecte
		$scope.Statut.Empty2 = Montant // on retourne le montant du decaissement
		$scope.Statut.Empty3 = NumeroDecaissement // on donne le numero du decaissement a empty3
		$scope.Statut.Empty4 = DateRealisation // on donne la date du decaissement a empty4
		$scope.Statut.Empty5 = Commentaire // on donne le commentaire du decaissement a empty5
		$scope.Statut.Empty6 = $rootScope.Utilisateur.Nom+' '+$rootScope.Utilisateur.Prenom // on retourne le nom et prenom de l'user connecte a empty6
		$scope.Statut.Empty7 = $rootScope.Utilisateur.Empty2 // on retourne le nom et prenom de l'user connecte a empty6

		var donnee = $.param($scope.Statut);
		$http({
			method: 'POST',
			url: $scope.link +'/Api/Controllers/StatutController.php?Action=Add',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			data: donnee
		}).success(function (data) {
			if (data.Etat == "SUCCES") {
				$scope.getListeDecaissement(1);
				$scope.confirmationSwal("Décaissement publié avec succès", "success");
			} else {
				$scope.confirmationSwal("Échec décaissement non publié", "error");
			}
		});
	}
	//Fin fonction Publier Decaissement

	// on recupere tous les utilisateurs
	$scope.getUser = function () {

        $rootScope.ListeUser= [];
        $http({ method: 'GET',
            url: $scope.link +'/Api/Controllers/UtilisateurController.php?Action=All',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).
            success(function (data, status, headers, config) {
                $rootScope.ListeUser = data
                // console.log($rootScope.ListeUser);
            });
    }

	//Debut fonction Valider Decaissement qui sont publié
	$scope.ValiderDecaissement = function (IdDecaissement,IdusrcreationStatut,NumeroDecaissement) {

		// ici on retoure l'email de l'utilisateur qui a fait le decaissement en placant Idusrcreation en paramentre
		for (var i = 0; i <= $scope.ListeUser.length - 1; i++) {
			if ($rootScope.ListeUser[i].IdUtilisateur == IdusrcreationStatut) {

				$rootScope.EmailInitiateur = $rootScope.ListeUser[i].Email;
				$rootScope.NomInitiateur = $rootScope.ListeUser[i].Nom+' '+$rootScope.ListeUser[i].Prenom;
			}
		}
		// console.log('retour emailInitiateur',$rootScope.EmailInitiateur +' -- '+ $rootScope.NomInitiateur);
		
		$scope.Statut.IdTypeStatut = 3
		$scope.Statut.IdDecaissement = IdDecaissement
		$scope.Statut.Empty1 = $rootScope.Utilisateur.Email //on retourne l'email du validateur
		$scope.Statut.Empty2 = $rootScope.EmailInitiateur //on retourne l'email initiateur a empty2
		$scope.Statut.Empty3 = NumeroDecaissement // on retourne le numero du decaissement a empty3
		$scope.Statut.Empty6 = $rootScope.Utilisateur.Nom+' '+$rootScope.Utilisateur.Prenom // on retourne le nom du validateur
		$scope.Statut.Empty7 = $rootScope.NomInitiateur // on retourne le nom et prenom de l'user initiateur a empty7

		// console.log('retour NomUtilisateurConnecté',$scope.Statut.Empty6+' --  emailConnecté '+$scope.Statut.Empty1);

		var donnee = $.param($scope.Statut);
		$http({
			method: 'POST',
			url: $scope.link +'/Api/Controllers/StatutController.php?Action=Add',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			data: donnee
		}).success(function (data) {

			if (data.Etat == "SUCCES") {

				$scope.getListeDecaissement(2);
				$scope.confirmationSwal("Décaissement validé avec succès", "success");

			} else {

				$scope.confirmationSwal("Échec de validation", "error");
			}
		});
	}
	//Fin fonction Publier Decaissement

	//Debut fonction Rejeter Decaissement en attente
	$scope.RejeterDecaissement = function (IdDecaissement) {

		// ici on retoure l'email de l'utilisateur qui a fait le decaissement + le nom et prenom
		for (var i = 0; i <= $scope.ListeUser.length - 1; i++) {
			if ($rootScope.ListeUser[i].IdUtilisateur == $rootScope.id) {

				$rootScope.EmailInitiateur = $rootScope.ListeUser[i].Email;
				$rootScope.NomInitiateur = $rootScope.ListeUser[i].Nom+' '+$rootScope.ListeUser[i].Prenom;
			}
		}
		// console.log('retour email',$rootScope.EmailInitiateur+'--'+$rootScope.NomInitiateur);

		$scope.Statut.IdTypeStatut = 4
		$scope.Statut.IdDecaissement = IdDecaissement
		$scope.Statut.Empty1 = $rootScope.Utilisateur.Email //on retourne l'email de l'utilisateur rejeteur
		$scope.Statut.Empty2 = $rootScope.EmailInitiateur //on retourne l'email de l'utilisateur initiateur a empty2
		$scope.Statut.Empty3 = $rootScope.num // on retourne le numero du decaissement a empty3
		$scope.Statut.Empty6 = $rootScope.Utilisateur.Nom+' '+$rootScope.Utilisateur.Prenom // on retourne le nom et prenom de l'user connecte a empty4
		$scope.Statut.Empty7 = $rootScope.NomInitiateur // on retourne le nom et prenom de l'user initiateur a empty7

		// console.log($scope.Statut.Empty6);

		var donnee = $.param($scope.Statut);
		$http({
			method: 'POST',
			url: $scope.link +'/Api/Controllers/StatutController.php?Action=Add',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			data: donnee
		}).success(function (data) {

			if (data.Etat == "SUCCES") {

				$scope.getListeDecaissement(2);
				$scope.InitialiseStatutDecaissement();
				$scope.confirmationSwal("Decaissement rejeté avec succès", "success");
				$('#exampleModal').modal('hide');

			} else {

				$scope.confirmationSwal("Échec rejet décaissement", "error");
			}
		});
	}
	//Fin fonction Rejeter Decaissement en attente

	//Debut fonction obtenir liste des Decaissements ByStatut
	$scope.getListeDecaissement = function (IdStatut) {
		var Idusrcreation = $cookies.get('IdUtilisateur');
		$scope.ListeDecaissement = [];

		$http({ method: 'GET', url: $scope.link +'/Api/Controllers/DecaissementController.php?Action=AllByStatut&IdStatut=' + IdStatut +"&Idusrcreation="+ Idusrcreation }).
			success(function (data, status, headers, config) {

				$scope.ListeDecaissement = data;

                /* debu fonction pour conserver la pagination*/
                $scope.pageChangeHandler = function(num) {
                    // console.log('meals page changed to ' + num);
                    $cookies.put('current', num)
                    $rootScope.pagination= $cookies.get("current")
                    //  console.log($cookies.get("current"),'fonc');
                };

                $rootScope.pagination= $cookies.get("current")
                /**fin */

                // console.log($cookies.get("current"),'cok');
                // console.log($rootScope.pagination,'quiiiiiii');
			});
	}
	//Fin fonction obtenir liste des Decaissements

	//Debut fonction obtenir liste des Motifs
	$scope.getListeMotif = function () {

		$scope.ListeMotif = [];

		$http({ method: 'GET', url: $scope.link +'/Api/Controllers/MotifController.php?Action=All' }).
			success(function (data, status, headers, config) {

				$scope.ListeMotif = data;
			});
	}
	//Fin fonction obtenir liste des Motifs

	//Debut fonction obtenir liste des TypePieces
	$scope.getListeTypePiece = function () {

		$scope.ListeTypePiece = [];

		$http({ method: 'GET', url: $scope.link +'/Api/Controllers/TypePieceController.php?Action=All' }).
			success(function (data, status, headers, config) {

				$scope.ListeTypePiece = data;

			});
	}
	//Fin fonction obtenir liste des TypePieces

	//Debut fonction obtenir liste des statut
	$scope.getListeStatut = function () {

		$scope.ListeStatut = [];

		$http({ method: 'GET', url: $scope.link +'/Api/Controllers/StatutController.php?Action=All' }).
			success(function (data, status, headers, config) {
				$scope.ListeStatut = data;
			});
	}
	//Fin fonction obtenir liste des statut

	//Debut fonction obtenir liste des statut
	$scope.getListeBeneficiaire = function () {

		$scope.ListeBeneficiaire = [];

		$http({ method: 'GET', url: $scope.link +'/Api/Controllers/BeneficiaireController.php?Action=All' }).
			success(function (data, status, headers, config) {
				$scope.ListeBeneficiaire = data;
			});
	}
	//Fin fonction obtenir liste des statut


	//Debut fonction obtenir un Decaissement
	$scope.getOneDecaissement = function (IdDecaissement) {

		$http({ method: 'GET', url: $scope.link +'/Api/Controllers/DecaissementController.php?Action=One&IdDecaissement=' + IdDecaissement }).
			success(function (data, status, headers, config) {

				$scope.Decaissement.IdDecaissement = data.IdDecaissement;
				$scope.Decaissement.NumeroDecaissement = data.NumeroDecaissement;
				$scope.Decaissement.IdMtf = data.IdMtf;
				$scope.Decaissement.IdTyp = data.IdTyp;
				$scope.Decaissement.IdTyb = data.IdTyb;
				$scope.Decaissement.Beneficiaire = data.Beneficiaire;
				$scope.Decaissement.Reference = data.Reference;
				$scope.Decaissement.Montant = data.Montant;
				$scope.Decaissement.NumeroBeneficiaire = data.NumeroBeneficiaire;
				$scope.Decaissement.NumeroPiece = data.NumeroPiece;
				$scope.Decaissement.Commentaire = data.Commentaire;
				$scope.Decaissement.Datecreation = data.Datecreation;
				$scope.Decaissement.DateRealisation = new Date(data.DateRealisation);
				$scope.Decaissement.Idusrcreation = data.Idusrcreation;
				$scope.Decaissement.IdStatut = data.IdStatut;
				$scope.Decaissement.DatecreationStatut = data.DatecreationStatut;
			});

	} 
	//Fin fonction obtenir un Decaissement

	 //Debut fonction obtenir un Decaissement
	 $scope.getDecaissement = function (IdDecaissement) {
		for (var i = 0; i <= $scope.ListeDecaissement.length - 1; i++) {
			if ($scope.ListeDecaissement[i].IdDecaissement == IdDecaissement) {

				$scope.Decaissement.IdDecaissement = $scope.ListeDecaissement[i].IdDecaissement;
				$scope.Decaissement.NumeroDecaissement = $scope.ListeDecaissement[i].NumeroDecaissement;
				$scope.Decaissement.IdMtf = $scope.ListeDecaissement[i].IdMtf;
				$scope.Decaissement.IdBnf = $scope.ListeDecaissement[i].IdBnf;
				$scope.Decaissement.Montant = $scope.ListeDecaissement[i].Montant;
				$scope.Decaissement.Commentaire = $scope.ListeDecaissement[i].Commentaire;
				$scope.Decaissement.DateRealisation = new Date($scope.ListeDecaissement[i].DateRealisation);
				$scope.Decaissement.Datecreation = $scope.ListeDecaissement[i].Datecreation;
				$scope.Decaissement.Idusrcreation = $scope.ListeDecaissement[i].Idusrcreation;
				$scope.Decaissement.IdStatut = $scope.ListeDecaissement[i].IdStatut;
				$scope.Decaissement.DatecreationStatut = $scope.ListeDecaissement[i].DatecreationStatut;
				$scope.Decaissement.IdusrcreationStatut = $scope.ListeDecaissement[i].IdusrcreationStatut;
				$scope.Decaissement.Photos = $scope.ListeDecaissement[i].Photos;
				//
				// console.log('dec',$scope.Decaissement);
				$scope.photo = $scope.Decaissement.NumeroDecaissement+'/'+$scope.Decaissement.Photos[0];
                $scope.photoDec = true;
                // console.log($scope.Decaissement.Photos,'pho');
				$rootScope.id = $scope.Decaissement.IdusrcreationStatut;
				$rootScope.num = $scope.Decaissement.NumeroDecaissement;
				// console.log('id-validateur',$rootScope.id);
				//
				if ($scope.Decaissement.Commentaire.length>0) {
					$scope.myVar = true
				}else{
					$scope.myVar = false
				}
				break;
			}
		}
	}
	//Fin fonction obtenir un Decaissement

    $scope.getLibellePhoto = function(NumeroDecaissement, LibellePhoto){
        return NumeroDecaissement+'/'+LibellePhoto;
    }

	//Debut fonction obtenir le email de l'utilisateur initiateur de decaissement
	$scope.getMotif = function (IdMtf) {

		for (var i = 0; i <= $scope.ListeMotif.length - 1; i++) {
			if ($scope.ListeMotif[i].IdMotif == IdMtf) {

				return $scope.ListeMotif[i].Libelle;

			}
		}
	}
	//Fin fonction obtenir le email de l'utilisateur initiateur de decaissement

	//Debut fonction obtenir le Nom de beneficiaire
	$scope.getBeneficiaire = function (IdBnf) {

		for (var i = 0; i <= $scope.ListeBeneficiaire.length - 1; i++) {
			if ($scope.ListeBeneficiaire[i].IdBeneficiaire == IdBnf) {

				return $scope.ListeBeneficiaire[i]

			}
		}
	}
	//Fin fonction obtenir le Nom de beneficiaire

	//Debut fonction obtenir le Libelle de TypePiece
	$scope.getTypePiece = function (IdTyp) {

		for (var i = 0; i <= $scope.ListeTypePiece.length - 1; i++) {
			if ($scope.ListeTypePiece[i].IdTypePiece == IdTyp) {

				return $scope.ListeTypePiece[i].Libelle;

			}
		}
	}
	//Fin fonction obtenir le Libelle de TypePiece

	//Debut fonction obtenir le commentaire de Statut
	$scope.getStatut = function (IdStatut) {

		for (var i = 0; i <= $scope.ListeStatut.length - 1; i++) {
			if ($scope.ListeStatut[i].IdTypeStatut == IdStatut) {

				return $scope.ListeStatut[i]

			}
		}
	}
	//Fin fonction obtenir le commentaire de Motif

	$scope.Export = function (data) {

		var img=null;

		$http({ method: 'GET', url: $scope.link +'/App/Js/json/logos.json'}).
			success(function (info, status, headers, config) {
				img = info.logo_sitc

				var commentaire = null;
				if(data.Commentaire != ''){
					commentaire = {
						alignment: 'justify',
						style: 'tableExample',
						margin: [0, 20, 0, 0],
						table: {
							widths: ['auto', '*'],
							body: [
								[
									{
										border: [false, false, false, false],
										text: 'Commentaire :',
										fontSize: 14,
										margin: [0, 0, 30, 0]
									}, 
									{
										border: [false, false, false, false],
										text: data.Commentaire ,
										fontSize: 14,
									},
								],
							]
						}
					}
				}

				var dateRealisation = new Date(data.DateRealisation);
				var jour = (dateRealisation.getDate() < 10) ? '0'+dateRealisation.getDate() : dateRealisation.getDate();
				var mois = (dateRealisation.getMonth()+1 < 10) ? '0'+(dateRealisation.getMonth()+1) : (dateRealisation.getMonth()+1);

				dateRealisation = jour +'/'+ mois +'/'+ dateRealisation.getFullYear();

				var docDefinition = {

					footer: {
						columns: [
						  { text: data.NumeroDecaissement, margin: 15 },
						  { text: 'Enregistré le '+ $scope.getDateTimeFormatFrensh(data.DatecreationStatut), alignment: 'right', margin: 15 }
						]
					},
					content: [
						{ image: 'logo', width: 170, height: 80, alignment: 'center' },
						{ text: '\n Bon de sortie de caisse\n\n', fontSize: 22, bold: true, alignment: 'center' },
						{
							style: 'tableExample',
							widths: ['auto', '500'],
							table: {
								body: [
									[
										{
											border: [false, false, false, false],
											text: 'Montant :',
											fontSize: 14,
											bold: true,
											margin: [10, 0, 20, 0]
										},
										{
											border: [true, true, true, true],
											text: $scope.SepareMilier(data.Montant)+' F CFA \n',
											fontSize: 17,
											bold: true,
											margin: [30, 0, 20, 0]
										}
									]
								],
							}
						},
						{
							alignment: 'justify',
							style: 'tableExample',
							margin: [0, 20, 0, 0],
							table: {
								widths: ['auto', '*'],
								body: [
									[
										{
											border: [false, false, false, false],
											text: 'Date :',
											fontSize: 14,
											margin: [0, 0, 30, 0]
										}, 
										{
											border: [false, false, false, false],
											text: dateRealisation,
											fontSize: 14,
										},
									],
								]
							}
						},
						{
							alignment: 'justify',
							style: 'tableExample',
							margin: [0, 20, 0, 0],
							table: {
								widths: ['auto', '*'],
								body: [
									[
										{
											border: [false, false, false, false],
											text: 'Bénéficiaire :',
											fontSize: 14,
											margin: [0, 0, 30, 0]
										}, 
										{
											border: [false, false, false, true],
											text: data.Beneficiaire,
											fontSize: 14,
										},
									],
								]
							}
						},
						{
							style: 'tableExample',
							margin: [0, 20, 0, 0],
							table: {
								widths: ['auto', '*'],
								body: [
									[
										{
											border: [false, false, false, false],
											text: 'Montant (en lettres) :',
											fontSize: 14,
											margin: [0, 0, 0, 0]
										}, 
										{
											border: [false, false, false, true],
											text: $scope.convertNumberToWords(data.Montant) + 'Francs CFA \n',
											fontSize: 14,
										},
									],
								]
							}
						},
						{
							alignment: 'justify',
							style: 'tableExample',
							margin: [0, 20, 0, 0],
							table: {
								widths: ['auto', '*'],
								body: [
									[
										{
											border: [false, false, false, false],
											text: 'Motif :',
											fontSize: 14,
											margin: [0, 0, 30, 0]
										}, 
										{
											border: [false, false, false, true],
											text: $scope.getMotif(data.IdMtf) ,
											fontSize: 14,
										},
									],
								]
							}
						},
						commentaire,
						{
							alignment: 'justify',
							fontSize: 14,
							margin: [0, 50, 0, 0],
							columns: [
								{
									text: 'Autorisation (Signature + Fonction)',
									alignment: 'left'
								},
								{
									text: 'Caisse (Signature+Nom)',
									alignment: 'right'
								}
							]
						},
						{ text: 'Pour aquict(destinataire)', fontSize: 14, margin: [0, 70, 0, 0] },
						{
							text: 'Fait à __________________, le __________________',
							fontSize: 14,
							margin: [0, 70, 0, 0],
						}
					],
					images: {
						logo: img
					},
					styles: {
						tableExample: {
							margin: [0, 5, 0, 0]
						},
					}
				};
				// pdfMake.createPdf(docDefinition).download("Decaissement.pdf");
				pdfMake.createPdf(docDefinition).open();
			});
    }


	// $scope.myFunction =function () {
	// 	$scope.error=false;
	// 	var input, filter, table, tr, td, i, txtValue;
	// 	input = document.getElementById("numero");
	// 	filter = input.value.toUpperCase();
	// 	table = document.getElementById("myTable");
	// 	tr = table.getElementsByTagName("tr");
	// 	for (i = 0; i < tr.length; i++) {
	// 	  td = tr[i].getElementsByTagName("td")[0];
	// 	  if (td) {
	// 		txtValue = td.textContent || td.innerText;
	// 		if (txtValue.toUpperCase().indexOf(filter) > -1) {
	// 		  tr[i].style.display = "";
	// 		  $scope.error=false;
	// 		} else {
	// 		  tr[i].style.display = "none";
	// 		  $scope.error=true;
	// 		}
	// 	  }       
	// 	}
	//   }

$scope.globalWordCounter = 0;
$scope.WORD_LIMIT = 10;

$scope.getkeys = function (event) {
    $scope.keyval = event.keyCode;
    if ($scope.globalWordCounter > 254 && ($scope.keyval !== 8)) {
        // e.preventDefault();
        $scope.confirmationSwal("Attention vous avez atteint le nombre de caractère maximal", "error");

      }
    // console.log($scope.keyval);
    $scope.wordCounter(event);
    }
$scope.getkeyss = function (event) {
    $scope.keyval = event.keyCode;
    if ($scope.globalWordCounter > 254 && ($scope.keyval !== 8)) {
        // e.preventDefault();
        $scope.confirmationSwal("Attention vous avez atteint le nombre de caractère maximal", "error");

      }
    // console.log($scope.keyval);
    $scope.wordCounterS(event);
    }

$scope.isWord = function(str) {
  var alphaNumericFound = false;
  for (var i = 0; i < str.length; i++) {
    var code = str.charCodeAt(i);
    if ((code > 47 && code < 58) || // numeric (0-9)
        (code > 64 && code < 91) || // upper alpha (A-Z)
        (code > 96 && code < 123)) { // lower alpha (a-z)
      alphaNumericFound = true;
      return alphaNumericFound;
    }
  }
  return alphaNumericFound;
}

$scope.wordCounter = function(text) {
  var text = $scope.Decaissement.Commentaire? $scope.Decaissement.Commentaire : 'undefined';
//   console.log(text);
  var wordCount = 0;
  if (text == 'undefined') {
    $scope.globalWordCounter = wordCount;
    // console.log($scope.globalWordCounter,'glo');
    $scope.count = wordCount;
  } else {
      
      for (var i = 0; i < text.length; i++) {
        if (!text[i] == ' ' && $scope.isWord(text[i]) || !text[i] == ' ') {
          wordCount++;
        }
      }
      $scope.globalWordCounter = wordCount;
    //   console.log($scope.globalWordCounter,'glo');
      $scope.count = wordCount;
    }
  }
$scope.wordCounterS = function(textS) {
  var textS = $scope.Statut.Commentaire? $scope.Statut.Commentaire : 'undefined';
//   console.log(textS);
  var wordCount = 0;
  if (textS == 'undefined') {
    $scope.globalWordCounter = wordCount;
    // console.log($scope.globalWordCounter,'gloS');
    $scope.count = wordCount;
  } else {
      
      for (var i = 0; i < textS.length; i++) {
        if (!textS[i] == ' ' && $scope.isWord(textS[i]) || !textS[i] == ' ') {
          wordCount++;
        }
      }
      $scope.globalWordCounter = wordCount;
    //   console.log($scope.globalWordCounter,'gloS');
      $scope.count = wordCount;
    }
  }
});