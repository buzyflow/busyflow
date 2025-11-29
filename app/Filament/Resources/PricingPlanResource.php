<?php

namespace App\Filament\Resources;

use App\Enums\BillingPeriod;
use App\Filament\Resources\PricingPlanResource\Pages;
use App\Filament\Resources\PricingPlanResource\RelationManagers;
use App\Models\PricingPlan;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class PricingPlanResource extends Resource
{
    protected static ?string $model = PricingPlan::class;

    protected static ?string $navigationIcon = 'heroicon-o-currency-dollar';

    protected static ?string $navigationGroup = 'Configuration';

    protected static ?int $navigationSort = 10;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('name')
                    ->required()
                    ->maxLength(255)
                    ->columnSpanFull(),
                Forms\Components\Textarea::make('description')
                    ->rows(3)
                    ->columnSpanFull(),
                Forms\Components\TextInput::make('price')
                    ->required()
                    ->numeric()
                    ->default(0)
                    ->prefix(fn(callable $get) => match ($get('currency')) {
                        'NGN' => '₦',
                        'USD' => '$',
                        'EUR' => '€',
                        'GBP' => '£',
                        default => '$',
                    })
                    ->minValue(0)
                    ->reactive(),
                Forms\Components\Select::make('currency')
                    ->options([
                        'NGN' => 'Nigerian Naira (₦)',
                        'USD' => 'US Dollar ($)',
                        'EUR' => 'Euro (€)',
                        'GBP' => 'British Pound (£)',
                    ])
                    ->required()
                    ->default('NGN')
                    ->reactive(),
                Forms\Components\Select::make('billing_period')
                    ->options(BillingPeriod::class)
                    ->required()
                    ->default(BillingPeriod::MONTHLY),
                Forms\Components\Repeater::make('features')
                    ->simple(
                        Forms\Components\TextInput::make('value')
                            ->label('Feature')
                            ->required(),
                    )
                    ->columnSpanFull()
                    ->defaultItems(0)
                    ->addActionLabel('Add Feature'),
                Forms\Components\Toggle::make('is_active')
                    ->label('Active')
                    ->default(true)
                    ->inline(false),
                Forms\Components\Toggle::make('is_featured')
                    ->label('Featured Plan')
                    ->default(false)
                    ->inline(false)
                    ->helperText('Mark this plan as recommended'),
                Forms\Components\TextInput::make('max_products')
                    ->label('Max Products')
                    ->numeric()
                    ->minValue(0)
                    ->placeholder('Unlimited')
                    ->helperText('Leave empty for unlimited'),
                Forms\Components\TextInput::make('max_orders')
                    ->label('Max Orders per Month')
                    ->numeric()
                    ->minValue(0)
                    ->placeholder('Unlimited')
                    ->helperText('Leave empty for unlimited'),
                Forms\Components\TextInput::make('max_customers')
                    ->label('Max Customers')
                    ->numeric()
                    ->minValue(0)
                    ->placeholder('Unlimited')
                    ->helperText('Leave empty for unlimited'),
                Forms\Components\TextInput::make('sort_order')
                    ->label('Display Order')
                    ->required()
                    ->numeric()
                    ->default(0)
                    ->minValue(0)
                    ->helperText('Lower numbers appear first'),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('price')
                    ->formatStateUsing(fn($record) => match ($record->currency) {
                        'NGN' => '₦' . number_format($record->price, 2),
                        'USD' => '$' . number_format($record->price, 2),
                        'EUR' => '€' . number_format($record->price, 2),
                        'GBP' => '£' . number_format($record->price, 2),
                        default => '$' . number_format($record->price, 2),
                    })
                    ->sortable(),
                Tables\Columns\TextColumn::make('billing_period')
                    ->badge()
                    ->sortable(),
                Tables\Columns\IconColumn::make('is_active')
                    ->boolean()
                    ->label('Active'),
                Tables\Columns\IconColumn::make('is_featured')
                    ->boolean()
                    ->label('Featured'),
                Tables\Columns\TextColumn::make('max_products')
                    ->label('Max Products')
                    ->default('Unlimited')
                    ->sortable(),
                Tables\Columns\TextColumn::make('sort_order')
                    ->label('Order')
                    ->sortable(),
                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                Tables\Columns\TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->defaultSort('sort_order')
            ->filters([
                Tables\Filters\TernaryFilter::make('is_active')
                    ->label('Active Plans')
                    ->boolean()
                    ->trueLabel('Active Only')
                    ->falseLabel('Inactive Only')
                    ->native(false),
                Tables\Filters\TernaryFilter::make('is_featured')
                    ->label('Featured Plans')
                    ->boolean()
                    ->trueLabel('Featured Only')
                    ->falseLabel('Not Featured')
                    ->native(false),
                Tables\Filters\SelectFilter::make('billing_period')
                    ->options(BillingPeriod::class),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListPricingPlans::route('/'),
            'create' => Pages\CreatePricingPlan::route('/create'),
            'edit' => Pages\EditPricingPlan::route('/{record}/edit'),
        ];
    }
}
