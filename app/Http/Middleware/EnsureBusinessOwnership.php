<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureBusinessOwnership
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Get the business from the route parameter
        $business = $request->route('business');

        // If no business in route, continue
        if (!$business) {
            return $next($request);
        }

        // If business is a string (slug), we need to find the model
        if (is_string($business)) {
            $business = \App\Models\Business::where('slug', $business)->firstOrFail();
        }

        // Check if the authenticated user owns this business
        if ($business->user_id !== $request->user()->id) {
            abort(403, 'You do not have permission to access this business.');
        }

        return $next($request);
    }
}
