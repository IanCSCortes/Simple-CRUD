<?php

namespace App\Controllers;

use App\Helpers\Authorization;
use CodeIgniter\RESTful\ResourceController;
use Exception;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class Student extends ResourceController
{
    private \App\Models\Student $student_model;

    public function __construct()
    {
        $this->student_model = new \App\Models\Student();
    }

    public function index()
    {
        try {

            $token = Authorization::verify($this->request->getHeaderLine('Authorization'));
            JWT::decode($token, new Key("123456789", "HS256"));

            $students = $this->student_model->findAll();
            return $this->respond($students);
        } catch (Exception $e) {
            return $this->failUnauthorized();
        }
    }

    public function show($id = null)
    {
        try {

            $token = Authorization::verify($this->request->getHeaderLine('Authorization'));
            JWT::decode($token, new Key("123456789", "HS256"));

            $student = $this->student_model->find($id);

            if ($student === null) {
                return $this->failNotFound('No student found with id: ' . $id);
            }

            return $this->respond($student);
        } catch (Exception $e) {
            return $this->failUnauthorized();
        }
    }

    public function create()
    {
        try {
            $token = Authorization::verify($this->request->getHeaderLine('Authorization'));
            JWT::decode($token, new Key("123456789", "HS256"));

            $data = $this->request->getJSON(true);

            if (!$this->student_model->validate($data)) {
                return $this->fail($this->student_model->errors());
            }

            if (isset($data['profilePicture'])) {
                $decodedPicture = base64_decode($data['profilePicture'], true);

                if ($decodedPicture === false) {
                    return $this->fail('Invalid base64 encoding.');
                }

                $imageInfo = getimagesizefromstring($decodedPicture);
                if ($imageInfo === false) {
                    return $this->fail('Unable to get image information.');
                }

                if (!in_array($imageInfo['mime'], ['image/jpeg', 'image/jpg'])) {
                    return $this->fail('Invalid image format. Only JPEG is allowed.');
                }

                $fileName = uniqid('profile_pic_', true) . '.jpg';
                $filePath = FCPATH . $fileName;

                if (file_put_contents($filePath, $decodedPicture) === false) {
                    return $this->fail('Failed to save the image file.');
                }

                $data['profile_picture_uri'] = $fileName;
                unset($data['profilePicture']);
            }

            $student_id = $this->student_model->insert($data, true);

            return $this->respondCreated(['id' => $student_id], 'Student created successfully');
        } catch (Exception $e) {
            return $this->failUnauthorized();
        }
    }

    public function update($id = null)
    {
        try {
            $token = Authorization::verify($this->request->getHeaderLine('Authorization'));
            JWT::decode($token, new Key("123456789", "HS256"));

            $student = $this->student_model->find($id);

            if ($student === null) {
                return $this->failNotFound('No student found with id: ' . $id);
            }

            $data = $this->request->getJSON(true);

            if (!$this->student_model->validate($data)) {
                return $this->fail($this->student_model->errors());
            }

            $this->student_model->update($id, $data);
            return $this->respondUpdated($data, 'Student updated successfully');
        } catch (Exception) {
            return $this->failUnauthorized();
        }
    }

    public function delete($id = null)
    {
        try {
            $token = Authorization::verify($this->request->getHeaderLine('Authorization'));
            JWT::decode($token, new Key("123456789", "HS256"));

            $student = $this->student_model->find($id);

            if ($student === null) {
                return $this->failNotFound('No student found with id: ' . $id);
            }

            $this->student_model->delete($id);
            return $this->respondDeleted(['id' => $id], 'Student deleted successfully');
        } catch (Exception) {
            return $this->failUnauthorized();
        }
    }
}