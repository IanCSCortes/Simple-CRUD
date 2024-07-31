<?php

namespace App\Helpers;

use Exception;

class Authorization
{
    /**
     * @throws Exception
     */
    public static function verify($header): string
    {
        if (!$header) {
            throw new Exception('Authorization header not found');
        }

        $parts = explode(' ', $header);

        if (count($parts) !== 2 || strtolower($parts[0]) !== 'bearer') {
            throw new Exception("Authorization header format is Bearer token.");
        }

        return $parts[1];
    }
}