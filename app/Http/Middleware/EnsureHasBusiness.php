<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureHasBusiness
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $businessId = session('active_business_id');
        
        if(!$businessId && $request->user()->businesses()->first()){
            session(['active_business_id' => $businessId = $request->user()->businesses()->first()->id]);
        };
        
        if (!$businessId) {
            return redirect('/setup-business'); 
        }

        return $next($request);
    }
}
