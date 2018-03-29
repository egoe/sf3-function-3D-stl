<?php
namespace CoreBundle\Manager;

/**
 * Adaptation of https://codecanyon.net/item/stl-volume-weight-calculator/3073161
 * for SF3 via Service Manager
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