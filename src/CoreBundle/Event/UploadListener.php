<?php
namespace CoreBundle\Event;

use Doctrine\Common\Persistence\ObjectManager;
use Oneup\UploaderBundle\Event\PostPersistEvent;

class UploadListener
{
    /**
     * @var ObjectManager
     */
    private $om;

    //private $stlFileManager;

    public function __construct( $em, $stlFileManager)
    {
        //$this->om = $om;
        $this->stlFileManager = $stlFileManager;
        $this->em = $em;
    }
    
    public function onUpload(PostPersistEvent $event)
    {
        
        $file = $event->getFile();

        //if everything went fine
        $response = $event->getResponse();
        $response['success'] = true;
        $response['file_name'] = $file->getFileName();
        $response['file_path'] = $file->getPathName();

        var_dump($this->stlFileManager->processStlFile());
        //$response['file_extension'] = $file->getGuessExtension();
        //$response['file_type_mime'] = $file->getMimeType();

        //var_dump($file);

        return $response;

        throw new UploadException('Nope, I don\'t do files.');

    }
}