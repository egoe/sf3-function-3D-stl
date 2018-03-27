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

        $response = $event->getResponse();
        $response['success'] = true;
        $response['file_name'] = $file->getFileName();
        $response['file_path'] = $file->getPathName();

        var_dump($this->stlFileManager->processStlFile());

        return $response;

        //throw new UploadException('Nope, I don\'t do files.');

    }
}