<?php

namespace App\Repository;

use App\Models\Sale;

class SalesRepository
{


    public $model;
    public function __construct(Sale $model)
    {
        $this->model = $model;
    }

    public function index()
    {
        return $this->model::select(
            'sales.id',
            'u.name',
            'sales.date',
            'u.email',
            'sales.amount',
            'sales.user_id'
        )
            ->join('users as u', 'u.id', 'sales.user_id')
            ->get();
    }

    public function store(array $data): Sale
    {
        return $this->model::create($data);
    }

    public function update(array $data, int $id): Sale
    {
        $sale =  $this->model::find($id);
        $sale->update($data);

        return $sale;
    }


    public function show($id): Sale
    {
        return $this->model::find($id);
    }

    public function delete($id): bool
    {
        $sale =  $this->model::find($id);

        return $sale->delete();
    }
}
