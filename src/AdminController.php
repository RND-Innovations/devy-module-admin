<?php

namespace DeVy\Modules\Admin;

use DeVy\Core\Container;

use DeVy\Core\Http\{
    Controller,
    Request,
    Response
};

use DeVy\Core\Services\HookManager;

class AdminController extends Controller
{
    /**
     * ----------------------------------------
     * Hook Manager
     * ----------------------------------------
     */
    protected HookManager $hooks;

    /**
     * ----------------------------------------
     * Constructor
     * ----------------------------------------
     */
    public function __construct(
        Container $container
    ) {
        parent::__construct($container);

        $this->hooks = $this->service(
            HookManager::class
        );
    }

    /**
     * ----------------------------------------
     * Admin Dashboard
     * ----------------------------------------
     */
    public function dashboard(
        array $params,
        Request $request
    ): Response {

        $content = $this->hooks->dispatch(
            'admin.menu.build',
            ''
        );

        return $this->view(
            '@Admin/index.twig',
            [
                'page' => [
                    'title' =>
                        'Admin Dashboard'
                ],

                'content' => $content
            ]
        );
    }
}