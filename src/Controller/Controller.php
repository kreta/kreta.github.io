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

namespace Kreta\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Yaml\Yaml;

/**
 * Basic controller that works in the same way of MVC frameworks like Laravel or Symfony.
 *
 * @author Gorka Laucirica <gorka.lauzirika@gmail.com>
 * @author Beñat Espiña <benatespina@gmail.com>
 */
final class Controller
{
    /**
     * The twig instance.
     *
     * @type \Twig_Environment
     */
    private $twig;

    /**
     * Constructor.
     *
     * @param \Twig_Environment $twig The twig instance
     */
    public function __construct(\Twig_Environment $twig)
    {
        $this->twig = $twig;
    }

    /**
     * Index action.
     *
     * @return string
     */
    public function indexAction()
    {
        return $this->twig->render('pages/index.twig');
    }

    /**
     * Not found action.
     *
     * @return string
     */
    public function notFoundAction()
    {
        return $this->twig->render('pages/404.twig');
    }

    /**
     * Mailchimp subscribe action.
     *
     * @param Request $request The request
     *
     * @return bool
     */
    public function subscribeAction(Request $request)
    {
        try {
            $config = Yaml::parse(__DIR__ . '/../../config.yml');
            $email = $request->get('email');
            $mailchimp = new \Mailchimp($config['mailchimp']['apiKey']);
            $mailchimp->lists->subscribe($config['mailchimp']['listId'], ['email' => $email]);

            return true;
        } catch (\Mailchimp_Error $e) {
            return false;
        }
    }
}
