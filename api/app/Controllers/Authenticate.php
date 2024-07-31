<?php

namespace App\Controllers;

use App\Models\User;
use CodeIgniter\HTTP\ResponseInterface;
use CodeIgniter\RESTful\ResourceController;
use Firebase\JWT\JWT;

class Authenticate extends ResourceController
{

    private User $userModel;

    public function __construct()
    {
        $this->userModel = new User();
    }

    public function index(): ResponseInterface
    {
        if ($this->request->getMethod() === 'options') {
            return $this->response->setStatusCode(200);
        }

        $data = $this->request->getJSON();

        if (!$this->userModel->validate($data)) {
            return $this->fail($this->userModel->errors());
        }

        $user = $this->userModel->getByEmail($data->email);

        if($user == null) {
            return $this->respond(array("error" => "Invalid Email Address or password"), 401);
        }

        if(!password_verify($data->password, $user["password"])) {
            return $this->respond(array("error" => "Invalid Email Address or password"), 403);
        }

        $key = "123456789";
        $payload = [
            "iat" => time(),
            "exp" => time() + 3600,
            "id" => $user["id"],
        ];

        $jwt = JWT::encode($payload, $key, "HS256");

        return $this->respond(array("token" => $jwt), 200);
    }
}