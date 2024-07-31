<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */

$routes->post("/authenticate/token", "Authenticate::index");
$routes->options("/authenticate/token", "Authenticate::options");

$routes->group('students', function($routes)
{
    $routes->get('/', 'Student::index');
    $routes->options('/', 'Student::options');

    $routes->post('/', 'Student::create');
    $routes->options('/', 'Student::options');

    $routes->get('(:segment)', 'Student::show/$1');
    $routes->options('(:segment)', 'Student::options');

    $routes->put('(:segment)', 'Student::update/$1');
    $routes->options('(:segment)', 'Student::options');

    $routes->delete('(:segment)', 'Student::delete/$1');
    $routes->options('(:segment)', 'Student::options');
});