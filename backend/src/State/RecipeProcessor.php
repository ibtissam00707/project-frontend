<?php

namespace App\State;

use ApiPlatform\Metadata\DeleteOperationInterface;
use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProcessorInterface;
use Doctrine\ORM\EntityManagerInterface;

final class RecipeProcessor implements ProcessorInterface
{
    public function __construct(private EntityManagerInterface $em) {}

    public function process(mixed $data, Operation $operation, array $uriVariables = [], array $context = []): mixed
    {
       
        if ($operation instanceof DeleteOperationInterface) {
            if (is_object($data)) {
                $this->em->remove($data);
                $this->em->flush();
            }
            return null;
        }

        
        if (is_object($data)) {
            $this->em->persist($data);
            $this->em->flush();
        }

        return $data;
    }
}
