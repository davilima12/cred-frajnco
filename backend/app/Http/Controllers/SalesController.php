<?php

namespace App\Http\Controllers;

use App\Http\Requests\Sales\SalesRequest;
use App\Services\SalesServices;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class SalesController extends Controller
{

    public $service;
    public function __construct(SalesServices $service) {
        $this->service = $service;
    }

    public function index()
    {
        try {
            $sale = $this->service->index();
            return response()->json($sale, 200);
        } catch (\Exception $e) {
            Log::error($e);
            return response()->json('Error: ' . $e->getMessage(), 400);
        }
    }

    public function store(SalesRequest $request)
    {

        DB::beginTransaction();
        try {
            $sale =  $this->service->store($request->all());
            DB::commit();
            return response()->json($sale, 200);
        } catch (\Exception $e) {
            Log::error($e);
            DB::rollback();
            return response()->json('Error: ' . $e->getMessage(), 400);
        }
    }

    public function update(SalesRequest $request, $id)
    {

        DB::beginTransaction();
        try {
            $sale =  $this->service->update($request->all() , $id);
            DB::commit();
            return response()->json($sale, 200);
        } catch (\Exception $e) {
            Log::error($e);
            DB::rollback();
            return response()->json('Error: ' . $e->getMessage(), 400);
        }
    }

    public function show($id)
    {
        return $this->service->show($id);
    }

    public function delete($id)
    {

        DB::beginTransaction();
        try {
            $sale = $this->service->delete($id);
            DB::commit();
            return response()->json($sale, 200);
        } catch (\Exception $e) {
            Log::error($e);
            return response()->json('Error: ' . $e->getMessage(), 400);
        }

    }
}
