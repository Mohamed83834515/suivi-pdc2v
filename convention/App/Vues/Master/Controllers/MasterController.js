DECAISSEMENT.controller('MasterController', function ($scope, Idle, Keepalive, $rootScope, $routeParams, $location, $http, $cookies, $httpParamSerializer) {

    $scope.NomApp = "BillSoft";//nom de l'application
    $scope.TitreG = "Tableau de bord";//Titre du module globale

    $scope.regex = '[A-Za-z0-9 èéêëÊÉÈËûüÜÛîïÏÎôÔÖöÇçœŒâáàäÁÀÂÄ]+'; // les caractères acceptés dans les champs de saisie
    $scope.regexCote = '[A-Za-z0-9 \-\_\.\'\r\n\"èéêëÊÉÈËûüùÜÛîïÏÎôÔÖöÇçœŒâáàäÁÀÂÄ]+'; // les caractères acceptés dans les champs de saisie
    $scope.regexNumber = '[0-9 \ \]+'; // les caractères acceptés dans les champs de saisie
    $scope.regexEmail = '/^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/'; // les caractères acceptés dans les champs de saisie
    $scope.maxLenghtComment = 255;
    $scope.regex = "/[^A-Za-z0-9]+/";

    $rootScope.curentPage = window.location.hash;
    console.log('$rootScope.curentPage', $rootScope.curentPage);

    // Fonction initialisation des données
    $scope.InitialiseMaster = function () {
        $scope.start();
        $scope.getNotifications();
        $scope.getListeSousActivite();
        $scope.getDecaissementTache();
        $scope.getIndicateur();
    }
    //Declaration de la classe Utilisateur   
    $rootScope.Utilisateur = {
        IdUtilisateur: 0,
        IdProfil: 0,
        Nom: "",
        Prenom: "",
        Pseudo: "",
        Email: "",
        Empty2: "",
        MotDePasse: ""
    };
    //Fin Declaration de la classe Utilisateur 

    //Initialisation de la classe Utilisateur   
    $rootScope.InitialiseUtilisateur = function () {

        $rootScope.Utilisateur = { // $scope.getConnectedUser();
            // $scope.getConnectedUserModule();
            IdUtilisateur: "",
            IdProfil: "",
            Nom: "",
            Prenom: "",
            Pseudo: "",
            Email: "",
            Empty2: "",
            MotDePasse: ""
        };
    }
    $scope.LoadPtba = function () {
        window.location.href = $rootScope.link + "/App/Vues/master.html";
    };
    //Fin initialisation de la classe Utilisateur   
    $scope.getNotifications = function () {
        $scope.totalJour = 0;
        $scope.ListeNotifications = [];
        // U$scope.nom = "admin";
        $scope.nom = $cookies.get("NomUtilisateur");
        $scope.Fonction = $cookies.get("Fonction");
        var fonction = "";
        if ($scope.partenaire == "09") {
            fonction = $scope.Fonction;
        } else{
            fonction = $scope.nom;
        } 
        console.log("la fonction ", $scope.Fonction)

        $http({
            method: 'GET',
            //url: 'https://sise-pdc2v.org/api/activite.php?responsable=' + $scope.nom,
            url: $scope.link + '/convention/api/liste_notification.php?responsable=' + fonction,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).success(function (data) {
            $scope.ListeNotifications = data.notif;
            console.log('notifications', data.notif);
        });
    }
    $scope.nom = $cookies.get("NomUtilisateur");
    $scope.partenaire = $cookies.get("Partenaire");
    $scope.id_personnel = $cookies.get("id_personnel");
    // console.log($cookies.get("expires"));

    //Fonction pour recuperer l'utilisateur connecté
    $scope.getConnectedUser = function () {

        $rootScope.Utilisateur = [];
        var userId = $cookies.get("IdUtilisateur");
        $http({
            method: 'GET',
            url: $scope.link + '/convention/api/Controllers/UtilisateurController.php?Action=One&IdUtilisateur=' + userId,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).
            success(function (data, status, headers, config) {
                $rootScope.Utilisateur.IdUtilisateur = data.IdUtilisateur
                $rootScope.Utilisateur.IdProfil = data.IdProfil
                $rootScope.Utilisateur.Nom = data.Nom
                $rootScope.Utilisateur.Prenom = data.Prenom
                $rootScope.Utilisateur.Pseudo = data.Pseudo
                $rootScope.Utilisateur.Email = data.Email
                $rootScope.Utilisateur.Empty2 = data.Empty2
            });
    }
    $scope.formatFrenchDate = function (date) {
        // Assure-toi que la valeur passée est une date valide
        if (!(date instanceof Date)) {
            date = new Date(date);
        }

        // Options de formatage pour la date et l'heure en français
        const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };

        // Formater la date en français
        const formattedDate = new Intl.DateTimeFormat('fr-FR', options).format(date);

        return formattedDate;
    };
    $scope.getListeSousActivite = function () {
		$scope.totalJour = 0;
		$scope.ListeSousActivite = [];
		$scope.nom = $cookies.get("NomUtilisateur");
		// $scope.nom = "nzue";
		//// console.log($scope.nom);
		$http({
			method: 'GET',
			url: $scope.link + '/convention/api/sous_activite.php',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
		}).
			success(function (data) {
				$scope.ListeSousActivite = data.sous_activites;
				if ($scope.valide = 0) {
					$scope.getSuiviActivite($scope.valide);
				}
				console.log('sous activité master page ',$scope.ListeSousActivite);
			});
	}
    $scope.getSuiviActivite = function (id) {
		$scope.suividata = [];
		$scope.id_activite_ptba_1 = id;
		for (var i = 0; i <= $scope.ListeSousActivite.length - 1; i++) {
			if ($scope.ListeSousActivite[i].id_activite_ptba == id) {
				$scope.suividata.push($scope.ListeSousActivite[i]);
                console.log('fonction excécuter avec succes',$scope.suividata);
			}

		}
	}
    $scope.getIndicateur = function () {
		$scope.totalJour = 0;
		$scope.ListeIndicateur = [];
		$http({
			method: 'GET',
			url: $scope.link + '/convention/api/Indicateur.php',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
		}).success(function (data) {
			$scope.ListeIndicateur = data;
			$scope.ListeIndicateur = data.users;
			if ($scope.valide != 0) {
				$scope.getMyIndicateur($scope.valide);
			}
			// console.log('indicateur', $scope.ListeIndicateur  )
		});
	}
    $scope.getMyIndicateur = function (id_ptba) {
		$scope.indicateurs = []; // Tableau pour stocker les tâches correspondantes
		$scope.id_activite_ptba_3 = id_ptba;
		for (var i = 0; i < $scope.ListeIndicateur.length; i++) {
			if ($scope.ListeIndicateur[i].id_ptba == id_ptba) {
				$scope.indicateurs.push($scope.ListeIndicateur[i]);
			}
		}
		console.log('myindicateur4454545', $scope.indicateurs);
	}
    $scope.getDecaissementTache = function () {
		$scope.totalJour = 0;
		$scope.ListeDecaissementTache = [];
		//$scope.nom =$cookies.get("NomUtilisateur");
		// $scope.nom = "nzue";
		//// console.log($scope.nom);
		$http({
			method: 'GET',
			//url: 'https://sise-pdc2v.org/api/tache_user.php?responsable=nzue',
			//url: 'https://sise-pdc2v.org/api/tache_user.php?responsable=' + $scope.nom,
			url: $scope.link + '/convention/api/liste_decaissement.php',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
		}).
			success(function (data) {
				$scope.ListeDecaissementTache = data.sous_activites;
				if ($scope.valide != 0) {
					$scope.getMaTache($scope.valide1);
				}
				// console.log($scope.ListeDecaissementTache);
			});
	}
    $scope.getMaTache = function (id_ptba) {
		$scope.decaissements = []; // Tableau pour stocker les tâches correspondantes
		$scope.id_activite_ptba_2 = id_ptba;
		for (var i = 0; i < $scope.ListeDecaissementTache.length; i++) {
			if ($scope.ListeDecaissementTache[i].id_activite_ptba == id_ptba) {
				$scope.decaissements.push($scope.ListeDecaissementTache[i]);
			}
		}
		console.log($scope.decaissements);
		//// console.log($routeParams.IdActivite);
	}
    $scope.ValideNotification = function (id_act, id_activite) {
		var donnee = {
			id_notif: id_act,
		};
		// console.log(donnee);
		var config = {
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			transformRequest: $httpParamSerializer
		};

		//$http.post('https://sise-pdc2v.org/api/update_tache.php', donnee, config)
		$http.post($scope.link + '/convention/api/valide_notification.php', donnee, config)
			.then(function (response) {
				// console.log(response);
				if (response.data.status === "success") {
					$scope.InitialiseMaster();
                    $scope.valide = id_activite;
				} else {

				}
			})
			.catch(function (error) {
				$scope.confirmationSwal("Echec de la validation de l'activité", "error");
			});

	}
    // $scope.getConnectedUserModule = function () {

    //     $rootScope.ListeModule = [];
    //     var userId = $cookies.get("IdUtilisateur");
    //     var userIdProfil = $cookies.get("IdProfil");
    //     $http({ method: 'GET',
    //         url: $scope.link +'/convention/api/Controllers/ProfilModuleDroitController.php?Action=AllByProfil&IdProfil='+userIdProfil,
    //         headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    //     }).
    //         success(function (data, status, headers, config) {
    //             $rootScope.ListeModule = data
    //             $scope.getlisteModuleParent();
    //         });
    // }
    // //fin

    // //Debut fonction obtenir un Module
    // $scope.getlisteModuleParent = function () {
    //     $scope.ListeModuleParent = []
    //     for (var i = 0; i <= $scope.ListeModule.length - 1; i++) {
    //         if ($scope.ListeModule[i].IdSmo == "") {

    //             $scope.ListeModuleParent.push($scope.ListeModule[i]);
    //         }
    //     }
    // }
    // //Fin fonction obtenir un Module

    // $scope.ListeSousModule = []
    // //Debut fonction obtenir un Module
    // $scope.getlisteSousModule = function (IdModule) {
    // 	$scope.ListeSousModule[IdModule] = []
    // 	for (var i = 0; i <= $scope.ListeModule.length - 1; i++) {
    // 		if ($scope.ListeModule[i].IdSmo == IdModule) {

    // 			$scope.ListeSousModule[IdModule].push($scope.ListeModule[i]);
    // 		}
    // 	}
    // }
    //Fin fonction obtenir un Module
    $scope.ValideActivite = function () {

		
		var id_personnel = $cookies.get("IdUtilisateur");
		var convention = $cookies.get("Version");
		var donnee = {
			id_personnel: id_personnel,
			convention: convention,
		};
		// console.log(donnee);
		var config = {
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			transformRequest: $httpParamSerializer
		};

		//$http.post('https://sise-pdc2v.org/api/update_tache.php', donnee, config)
		$http.post($scope.link + '/convention/api/update_last_conv.php', donnee, config)
			.then(function (response) {
				console.log('ok')
			})
			.catch(function (error) {
				// console.log(error);
				console.log(error)
			});

	}

    //Fonction deconnexion
    $scope.LogOut = function () {
        $scope.ValideActivite();
        swal({
            title: "Etes vous sur?",
            text: "Vous serez déconnecté de l'application",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((Willlogout) => {
                if (Willlogout) {
                    $cookies.remove("IdUtilisateur");
                    $cookies.remove("IdProfil");
                    $cookies.remove("Droits");
                    $cookies.remove("Version");
                    $cookies.remove("Version0");
                    $cookies.remove("checkActivite");
                    $cookies.remove("convention_active");
                    $cookies.remove("id_personnel");
                    $rootScope.isAuth = false;
                    window.location.href = $rootScope.link + "/index.html";
                }
            });
        // console.log($cookies.remove("Droits"))
    }
    //Fin login Utilisateur


    //Confirmation sweet alert delete
    $rootScope.confirmationSwal = function (TitleAlert, IconAlert) {
        swal({
            title: TitleAlert,
            icon: IconAlert,
            button: "Ok",
            successMode: true,
        });
    }

    // rcupère tous les droits
    // $rootScope.getDroit = function (IdModule) {
    //     $rootScope.Droits = [];
    //     for (let i = 0; i < $scope.ListeModule.length; i++) {

    //         if ($scope.ListeModule[i].IdModule == IdModule) {
    //             $cookies.putObject('Droits', $scope.ListeModule[i].Droits)
    //             break;
    //         }
    //     }
    // }

    // $rootScope.checkDroit = function (IdDroit) {

    //     Droits = $cookies.getObject('Droits')

    //     for (let i = 0; i < Droits.length; i++) {

    //         if (Droits[i].IdDroit == IdDroit) {
    //             return true;   
    //         }
    //     }
    //     return false;
    // }

    // Liste des options pour la validation cleave js
    $rootScope.cleaveOptions = {
        creditCard: {
            creditCard: true,
            onValueChanged: $scope.onCreditCardValueChanged,
            onCreditCardTypeChanged: $scope.onCreditCardTypeChanged
        },

        phone: {
            phone: true,
            phoneRegionCode: 'AU'
        },

        date: {
            date: true
        },

        numeral: {
            numeral: true,
            numeralDecimalMark: ',',
            delimiter: ' '
        },

        custom: {
            blocks: [6, 3, 3, 3],
            prefix: 'PREFIX',
            uppercase: true,
            delimiters: ['-', '.']
        }
    };
    // ============================================== //



    //Obtenir la datetime au format français
    $rootScope.getDateTimeFormatFrensh = function (date) {
        if (typeof date !== "undefined") {
            var date1 = date.split(" ");
            var heure = date1[1];
            var date2 = date1[0].split("-");
            var date3 = date2[2] + "/" + date2[1] + "/" + date2[0];

            return date3 + " " + heure;
        }
    }
    //Fin obtenir la datetime au format français

    //Obtenir la datetime en date simple au format français
    $rootScope.getDateTimeFormatFrenshSimple = function (date) {
        if (typeof date !== "undefined") {
            var date1 = date.split(" ");
            var heure = date1[1];
            var date2 = date1[0].split("-");
            var date3 = date2[2] + "/" + date2[1] + "/" + date2[0];

            return date3;
        }
    }
    //Fin obtenir la datetime en date simple au format français

    //Obtenir la date au format français
    $rootScope.getDateFormatFrensh = function (date) {
        if (typeof date !== "undefined") {
            var date2 = date.split("-");
            var date3 = date2[2] + "/" + date2[1] + "/" + date2[0];
            if (date == "") {
                return "";
            } else {
                return date3;
            }
        }
    }
    //Fin obtenir la date au format français	

    //Debut separateur de millier
    $rootScope.SepareMilier = function (Nombre) {

        var formatnumber = function (Nombre, c, d, t) {
            var n = Nombre,
                c = isNaN(c = Math.abs(c)) ? 2 : c,
                d = d == undefined ? "." : d,
                t = t == undefined ? "," : t,
                s = n < 0 ? "-" : "",
                i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
                j = (j = i.length) > 3 ? j % 3 : 0;
            return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
        }

        return formatnumber(Nombre, 0, '', ' ');
    }

    // retourne sous format alphabétique un chiffre de 1 à 100 (la correspondance du chiffre 1 n'est pas affichée)
    $rootScope.UniteNombre_GF = function (Nombre) {

        var Str = "";
        if (Nombre == 1) Str = ""; if (Nombre == 2) Str = "deux"; if (Nombre == 3) Str = "trois"; if (Nombre == 4) Str = "quatre"; if (Nombre == 5) Str = "cinq";
        if (Nombre == 6) Str = "six"; if (Nombre == 7) Str = "sept"; if (Nombre == 8) Str = "huit"; if (Nombre == 9) Str = "neuf"; if (Nombre == 10) Str = "dix"; if (Nombre == 11) Str = "onze";
        if (Nombre == 12) Str = "douze"; if (Nombre == 13) Str = "treize"; if (Nombre == 14) Str = "quatorze"; if (Nombre == 15) Str = "quinze"; if (Nombre == 16) Str = "seize"; if (Nombre == 17) Str = "dix-sept";
        if (Nombre == 18) Str = "dix-huit"; if (Nombre == 19) Str = "dix-neuf";
        if (Nombre >= 20 && Nombre < 30) { Str = "vingt"; if (Nombre - 20 == 1) Str = "vingt-et-un"; else if (Nombre != 20) Str = "vingt-" + $rootScope.UniteNombre_GF(Nombre - 20); }
        if (Nombre >= 30 && Nombre < 40) { Str = "trente"; if (Nombre - 30 == 1) Str = "trente-et-un"; else if (Nombre != 30) Str = "trente-" + $rootScope.UniteNombre_GF(Nombre - 30); }
        if (Nombre >= 40 && Nombre < 50) { Str = "quarante"; if (Nombre - 40 == 1) Str = "quarante-et-un"; else if (Nombre != 40) Str = "quarante-" + $rootScope.UniteNombre_GF(Nombre - 40); }
        if (Nombre >= 50 && Nombre < 60) { Str = "cinquante"; if (Nombre - 50 == 1) Str = "cinquante-et-un"; else if (Nombre != 50) Str = "cinquante-" + $rootScope.UniteNombre_GF(Nombre - 50); }
        if (Nombre >= 60 && Nombre < 70) { Str = "soixante"; if (Nombre - 60 == 1) Str = "soixante-et-un"; else if (Nombre != 60) Str = "soixante-" + $rootScope.UniteNombre_GF(Nombre - 60); }
        if (Nombre >= 70 && Nombre < 80) { Str = "soixante-dix"; if (Nombre - 70 == 1) Str = "soixante-onze"; else if (Nombre != 70) Str = "soixante-" + $rootScope.UniteNombre_GF(Nombre - 70 + 10); }
        if (Nombre >= 80 && Nombre < 90) { Str = "quatre-vingt"; if (Nombre - 80 == 1) Str = "quatre-vingt-et-un"; else if (Nombre != 80) Str = "quatre-vingt-" + $rootScope.UniteNombre_GF(Nombre - 80); }
        if (Nombre >= 90 && Nombre < 100) { Str = "quatre-vingt-dix"; if (Nombre - 90 == 1) Str = "quatre-vingt-onze"; else if (Nombre != 90) Str = "quatre-vingt-" + $rootScope.UniteNombre_GF(Nombre - 90 + 10); }
        if (Nombre == 100) Str = "cent";
        return Str;
    }

    $rootScope.moisCompletFrench = function (NbreMois) {
        // initializing an array  
        const months = [
            "Janvier", "Février",
            "Mars", "Avril", "Mai",
            "Juin", "Juillet", "Août",
            "Septembre", "Octobre",
            "Novembre", "Décembre"
        ];
        return months[NbreMois];
    }

    // retourne sous format alphabétique un chiffre de 0 à 999 999 999

    $rootScope.convertNumberToWords = function (Montant) {

        var million = 0;
        var millier = 0;
        var centaine = 0;
        var dizaine = 0;
        var str = "";
        if (Montant == 1) str = "un";
        if (Montant == 0) str = "";
        if (Montant >= 1000000) {
            var nb_million = parseInt(Montant / 1000000);
            if (nb_million != 0) str += $rootScope.convertNumberToWords(nb_million) + " million";
            str += " " + $rootScope.convertNumberToWords(Montant - (nb_million * 1000000));
            Montant = 0;
        }
        if (Montant >= 1000) {
            millier = parseInt(Montant / 1000);
            centaine = parseInt((Montant - (millier * 1000)) / 100);
            dizaine = Montant - ((millier * 1000) + (centaine * 100));
        }
        if (Montant < 1000 && Montant >= 100) {
            centaine = parseInt(Montant / 100);
            dizaine = parseInt(Montant - (centaine * 100));
        }
        if (Montant < 1000 && Montant < 100) {
            dizaine = Montant;
        }
        if (millier != 0) {
            if (millier <= 100) {
                str += $rootScope.UniteNombre_GF(millier) + " mille ";
            }
            else {
                var cent = parseInt(millier / 100);
                var dix = millier - cent * 100;
                str += $rootScope.UniteNombre_GF(cent) + " cent " + $rootScope.UniteNombre_GF(dix) + " mille ";
            }
        }
        if (centaine != 0) {
            str += $rootScope.UniteNombre_GF(centaine) + " cent";
        }
        if (dizaine != 0) {
            str += " " + $rootScope.UniteNombre_GF(dizaine);
            if (dizaine == 1) str += " un";
        }
        return str;

    }

    //Idle

    $scope.$on('IdleStart', function () {
        // closeModals();
        console.log('close modal');

        $('#countdownModal').modal('show');
    });

    $scope.$on('IdleEnd', function () {
        console.log('close modal');
        $('#countdownModal').modal('hide');
        // closeModals();
    });

    $scope.$on('IdleTimeout', function () {
        $scope.ValideActivite();
        console.log('close modal');
        // closeModals();
        $cookies.remove("IdUtilisateur");
        $cookies.remove("IdProfil");
        $cookies.remove("Droits");
        $rootScope.isAuth = false;
        window.location.href = $rootScope.link + "/index.html";
    });

    $scope.start = function () {
        console.log('close modal');
        Idle.watch();
        $scope.started = true;
    };

    $scope.stop = function () {
        console.log('close modal');
        Idle.unwatch();
        $scope.started = false;

    };

    //Fin Idle


}).config(function (IdleProvider, KeepaliveProvider) {
    IdleProvider.idle(1800);
    IdleProvider.timeout(30);
    KeepaliveProvider.interval(10);
    // ngIntlTelInputProvider.set({defaultCountry: 'fr'});

});