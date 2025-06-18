DECAISSEMENT.controller('tacheController', function($rootScope,$scope,$http,$cookies,$location, $routeParams){

	$scope.Titre = "Gestion des tachês";//Titre du module
	$scope.ListeTacheByUser = []; //Initialisation tableau liste Utilisateur
	$scope.currentUserId = null; // Selected user id on modal
  
    $scope.numero="";
	$scope.numeroAfficher = 5;
    $scope.InitialiseTache = function () {
        $scope.getListeTacheByUser();
    }
    
    $scope.getListeTacheByUser = function () {
		$scope.totalJour = 0;
		$scope.ListeTacheByUser = [];
		//$scope.nom =$cookies.get("NomUtilisateur");
		$scope.nom ="nzue";
		console.log($scope.nom);
		$http({
			method: 'GET',
			url: 'http://localhost/tache/api/tache_user.php?responsable=nzue',
			//url: 'https://sise-pdc2v.org/api/tache_user.php?responsable='+$scope.nom,
			headers: { 'Content-Type': 'application/x-www-form-urlencoded'}
		}).
			success(function (data) {
				$scope.ListeTacheByUser = data;
                console.log($scope.ListeTacheByUser);
			});
	}

});