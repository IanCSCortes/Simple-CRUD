<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class Student extends Migration
{
    public function up(): void
    {
        $this->forge->addField([
            'id' => [
                'type' => 'INT',
                'constraint' => 11,
                'unsigned' => true,
                'auto_increment' => true,
            ],
            'name' => [
                'type' => 'VARCHAR',
                'constraint' => '100',
            ],
            'email' => [
                'type' => 'VARCHAR',
                'constraint' => '100',
            ],
            'address' => [
                'type' => 'VARCHAR',
                'constraint' => '255',
            ],
            'phone' => [
                'type' => 'VARCHAR',
                'constraint' => '13',
            ],
            'profile_picture_uri'=> [
                'type' => 'VARCHAR',
                'constraint' => '255',
            ],
        ]);

        $this->forge->addKey('id', true);
        $this->forge->createTable('students');
    }

    public function down(): void
    {
        $this->forge->dropTable('students');
    }
}