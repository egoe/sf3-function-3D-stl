<?php
namespace CoreBundle\Event;

use Oneup\UploaderBundle\Event\PostPersistEvent;

class UploadListener
{

    private $stlFileManager;
    private $em;

    public function __construct( $em, $stlFileManager)
    {
        $this->stlFileManager = $stlFileManager;
        $this->em = $em;
    }
    
    public function onUpload(PostPersistEvent $event)
    {
        
        $file = $event->getFile();
        $request = $event->getRequest();

        $response = $event->getResponse();
        $response['success'] = true;
        $response['file_name'] = $file->getFileName();
        $response['file_path'] = $file->getPathName();
        $response['data'] = $request->get('example');

        var_dump($this->stlFileManager->processStlFile());

        return $response;

        //throw new UploadException('Nope, I don\'t do files.');

    }
}