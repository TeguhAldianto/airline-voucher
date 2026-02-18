<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class GenerateVoucherRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string',
            'id' => 'required|string',
            'flightNumber' => 'required|string',
            'date' => 'required|date',
            'aircraft' => [
                'required',
                Rule::in(['ATR', 'Airbus 320', 'Boeing 737 Max']),
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'aircraft.in' => 'Aircraft type is invalid.',
            'date.required' => 'Flight date is required.',
            'flightNumber.required' => 'Flight number is required.',
        ];
    }
}
