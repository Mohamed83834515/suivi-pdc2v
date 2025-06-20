
    $(document).ready(function () {
        $('#sampleTable').DataTable({
            "language": {
                "sEmptyTable": "Aucune donn&eacute;e disponible dans le tableau",
                "sInfo": "Affichage de l'&eacute;l&eacute;ment _START_ &agrave; _END_ sur _TOTAL_ &eacute;l&eacute;ments",
                "sInfoEmpty": "Affichage de l'&eacute;l&eacute;ment 0 &agrave; 0 sur 0 &eacute;l&eacute;ment",
                "sInfoFiltered": "(filtr&eacute; &agrave; partir de _MAX_ &eacute;l&eacute;ments au total)",
                "sInfoPostFix": "",
                "sInfoThousands": ",",
                "sLengthMenu": "Afficher _MENU_ &eacute;l&eacute;ments",
                "sLoadingRecords": "Chargement...",
                "sProcessing": "Traitement...",
                "sSearch": "Rechercher :",
                "sZeroRecords": "Aucun &eacute;l&eacute;ment correspondant trouv&eacute;",
                "oPaginate": {
                    "sFirst": "Premier",
                    "sLast": "Dernier",
                    "sNext": "Suivant",
                    "sPrevious": "Pr&eacute;c&eacute;dent"
                },
                "oAria": {
                    "sSortAscending": ": activer pour trier la colonne par ordre croissant",
                    "sSortDescending": ": activer pour trier la colonne par ordre d&eacute;croissant"
                },
                "select": {
                    "rows": {
                        "_": "%d lignes s&eacute;lectionn&eacute;es",
                        "0": "Aucune ligne s&eacute;lectionn&eacute;e",
                        "1": "1 ligne s&eacute;lectionn&eacute;e"
                    }
                }
            }
        });
    });