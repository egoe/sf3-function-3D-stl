<?php
namespace CoreBundle\Event;

use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use CoreBundle\Event\UserEvent;
use CoreBundle\Entity\User;

class UserEventSubscriber implements EventSubscriberInterface
{
    private $mailerFrom;
    private $templating;
    private $mailer;

    public function __construct($mailerFrom, $templating, $mailer)
    {
        $this->mailerFrom = $mailerFrom;
        $this->templating = $templating;
        $this->mailer = $mailer;
    }

    public function onDelete(UserEvent $event)
    {
        //Your email staff after user delete should be here
    }

    public function onEnabled(UserEvent $event)
    {
        $this->sendUserEnabledEmail($event->getUser());
    }

    public static function getSubscribedEvents()
    {
        return array(
            UserEvent::AFTER_ENABLED => 'onEnabled',
            UserEvent::AFTER_DELETE => 'onDelete'
        );
    }

    private function sendUserEnabledEmail(User $user){
        $message = (new \Swift_Message('Welcom !'))
        ->setFrom($this->mailerFrom)
        ->setTo($user->getEmail())
        ->setBody(
            $this->renderView(
                'CoreBundle:Email:enabledUser.html.twig',
                array('user' => $user)
            ),
            'text/html'
        );
        
        $this->mailer->send($message);
    }

    private function renderView($view, array $parameters = array())
    {
        return $this->templating->render($view, $parameters);
    }
}