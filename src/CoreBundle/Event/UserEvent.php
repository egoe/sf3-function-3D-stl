<?php
namespace CoreBundle\Event;

use Symfony\Component\EventDispatcher\Event;
use CoreBundle\Entity\User;

class UserEvent extends Event
{
    const AFTER_ENABLED = 'user.after.enabled';
    const AFTER_DELETE = 'user.after.delete';
    
    private $user;

    public function __construct(User $user)
    {
        $this->user = $user;
    }

    public function getUser()
    {
        return $this->user;
    }

    public function setUser($user)
    {
        $this->user = $user;
    }
}