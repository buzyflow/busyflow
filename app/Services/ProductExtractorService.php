<?php

namespace App\Services;

use Illuminate\Support\Facades\Log;
use Prism\Prism\Enums\Provider;
use Prism\Prism\Facades\Prism;

class ProductExtractorService
{
    /**
     * Extract product information from text using Gemini AI via Prism.
     */
    public function extractProductInfo(string $text): array
    {
        try {
            $prompt = $this->buildPrompt($text);
            
            // Use Prism with Gemini provider
            $response = Prism::text()
                ->using(Provider::Gemini, 'gemini-2.0-flash')
                ->withPrompt($prompt)
                ->asText();
            
            $extractedText = $response->text;
            
            // Remove markdown code blocks if present
            $extractedText = preg_replace('/```json\s*/', '', $extractedText);
            $extractedText = preg_replace('/```\s*$/', '', $extractedText);
            $extractedText = trim($extractedText);
            
            $data = json_decode($extractedText, true);
            
            if (json_last_error() !== JSON_ERROR_NONE) {
                throw new \Exception('Failed to parse AI response');
            }
            
            // Handle both single product and multiple products
            $products = $data['products'] ?? [$data];
            
            // Validate and normalize each product
            $normalizedProducts = array_map(
                fn($product) => $this->validateAndNormalizeData($product),
                $products
            );
            
            return $normalizedProducts;
            
        } catch (\Exception $e) {
            Log::error('Product extraction failed', ['error' => $e->getMessage()]);
            throw new \Exception('Failed to extract product information');
        }
    }
    
    /**
     * Build the AI prompt for product extraction.
     */
    private function buildPrompt(string $text): string
    {
        return <<<PROMPT
Analyze the following text and extract ALL product information you can find.

IMPORTANT: The text may contain ONE or MULTIPLE products. Extract all of them.

Return ONLY a valid JSON object with this structure (no markdown, no explanations):

{
  "products": [
    {
      "name": "product name",
      "description": "detailed description",
      "price": numeric value only,
      "currency": "NGN, USD, EUR, or GBP",
      "category": "Electronics, Clothing, Food, or Other"
    }
  ]
}

Rules:
- If you find multiple products, add them all to the "products" array
- Extract the most relevant information for each product
- Remove currency symbols from price and put in currency field
- If no price found, use 0
- If category unclear, choose "Other"
- Keep descriptions concise but informative
- Return ONLY the JSON object, nothing else

Text to analyze:
$text
PROMPT;
    }
    
    /**
     * Validate and normalize the extracted data.
     */
    private function validateAndNormalizeData(array $data): array
    {
        $validCategories = ['Electronics', 'Clothing', 'Food', 'Other'];
        $validCurrencies = ['NGN', 'USD', 'EUR', 'GBP'];
        
        // Ensure all required fields exist
        $normalized = [
            'name' => $data['name'] ?? 'Untitled Product',
            'description' => $data['description'] ?? '',
            'price' => isset($data['price']) ? (float) $data['price'] : 0,
            'currency' => strtoupper($data['currency'] ?? 'NGN'),
            'category' => $data['category'] ?? 'Other',
        ];
        
        // Validate currency
        if (!in_array($normalized['currency'], $validCurrencies)) {
            $normalized['currency'] = 'NGN';
        }
        
        // Validate category
        if (!in_array($normalized['category'], $validCategories)) {
            $normalized['category'] = 'Other';
        }
        
        // Ensure price is positive
        $normalized['price'] = max(0, $normalized['price']);
        
        // Trim text fields
        $normalized['name'] = trim($normalized['name']);
        $normalized['description'] = trim($normalized['description']);
        
        // Add default placeholder image based on category
        $normalized['image'] = $this->getDefaultImage($normalized['category']);
        
        return $normalized;
    }
    
    /**
     * Get a default placeholder image based on category.
     */
    private function getDefaultImage(string $category): string
    {
        // Use category-specific placeholder images from picsum with specific seed for consistency
        $categorySeeds = [
            'Electronics' => 'tech',
            'Clothing' => 'fashion',
            'Food' => 'food',
            'Other' => 'product',
        ];
        
        $seed = $categorySeeds[$category] ?? 'product';
        
        // Generate a unique but consistent placeholder based on category
        return "https://picsum.photos/seed/{$seed}/400/300";
    }
}
