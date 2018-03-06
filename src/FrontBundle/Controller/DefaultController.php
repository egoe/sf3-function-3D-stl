<?php

namespace FrontBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;

class DefaultController extends Controller
{
    /**
     * @Route(path = "/", name = "homepage")
     */
    public function homeAction(Request $request)
    {
        return $this->render('FrontBundle:Default:index.html.twig', array(
            'title' => 'Welcom to the homepage',
            'version' => $this->get('core.manager.demo')->getVersion()
        ));
    }
}
