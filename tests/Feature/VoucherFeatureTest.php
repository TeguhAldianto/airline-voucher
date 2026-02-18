<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class VoucherFeatureTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_generate_voucher(): void
    {
        $response = $this->postJson('/api/generate', [
            'name' => 'Test User',
            'id' => '12345',
            'flightNumber' => 'GA100',
            'date' => '2026-02-10',
            'aircraft' => 'ATR'
        ]);

        $response->assertCreated()
            ->assertJsonStructure([
                'data' => [
                    'success',
                    'seats'
                ]
            ]);

        $this->assertDatabaseHas('vouchers', [
            'flight_number' => 'GA100',
            'flight_date' => '2026-02-10',
            'aircraft_type' => 'ATR'
        ]);
    }
}
