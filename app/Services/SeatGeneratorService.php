<?php

namespace App\Services;

class SeatGeneratorService
{
    public function generate(string $aircraft): array
    {
        $layout = $this->getLayout($aircraft);

        $allSeats = collect();

        for ($row = $layout['min']; $row <= $layout['max']; $row++) {
            foreach ($layout['letters'] as $letter) {
                $allSeats->push($row . $letter);
            }
        }

        return $allSeats
            ->shuffle()
            ->take(3)
            ->values()
            ->toArray();
    }

    private function getLayout(string $aircraft): array
    {
        return match ($aircraft) {
            'ATR' => [
                'min' => 1,
                'max' => 18,
                'letters' => ['A', 'C', 'D', 'F'],
            ],
            'Airbus 320', 'Boeing 737 Max' => [
                'min' => 1,
                'max' => 32,
                'letters' => ['A', 'B', 'C', 'D', 'E', 'F'],
            ],
        };
    }
}
