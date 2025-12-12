<?php

namespace App\ApiResource;

use Symfony\Component\Validator\Constraints as Assert;

final class CreateRecipeDTO
{
    #[Assert\NotBlank]
    public ?string $title = null;

    #[Assert\NotBlank]
    public ?string $category = null;

    #[Assert\NotBlank]
    public ?string $steps = null;

    #[Assert\NotNull]
    #[Assert\Positive]
    public ?int $servings = null;

    public ?string $picture = null;
}
