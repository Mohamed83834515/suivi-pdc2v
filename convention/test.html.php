<?php 
select `c2_padfa2`.`activite_convention`.`id_activite_convention` AS `id_activite_convention`,`c2_padfa2`.`activite_convention`.`code_activite_convention` AS `code_activite_convention`,
`c2_padfa2`.`activite_convention`.`intitule_activite_convention` AS `intitule_activite_convention`,
`c2_padfa2`.`indicateur_convention`.`id_activite_convention` AS `id_indicateur_convention`,`c2_padfa2`.`indicateur_convention`.`statut` AS `statut`,
`c2_padfa2`.`indicateur_convention`.`intitule_indicateur_convention` AS `intitule_indicateur_convention`,sum(`c2_padfa2`.`cible_indicateur_trimestre`.`cible`) AS `valeur_cible`
 from ((`c2_padfa2`.`activite_convention` join `c2_padfa2`.`indicateur_convention`) join `c2_padfa2`.`cible_indicateur_trimestre`)
  where ((`c2_padfa2`.`activite_convention`.`id_activite_convention` = `c2_padfa2`.`indicateur_convention`.`code_activite`) and
   (`c2_padfa2`.`indicateur_convention`.`id_activite_convention` = `c2_padfa2`.`cible_indicateur_trimestre`.`indicateur`)) group by 
   `c2_padfa2`.`activite_convention`.`id_activite_convention`,`c2_padfa2`.`activite_convention`.`code_activite_convention`,`c2_padfa2`.`activite_convention`.`intitule_activite_convention`,
   `c2_padfa2`.`indicateur_convention`.`id_activite_convention`,`c2_padfa2`.`indicateur_convention`.`intitule_indicateur_convention`,
`c2_padfa2`.`indicateur_convention`.`statut`