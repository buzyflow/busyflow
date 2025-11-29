<?php

namespace App\Enums;

use Filament\Support\Contracts\HasColor;
use Filament\Support\Contracts\HasLabel;

enum BillingPeriod: string implements HasLabel, HasColor
{
    case MONTHLY = 'monthly';
    case YEARLY = 'yearly';

    public function getLabel(): ?string
    {
        return match ($this) {
            self::MONTHLY => 'Monthly',
            self::YEARLY => 'Yearly',
        };
    }

    public function getColor(): string | array | null
    {
        return match ($this) {
            self::MONTHLY => 'info',
            self::YEARLY => 'success',
        };
    }
}
