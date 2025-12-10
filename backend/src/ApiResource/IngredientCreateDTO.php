<?php

namespace App\ApiResource;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Post;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Serializer\Annotation\Groups;

#[ApiResource(
    shortName: 'ingredient',
    operations: [
        new Post(
            uriTemplate: '/recipes/{id}/ingredients',
            requirements: ['id' => '\d+'],
            processor: App\State\IngredientProcessor::class
        )
    ]
)]
class IngredientCreateDTO
{
    #[Assert\NotBlank]
    public string $label;

    public ?string $unit = null;

    public ?float $quantity = null;
}
