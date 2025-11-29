<?php

namespace App\Filament\Widgets;

use App\Models\Customer;
use App\Models\Order;
use App\Models\User;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class StatsOverview extends BaseWidget
{
    protected function getStats(): array
    {
        return [
            Stat::make('Total Revenue', '₦' . number_format(Order::sum('total_amount'), 2))
                ->description('Total revenue across all businesses')
                ->descriptionIcon('heroicon-m-arrow-trending-up')
                ->chart([7, 2, 10, 3, 15, 4, 17])
                ->color('success'),

            Stat::make('Total Orders', Order::count())
                ->description('Total orders placed')
                ->descriptionIcon('heroicon-m-shopping-bag')
                ->chart([15, 4, 10, 2, 12, 4, 12])
                ->color('info'),

            Stat::make('Total Customers', Customer::count())
                ->description('Total customers registered')
                ->descriptionIcon('heroicon-m-users')
                ->chart([3, 12, 7, 15, 4, 10, 15])
                ->color('warning'),
        ];
    }
}
