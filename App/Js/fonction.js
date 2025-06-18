

// JavaScript Document
/****************************************************************************
*________________________________________________________________________   *
*   About       :   Convertit jusqu'à  999 999 999 999 999 (billion)        *
*                   avec respect des accords                                *
*_________________________________________________________________________  *			
*   Auteur      :   GALA OUSSE Brice, Engineer programmer of management     *
*   Mail        :   bricegala@yahoo.fr, bricegala@gmail.com                 *
*   Tél         :   +237 99 37 95 83 / +237 79 99 82 80                     *
*   Copyright   :   avril  2007                                             *
* Ce document intitulé « Conversion des nombres en lettre » issu de CommentCaMarche
* (codes-sources.commentcamarche.net) est mis à disposition sous les termes de
* la licence Creative Commons. Vous pouvez copier, modifier des copies de cette
* source, dans les conditions fixées par la licence, tant que cette note    *
* apparaît clairement.                                                      *
*_________________________________________________________________________  *
*****************************************************************************
*/
DECAISSEMENT.controller('MasterController', function($scope, $rootScope,$routeParams,$location,$http,$cookies){

  //Obtenir la datetime au format français
$rootScope.getDateTimeFormatFrensh = function (date) {
	if(typeof date !== "undefined"){	
		var date1 = date.split(" ");
		var heure = date1[1];
		var date2 = date1[0].split("-");
		var date3 = date2[2]+"/"+date2[1]+"/"+date2[0];
		
		return date3+" "+heure;
	}
	}
//Fin obtenir la datetime au format français

//Obtenir la datetime en date simple au format français
$rootScope.getDateTimeFormatFrenshSimple = function (date) {
	if(typeof date !== "undefined"){	
		var date1 = date.split(" ");
		var heure = date1[1];
		var date2 = date1[0].split("-");
		var date3 = date2[2]+"/"+date2[1]+"/"+date2[0];
		
		return date3;
	}
	}
//Fin obtenir la datetime en date simple au format français

//Obtenir la date au format français
$rootScope.getDateFormatFrensh = function (date) {
	if(typeof date !== "undefined"){	
		var date2 = date.split("-");
		var date3 = date2[2]+"/"+date2[1]+"/"+date2[0];
		if(date==""){
		  return "";
		}else{
			return date3;	
		}
	}
	}
//Fin obtenir la date au format français	

//Debut separateur de millier
$rootScope.SepareMilier = function(Nombre){
	
	var formatnumber = function(Nombre, c, d, t){
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

//Debut fonction pour obtenir un nombre en chiffre
$rootScope.convertNumberToWords = function (amount) {
    var words = new Array();
    words[0] = '';
    words[1] = 'Un';
    words[2] = 'Deux';
    words[3] = 'Trois';
    words[4] = 'Quatre';
    words[5] = 'Cinq';
    words[6] = 'Six';
    words[7] = 'Sept';
    words[8] = 'Huit';
    words[9] = 'Neuf';
    words[10] = 'Dix';
    words[11] = 'Onze';
    words[12] = 'Douze';
    words[13] = 'Treize';
    words[14] = 'Quatorze';
    words[15] = 'Quinze';
    words[16] = 'Seize';
    words[17] = 'Dix-sept';
    words[18] = 'Dix-huit';
    words[19] = 'Dix-neuf';
    words[20] = 'Vingt';
    words[30] = 'Trente';
    words[40] = 'Quarente';
    words[50] = 'Cinquante';
    words[60] = 'Soixante';
    words[70] = 'Soitante dix';
    words[80] = 'Quarte vingt';
    words[90] = 'Quatre vingt dix';
    amount = amount.toString();
    var atemp = amount.split(".");
    var number = atemp[0].split(",").join("");
    var n_length = number.length;
    var words_string = "";
    if (n_length <= 9) {
        var n_array = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);
        var received_n_array = new Array();
        for (var i = 0; i < n_length; i++) {
            received_n_array[i] = number.substr(i, 1);
        }
        for (var i = 9 - n_length, j = 0; i < 9; i++, j++) {
            n_array[i] = received_n_array[j];
        }
        for (var i = 0, j = 1; i < 9; i++, j++) {
            if (i == 0 || i == 2 || i == 4 || i == 7) {
                if (n_array[i] == 1) {
                    n_array[j] = 10 + parseInt(n_array[j]);
                    n_array[i] = 0;
                }
            }
        }
        value = "";
        for (var i = 0; i < 9; i++) {
            if (i == 0 || i == 2 || i == 4 || i == 7) {
                value = n_array[i] * 10;
            } else {
                value = n_array[i];
            }
            if (value != 0) {
                words_string += words[value] + " ";
            }
            if ((i == 1 && value != 0) || (i == 0 && value != 0 && n_array[i + 1] == 0)) {
                words_string += "milliards ";
            }
            if ((i == 3 && value != 0) || (i == 2 && value != 0 && n_array[i + 1] == 0)) {
                words_string += "millions ";
            }
            if ((i == 5 && value != 0) || (i == 4 && value != 0 && n_array[i + 1] == 0)) {
                words_string += "mille ";
            }
            if (i == 6 && value != 0 && (n_array[i + 1] != 0 && n_array[i + 2] != 0)) {
                words_string += "cent et ";
            } else if (i == 6 && value != 0) {
                words_string += "cent ";
            }
        }
        words_string = words_string.split("  ").join(" ");
    }
    return words_string;
}
});