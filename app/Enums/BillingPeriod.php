<?php

namespace App\Enums;

enum BillingPeriod: string
{
    case MONTHLY = 'monthly';
    case YEARLY = 'yearly';
}
