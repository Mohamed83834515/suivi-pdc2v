DECAISSEMENT.controller('LoginController', function ($scope, $http, $cookies) {

    $scope.VueConnexion = "Connexion";//Initialisation de la vue connexion
    $cookies.remove("IdUtilisateur");
    $cookies.remove("Droits");
    $cookies.remove("current");
    $scope.selectedProject = "";
    $scope.veirification = 0;
    $scope.regex ="^(?=.*[0-9])(?=.*[a-z])([a-z0-9_-]+)$";

    $scope.Credential = {
        AncienMotPasse: "",
        NouveauMotPasse: "",
        ResetMotPasse: "",
    }

    $scope.initialiseCredential = function () {
        $scope.Credential = {
            AncienMotPasse: "",
            NouveauMotPasse: "",
            ResetMotPasse: "",
        }
    }

    //declare date and get current date time
    var date = new Date();
    //add 20 minutes to date
    date.setTime(date.getTime() + (1* 60 * 1000));
    // console.log(date,'date');
    //Debut login Utilisateur
    $scope.Login = function () {
        var donnee = $.param($scope.Utilisateur);
        $http({
            method: 'POST',
            url: $scope.link +'/convention/api/connexion.php',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            data: donnee
        }).then(function (response) {
            var data = response.data; // Obtenir les données de la réponse
            console.log(data);
            if (data.status === "success") {
                $cookies.put('IdUtilisateur', data.user_id); 
                $cookies.put('NomUtilisateur', data.nom);
                $cookies.put('PrenomsUtilisateur', data.prenom);
                $cookies.put('Fonction', data.fonction);
                $cookies.put('Partenaire', data.partenaire);
                $cookies.put('executant', data.executant);
                $cookies.put('id_personnel', data.id_personnel);
                $cookies.put('convention_active', data.convention_active);
                console.log(data.convention_active)
                $cookies.put('current', 1);
                if (data.fonction === 'SSE') {
                    $scope.veirification = 1;
                } else {
                    $cookies.put('checkActivite', 0);
                    window.location.href = $scope.link + "/convention/App/Vues/master.html";
                }
            } else{
                $scope.confirmation();
            }
        }, function (error) {
            $scope.confirmation();
        });
        
    }
    $scope.CheckActivite = function(id){
        $cookies.put('checkActivite', id);
        window.location.href = $scope.link + "/App/Vues/master.html";

    }
       //Debut ChangerMotDePasse
   $scope.ChangerMotDePasse = function () {
    var donnee = $.param($scope.Credential);
    $http({
        method: 'POST',
        url: $scope.link + '/convention/api/Controllers/UtilisateurController.php?Action=UpdatePassword&IdUtilisateur='+$scope.IdUtilisateur,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        data: donnee
    }).success(function (data) {

        if (data.Etat == "SUCCES") {
            window.location.href = $scope.link + "/App/Vues/master.html";
        } else {
            $scope.confirmatione();
        }
    });
}
   $scope.ForgotPassword = function () {
       
    var donnee = $.param($scope.Credential);
    $http({
        method: 'POST',
        url: $scope.link + '/convention/api/Controllers/UtilisateurController.php?Action=ResetPassword&IdUtilisateur='+$scope.IdUtilisateur,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        data: donnee
    }).success(function (data) {

        if (data.Etat == "SUCCES") {
            window.location.href = $scope.link ;
        } else {
            $scope.confirmatione();
        }
    });
}

	//Debut fonction obtenir liste des Utilisateurs
    $scope.getListeUtilisateur = function () {
        $scope.ListeUtilisateur = [];
        $http({ method: 'GET', url: $scope.link +'/convention/api/Controllers/UtilisateurController.php?Action=All' }).
            success(function (data, status, headers, config) {
                $scope.ListeUtilisateur = data;
            });
    }
//Fin fonction obtenir liste des Utilisateurs

//Debut fonction obtenir un Utilisateur
$scope.emailExist = function(email){
    $scope.exist = false;
	  
	for (var i = 0; i < $scope.ListeUtilisateur.length; i++) {
	  
		if ($scope.ListeUtilisateur[i].Email == email){
		  $scope.exist = true;
          $scope.IdUtilisateur = $scope.ListeUtilisateur[i].IdUtilisateur;
		  break;
		}
	}
	return $scope.exist;
}
//Fin fonction obtenir un Utilisateur

    // fonction pour les erreurs d'authentification
    $scope.confirmation = function () {
        swal({
            title: "Erreur authentification",
            text: "Login ou Mot de passe incorrect!",
            icon: "error",
            button: "Reessayer",
            dangerMode: true,
        });
    }
    $scope.confirmatione = function () {
        swal({
            title: "Erreur authentification",
            text: "Ancien Mot de passe incorrect!",
            icon: "error",
            button: "Reessayer",
            dangerMode: true,
        });
    }

    //Debut fonction affichage de la vue mot de passe oublier 
    $scope.AfficheChangePassword = function () {
        $scope.initialiseCredential();
        $scope.VueConnexion = "ChangePassword";
    }
    $scope.AfficheConnexion= function () {
        $scope.initialiseCredential();
        $scope.VueConnexion = "Connexion";
    }
    $scope.AfficheForgot= function () {
        $scope.initialiseCredential();
        $scope.getListeUtilisateur();
        $scope.VueConnexion = "ForgotPassword";
    }
    //Fin fonction affichage de la vue mot de passe oublier

    //verifi le mot de passe et la confirmation
	$scope.error=false;
	$scope.VerifPass = function (NouveauMotPasse,cf) {
		if (NouveauMotPasse!=cf) {
			$scope.error=true;
		}
		else
		{
			$scope.error=false;
		}
	}

    $scope.myFunction = function () {
        var x = document.getElementById("myInput");
        if (x.type === "password") {
          x.type = "text";
        } else {
          x.type = "password";
        }
      }
      

});
