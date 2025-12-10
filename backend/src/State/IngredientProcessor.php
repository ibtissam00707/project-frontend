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
        // 1) récupérer l'id de la recette dans l'URL /recipes/{id}/ingredients
        $recipeId = $uriVariables['id'] ?? null;

        if (!$recipeId) {
            throw new RuntimeException('Recipe ID missing');
        }

        // 2) récupérer la recette en BDD
        $recipe = $this->recipeRepo->find($recipeId);
        if (!$recipe) {
            throw new RuntimeException('Recipe not found');
        }

        // 3) $data est ton DTO IngredientCreateDTO
        $ingredient = new Ingredient();
        $ingredient->setLabel($data->label);
        $ingredient->setUnit($data->unit);
        $ingredient->setQuantity($data->quantity);
        $ingredient->setRecipe($recipe);

        // 4) persister et flush
        $this->em->persist($ingredient);
        $this->em->flush();

        return $ingredient;
    }
}
