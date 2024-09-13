import { useRouter } from 'next/router';
import { FrontEndRoutes } from '../config/front-end-routes';

const UnauthorizedPage = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.push(FrontEndRoutes.DASHBOARD.route); 
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen text-center bg-gray-100">
      <h1 className="text-3xl font-bold text-red-500 mb-4">Acesso Não Autorizado</h1>
      <p className="text-lg text-gray-700 mb-6">Você não tem permissão para acessar esta página.</p>
      <button
        onClick={handleGoBack}
        className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
      >
        Voltar
      </button>
    </div>
  );
};

export default UnauthorizedPage;
