
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useAuth } from '../context/AuthContext';
import { NOTIFICATION_TYPES, useNotification } from "../context/NotificationProvider";
import { useLoading } from "../context/LoadingProvider";
import axios from 'axios';
import { api } from '../services/api';
import { FrontEndRoutes } from '../config/front-end-routes';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setLoading } = useLoading();
    const router = useRouter();
    const { login } = useAuth();
    const { addToast } = useNotification();

    const handleLogin = () => {
        setLoading(true)


        api.post(`/auth/login`,
            {
                email: email,
                password: password
            }
        )
            .then(function (data) {
                const token = data.data.token
                const userData = data.data.user
                
                login(token, userData);
                addToast(NOTIFICATION_TYPES.SUCCESS, "Login efetuado com successo", NOTIFICATION_TYPES.SUCCESS);
                router.push(FrontEndRoutes.DASHBOARD.route);

            }).catch(function (error) {

                if (error.response.data.errors) {
                    const valores: any = Object.values(error.response.data.errors);
                    addToast(NOTIFICATION_TYPES.ERROR, valores[0][0], NOTIFICATION_TYPES.ERROR);
                } else if(error?.response?.data?.message){
                    addToast(NOTIFICATION_TYPES.ERROR, error?.response?.data?.message, NOTIFICATION_TYPES.ERROR);
                }else{
                    addToast(NOTIFICATION_TYPES.ERROR, 'Error por favor contate o suporte ', NOTIFICATION_TYPES.ERROR);
                }

            }).finally(function () {
                setLoading(false)
            });

    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
                <h1 className="text-2xl font-semibold text-center mb-4">Login</h1>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleLogin();
                    }}
                >
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
                        <InputText
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Digite seu email"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
                        <InputText
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Digite sua senha"
                            required
                        />
                    </div>

                    <Button
                        type="submit"
                        label="Entrar"
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                    />
                </form>
            </div>
        </div>
    );
}
