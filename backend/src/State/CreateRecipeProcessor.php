<?php

namespace App\State;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProcessorInterface;
use App\ApiResource\CreateRecipeDTO;
use App\Entity\Recipe;
use Doctrine\ORM\EntityManagerInterface;

final class CreateRecipeProcessor implements ProcessorInterface
{
    public function __construct(
        private EntityManagerInterface $em
    ) {}

    public function process(
        mixed $data,
        Operation $operation,
        array $uriVariables = [],
        array $context = []
    ): Recipe {
        /** @var CreateRecipeDTO $data */

        $recipe = new Recipe();
        $recipe
            ->setTitle($data->title)
            ->setCategory($data->category)
            ->setSteps($data->steps)
            ->setServings($data->servings)
            ->setPicture($data->picture);

        $this->em->persist($recipe);
        $this->em->flush();

       
        return $recipe;
    }
}
