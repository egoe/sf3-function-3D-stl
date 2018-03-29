<?php

namespace FrontBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use CoreBundle\Entity\File3d;

class DefaultController extends Controller
{
    /**
     * @Route(path = "/", name = "homepage")
     */
    public function homeAction(Request $request)
    {

        $file = new file3d();

        $form = $this->createForm('CoreBundle\FormType\File3dType', $file);
        $form->handleRequest($request);

        return $this->render('FrontBundle:Default:index.html.twig', array(
            'title' => 'Welcom to the homepage',
            'version' => $this->get('core.manager.demo')->getVersion(),
            'file' => $file,
            'form' => $form->createView()
        ));
    }

    /**
     * @Route(path = "/local-file", name = "localfile")
     */
    public function localFileAction(Request $request)
    {

        $file = new file3d();

        //$form = $this->createForm('CoreBundle\FormType\File3dType', $file);
        //$form->handleRequest($request);

        return $this->render('FrontBundle:Default:localFile.html.twig', array(
            'title' => 'Test With LOCAL FILE without Upload',
            'version' => $this->get('core.manager.demo')->getVersion(),
            'file' => $file
            //'form' => $form->createView()
        ));
    }
}
