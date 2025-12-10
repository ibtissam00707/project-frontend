<?php
namespace App\ApiResource;

use ApiPlatform\Doctrine\Orm\State\Options;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use App\Controller\GetIngredientByRecipe;
use App\Entity\Recipe;
use Symfony\Component\ObjectMapper\Attribute\Map;

#[ApiResource(
    shortName:'recipe',
    stateOptions: new Options(entityClass: Recipe::class),
    operations: [
        new Get(),
        new GetCollection(output: ListRecipeDTO::class),
        new GetCollection(uriTemplate:'/recipes/{id}/ingredients', controller:GetIngredientByRecipe::class, paginationEnabled:false),
        new Post(input: CreateRecipeDTO::class),
        new Delete(read:false),
        new Patch(input: UpdateRecipeDTO::class)
    ]
)]
#[Map(target: Recipe::class)]
final class RecipeDTO {
   
    public int $id;
    public string $title;

    public string $category;

    public string $steps;
    public ?string $picture;

    public int $servings;
    
    
}