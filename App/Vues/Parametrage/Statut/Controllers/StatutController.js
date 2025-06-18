
	DECAISSEMENT.controller('StatutController', function($rootScope,$scope,$http,$cookies){

	$scope.Titre = "Gestion des Statuts";//Titre du module
	$scope.ListeStatut = []; //Initialisation tableau liste Statut
	
	$scope.InitialiseStatutG = function(){

		$scope.InitialiseStatut();
		$scope.getListeStatut();
		
	}

	//Declaration de la classe Statut   
		$scope.Statut = {
			IdTypeStatut:0,
			Libelle:"",
			Datecreation:"",
			IdUtilisateurCreation: $cookies.get('IdUtilisateur')
		};
	//Fin Declaration de la classe Statut 
	

	//Initialisation de la classe Statut   
	$scope.InitialiseStatut = function(){

		$scope.Statut = {
			IdTypeStatut:0,
			Libelle:"",
			Datecreation:"",
			IdUtilisateurCreation: $cookies.get('IdUtilisateur')
		};
	}
	//Fin initialisation de la classe Statut   

	//Debut fonction valider edition Statut

	$scope.ValiderEditionStatut = function()
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
				if($scope.Statut.IdTypeStatut === 0) {
					$scope.InsertStatut();
					$('#exampleModal').modal('hide');
					$scope.InitialiseStatut();
				
				} else{
					$scope.UpdateStatut();
					$('#exampleModal').modal('hide');
					$scope.InitialiseStatut();
				}
			} 
		}); 
	 }


	//Debut fonction valider suppression Statut
	$scope.SuppressionStatut = function(IdTypeStatut){
        
		swal({
			title: "Etes vous sur?",
			text: "Une fois supprimer vous perdez la donnée",
			icon: "warning",
			buttons: true,
			dangerMode: true,
		  })
		  .then((willDelete) => {
			if (willDelete) {
				$scope.DeleteStatut(IdTypeStatut);
			} 
		  }); 
}
	//Fin fonction valider suppression Statut



	//Debut fonction insert Statut
	$scope.InsertStatut = function(){
		
			var donnee = $.param($scope.Statut);
			$http({
				method: 'POST',
				url: $scope.link +'/Api/Controllers/TypeStatutController.php?Action=Add',
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
				data: donnee
			}).success(function (data) {
			
					if(data.Etat == "SUCCES"){
						
						$scope.getListeStatut();
						$scope.InitialiseStatut();
						$scope.confirmationSwal("Statut enregistré avec succès", "success");
					}else{
						// alert(data.Message);
						$scope.confirmationSwal("Echec d'enregistrement", "error");
					}
			});
	}
	//Fin fonction insert Statut

	//Debut fonction update Statut
	$scope.UpdateStatut = function(){

		var donnee = $.param($scope.Statut);
			$http({
				method: 'POST',
				url: $scope.link +'/Api/Controllers/TypeStatutController.php?Action=Update&IdTypeStatut='+$scope.Statut.IdTypeStatut,
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
				data: donnee
			}).success(function (data) {
				
				if(data.Etat == "SUCCES"){
						
						$scope.getListeStatut();
						$scope.confirmationSwal("Statut modifié avec succès", "success");
						
					}else{
						$scope.confirmationSwal("Echec de modification", "success");
						
					}
			});
	}
	//Fin fonction update Statut

	//Debut fonction delete Statut
	$scope.DeleteStatut = function(IdTypeStatut){

		var donnee = $.param($scope.Statut);
			$http({
				method: 'POST',
				url: $scope.link +'/Api/Controllers/TypeStatutController.php?Action=Delete&IdTypeStatut='+IdTypeStatut,
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
				data: donnee
			}).success(function (data) {
				
				if(data.Etat == "SUCCES"){
						
						$scope.getListeStatut();
						$scope.confirmationSwal("Statut supprimé avec succès", "success");
						
					}else{
						
						$scope.confirmationSwal("Echec suppresion", "error");
					}
			});
	}
	//Fin fonction delete Statut

	//Debut fonction obtenir liste des Statuts
		$scope.getListeStatut = function () {

			$scope.ListeStatut = [];

			$http({ method: 'GET', url: $scope.link +'/Api/Controllers/TypeStatutController.php?Action=All' }).
				success(function (data, status, headers, config) {

					$scope.ListeStatut = data;
				});
		}
	//Fin fonction obtenir liste des Statuts

	//Debut fonction obtenir un Statut
	$scope.getStatut = function(IdTypeStatut){
		console.log(IdTypeStatut)
		for (var i = 0; i <= $scope.ListeStatut.length - 1; i++) {
				if ($scope.ListeStatut[i].IdTypeStatut == IdTypeStatut) {
					
					$scope.Statut.IdTypeStatut = $scope.ListeStatut[i].IdTypeStatut;
					$scope.Statut.Libelle = $scope.ListeStatut[i].Libelle;
					$scope.Statut.Datecreation = $scope.ListeStatut[i].Datecreation;
					$scope.Statut.IdUtilisateurCreation = $scope.ListeStatut[i].IdUtilisateur;
					break;
				}
			}
	}
	//Fin fonction obtenir un Statut

	//pagination
	$scope.numeroAfficher = 5;
//fin

});