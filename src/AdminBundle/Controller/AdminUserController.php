<?php
namespace AdminBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use CoreBundle\Entity\User;
use CoreBundle\Event\UserEvent;

/**
 * Example on how to add a custom easy adminaction
 *
 */
class AdminUserController extends Controller
{
    /**
     * @Route(path = "/admin/user/enable", name = "user_confirm")
     * @Security("has_role('ROLE_ADMIN')")
     */
    public function enableAction(Request $request)
    {
        $user = $this->getDoctrine()->getRepository('CoreBundle:User')->find($request->query->get('id'));
        $this->enableUser($user);
        $this->get('event_dispatcher')->dispatch(UserEvent::AFTER_ENABLED, new UserEvent($user));

        // redirect to the 'list' view of the given entity
        return $this->redirectToRoute('easyadmin', array(
            'action' => 'list',
            'entity' => $request->query->get('entity'),
        ));
    }

    private function enableUser(User $user)
    {
        $em = $this->getDoctrine()->getManager();
        $user->setEnabled(true);
        $em->persist($user);
        $em->flush();
    }
}