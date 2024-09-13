import React, { useState, useEffect } from 'react';
import { api } from '../../../services/api';
import { useRouter } from 'next/router';
import Layout from '../../../components/Layout';
import { Button } from 'primereact/button';
import { FrontEndRoutes } from '../../../config/front-end-routes';
import CurrencyInput from 'react-currency-input-field';
import { NOTIFICATION_TYPES, useNotification } from '../../../context/NotificationProvider';
import { useLoading } from '../../../context/LoadingProvider';

export default function NewSale() {
    const [users, setUsers] = useState<any[]>([]);
    const [selectedUser, setSelectedUser] = useState('');
    const [saleAmount, setSaleAmount] = useState('');
    const router = useRouter();
    const { setLoading } = useLoading();
    const { addToast } = useNotification();

    useEffect(() => {
        api.get('/users/get', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authToken')}`,
            },
        })
            .then((response) => {
                setUsers(response.data);
            })
            .catch((error) => {
                console.error("Erro ao buscar usuários:", error);
            });
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const amountInNumber = parseFloat(saleAmount.replace('.', '').replace(',', '.'));
        api.post('/sales/post', {
            user_id: selectedUser,
            amount: amountInNumber,
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authToken')}`,
            },
        })
            .then((response) => {
                addToast(NOTIFICATION_TYPES.SUCCESS, 'Venda Cadastrada com sucesso', NOTIFICATION_TYPES.SUCCESS);
                setTimeout(() => {
                    router.push(FrontEndRoutes.DASHBOARD.route);
                }, 1000);
            })
            .catch((error) => {
                if (error.response.data.errors) {
                    const valores: any = Object.values(error.response.data.errors);
                    addToast(NOTIFICATION_TYPES.ERROR, valores[0][0], NOTIFICATION_TYPES.ERROR);
                } else if (error?.response?.data?.message) {
                    addToast(NOTIFICATION_TYPES.ERROR, error?.response?.data?.message, NOTIFICATION_TYPES.ERROR);
                } else {
                    addToast(NOTIFICATION_TYPES.ERROR, 'Erro, por favor contate o suporte', NOTIFICATION_TYPES.ERROR);
                }
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <Layout>
            <div className="p-10">
                <h1 className="text-2xl mb-4">Cadastrar Nova Venda</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="user" className="block text-lg">Usuário</label>
                        <select
                            id="user"
                            value={selectedUser}
                            onChange={(e) => setSelectedUser(e.target.value)}
                            className="border p-2 rounded w-full"
                            required
                        >
                            <option value="">Selecione um usuário</option>
                            {users.map((user) => (
                                <option key={user.id} value={user.id}>
                                    {user.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="amount" className="block text-lg">Valor da Venda</label>


                        <CurrencyInput
                            id="amount"
                            name="amount"
                            placeholder="R$ 0,00"
                            className="border p-2 rounded w-full"
                            decimalSeparator=","
                            value={saleAmount}
                            decimalsLimit={2}
                            prefix="R$ "
                            onValueChange={(value, name) => {
                                setSaleAmount(value); 
                            }}
                        />
                    </div>

                    <div className='flex justify-between'>
                        <Button
                            type="button"
                            label="Voltar"
                            onClick={() => router.push(FrontEndRoutes.DASHBOARD.route)}
                            className="bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition duration-200 p-2"
                        />

                        <Button
                            type="submit"
                            label="Cadastrar Venda"
                            className="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200 p-2"
                        />
                    </div>
                </form>
            </div>
        </Layout>
    );
}
