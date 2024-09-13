import React, { useEffect, useState, useContext } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useRouter } from 'next/router'; // Usado para redirecionar
import { api } from '../services/api';

import { LoadingContext } from '../context/LoadingProvider';
import { NOTIFICATION_TYPES, useNotification } from '../context/NotificationProvider';
import Layout from '../components/Layout';
import { Button } from 'primereact/button';
import { FrontEndRoutes } from '../config/front-end-routes';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
    const { setLoading, isLoading } = useContext(LoadingContext);
    const [data, setData] = useState<any[]>([]);
    const [expandedRows, setExpandedRows] = useState<any[]>([]);
    const router = useRouter(); 
    const { hasAccess} = useAuth();
    useEffect(() => {
        setLoading(true);
        api.get('/sales/get', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authToken')}`,
            },
        })
            .then((response) => {
                setData(Object.values(response.data));
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            })
            .finally(() => {
                setLoading(false); 
            });
    }, [setLoading]);

    const formatCurrency = (value: number) => {
        return `R$ ${value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
    };

    const formatDate = (date: string) => {
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        };
        return new Date(date).toLocaleDateString('pt-BR', options);
    };

    const salesTemplate = (rowData: any) => {
        return (
            <DataTable value={Object.values(rowData.sales)} responsiveLayout="scroll">
                <Column field="id" header="ID da Venda"></Column>
                <Column field="name" header="Nome"></Column>
                <Column
                    field="date"
                    header="Data"
                    body={(rowData) => formatDate(rowData.date)}
                />
                <Column field="email" header="Email"></Column>
                <Column
                    field="amount"
                    header="Valor"
                    body={(rowData) => formatCurrency(parseFloat(rowData.amount))}
                />
            </DataTable>
        );
    };

    return (
        <Layout>
            <div className="min-h-screen p-10">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl">Dashboard - Comissionamento</h1>

                    {hasAccess(FrontEndRoutes.SALES_NEW.route) && <Button onClick={() => router.push(FrontEndRoutes.SALES_NEW.route)} label="Nova Venda" icon="pi pi-plus" iconPos="left" className=' bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200 p-2' />}
                </div>

                <DataTable
                    value={data}
                    expandedRows={expandedRows}
                    onRowToggle={(e: any) => setExpandedRows(e.data)}
                    rowExpansionTemplate={salesTemplate}
                    dataKey="name"
                    responsiveLayout="scroll"
                >
                    <Column expander style={{ width: '3em' }} />
                    <Column header="Rank" body={(rowData, index) => index.rowIndex + 1} />
                    <Column field="name" header="Nome" />
                    <Column
                        field="total_sales"
                        header="Produção"
                        body={(rowData) => formatCurrency(rowData.total_sales)}
                    />
                    <Column
                        field="commission_amount"
                        header="Comissão"
                        body={(rowData) => formatCurrency(rowData.commission_amount)}
                    />
                    <Column
                        field="commission_percentage"
                        header="Percentual"
                        body={(rowData) =>
                            `${(parseFloat(rowData.commission_percentage)).toFixed(2)}%`
                        }
                    />
                </DataTable>
            </div>
        </Layout>
    );
}
