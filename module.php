<?php

use DeVy\Core\Modules\ModuleContext;
use DeVy\Modules\Admin\AdminController;

return [

    /*
    |--------------------------------------------------------------------------
    | Module Metadata
    |--------------------------------------------------------------------------
    */

    'meta' => [
        'name' => 'Admin Panel',
        'description' => 'Handling Admin Panel UI and wireframe.',        
        'version' => '1.1.0',
        'author' => 'RND Innovations',
        'website' => 'https://rndvn.com',
        'license' => 'MIT',
        'icon' => 'dee',        
        'namespace' => 'DeVy\\Modules\\Admin',
        'requires' => [
            'framework' => '^1.0',
            'modules' => ['AdminAuth'],
            'php' => '^8.3'
        ]
    ],


    /*
    |--------------------------------------------------------------------------
    | Register
    |--------------------------------------------------------------------------
    */

    'register' => function (ModuleContext $ctx) {

        $ctx->controller(AdminController::class);

    },

    /*
    |--------------------------------------------------------------------------
    | Boot
    |--------------------------------------------------------------------------
    */

    'boot' => function (ModuleContext $ctx) {

        /*
        |--------------------------------------------------------------------------
        | Routes
        |--------------------------------------------------------------------------
        */

        $ctx->adminRoutes(function ($r) {

            $r->add([
                'name' => 'admin',
                'method' => 'GET',
                'uri' => '/',
                'action' => [
                    AdminController::class,
                    'dashboard'
                ]
            ]);

        });

        /*
        |--------------------------------------------------------------------------
        | Global Admin Assets
        |--------------------------------------------------------------------------
        */

        $ctx->registerInterfaceAssets(
            'admin',
            'admin.global',
            [
                'css' => [
                    '/Modules/Admin/assets/toast.css'
                ],
                'js' => [
                    '/Modules/Admin/assets/toast.js'
                ]
            ]
        );

        $ctx->registerInterfaceAssets(
            'admin',
            'schema-form',
            [
                'css' => [
                    '/Modules/Admin/assets/schema-form.css'
                ],                
                'js' => [
                    '/Modules/Admin/assets/schema-form.js'
                ],
            ]
        );



        /*
        |--------------------------------------------------------------------------
        | Navigation
        |--------------------------------------------------------------------------
        */

        $ctx->addAdminNavigation(
            'Dashboard',
            'admin',
            'dee',
            1,
            'admin.view'
        );

    }

];