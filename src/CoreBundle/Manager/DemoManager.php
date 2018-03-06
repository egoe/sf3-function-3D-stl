<?php
namespace CoreBundle\Manager;

/**
 * A demo service that show how to inject the entity manager
 *
 */
class DemoManager
{
  //Doctrine entity manager
  private $em;

  public function __construct($em)
  {
    $this->em = $em;
  }

  /**
   * Demo method
   *
   */
  public function getVersion()
  {
    return '1.0';
  }
}