-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema ruche_v1
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema ruche_v1
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `ruche_v1` DEFAULT CHARACTER SET utf8 ;
USE `ruche_v1` ;

-- -----------------------------------------------------
-- Table `ruche_v1`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ruche_v1`.`users` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `profil_id` BIGINT UNSIGNED NOT NULL,
  `structure_id` BIGINT UNSIGNED NULL DEFAULT NULL,
  `nom` VARCHAR(255) NULL DEFAULT NULL,
  `prenom` VARCHAR(255) NULL DEFAULT NULL,
  `email` VARCHAR(100) NOT NULL,
  `fonction_id` BIGINT UNSIGNED NULL DEFAULT NULL,
  `first_connected_at` TIMESTAMP NULL DEFAULT NULL,
  `email_verified_at` TIMESTAMP NULL DEFAULT NULL,
  `password` VARCHAR(255) NOT NULL,
  `two_factor_secret` TEXT NULL DEFAULT NULL,
  `two_factor_recovery_codes` TEXT NULL DEFAULT NULL,
  `remember_token` VARCHAR(100) NULL DEFAULT NULL,
  `deleted_at` TIMESTAMP NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  `idusrcreation` BIGINT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `users_email_unique` (`email` ASC),
  INDEX `users_profil_id_index` (`profil_id` ASC),
  INDEX `users_structure_id_index` (`structure_id` ASC),
  INDEX `users_fonction_id_index` (`fonction_id` ASC),
  INDEX `users_idusrcreation_index` (`idusrcreation` ASC))
ENGINE = INNODB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `ruche_v1`.`marche_methode_mm`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ruche_v1`.`marche_methode_mm` (
  `id_methode_mm` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `sigle_mm` VARCHAR(255) NOT NULL,
  `description` TEXT NOT NULL,
  `categorie_concerne_mm` VARCHAR(11) NOT NULL,
  `geler_mm` INT NOT NULL DEFAULT '0',
  `idusrcreation` BIGINT UNSIGNED NOT NULL,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id_methode_mm`),
  INDEX `marche_methode_mm_categorie_concerne_mm_foreign` (`categorie_concerne_mm` ASC),
  INDEX `marche_methode_mm_idusrcreation_foreign` (`idusrcreation` ASC))
ENGINE = INNODB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `ruche_v1`.`marche_modele_mod`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ruche_v1`.`marche_modele_mod` (
  `id_modele` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `code_mod` VARCHAR(60) NOT NULL,
  `methode_concerne_mod` VARCHAR(11) NULL DEFAULT NULL,
  `examen_mod` VARCHAR(30) NULL DEFAULT NULL,
  `montant_min_mod` DOUBLE NULL DEFAULT NULL,
  `montant_max_mod` DOUBLE NULL DEFAULT NULL,
  `geler_mod` INT NOT NULL DEFAULT '0',
  `idusrcreation` BIGINT UNSIGNED NOT NULL,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  `marche_methode_mm_id_methode_mm` BIGINT UNSIGNED NOT NULL,
  PRIMARY KEY (`id_modele`),
  INDEX `marche_modele_mod_methode_concerne_mod_foreign` (`methode_concerne_mod` ASC),
  INDEX `marche_modele_mod_idusrcreation_foreign` (`idusrcreation` ASC),
  INDEX `fk_marche_modele_mod_marche_methode_mm1_idx` (`marche_methode_mm_id_methode_mm` ASC),
  UNIQUE INDEX `code_mod_UNIQUE` (`code_mod` ASC))
ENGINE = INNODB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `ruche_v1`.`type_programme_tpr`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ruche_v1`.`type_programme_tpr` (
  `id_tpr` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `nom_tpr` VARCHAR(255) NOT NULL,
  `description_tpr` VARCHAR(255) NULL DEFAULT NULL,
  `idusrcreation` BIGINT UNSIGNED NULL DEFAULT NULL,
  `geler_tpr` INT NOT NULL DEFAULT '0',
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id_tpr`),
  INDEX `type_programme_tpr_idusrcreation_foreign` (`idusrcreation` ASC))
ENGINE = INNODB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `ruche_v1`.`programme_prg`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ruche_v1`.`programme_prg` (
  `id_prg` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `code_prg` VARCHAR(11) NOT NULL,
  `sigle_prg` VARCHAR(255) NULL DEFAULT NULL,
  `nom_prg` VARCHAR(255) NULL DEFAULT NULL,
  `vision_prg` VARCHAR(255) NULL DEFAULT NULL,
  `objectif_prg` VARCHAR(255) NULL DEFAULT NULL,
  `date_debut_prg` DATE NULL DEFAULT NULL,
  `date_fin_prg` DATE NULL DEFAULT NULL,
  `actif_prg` TINYINT(1) NOT NULL DEFAULT '0',
  `budget_estimatif_prg` BIGINT NOT NULL,
  `type_programme_prg` BIGINT UNSIGNED NOT NULL,
  `geler_prg` INT NOT NULL DEFAULT '0',
  `idusrcreation` BIGINT UNSIGNED NOT NULL,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id_prg`),
  UNIQUE INDEX `programme_prg_code_prg_unique` (`code_prg` ASC),
  INDEX `programme_prg_idusrcreation_foreign` (`idusrcreation` ASC),
  INDEX `programme_prg_type_programme_prg_foreign` (`type_programme_prg` ASC),
  INDEX `programme_prg_geler_prg_index` (`geler_prg` ASC))
ENGINE = INNODB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `ruche_v1`.`projet_prj`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ruche_v1`.`projet_prj` (
  `id_prj` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `code_prj` VARCHAR(10) NOT NULL,
  `sigle_prj` VARCHAR(255) NOT NULL,
  `intitule_prj` VARCHAR(255) NULL DEFAULT NULL,
  `duree_prj` INT NULL DEFAULT NULL,
  `date_signature_prj` DATE NULL DEFAULT NULL,
  `date_demarrage_prj` DATE NULL DEFAULT NULL,
  `logo_prj` VARCHAR(255) NULL DEFAULT NULL,
  `actif_prj` TINYINT(1) NOT NULL DEFAULT '0',
  `direction_lead_prj` INT NULL DEFAULT NULL,
  `maitre_oeuvre_prj` VARCHAR(255) NULL DEFAULT NULL,
  `date_fin_prj` DATE NULL DEFAULT NULL,
  `financement_prj` VARCHAR(255) NULL DEFAULT NULL,
  `matrice_prj` TEXT NULL DEFAULT NULL,
  `couverture_prj` TEXT NULL DEFAULT NULL,
  `objectifs_prj` TEXT NULL DEFAULT NULL,
  `type_projet_prj` INT NULL DEFAULT NULL,
  `mode_execution_prj` TEXT NULL DEFAULT NULL,
  `priorite_prj` TEXT NULL DEFAULT NULL,
  `resultats_prj` TEXT NULL DEFAULT NULL,
  `fichier_shape_file_prj` VARCHAR(255) NULL DEFAULT NULL,
  `couleur_prj` VARCHAR(255) NULL DEFAULT NULL,
  `zone_prj` TEXT NULL DEFAULT NULL,
  `thematiques` TEXT NULL DEFAULT NULL,
  `description_prj` TEXT NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  `codeprg_prj` VARCHAR(11) NULL DEFAULT NULL,
  `idusrcreation` BIGINT UNSIGNED NULL DEFAULT NULL,
  PRIMARY KEY (`id_prj`),
  UNIQUE INDEX `projet_prj_code_prj_unique` (`code_prj` ASC),
  INDEX `projet_prj_idusrcreation_foreign` (`idusrcreation` ASC),
  INDEX `projet_prj_codeprg_prj_foreign` (`codeprg_prj` ASC))
ENGINE = INNODB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `ruche_v1`.`marche_version_mve`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ruche_v1`.`marche_version_mve` (
  `id_mve` INT NOT NULL AUTO_INCREMENT,
  `date_version` DATE NULL,
  `numero_version` VARCHAR(45) NULL,
  `idusrcreation_mve` BIGINT(11) UNSIGNED NOT NULL,
  PRIMARY KEY (`id_mve`),
  INDEX `idusrcreation_mve_idx` (`idusrcreation_mve` ASC),
  CONSTRAINT `idusrcreation_mve`
    FOREIGN KEY (`idusrcreation_mve`)
    REFERENCES `ruche_v1`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `ruche_v1`.`type_partenaire_tpt`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ruche_v1`.`type_partenaire_tpt` (
  `id_tpt` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `nom_tpt` VARCHAR(255) NOT NULL,
  `description_tpt` VARCHAR(255) NULL DEFAULT NULL,
  `geler_tpt` INT NOT NULL DEFAULT '0',
  `idusrcreation` BIGINT UNSIGNED NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id_tpt`),
  INDEX `type_partenaire_tpt_idusrcreation_foreign` (`idusrcreation` ASC))
