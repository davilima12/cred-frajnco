import Logo from '../../public/images/favicon.png'
import Image from 'next/image';

const LoadingComponent = () => {

    return (

        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[9999]">
            <div className="animate-pulse flex space-x-4 text-white items-center">
                <Image
                    src={Logo}
                    alt="Toggle Menu"
                    width={60}
                    height={60}
                    className="text-gray-300 hover:text-gray-100 mt-7 mb-7 mr-2 rounded-full  animate-pulse"
                />
                Carregando...
            </div>

        </div>

    );
};


export default LoadingComponent;