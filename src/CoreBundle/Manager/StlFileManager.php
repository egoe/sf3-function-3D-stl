<?php
namespace CoreBundle\Manager;

/**
 * A demo service that show how to inject the entity manager
 *
 */
class StlFileManager
{
  //Doctrine entity manager
  private $em;

  public function __construct($em)
  {
    $this->em = $em;
  }

  /**
   * Processing STL FILE
   */
  public function processStlFile()
  {
    return 'YO !';
  }
}