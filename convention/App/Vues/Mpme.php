<?php

/** @var \Laravel\Lumen\Routing\Router $router */

/*
|--------------------------------------------------------------------------
| MPME Routes
|--------------------------------------------------------------------------
|
*/



$router->get('/mpme', 'MpmeController@mpmeAll');
$router->get('/mpmes', 'MpmeController@index');

$router->group(['prefix'=>'mpme'],function() use ($router){

    $router->delete('/{code}', 'MpmeController@destroy');
    $router->post('/', 'MpmeController@store');
    $router->put('/{code}', 'MpmeController@update');
    $router->post('/changement-de-profile', 'MpmeController@profile');
    $router->post('/partager/publique', 'MpmeController@publish');
    $router->get('/checker/type-entreprise', 'MpmeController@checkMpmeType');


    $router->group(['prefix'=>'formalisation'],function() use ($router){
        $router->get('/formelle-mpme', 'MpmeController@MpmeFormal');
        $router->get('/informelle-mpme', 'MpmeController@MpmeUnformal');
    });


    $router->group(['prefix'=>'indicateur-contenu-local'],function() use ($router){

        $router->get('/statut/{code}', 'StatisticsController@SatutIndicateurLocale');
        $router->get('/nombre-de-mpme/respectant-cette-loi', 'StatisticsController@NbreMpmeRIndicateurLocal');
        $router->get('/liste-des-mpmes/respectant-cette-loi', 'MpmeController@MpmeRIndicateurLocal');

    });

    $router->group(['prefix'=>'classifications'],function() use ($router){

        $router->get('/annuel', 'AnnualClassificationController@index');
        $router->get('/annuel/mpmes-existant/importation', 'AnnualClassificationController@regenerateAnneeClassificationMpme');
        $router->get('/annuel/{code}', 'AnnualClassificationController@show');
        $router->delete('/annuel/{code}', 'AnnualClassificationController@destroy');
        $router->post('/annuel', 'AnnualClassificationController@store');
        $router->put('/annuel/{code}', 'AnnualClassificationController@update');

    });

    $router->group(['prefix'=>'criteres-classifications'],function() use ($router){

        $router->get('/annuel', 'CriteresClassificationController@index');
        $router->get('/annuel/{code}', 'CriteresClassificationController@show');
        $router->delete('/annuel/{code}', 'CriteresClassificationController@destroy');
        $router->post('/annuel', 'CriteresClassificationController@store');
        $router->put('/annuel/{code}', 'CriteresClassificationController@update');

    });

    $router->get('/liste-mpme/type-entrepises', 'StatisticsController@ListeMpmeMicroPetiteMoyenne');

    $router->group(['prefix'=>'statistics'],function() use ($router){

        $router->get('/mpme-formel-informel', 'StatisticsController@NbreMpmeFormalUnformal');
        $router->get('/mpme-par-ville', 'StatisticsController@MpmeByVille');
        $router->get('/mpme-par-chiffre-affaire', 'StatisticsController@MpmeByChiffreAffaire');
        $router->get('/mpme-type-entrepises', 'StatisticsController@MpmeMicroPetiteMoyenne');
        $router->get('/mpme-indicateur-gouvernance', 'StatisticsController@gouvernance');
        $router->get('/mpme-indicateur-creation', 'StatisticsController@creation');
        $router->get('/mpme-indicateur-poucentage-contenu-locale', 'StatisticsController@contenuLocale');
        $router->get('/mpme-indicateur-lies-mortalite', 'StatisticsController@mortalitePme');
        $router->get('/mpme-martiere-premiere', 'StatisticsController@martierePPme');

    });

    /** photos mpme */
    $router->post('photos/{codeMpme}', 'PhotoUploadController@upload');
    $router->put('photos/{photo}', 'PhotoUploadController@confirmPhoto');
    $router->get('photos/{codeMpme}', 'PhotoUploadController@mpmePhotos');
    $router->delete('photos/{photo}', 'PhotoUploadController@destroyPhoto');

});





