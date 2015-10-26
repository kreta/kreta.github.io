<?php

/*
 * This file is part of the Kreta package.
 *
 * (c) Beñat Espiña <benatespina@gmail.com>
 * (c) Gorka Laucirica <gorka.lauzirika@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

require_once '../vendor/autoload.php';

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Kreta\Controller\Controller;

$loader = new \Twig_Loader_Filesystem(__DIR__ . '/../src/Resources/views');
$twig = new \Twig_Environment($loader);

$controller = new Controller($twig);

$request = Request::createFromGlobals();

if($request->isXmlHttpRequest() && $request->getPathInfo() === '/subscribe') {
    $success = $controller->subscribeAction($request);
    $response = new Response('', $success ? 200 : 400);
} else {
    $response = new Response($controller->indexAction());
}

$response->send();
