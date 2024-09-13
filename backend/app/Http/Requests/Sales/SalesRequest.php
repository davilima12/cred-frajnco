<?php

namespace App\Http\Requests\Sales;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class SalesRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'user_id' => 'required|exists:users,id',
            'amount' => 'required|numeric|min:0',
            'date' => ['required', 'regex:/^\d{2}\/\d{2}\/\d{4}$/'],
        ];
    }


    public function messages()
    {
        return [
            'date.regex' => 'A data deve estar no formato dia/mês/ano (ex: 25/12/2024).',
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'success' => false,
            'errors' => $validator->errors(),
        ], 422));
    }
}
