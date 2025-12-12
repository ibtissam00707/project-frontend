<?php

namespace App\State;

use ApiPlatform\State\ProcessorInterface;
use ApiPlatform\Metadata\Operation;
use App\Entity\Ingredient;
use App\Repository\RecipeRepository;
use Doctrine\ORM\EntityManagerInterface;
use RuntimeException;

class IngredientProcessor implements ProcessorInterface
{
    public function __construct(
        private RecipeRepository $recipeRepo,
        private EntityManagerInterface $em
    ) {}

    public function process(
        mixed $data,
        Operation $operation,
        array $uriVariables = [],
        array $context = []
    ): Ingredient {
        
        $recipeId = $uriVariables['id'] ?? null;

        if (!$recipeId) {
            throw new RuntimeException('Recipe ID missing');
        }

        
        $recipe = $this->recipeRepo->find($recipeId);
        if (!$recipe) {
            throw new RuntimeException('Recipe not found');
        }

       
        $ingredient = new Ingredient();
        $ingredient->setLabel($data->label);
        $ingredient->setUnit($data->unit);
        $ingredient->setQuantity($data->quantity);
        $ingredient->setRecipe($recipe);

        
        $this->em->persist($ingredient);
        $this->em->flush();

        return $ingredient;
    }
}
