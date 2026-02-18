<?php

namespace App\Http\Controllers\Api;

use App\Models\Voucher;
use App\Services\SeatGeneratorService;
use App\Http\Requests\CheckVoucherRequest;
use App\Http\Requests\GenerateVoucherRequest;
use App\Http\Controllers\Controller;
use App\Http\Resources\VoucherResource;
use Illuminate\Http\JsonResponse;
use Illuminate\Database\QueryException;

class VoucherController extends Controller
{
    public function check(CheckVoucherRequest $request): JsonResponse
    {
        $exists = Voucher::where('flight_number', $request->flightNumber)
            ->where('flight_date', $request->date)
            ->exists();

        return response()->json([
            'exists' => $exists
        ]);
    }

    public function generate(
        GenerateVoucherRequest $request,
        SeatGeneratorService $service
    ): JsonResponse|VoucherResource {

        $seats = $service->generate($request->aircraft);

        try {
            $voucher = Voucher::create([
                'crew_name' => $request->name,
                'crew_id' => $request->id,
                'flight_number' => $request->flightNumber,
                'flight_date' => $request->date,
                'aircraft_type' => $request->aircraft,
                'seat1' => $seats[0],
                'seat2' => $seats[1],
                'seat3' => $seats[2],
            ]);
        } catch (QueryException $e) {
            return response()->json([
                'message' => 'Voucher already generated for this flight and date.'
            ], 422);
        }

        // Force 201 Created
        return (new VoucherResource($voucher))
            ->response()
            ->setStatusCode(201);
    }
}
