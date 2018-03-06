<?php
// src/AppBundle/Command/GreetCommand.php
namespace CoreBundle\Command;

use Symfony\Bundle\FrameworkBundle\Command\ContainerAwareCommand;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;

/**
 * @see https://github.com/maxpou/docker-symfony for more informations
 */
class DockerInitCommand extends ContainerAwareCommand
{
    protected function configure()
    {
        $this
            ->setName('docker:init')
            ->setDescription('Build/up dockers container, this can take a few minutes')
            //# UNIX only: get containers IP address and update host (replace IP according to your configuration) (on Windows, edit C:\Windows\System32\drivers\etc\hosts)
            ->addArgument(
                'host',
                InputArgument::OPTIONAL,
                'Do you want to automaticly update your /etc/hosts to add symfony.dev (this require a sudo power on a linux system)?'
            )
        ;
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $output->writeln("starting docker build");
        shell_exec("docker-compose -f ./docker-symfony/docker-compose.yml build");
        shell_exec("docker-compose -f ./docker-symfony/docker-compose.yml up -d");

        if ($input->getArgument('host')) {
            shell_exec("sudo echo $(docker network inspect bridge | grep Gateway | grep -o -E '[0-9\.]+') \"symfony.dev\" >> /etc/hosts");
        }
    }
}