ENGINE = INNODB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `ruche_v1`.`partenaire_pat`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ruche_v1`.`partenaire_pat` (
  `id_pat` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `code_pat` VARCHAR(10) NOT NULL,
  `sigle_pat` VARCHAR(100) NULL DEFAULT NULL,
  `definition_pat` VARCHAR(100) NULL DEFAULT NULL,
  `type_pat` BIGINT UNSIGNED NOT NULL,
  `contact_pat` VARCHAR(30) NULL DEFAULT NULL,
  `email_pat` VARCHAR(60) NULL DEFAULT NULL,
  `logo_pat` VARCHAR(255) NULL DEFAULT NULL,
  `geler_pat` INT NOT NULL DEFAULT '0',
  `idusrcreation` BIGINT UNSIGNED NOT NULL,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  `type_partenaire_tpt_id_tpt` BIGINT UNSIGNED NOT NULL,
  PRIMARY KEY (`id_pat`),
  INDEX `partenaire_pat_idusrcreation_foreign` (`idusrcreation` ASC),
  INDEX `partenaire_pat_type_pat_foreign` (`type_pat` ASC),
  INDEX `partenaire_pat_geler_pat_index` (`geler_pat` ASC),
  INDEX `fk_partenaire_pat_type_partenaire_tpt1_idx` (`type_partenaire_tpt_id_tpt` ASC),
  UNIQUE INDEX `code_pat_UNIQUE` (`code_pat` ASC))
ENGINE = INNODB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `ruche_v1`.`marche_plan_plm`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ruche_v1`.`marche_plan_plm` (
  `id_plm` SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `modele_marche_plm` VARCHAR(60) NULL,
  `code_plm` VARCHAR(60) NULL,
  `composante_plm` VARCHAR(60) NULL,
  `periode` VARCHAR(60) NULL,
  `projet_plm` VARCHAR(10) NOT NULL,
  `version_plm` INT NULL,
  `intitule_plm` LONGTEXT NULL,
  `lot_plm` INT NULL,
  `montant_usd_plm` DOUBLE NULL,
  `methode_plm` BIGINT(11) UNSIGNED NULL,
  `examen_banque_plm` VARCHAR(45) NULL,
  `examen_dncmp_plm` VARCHAR(45) NULL,
  `date_prevue_plm` DATE NULL,
  `partenaire_plm` VARCHAR(45) NULL,
  `description_plm` LONGTEXT NULL,
  `idusrcreation_plm` BIGINT(11) UNSIGNED NOT NULL,
  `marche_plan_plmcol` VARCHAR(45) NULL,
  `date_creation_plm` VARCHAR(45) NULL,
  PRIMARY KEY (`id_plm`),
  INDEX `modele_marche_plm_idx` (`modele_marche_plm` ASC),
  UNIQUE INDEX `code_plm_UNIQUE` (`code_plm` ASC),
  UNIQUE INDEX `projet_plm_UNIQUE` (`projet_plm` ASC),
  INDEX `version_plm_idx` (`version_plm` ASC),
  INDEX `methode_plm_idx` (`methode_plm` ASC),
  INDEX `partenaire_plm_idx` (`partenaire_plm` ASC),
  INDEX `idusrcreation_plm_idx` (`idusrcreation_plm` ASC),
  CONSTRAINT `modele_marche_plm`
    FOREIGN KEY (`modele_marche_plm`)
    REFERENCES `ruche_v1`.`marche_modele_mod` (`code_mod`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `projet_plm`
    FOREIGN KEY (`projet_plm`)
    REFERENCES `ruche_v1`.`projet_prj` (`code_prj`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `version_plm`
    FOREIGN KEY (`version_plm`)
    REFERENCES `ruche_v1`.`marche_version_mve` (`id_mve`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `methode_plm`
    FOREIGN KEY (`methode_plm`)
    REFERENCES `ruche_v1`.`marche_modele_mod` (`id_modele`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `partenaire_plm`
    FOREIGN KEY (`partenaire_plm`)
    REFERENCES `ruche_v1`.`partenaire_pat` (`code_pat`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `idusrcreation_plm`
    FOREIGN KEY (`idusrcreation_plm`)
    REFERENCES `ruche_v1`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `ruche_v1`.`classeur_cl`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ruche_v1`.`classeur_cl` (
  `id_cl` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `libelle_cl` TEXT NOT NULL,
  `couleur_cl` TEXT NULL DEFAULT NULL,
  `projet_cl` VARCHAR(10) NOT NULL,
  `enregisrer_par_cl` VARCHAR(255) NOT NULL,
  `modifier_par_cl` VARCHAR(255) NULL DEFAULT NULL,
  `geler_cl` INT NOT NULL DEFAULT '0',
  `created_at` DATE NOT NULL,
  `updated_at` DATE NULL DEFAULT NULL,
  `idusrcreation` BIGINT UNSIGNED NOT NULL,
  PRIMARY KEY (`id_cl`),
  INDEX `classeur_cl_idusrcreation_foreign` (`idusrcreation` ASC),
  INDEX `classeur_cl_projet_cl_foreign` (`projet_cl` ASC))
ENGINE = INNODB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `ruche_v1`.`feuille_fel`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ruche_v1`.`feuille_fel` (
  `id_fel` BIGINT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `classeur_fel` BIGINT(11) UNSIGNED NOT NULL,
  `nom_fel` VARCHAR(255) NULL,
  `table_fel` VARCHAR(255) NULL,
  `idusrcreation_fel` BIGINT(11) UNSIGNED NULL,
  `geler_fel` INT NULL DEFAULT 0,
  PRIMARY KEY (`id_fel`),
  INDEX `classeur_fel_idx` (`classeur_fel` ASC),
  INDEX `idusrcreation_fel_idx` (`idusrcreation_fel` ASC),
  CONSTRAINT `classeur_fel`
    FOREIGN KEY (`classeur_fel`)
    REFERENCES `ruche_v1`.`classeur_cl` (`id_cl`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `idusrcreation_fel`
    FOREIGN KEY (`idusrcreation_fel`)
    REFERENCES `ruche_v1`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `ruche_v1`.`colonnes_feuilles_col`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ruche_v1`.`colonnes_feuilles_col` (
  `id_col` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `id_feuille` BIGINT(11) UNSIGNED NOT NULL,
  `nom_col` VARCHAR(255) NULL,
  `rang_col` YEAR NULL,
  `affiche_col` INT UNSIGNED NOT NULL,
  `original_language_id` INT UNSIGNED NULL DEFAULT 0,
  `rental_duration` TINYINT UNSIGNED NOT NULL DEFAULT 3,
  `rental_rate` DECIMAL(4,2) NOT NULL DEFAULT 4.99,
  `length` SMALLINT UNSIGNED NULL DEFAULT NULL,
  `replacement_cost` DECIMAL(5,2) NOT NULL DEFAULT 19.99,
  `rating` ENUM('G','PG','PG-13','R','NC-17') NULL DEFAULT 'G',
  `special_features` SET('Trailers','Commentaries','Deleted Scenes','Behind the Scenes') NULL,
  `last_update` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_title` (`id_feuille` ASC),
  PRIMARY KEY (`id_col`),
  CONSTRAINT `id_feuille`
    FOREIGN KEY (`id_feuille`)
    REFERENCES `ruche_v1`.`feuille_fel` (`id_fel`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `ruche_v1`.`recommandation_action_rma`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ruche_v1`.`recommandation_action_rma` (
  `id_rma` BIGINT(11) UNSIGNED NOT NULL,
  `resume_rma` VARCHAR(45) NOT NULL,
  `intitule_rma` VARCHAR(45) NULL,
  `code_rma` VARCHAR(10) NULL,
  `date_butoir_rma` DATE NULL,
  `structure_concerne_rma` VARCHAR(50) NULL DEFAULT NULL,
  `date_suivi_rma` DATE NOT NULL,
  PRIMARY KEY (`id_rma`),
  INDEX `structure_concerne_rma_idx` (`structure_concerne_rma` ASC),
  CONSTRAINT `structure_concerne_rma`
    FOREIGN KEY (`structure_concerne_rma`)
    REFERENCES `ruche_v1`.`partenaire_pat` (`code_pat`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `ruche_v1`.`rapport_rap`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ruche_v1`.`rapport_rap` (
  `id_rapport` SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `nom_rapport` VARCHAR(255) NULL,
  `classeurs_rap` JSON NULL,
  `tables_rap` LONGTEXT NULL,
  `colonnes_select_rap` LONGTEXT NULL,
  `type_rap` VARCHAR(45) NULL,
  `date_insertion_rap` DATE NULL,
  `criteres_rap` JSON NULL,
  `group_by_rap` JSON NULL,
  `indicateur_ref_rap` VARCHAR(45) NULL,
  `operation_rap` VARCHAR(45) NULL,
  `geler_rap` INT NULL DEFAULT 0,
  `affichage_dashboard_rap` INT NULL DEFAULT 0,
  `idusrcreation_rap` BIGINT(11) UNSIGNED NOT NULL,
  PRIMARY KEY (`id_rapport`),
  INDEX `idusrcreation_rap_idx` (`idusrcreation_rap` ASC),
  CONSTRAINT `idusrcreation_rap`
    FOREIGN KEY (`idusrcreation_rap`)
    REFERENCES `ruche_v1`.`users` (`id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `ruche_v1`.`niveau_cadre_logique_ncl`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ruche_v1`.`niveau_cadre_logique_ncl` (
  `id_ncl` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `libelle_ncl` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  `programme_ncl` VARCHAR(11) NULL DEFAULT NULL,
  `niveau_ncl` INT NOT NULL,
  `geler_ncl` INT NOT NULL DEFAULT '0',
  `idusrcreation` BIGINT UNSIGNED NULL DEFAULT NULL,
  PRIMARY KEY (`id_ncl`),
  INDEX `niveau_cadre_logique_ncl_idusrcreation_foreign` (`idusrcreation` ASC),
  INDEX `niveau_cadre_logique_ncl_programme_ncl_foreign` (`programme_ncl` ASC))
ENGINE = INNODB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `ruche_v1`.`cadre_logique_cl`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ruche_v1`.`cadre_logique_cl` (
  `id_cl` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `code_cl` VARCHAR(20) NULL DEFAULT NULL,
  `projet_cl` VARCHAR(11) NULL DEFAULT NULL,
  `programme_cl` VARCHAR(11) NULL DEFAULT NULL,
  `intitule_cl` VARCHAR(255) NULL DEFAULT NULL,
  `id_parent_cl` BIGINT UNSIGNED NULL DEFAULT NULL,
  `id_niv_cl` BIGINT UNSIGNED NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  `idusrcreation` BIGINT UNSIGNED NULL DEFAULT NULL,
  `geler_cl` INT NOT NULL DEFAULT '0',
  `cout_cl` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id_cl`),
  INDEX `cadre_logique_cl_idusrcreation_foreign` (`idusrcreation` ASC),
  INDEX `cadre_logique_cl_projet_cl_foreign` (`projet_cl` ASC),
  INDEX `cadre_logique_cl_id_niv_cl_foreign` (`id_niv_cl` ASC),
  INDEX `cadre_logique_cl_programme_cl_foreign` (`programme_cl` ASC),
  INDEX `cadre_logique_cl_geler_cl_index` (`geler_cl` ASC),
  INDEX `fk_id_parent_cadre_cl_idx` (`id_parent_cl` ASC))
ENGINE = INNODB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `ruche_v1`.`niveau_cadre_resultat_projet_ncrp`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ruche_v1`.`niveau_cadre_resultat_projet_ncrp` (
  `id_ncrp` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `libelle_ncrp` VARCHAR(255) NULL DEFAULT NULL,
  `projet_ncrp` VARCHAR(11) NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  `niveau_ncrp` INT NOT NULL,
  `geler_ncrp` INT NOT NULL DEFAULT '0',
  `idusrcreation` BIGINT UNSIGNED NULL DEFAULT NULL,
  PRIMARY KEY (`id_ncrp`),
  INDEX `niveau_cadre_resultat_projet_ncrp_idusrcreation_foreign` (`idusrcreation` ASC),
  INDEX `niveau_cadre_resultat_projet_ncrp_projet_ncrp_foreign` (`projet_ncrp` ASC))
ENGINE = INNODB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `ruche_v1`.`categorie_depense_cat`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ruche_v1`.`categorie_depense_cat` (
  `id_cat` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `code_cat` VARCHAR(11) NOT NULL,
  `nom_cat` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  `geler_cat` INT NOT NULL DEFAULT '0',
  `idusrcreation` BIGINT UNSIGNED NULL DEFAULT NULL,
  PRIMARY KEY (`id_cat`),
  UNIQUE INDEX `categorie_depense_cat_code_cat_unique` (`code_cat` ASC),
  INDEX `categorie_depense_cat_idusrcreation_foreign` (`idusrcreation` ASC),
  INDEX `categorie_depense_cat_geler_cat_index` (`geler_cat` ASC))
ENGINE = INNODB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `ruche_v1`.`unite_indicateur_uti`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ruche_v1`.`unite_indicateur_uti` (
  `id_uti` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `code_uti` VARCHAR(11) NOT NULL,
  `nom_uti` VARCHAR(255) NULL DEFAULT NULL,
  `geler_uti` INT NOT NULL DEFAULT '0',
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  `idusrcreation` BIGINT UNSIGNED NULL DEFAULT NULL,
  PRIMARY KEY (`id_uti`),
  UNIQUE INDEX `unite_indicateur_uti_code_uti_unique` (`code_uti` ASC),
  INDEX `unite_indicateur_uti_idusrcreation_foreign` (`idusrcreation` ASC),
  INDEX `unite_indicateur_uti_geler_uti_index` (`geler_uti` ASC))
ENGINE = INNODB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `ruche_v1`.`referentiel_indicateur_ri`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ruche_v1`.`referentiel_indicateur_ri` (
  `id_ref_ind` BIGINT(11) UNSIGNED NOT NULL,
  `code_ref_ind` VARCHAR(11) NOT NULL,
  `intitule_ref_ind` BIGINT(11) UNSIGNED NULL,
  `type_ref_ind` INT NULL DEFAULT NULL,
  `description_ref_ind` VARCHAR(255) NULL DEFAULT NULL,
  `unite_ref_ind` VARCHAR(255) NULL DEFAULT NULL,
  `mode_suivi_ref_ind` INT NULL DEFAULT NULL,
  `mode_calcul_ref_ind` VARCHAR(255) NULL DEFAULT NULL,
  `fonction_agregat_ref_ind` VARCHAR(255) NULL,
  `beneficiaire_ref_ind` VARCHAR(11) NULL,
  `geler_ref_ind` INT NOT NULL DEFAULT '0',
  `idusrcreation` BIGINT UNSIGNED NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id_ref_ind`),
  INDEX `referentiel_indicateur_ri_idusrcreation_foreign` (`idusrcreation` ASC),
  INDEX `fk_unite_indicateur_idx` (`intitule_ref_ind` ASC),
  UNIQUE INDEX `code_ref_ind_UNIQUE` (`code_ref_ind` ASC))
ENGINE = INNODB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `ruche_v1`.`indicateur_programme_iprg`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ruche_v1`.`indicateur_programme_iprg` (
  `id_iprg` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `code_iprg` VARCHAR(11) NOT NULL,
  `intitule_iprg` VARCHAR(255) NULL DEFAULT NULL,
  `niveau_iprg` BIGINT(11) UNSIGNED NULL,
  `intitule_cible_iprg` VARCHAR(255) NULL DEFAULT NULL,
  `valeur_cible_iprg` VARCHAR(255) NULL DEFAULT NULL,
  `annee_reference_iprg` VARCHAR(255) NULL DEFAULT NULL,
  `valeur_reference_iprg` VARCHAR(255) NULL DEFAULT NULL,
  `referentiel_iprg` VARCHAR(11) NOT NULL,
  `unite_iprg` VARCHAR(11) NULL DEFAULT NULL,
  `source_verification_iprg` VARCHAR(255) NULL DEFAULT NULL,
  `mode_calcul_iprg` VARCHAR(255) NULL DEFAULT NULL,
  `description_iprg` VARCHAR(255) NULL DEFAULT NULL,
  `projet_iprg` VARCHAR(11) NOT NULL,
  `echelle_iprg` INT NOT NULL DEFAULT '1',
  `enregistrer_par_iprg` VARCHAR(255) NULL DEFAULT NULL,
  `periodicite_calcul_iprg` BIGINT NULL DEFAULT NULL,
  `donnees_sources_iprg` VARCHAR(255) NULL DEFAULT NULL,
  `niveau_desagregation_iprg` BIGINT NULL DEFAULT NULL,
  `moyen_diffusion_iprg` BIGINT NULL DEFAULT NULL,
  `responsabilite_calcul_iprg` VARCHAR(255) NULL DEFAULT NULL,
  `methode_collecte_iprg` VARCHAR(255) NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  `page_iprg` VARCHAR(255) NOT NULL,
  `idusrcreation` BIGINT UNSIGNED NULL DEFAULT NULL,
  `geler_iprg` INT NOT NULL DEFAULT '0',
  PRIMARY KEY (`id_iprg`),
  INDEX `indicateur_programme_iprg_referentiel_iprg_foreign` (`referentiel_iprg` ASC),
  INDEX `indicateur_programme_iprg_projet_iprg_foreign` (`projet_iprg` ASC),
  INDEX `indicateur_programme_iprg_idusrcreation_foreign` (`idusrcreation` ASC),
  INDEX `indicateur_programme_iprg_niveau_iprg_index` (`niveau_iprg` ASC),
  INDEX `indicateur_programme_iprg_unite_iprg_index` (`unite_iprg` ASC))
ENGINE = INNODB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `ruche_v1`.`indicateur_projet_iprj`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ruche_v1`.`indicateur_projet_iprj` (
  `id_iprj` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `niveau_iprj` INT NULL DEFAULT NULL,
  `liaison_prg_iprj` VARCHAR(11) NULL DEFAULT NULL,
  `code_indicateur_iprj` VARCHAR(11) NOT NULL,
  `code_iprj` VARCHAR(11) NULL DEFAULT NULL,
  `intitule_iprj` VARCHAR(255) NULL DEFAULT NULL,
  `unite_iprj` VARCHAR(11) NULL DEFAULT NULL,
  `intitule_cible_iprj` VARCHAR(255) NULL DEFAULT NULL,
  `valeur_cible_iprj` DOUBLE NULL DEFAULT NULL,
  `valeur_cible_rmp_iprj` VARCHAR(255) NULL DEFAULT NULL,
  `intitule_reference_iprj` VARCHAR(255) NULL DEFAULT NULL,
  `annee_reference_iprj` INT NULL DEFAULT NULL,
  `valeur_reference_iprj` DOUBLE NULL DEFAULT NULL,
  `periodicite_iprj` VARCHAR(255) NULL DEFAULT NULL,
  `source_verification_iprj` VARCHAR(255) NULL DEFAULT NULL,
  `fonction_agregat_iprj` VARCHAR(255) NULL DEFAULT NULL,
  `referentiel_iprj` BIGINT UNSIGNED NULL DEFAULT NULL,
  `typologie_iprj` INT NOT NULL DEFAULT '1',
  `responsable_iprj` VARCHAR(255) NULL DEFAULT NULL,
  `fournisseur_iprj` VARCHAR(255) NULL DEFAULT NULL,
  `description_iprj` VARCHAR(255) NULL DEFAULT NULL,
  `echelle_iprj` VARCHAR(255) NULL DEFAULT NULL,
  `mode_suivi_iprj` VARCHAR(255) NULL DEFAULT NULL,
  `categorie_indicateur_iprj` INT NULL DEFAULT NULL,
  `paccueil` VARCHAR(255) NULL DEFAULT NULL,
  `enregistrer_par_iprj` VARCHAR(255) NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  `geler_iprj` INT NOT NULL DEFAULT '0',
  `idusrcreation` BIGINT UNSIGNED NULL DEFAULT NULL,
  PRIMARY KEY (`id_iprj`),
  INDEX `indicateur_projet_iprj_referentiel_iprj_foreign` (`referentiel_iprj` ASC),
  INDEX `indicateur_projet_iprj_idusrcreation_foreign` (`idusrcreation` ASC),
  INDEX `indicateur_projet_iprj_liaison_prg_iprj_foreign` (`liaison_prg_iprj` ASC),
  INDEX `indicateur_projet_iprj_niveau_iprj_index` (`niveau_iprj` ASC),
  INDEX `indicateur_projet_iprj_unite_iprj_index` (`unite_iprj` ASC),
  UNIQUE INDEX `code_indicateur_iprj_UNIQUE` (`code_indicateur_iprj` ASC))
ENGINE = INNODB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `ruche_v1`.`cadre_resultat_projet_crp`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ruche_v1`.`cadre_resultat_projet_crp` (
  `id_crp` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `projet_crp` VARCHAR(11) NULL DEFAULT NULL,
  `code_crp` VARCHAR(11) NOT NULL,
  `intitule_crp` VARCHAR(255) NOT NULL,
  `abge_crp` VARCHAR(255) NULL DEFAULT NULL,
  `id_niv_crp` BIGINT UNSIGNED NULL DEFAULT NULL,
  `id_parent_crp` BIGINT UNSIGNED NULL DEFAULT NULL,
  `liaison_crp` VARCHAR(11) NULL DEFAULT NULL,
  `type_resultat_crp` VARCHAR(255) NULL DEFAULT NULL,
  `budget_activite_crp` DOUBLE NULL DEFAULT NULL,
  `categorie_depense_crp` VARCHAR(11) NULL DEFAULT NULL,
  `commentaire_activite_crp` VARCHAR(255) NULL DEFAULT NULL,
  `geler_crp` INT NOT NULL DEFAULT '0',
  `idusrcreation` BIGINT UNSIGNED NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id_crp`),
  INDEX `cadre_resultat_projet_crp_idusrcreation_foreign` (`idusrcreation` ASC),
  INDEX `cadre_resultat_projet_crp_projet_crp_foreign` (`projet_crp` ASC),
  INDEX `cadre_resultat_projet_crp_id_niv_crp_foreign` (`id_niv_crp` ASC),
  INDEX `cadre_resultat_projet_crp_liaison_crp_foreign` (`liaison_crp` ASC),
  INDEX `cadre_resultat_projet_crp_categorie_depense_crp_foreign` (`categorie_depense_crp` ASC),
  INDEX `fk_cadre_logique_idx` (`id_parent_crp` ASC))
ENGINE = INNODB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `ruche_v1`.`convention_cvt`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ruche_v1`.`convention_cvt` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `code_cvt` VARCHAR(11) NOT NULL,
  `partenaire_cvt` VARCHAR(11) NULL DEFAULT NULL,
  `intitule_cvt` VARCHAR(255) NULL DEFAULT NULL,
  `code_reference_cvt` VARCHAR(50) NULL DEFAULT NULL,
  `montant_cvt` DOUBLE(21,2) NULL DEFAULT NULL,
  `projet_cvt` VARCHAR(11) NULL DEFAULT NULL,
  `structure_cvt` VARCHAR(11) NULL DEFAULT NULL,
  `geler_cvt` INT NOT NULL DEFAULT '0',
  `date_signature_cvt` DATE NOT NULL,
  `champ_app_cvt` TEXT NULL DEFAULT NULL,
  `date_debut_cvt` DATE NULL DEFAULT NULL,
  `date_fin_cvt` DATE NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  `idusrcreation` BIGINT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `convention_cvt_idusrcreation_foreign` (`idusrcreation` ASC),
  INDEX `convention_cvt_projet_cvt_foreign` (`projet_cvt` ASC),
  INDEX `convention_cvt_partenaire_cvt_foreign` (`partenaire_cvt` ASC),
  INDEX `convention_cvt_geler_cvt_index` (`geler_cvt` ASC))
ENGINE = INNODB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `ruche_v1`.`convention_resultat`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ruche_v1`.`convention_resultat` (
  `id_cvr` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `code_cvr` VARCHAR(11) NULL DEFAULT NULL,
  `convention_cvr` VARCHAR(11) NULL DEFAULT NULL,
  `intitule_cvr` VARCHAR(255) NULL DEFAULT NULL,
  `ordre_cvr` INT NULL DEFAULT NULL,
  `fiche_cvr` INT NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  `geler_cvr` INT NOT NULL DEFAULT '0',
  `idusrcreation` BIGINT UNSIGNED NOT NULL,
  PRIMARY KEY (`id_cvr`),
  INDEX `convention_resultat_convention_cvr_foreign` (`convention_cvr` ASC),
  INDEX `convention_resultat_idusrcreation_foreign` (`idusrcreation` ASC),
  INDEX `convention_resultat_geler_cvr_index` (`geler_cvr` ASC))
ENGINE = INNODB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `ruche_v1`.`convention_activite_ac`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ruche_v1`.`convention_activite_ac` (
  `id_activite_convention_ac` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `code_activite_convention_ac` VARCHAR(11) NOT NULL,
  `code_resultat_ac` VARCHAR(11) NOT NULL,
  `code_activite_ac` VARCHAR(255) NOT NULL,
  `intitule_activite_convention_ac` TEXT NOT NULL,
  `mois_ac` VARCHAR(255) NULL DEFAULT NULL,
  `ordre_ac` INT NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  `geler_ac` INT NOT NULL DEFAULT '0',
  `idusrcreation` BIGINT UNSIGNED NOT NULL,
  PRIMARY KEY (`id_activite_convention_ac`),
  INDEX `convention_activite_ac_idusrcreation_foreign` (`idusrcreation` ASC),
  INDEX `convention_activite_ac_code_resultat_ac_foreign` (`code_resultat_ac` ASC))
ENGINE = INNODB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `ruche_v1`.`niveau_plan_analytique_npa`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ruche_v1`.`niveau_plan_analytique_npa` (
  `id_npa` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `libelle_npa` VARCHAR(255) NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  `projet_npa` VARCHAR(11) NULL DEFAULT NULL,
  `programme_npa` VARCHAR(11) NULL DEFAULT NULL,
  `niveau_npa` INT NOT NULL,
  `taille_npa` INT NOT NULL,
  `geler_npa` INT NOT NULL DEFAULT '0',
  `idusrcreation` BIGINT UNSIGNED NOT NULL,
  PRIMARY KEY (`id_npa`),
  INDEX `niveau_plan_analytique_npa_idusrcreation_foreign` (`idusrcreation` ASC),
  INDEX `niveau_plan_analytique_npa_projet_npa_foreign` (`projet_npa` ASC),
  INDEX `niveau_plan_analytique_npa_programme_npa_foreign` (`programme_npa` ASC))
ENGINE = INNODB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `ruche_v1`.`plan_analytique_pa`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ruche_v1`.`plan_analytique_pa` (
  `id_pa` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `code_pa` VARCHAR(11) NOT NULL,
  `structure_pa` VARCHAR(11) NULL DEFAULT NULL,
  `projet_pa` VARCHAR(11) NULL DEFAULT NULL,
  `programme_pa` VARCHAR(11) NULL DEFAULT NULL,
  `code_cor_pa` VARCHAR(255) NULL DEFAULT NULL,
  `intitule_pa` VARCHAR(255) NOT NULL,
  `id_niv_pa` BIGINT(11) UNSIGNED NULL DEFAULT NULL,
  `id_parent_pa` VARCHAR(255) NULL DEFAULT NULL,
  `geler_pa` INT NOT NULL DEFAULT '0',
  `idusrcreation` BIGINT UNSIGNED NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  `partenaire_pat_id_pat` BIGINT UNSIGNED NOT NULL,
  `programme_prg_id_prg` BIGINT UNSIGNED NOT NULL,
  `projet_prj_id_prj` BIGINT UNSIGNED NOT NULL,
  PRIMARY KEY (`id_pa`),
  INDEX `plan_analytique_pa_idusrcreation_foreign` (`idusrcreation` ASC),
  INDEX `plan_analytique_pa_id_niv_pa_foreign` (`id_niv_pa` ASC),
  INDEX `plan_analytique_pa_projet_pa_foreign` (`projet_pa` ASC),
  INDEX `plan_analytique_pa_structure_pa_foreign` (`structure_pa` ASC),
  INDEX `plan_analytique_pa_programme_pa_foreign` (`programme_pa` ASC),
  INDEX `fk_plan_analytique_pa_partenaire_pat1_idx` (`partenaire_pat_id_pat` ASC),
  INDEX `fk_plan_analytique_pa_programme_prg1_idx` (`programme_prg_id_prg` ASC),
  INDEX `fk_plan_analytique_pa_projet_prj1_idx` (`projet_prj_id_prj` ASC),
  UNIQUE INDEX `code_pa_UNIQUE` (`code_pa` ASC))
ENGINE = INNODB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `ruche_v1`.`type_activite_tpa`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ruche_v1`.`type_activite_tpa` (
  `id_tpa` BIGINT NOT NULL AUTO_INCREMENT,
  `code_tpa` VARCHAR(255) NOT NULL,
  `structure_tpa` BIGINT NULL DEFAULT NULL,
  `libelle_tpa` VARCHAR(255) NULL DEFAULT NULL,
  `idusrcreation_tpa` BIGINT UNSIGNED NOT NULL,
  `date_modifie_tpa` DATETIME NULL DEFAULT NULL,
  `geler_tpa` INT NOT NULL DEFAULT '0',
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id_tpa`),
  INDEX `type_activite_tpa_idusrcreation_tpa_foreign` (`idusrcreation_tpa` ASC),
  INDEX `type_activite_tpa_geler_tpa_index` (`geler_tpa` ASC),
  UNIQUE INDEX `code_tpa_UNIQUE` (`code_tpa` ASC))
ENGINE = INNODB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `ruche_v1`.`ptba`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ruche_v1`.`ptba` (
  `id_ptba` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `annee_ptba` BIGINT UNSIGNED NULL DEFAULT NULL,
  `code_activite_ptba` VARCHAR(11) NOT NULL,
  `intitule_activite_ptba` TEXT NOT NULL,
  `debut_ptba` VARCHAR(255) NOT NULL,
  `structure_ptba` VARCHAR(11) NULL DEFAULT NULL,
  `partenaire_ptba` VARCHAR(11) NULL DEFAULT NULL,
  `projet_ptba` VARCHAR(11) NOT NULL,
  `zone_ptba` VARCHAR(255) NULL DEFAULT NULL,
  `localite_ptba` VARCHAR(11) NULL DEFAULT NULL,
  `observation_ptba` TEXT NULL DEFAULT NULL,
  `type_activite_ptba` VARCHAR(255) NOT NULL,
  `trimestre1` VARCHAR(255) NULL DEFAULT NULL,
  `trimestre2` VARCHAR(255) NULL DEFAULT NULL,
  `trimestre3` VARCHAR(255) NULL DEFAULT NULL,
  `trimestre4` VARCHAR(255) NULL DEFAULT NULL,
  `code_plan_analytique` VARCHAR(11) NULL DEFAULT NULL,
  `enregistrer_par_ptba` VARCHAR(255) NOT NULL,
  `etat_ptba` INT NOT NULL DEFAULT '0',
  `geler_ptba` INT NOT NULL DEFAULT '0',
  `idusrcreation` BIGINT UNSIGNED NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  `partenaire_pat_code_pat` VARCHAR(11) NOT NULL,
  `plan_analytique_pa_code_pa` VARCHAR(11) NOT NULL,
  `projet_prj_code_prj` VARCHAR(11) NOT NULL,
  PRIMARY KEY (`id_ptba`),
  INDEX `ptba_idusrcreation_foreign` (`idusrcreation` ASC),
  INDEX `ptba_type_activite_ptba_foreign` (`type_activite_ptba` ASC),
  INDEX `ptba_code_plan_analytique_foreign` (`code_plan_analytique` ASC),
  INDEX `ptba_projet_ptba_foreign` (`projet_ptba` ASC),
  INDEX `ptba_partenaire_ptba_foreign` (`partenaire_ptba` ASC),
  INDEX `ptba_localite_ptba_foreign` (`localite_ptba` ASC),
  INDEX `ptba_annee_ptba_index` (`annee_ptba` ASC),
  INDEX `fk_ptba_partenaire_pat1_idx` (`partenaire_pat_code_pat` ASC),
  INDEX `fk_ptba_plan_analytique_pa1_idx` (`plan_analytique_pa_code_pa` ASC),
  INDEX `fk_ptba_projet_prj1_idx` (`projet_prj_code_prj` ASC),
  UNIQUE INDEX `type_activite_ptba_UNIQUE` (`type_activite_ptba` ASC),
  UNIQUE INDEX `code_activite_ptba_UNIQUE` (`code_activite_ptba` ASC))
ENGINE = INNODB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `ruche_v1`.`ptba_tache_pt`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ruche_v1`.`ptba_tache_pt` (
  `id_pt` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `code_pt` VARCHAR(11) NOT NULL,
  `type_activite_pt` VARCHAR(11) NOT NULL,
  `proportion_pt` DOUBLE(8,2) NULL DEFAULT '0.00',
  `intitule_pt` TEXT NOT NULL,
  `enregistrer_par_pt` VARCHAR(255) NOT NULL,
  `modifier_par_pt` VARCHAR(255) NULL DEFAULT NULL,
  `etat_pt` INT NOT NULL DEFAULT '0',
  `geler_pt` INT NOT NULL DEFAULT '0',
  `periode_pt` VARCHAR(255) NULL DEFAULT NULL,
  `valider_pt` VARCHAR(255) NOT NULL DEFAULT 'non',
  `date_debut_pt` DATE NULL DEFAULT NULL,
  `date_fin_pt` DATE NULL DEFAULT NULL,
  `projet_pt` VARCHAR(11) NULL DEFAULT NULL,
  `lot_pt` INT NOT NULL DEFAULT '1',
  `observation_pt` TEXT NULL DEFAULT NULL,
  `date_suivi_pt` DATE NULL DEFAULT NULL,
  `responsable_pt` VARCHAR(11) NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  `idusrcreation` BIGINT UNSIGNED NOT NULL,
  `projet_prj_id_prj` BIGINT UNSIGNED NOT NULL,
  PRIMARY KEY (`id_pt`),
  INDEX `ptba_tache_pt_responsable_pt_foreign` (`responsable_pt` ASC),
  INDEX `ptba_tache_pt_projet_pt_foreign` (`projet_pt` ASC),
  INDEX `ptba_tache_pt_idusrcreation_foreign` (`idusrcreation` ASC),
  INDEX `ptba_tache_pt_type_activite_pt_foreign` (`type_activite_pt` ASC),
  INDEX `fk_ptba_tache_pt_projet_prj1_idx` (`projet_prj_id_prj` ASC),
  UNIQUE INDEX `code_pt_UNIQUE` (`code_pt` ASC))
ENGINE = INNODB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `ruche_v1`.`ptba_indicateur_pi`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ruche_v1`.`ptba_indicateur_pi` (
  `id_pi` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `code_pi` VARCHAR(255) NOT NULL,
  `activite_ptba_pi` VARCHAR(11) NULL DEFAULT NULL,
  `tache_pi` VARCHAR(11) NULL DEFAULT NULL,
  `indicateur_ref_pi` VARCHAR(11) NULL DEFAULT NULL,
  `intitule_pi` TEXT NOT NULL,
  `unite_pi` VARCHAR(11) NULL DEFAULT NULL,
  `valeur_cible_pi` DOUBLE NULL DEFAULT NULL,
  `trimestre1` VARCHAR(255) NULL DEFAULT NULL,
  `trimestre2` VARCHAR(255) NULL DEFAULT NULL,
  `trimestre3` VARCHAR(255) NULL DEFAULT NULL,
  `trimestre4` VARCHAR(255) NULL DEFAULT NULL,
  `enregistrer_par_pi` VARCHAR(255) NOT NULL,
  `modifier_par_pi` VARCHAR(255) NULL DEFAULT NULL,
  `etat_pi` INT NOT NULL DEFAULT '0',
  `geler_pi` INT NOT NULL DEFAULT '0',
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  `idusrcreation` BIGINT NOT NULL,
  `ptba_code_ptba` VARCHAR(11) NOT NULL,
  `ptba_tache_pt_code_pt` VARCHAR(11) NOT NULL,
  PRIMARY KEY (`id_pi`),
  INDEX `ptba_indicateur_pi_idusrcreation_foreign` (`idusrcreation` ASC),
  INDEX `ptba_indicateur_pi_activite_ptba_pi_foreign` (`activite_ptba_pi` ASC),
  INDEX `ptba_indicateur_pi_indicateur_ref_pi_foreign` (`indicateur_ref_pi` ASC),
  INDEX `ptba_indicateur_pi_tache_pi_foreign` (`tache_pi` ASC),
  INDEX `ptba_indicateur_pi_unite_pi_index` (`unite_pi` ASC),
  INDEX `fk_ptba_indicateur_pi_ptba1_idx` (`ptba_code_ptba` ASC),
  INDEX `fk_ptba_indicateur_pi_ptba_tache_pt1_idx` (`ptba_tache_pt_code_pt` ASC))
ENGINE = INNODB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `ruche_v1`.`convention_indicateur_ic`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ruche_v1`.`convention_indicateur_ic` (
  `id_indicateur_convention_ic` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `code_indicateur_convention_ic` VARCHAR(11) NOT NULL,
  `code_activite_ic` VARCHAR(11) NOT NULL,
  `indicateur_ptba_ic` VARCHAR(11) NOT NULL,
  `intitule_indicateur_convention_ic` TEXT NOT NULL,
  `valeur_cible_ic` DOUBLE NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  `geler_ic` INT NOT NULL DEFAULT '0',
  `idusrcreation` BIGINT UNSIGNED NOT NULL,
  PRIMARY KEY (`id_indicateur_convention_ic`),
  INDEX `convention_indicateur_ic_idusrcreation_foreign` (`idusrcreation` ASC),
  INDEX `convention_indicateur_ic_code_activite_ic_foreign` (`code_activite_ic` ASC),
  INDEX `convention_indicateur_ic_indicateur_ptba_ic_foreign` (`indicateur_ptba_ic` ASC))
ENGINE = INNODB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `ruche_v1`.`fonction_fnct`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ruche_v1`.`fonction_fnct` (
  `id_fnct` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `nom_fnct` VARCHAR(255) NOT NULL,
  `description_fnct` VARCHAR(255) NULL DEFAULT NULL,
  `agence_fnct` VARCHAR(255) NULL DEFAULT NULL,
  `geler_fnct` INT NOT NULL DEFAULT '0',
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  `idusrcreation` BIGINT UNSIGNED NULL DEFAULT NULL,
  PRIMARY KEY (`id_fnct`),
  INDEX `fonction_fnct_idusrcreation_foreign` (`idusrcreation` ASC),
  INDEX `fonction_fnct_geler_fnct_index` (`geler_fnct` ASC))
ENGINE = INNODB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `ruche_v1`.`niveau_localite_nvl`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ruche_v1`.`niveau_localite_nvl` (
  `id_nvl` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `libelle_nvl` VARCHAR(255) NULL DEFAULT NULL,
  `geler_nvl` INT NOT NULL DEFAULT '0',
  `taille_nvl` INT NULL DEFAULT NULL,
  `idusrcreation` BIGINT UNSIGNED NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id_nvl`),
  INDEX `niveau_localite_nvl_idusrcreation_foreign` (`idusrcreation` ASC),
  INDEX `niveau_localite_nvl_geler_nvl_index` (`geler_nvl` ASC),
  INDEX `niveau_localite_nvl_taille_nvl_index` (`taille_nvl` ASC))
ENGINE = INNODB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `ruche_v1`.`localites_loc`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ruche_v1`.`localites_loc` (
  `id_localite` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `code_localite` VARCHAR(20) NOT NULL,
  `intitule_localite` VARCHAR(255) NULL DEFAULT NULL,
  `id_parent_localite` BIGINT UNSIGNED NULL DEFAULT NULL,
  `code_couleur` VARCHAR(255) NULL DEFAULT NULL,
  `abreviation_localite` VARCHAR(255) NULL DEFAULT NULL,
  `longitude_localite` VARCHAR(255) NULL DEFAULT NULL,
  `latitude_localite` VARCHAR(255) NULL DEFAULT NULL,
  `homme_localite` INT NULL DEFAULT NULL,
  `femme_localite` INT NULL DEFAULT NULL,
  `jeune_localite` INT NULL DEFAULT NULL,
  `menage_localite` INT NULL DEFAULT NULL,
  `geler_localite` INT NOT NULL DEFAULT '0',
  `idniv_localite` BIGINT UNSIGNED NULL DEFAULT NULL,
  `idusrcreation` BIGINT UNSIGNED NULL DEFAULT NULL,
  PRIMARY KEY (`id_localite`),
  INDEX `localites_loc_idniv_localite_foreign` (`idniv_localite` ASC),
  INDEX `localites_loc_id_parent_localite_foreign` (`id_parent_localite` ASC),
  INDEX `localites_loc_idusrcreation_foreign` (`idusrcreation` ASC),
  INDEX `localites_loc_geler_localite_index` (`geler_localite` ASC))
ENGINE = INNODB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `ruche_v1`.`marche_categorie_mc`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ruche_v1`.`marche_categorie_mc` (
  `id_categorie_mc` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `nom_categorie_mc` TEXT NOT NULL,
  `code_categorie_mc` VARCHAR(11) NOT NULL,
  `geler_mc` INT NOT NULL DEFAULT '0',
  `idusrcreation` BIGINT UNSIGNED NOT NULL,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  `marche_methode_mm_id_methode_mm` BIGINT UNSIGNED NOT NULL,
  PRIMARY KEY (`id_categorie_mc`),
  INDEX `marche_categorie_mc_idusrcreation_foreign` (`idusrcreation` ASC),
  INDEX `fk_marche_categorie_mc_marche_methode_mm1_idx` (`marche_methode_mm_id_methode_mm` ASC))
ENGINE = INNODB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `ruche_v1`.`marche_etape_me`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ruche_v1`.`marche_etape_me` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `code_me` VARCHAR(11) NOT NULL,
  `libelle_me` TEXT NULL DEFAULT NULL,
  `categorie_marche` VARCHAR(11) NOT NULL,
  `geler_me` INT NOT NULL DEFAULT '0',
  `idusrcreation` BIGINT UNSIGNED NOT NULL,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  `marche_categorie_mc_id_categorie_mc` BIGINT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `marche_etape_me_categorie_marche_foreign` (`categorie_marche` ASC),
  INDEX `marche_etape_me_idusrcreation_foreign` (`idusrcreation` ASC),
  INDEX `fk_marche_etape_me_marche_categorie_mc1_idx` (`marche_categorie_mc_id_categorie_mc` ASC))
ENGINE = INNODB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `ruche_v1`.`marche_situation_ms`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ruche_v1`.`marche_situation_ms` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `code_ms` VARCHAR(11) NOT NULL,
  `libelle_ms` TEXT NULL DEFAULT NULL,
  `marche_etape` VARCHAR(11) NOT NULL,
  `geler_ms` INT NOT NULL DEFAULT '0',
  `idusrcreation` BIGINT UNSIGNED NOT NULL,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  `marche_etape_me_id` BIGINT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `marche_situation_ms_marche_etape_foreign` (`marche_etape` ASC),
  INDEX `marche_situation_ms_idusrcreation_foreign` (`idusrcreation` ASC),
  INDEX `fk_marche_situation_ms_marche_etape_me1_idx` (`marche_etape_me_id` ASC))
ENGINE = INNODB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `ruche_v1`.`modules`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ruche_v1`.`modules` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `idsmo` BIGINT UNSIGNED NULL DEFAULT NULL,
  `libelle` VARCHAR(100) NOT NULL,
  `icone` VARCHAR(100) NOT NULL,
  `lien` VARCHAR(100) NOT NULL,
  `class` VARCHAR(100) NOT NULL,
  `rang` INT NOT NULL,
  `empty1` VARCHAR(100) NULL DEFAULT NULL,
  `empty2` VARCHAR(100) NULL DEFAULT NULL,
  `empty3` VARCHAR(100) NULL DEFAULT NULL,
  `deleted_at` TIMESTAMP NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  `idusrcreation` BIGINT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `modules_idusrcreation_foreign` (`idusrcreation` ASC))
ENGINE = INNODB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `ruche_v1`.`profils`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ruche_v1`.`profils` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `libelle` VARCHAR(100) NOT NULL,
  `commentaire` VARCHAR(255) NOT NULL,
  `empty1` VARCHAR(100) NULL DEFAULT NULL,
  `empty2` VARCHAR(100) NULL DEFAULT NULL,
  `empty3` VARCHAR(100) NULL DEFAULT NULL,
  `deleted_at` TIMESTAMP NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  `idusrcreation` BIGINT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `profils_idusrcreation_foreign` (`idusrcreation` ASC))
ENGINE = INNODB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `ruche_v1`.`profil_modules`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ruche_v1`.`profil_modules` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `profil_id` BIGINT UNSIGNED NOT NULL,
  `module_id` BIGINT UNSIGNED NOT NULL,
  `empty1` VARCHAR(100) NULL DEFAULT NULL,
  `empty2` VARCHAR(100) NULL DEFAULT NULL,
  `empty3` VARCHAR(100) NULL DEFAULT NULL,
  `deleted_at` TIMESTAMP NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  `idusrcreation` BIGINT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `profil_modules_idusrcreation_foreign` (`idusrcreation` ASC),
  INDEX `profil_modules_profil_id_foreign` (`profil_id` ASC),
  INDEX `profil_modules_module_id_foreign` (`module_id` ASC))
ENGINE = INNODB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `ruche_v1`.`projets_users_pru`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ruche_v1`.`projets_users_pru` (
  `id_pru` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `codeprj_pru` VARCHAR(100) NULL DEFAULT NULL,
  `user_pru` BIGINT(11) UNSIGNED NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  `idusrcreation` BIGINT UNSIGNED NULL DEFAULT NULL,
  PRIMARY KEY (`id_pru`),
  INDEX `projets_users_pru_idusrcreation_foreign` (`idusrcreation` ASC),
  INDEX `projets_users_pru_codeprj_pru_foreign` (`codeprj_pru` ASC),
  INDEX `fk_users_pru_idx` (`user_pru` ASC))
ENGINE = INNODB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `ruche_v1`.`ptba_cout_pc`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ruche_v1`.`ptba_cout_pc` (
  `id_pc` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `activite_pc` VARCHAR(255) NOT NULL,
  `bailleur_pc` VARCHAR(11) NOT NULL,
  `structure_pc` VARCHAR(11) NULL DEFAULT NULL,
  `montant_pc` DOUBLE NOT NULL,
  `observation_pc` TEXT NULL DEFAULT NULL,
  `enregistrer_par_pc` VARCHAR(255) NOT NULL,
  `modifier_par_pc` VARCHAR(255) NULL DEFAULT NULL,
  `etat_pc` INT NOT NULL DEFAULT '0',
  `geler_pc` INT NOT NULL DEFAULT '0',
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  `idusrcreation` BIGINT UNSIGNED NOT NULL,
  PRIMARY KEY (`id_pc`),
  INDEX `ptba_cout_pc_idusrcreation_foreign` (`idusrcreation` ASC),
  INDEX `ptba_cout_pc_activite_pc_foreign` (`activite_pc` ASC),
  INDEX `ptba_cout_pc_bailleur_pc_foreign` (`bailleur_pc` ASC),
  INDEX `fk_partenaire_idx` (`bailleur_pc` ASC, `structure_pc` ASC))
ENGINE = INNODB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `ruche_v1`.`ptba_version_pv`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ruche_v1`.`ptba_version_pv` (
  `id_version_ptba_pv` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `annee_ptba_pv` INT NOT NULL,
  `version_ptba_pv` VARCHAR(255) NOT NULL,
  `date_validation_pv` DATE NULL DEFAULT NULL,
  `observation_pv` TEXT NULL DEFAULT NULL,
  `projet_ptba_pv` VARCHAR(11) NOT NULL,
  `statut_version_ptba_pv` INT NULL DEFAULT NULL,
  `geler_version` INT NOT NULL DEFAULT '0',
  `idusrcreation` BIGINT UNSIGNED NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id_version_ptba_pv`),
  INDEX `ptba_version_pv_idusrcreation_foreign` (`idusrcreation` ASC))
ENGINE = INNODB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `ruche_v1`.`thematique_tmq`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ruche_v1`.`thematique_tmq` (
  `id_tmq` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `nom_tmq` VARCHAR(255) NOT NULL,
  `description_tmq` VARCHAR(255) NULL DEFAULT NULL,
  `photo_tmq` VARCHAR(255) NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  `geler_tmq` INT NOT NULL DEFAULT '0',
  `idusrcreation` BIGINT UNSIGNED NULL DEFAULT NULL,
  PRIMARY KEY (`id_tmq`),
  INDEX `thematique_tmq_idusrcreation_foreign` (`idusrcreation` ASC),
  INDEX `thematique_tmq_geler_tmq_index` (`geler_tmq` ASC))
ENGINE = INNODB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `ruche_v1`.`recommendation_rc`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ruche_v1`.`recommendation_rc` (
  `id_rc` INT NOT NULL,
  `code_rc` VARCHAR(45) NULL,
  `intitule_rc` VARCHAR(45) NULL,
  `reference_rc` VARCHAR(45) NULL,
  `montant_rc` DOUBLE NULL,
  `projet_rc` VARCHAR(10) NULL,
  `partenaires_rc` VARCHAR(11) NULL,
  `objectif_rc` LONGTEXT NULL,
  `date_debut_rc` DATE NULL,
  `date_fin_rc` DATE NULL,
  `enregistrer_par_rc` INT NULL,
  `geler_rc` INT NULL,
  INDEX `projet_rc_idx` (`code_rc` ASC),
  INDEX `partenaires_rc_idx` (`partenaires_rc` ASC),
  CONSTRAINT `projet_rc`
    FOREIGN KEY (`projet_rc`)
    REFERENCES `ruche_v1`.`projet_prj` (`code_prj`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `partenaires_rc`
    FOREIGN KEY (`partenaires_rc`)
    REFERENCES `ruche_v1`.`partenaire_pat` (`code_pat`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ruche_v1`.`groupe_users_gu`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ruche_v1`.`groupe_users_gu` (
  `id` BIGINT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `designation` VARCHAR(255) NULL,
  `commentaire` VARCHAR(32) NULL,
  `groupe_users` INT NULL,
  `responsable` BIGINT(11) UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_responsable_grp_users_idx` (`responsable` ASC),
  CONSTRAINT `fk_responsable_grp_users`
    FOREIGN KEY (`responsable`)
    REFERENCES `ruche_v1`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `ruche_v1`.`docs_dossier`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ruche_v1`.`docs_dossier` (
  `id` BIGINT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `libelle_dossier` VARCHAR(100) NOT NULL,
  `commentaire` VARCHAR(255) NOT NULL,
  `geller_doss` INT NULL DEFAULT 0,
  `id_grp_user` BIGINT(11) UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_grp_users_docs_idx` (`id_grp_user` ASC),
  CONSTRAINT `fk_grp_users_docs`
    FOREIGN KEY (`id_grp_user`)
    REFERENCES `ruche_v1`.`groupe_users_gu` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `ruche_v1`.`docs_fichier`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ruche_v1`.`docs_fichier` (
  `id_fich` BIGINT(11) UNSIGNED NOT NULL,
  `libelle_fichier` VARCHAR(100) NOT NULL,
  `commentaire` VARCHAR(255) NOT NULL,
  `fichier` VARCHAR(45) NULL,
  `geller` INT NULL DEFAULT 0,
  `id_dossier` BIGINT(11) UNSIGNED NOT NULL,
  `tache_id` BIGINT(11) UNSIGNED NOT NULL,
  PRIMARY KEY (`id_fich`, `commentaire`),
  UNIQUE INDEX `fichier_UNIQUE` (`fichier` ASC),
  INDEX `fk_dossier_fichiers_idx` (`id_dossier` ASC),
  CONSTRAINT `fk_dossier_fichiers`
    FOREIGN KEY (`id_dossier`)
    REFERENCES `ruche_v1`.`docs_dossier` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ruche_v1`.`tache_dossier_td`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ruche_v1`.`tache_dossier_td` (
  `id` BIGINT(11) UNSIGNED NOT NULL,
  `commentaire_tache` VARCHAR(255) NOT NULL,
  `status` VARCHAR(255) NULL,
  `user_id` BIGINT(11) UNSIGNED NOT NULL,
  `dossier` BIGINT(11) UNSIGNED NOT NULL,
  `libelle_tch` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_users_tache_idx` (`user_id` ASC),
  INDEX `fk_dossier_tache_idx` (`dossier` ASC),
  CONSTRAINT `fk_users_tache`
    FOREIGN KEY (`user_id`)
    REFERENCES `ruche_v1`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_dossier_tache`
    FOREIGN KEY (`dossier`)
    REFERENCES `ruche_v1`.`docs_dossier` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
