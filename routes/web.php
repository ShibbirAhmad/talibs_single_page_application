<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


//laravel and vue mix routing for admin app
Route::get('/backend/{any}', function () {

    return view('admin.app');

})->where('any', '^(?!api\/)[\/\w\.\,-]*');




// laravel and vue mix routing for frontend app
Route::get('/{any}', function () {

    return view('frontend.app');

})->where('any', '^(?!api\/)[\/\w\.\,-]*');


