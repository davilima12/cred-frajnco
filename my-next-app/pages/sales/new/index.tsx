import React, { useState, useEffect } from 'react';
import { api } from '../../../services/api';
import { useRouter } from 'next/router';
import Layout from '../../../components/Layout';
import { Button } from 'primereact/button';
import { FrontEndRoutes } from '../../../config/front-end-routes';

export default function NewSale() {
    const [users, setUsers] = useState<any[]>([]);
    const [selectedUser, setSelectedUser] = useState('');
    const [saleAmount, setSaleAmount] = useState('');
    const router = useRouter();

    useEffect(() => {
        api.get('/users/list')
            .then((response) => {
                setUsers(response.data);
            })
            .catch((error) => {
                console.error("Erro ao buscar usuários:", error);
            });
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        api.post('/sales/create', {
            user_id: selectedUser,
            amount: saleAmount,
        })
            .then(() => {
                router.push(FrontEndRoutes.DASHBOARD.route);
            })
            .catch((error) => {
                console.error("Erro ao criar venda:", error);
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
                        <input
                            type="number"
                            id="amount"
                            value={saleAmount}
                            onChange={(e) => setSaleAmount(e.target.value)}
                            className="border p-2 rounded w-full"
                            required
                        />
                    </div>


                    <div className='flex justify-between'>
                        <Button
                            type="submit"
                            label="Voltar"
                            onClick={()=>router.push(FrontEndRoutes.DASHBOARD.route)}
                            className=" bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200 p-2"
                        />

                        <Button
                            type="submit"
                            label="Cadastrar Venda"
                            className=" bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200 p-2"
                        />
                    </div>

                </form>
            </div>
        </Layout>
    );
}
