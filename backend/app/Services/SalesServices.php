<?php

namespace App\Services;

use App\Models\CommissionScale;
use App\Models\Sale;
use App\Repository\SalesRepository;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;

class SalesServices
{

    public $repository;
    public function __construct(SalesRepository $repository)
    {
        $this->repository = $repository;
    }

    public function index()
    {
        $sales = $this->repository->index();

        $groupedSales = $sales->groupBy('user_id')->map(function ($userSales) {
            return [
                'name' => $userSales->first()['name'],
                'email' => $userSales->first()['email'],
                'user_id' => $userSales->first()['user_id'],
                'total_sales' => $userSales->sum(function ($sale) {
                    return (float) $sale['amount'];
                })
            ];
        });

        $commissions = $groupedSales->map(function ($user) use($sales){
            $totalSales = $user['total_sales'];

            $commissionPercentage = CommissionScale::getCommissionPercentage($totalSales);
            return [
                'name' => $user['name'],
                'email' => $user['email'],
                'total_sales' => $totalSales,
                'commission_percentage' => $commissionPercentage,
                'commission_amount' => ($totalSales * $commissionPercentage) / 100,
                'sales' => $sales->where('user_id', $user['user_id'])
            ];
        });

        $sortedCommissions = $commissions->sortByDesc('commission_amount');
        return $sortedCommissions->values();
    }

    public function store(array $data): Sale
    {

        $data['date'] = Carbon::parse($data['date'])->format('Y-m-d H:i:s');
        return $this->repository->store($data);
    }

    public function update(array $data, int $id): Sale
    {

        $data['date'] = Carbon::parse($data['date'])->format('Y-m-d H:i:s');
        return $this->repository->update($data, $id);
    }

    public function show($id): Sale
    {
        return $this->repository->show($id);
    }

    public function delete($id): bool
    {
        return $this->repository->delete($id);
    }
}
