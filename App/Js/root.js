var DECAISSEMENT = angular.module('DECAISSEMENT',["ngIdle","ngRoute","ngCookies",'blockUI', 'angularUtils.directives.dirPagination', "cleave.js"]);

DECAISSEMENT.factory('Auth', function($cookies,$http){

    var user = $cookies.get('IdUtilisateur')

    return{
        isLoggedIn : function(){
            return (user) ? user : false;
        },
    }
})

DECAISSEMENT.run(['$rootScope', '$location', 'Auth', function ($rootScope, $location, Auth) {
    
    $rootScope.link ="/tache";
    //  $rootScope.link ="";
    $rootScope.$on('$routeChangeStart', function (event) {
       console.log(Auth.isLoggedIn());
        if (!Auth.isLoggedIn()) {
            console.log('DENY');
            event.preventDefault();
            window.location.href = "../../index.html";
        }
        else {
            // console.log('ALLOW');
        }
        
    });
}]);

DECAISSEMENT.directive('ngFile', ['$parse', function ($parse) {
    return {
       restrict: 'A',
       link: function(scope, element, attrs) {
          element.bind('change', function(){

          $parse(attrs.ngFile).assign(scope,element[0].files)
             scope.$apply();
          });
       }
    };
}]);

DECAISSEMENT.config(function($routeProvider) {
            $routeProvider
            .when("/", {
                templateUrl : "Dashboard/Vues/Dashboard.html",
                controller :"DashboardController"
            })
            .when("/Dashboard", {
                templateUrl : "../../App/Vues/Dashboard/Vues/Dashboard.html",
                controller :"DashboardController"
            })
            .when("/Compte", {
                templateUrl : "../../App/Vues/Utilisateur/Vues/Compte.html",
            })
            .when("/Utilisateur", {
                templateUrl : "../../App/Vues/Administration/Utilisateur/Vues/Utilisateur.html",
                controller : "UtilisateurController"
            })
            .when("/Profil", {
                templateUrl : "../../App/Vues/Administration/Profil/Vues/Profil.html",
                controller : "ProfilController"
            })
            .when("/Recommandation", {
                templateUrl : "../../App/Vues/Recommandation/Vues/Recommandation.html",
                controller : "RecommandationController"
            })
            .when("/Mission", {
                templateUrl : "../../App/Vues/Mission/Vues/Mission.html",
                controller : "MissionController"
            })
            .when("/Add-Utilisateur", {
                templateUrl : "../../App/Vues/Administration/Utilisateur/Vues/Add-Utilisateur.html",
                controller : "UtilisateurController"
            })
            .when("/Update-Utilisateur/:IdUtilisateur", {
                templateUrl : "../../App/Vues/Administration/Utilisateur/Vues/Update-Utilisateur.html",
                controller : "UtilisateurController"
            })
            .when("/Update-Module/:IdUtilisateur", {
                templateUrl : "../../App/Vues/Administration/Utilisateur/Vues/Update-Module.html",
                controller : "UtilisateurController"
            })
            .when("/Module", {
                templateUrl : "../../App/Vues/Administration/Module/Vues/module.html",
                controller : "ModuleController"
            })
            .when("/Decaissement", {
                templateUrl : "../../App/Vues/Decaissement/Vues/Decaissement.html",
                controller : "DecaissementController"
            })
            .when("/SDecaissement", {
                templateUrl : "../../App/Vues/SDecaissement/Vues/SDecaissement.html",
                controller : "SDecaissementController"
            })
            .when("/Prioritaire", {
                templateUrl : "../../App/Vues/Prioritaire/Vues/Prioritaire.html",
                controller : "PrioritaireController"
            })
            .when("/Add-Decaissement", {
                templateUrl : "../../App/Vues/Decaissement/Vues/Add-Decaissement.html",
                controller : "DecaissementController"
            })
            .when("/Add-Decaissement/:IdDecaissement", {
                templateUrl : "../../App/Vues/Decaissement/Vues/Add-Decaissement.html",
                controller : "DecaissementController"
            })
            .when("/Detail-Decaissement/:IdDecaissement", {
                templateUrl : "../../App/Vues/Decaissement/Vues/Detail-Decaissement.html",
                controller : "DecaissementController"
            })
            .when("/Detail-Tache/:IdActivite", {
                templateUrl : "../../App/Vues/Activite/Vues/details-activite.html",
                controller : "ActiviteController"
            })
            .when("/Detail-Decaissements/:IdActivite", {
                templateUrl : "../../App/Vues/Decaissements/Vues/details-decaissements.html",
                controller : "DecaissementsController"
            })
            .when("/Decaissement-en-attente", {
                templateUrl : "../../App/Vues/Decaissement/Vues/Decaissement-en-attente.html",
                controller : "DecaissementController"
            })
            .when("/Decaissement-valider", {
                templateUrl : "../../App/Vues/Decaissement/Vues/Decaissement-valider.html",
                controller : "DecaissementController"
            })
            .when("/Profil", {
                templateUrl : "../../App/Vues/Profil/Vues/Profil.html",
                controller : "ProfilControllers"
            })
            .when("/Relance-Decaissement/:IdDecaissement", {
                templateUrl : "../../App/Vues/Decaissement/Vues/Relance-Decaissement.html",
                controller : "DecaissementController"
            })
            .when("/Motif", {
                templateUrl : "../../App/Vues/Parametrage/Motif/Vues/Motif.html",
                controller : "MotifController"
            })
            .when("/Droit", {
                templateUrl : "../../App/Vues/Administration/Droit/Vues/Droit.html",
                controller : "DroitController"
            })
            .when("/Statut", {
                templateUrl : "../../App/Vues/Parametrage/Statut/Vues/Statut.html",
                controller : "StatutController"
            })
            .when("/Type-pieces", {
                templateUrl : "../../App/Vues/Parametrage/Type-Pieces/Vues/Type-Pieces.html",
                controller : "TypePieceController"
            })
            .when("/Etat", {
                templateUrl : "../../App/Vues/Etat/Vues/Etat.html",
                controller :"EtatController"
            })
            .when("/Difficultes", {
                templateUrl : "../../App/Vues/Difficultes/Vues/Difficultes.html",
                controller :"DifficultesController"
            })
            .when("/Indicateur", {
                templateUrl : "../../App/Vues/Indicateur/Vues/Indicateur.html",
                controller :"IndicateurController"
            })
            .when("/SIndicateur", {
                templateUrl : "../../App/Vues/SIndicateur/Vues/SIndicateur.html",
                controller :"SIndicateurController"
            })
            .when("/Beneficiaire", {
                templateUrl : "../../App/Vues/Parametrage/Beneficiaire/Vues/Beneficiaire.html",
                controller : "BeneficiaireController"
            }) 
            .when("/hebdomadaire", {
                templateUrl : "../../App/Vues/Hebdomadaire/Vues/Hebdomadaire.html",
                controller : "HebdomadaireController"
            }) 
            .when("/Planification", {
                templateUrl : "../../App/Vues/Planification/Vues/Planification.html",
                controller : "PlanificationController"
            }) 
            .when("/Tache", {
                templateUrl : "../../App/Vues/tache/Vues/tache.html",
                controller : "tacheController"
            })
            .when("/Activite", {
                templateUrl : "../../App/Vues/Activite/Vues/activite.html",
                controller : "ActiviteController"
            })
            .when("/Decaissements", {
                templateUrl : "../../App/Vues/Decaissements/Vues/decaissements.html",
                controller : "DecaissementsController"
            })
            .when("/Type-Beneficiaire", {
                        templateUrl : "../../App/Vues/Parametrage/Type-Beneficiaire/Vues/Type-Beneficiaire.html",
                        controller : "TypeBeneficiaireController"
                    })
            .otherwise({
                templateUrl : "../../App/Vues/Dashboard/Vues/Dashboard.html",
                controller :"DashboardController"
              });
            
});
