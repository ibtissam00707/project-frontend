<?php
namespace App\ApiResource;


use App\Entity\Recipe;

use Symfony\Component\ObjectMapper\Attribute\Map;

#[Map(target: Recipe::class)]
class ListRecipeDTO {
    
    public int $id;
    public string $title;
    public string $category;
    public ?string $picture;
    
}