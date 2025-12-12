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
use App\Entity\Recipe;
use App\State\CreateRecipeProcessor;

#[ApiResource(
    shortName: 'recipe',
    stateOptions: new Options(entityClass: Recipe::class),
    operations: [
        new Get(),
        new GetCollection(output: ListRecipeDTO::class),

        
        new Post(
            input: CreateRecipeDTO::class,
            processor: CreateRecipeProcessor::class,
            read: false
        ),

        new Put(input: UpdateRecipeDTO::class),
        new Patch(input: UpdateRecipeDTO::class),

       
        new Delete(read: false, output: false),
    ]
)]
final class RecipeDTO
{
}
