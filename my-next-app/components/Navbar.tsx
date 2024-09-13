import { useContext, useState } from 'react';
import { UserIcon } from '@heroicons/react/outline';
import { useAuth } from '../context/AuthContext';
import { NOTIFICATION_TYPES, useNotification } from '../context/NotificationProvider';
import { api } from '../services/api';
import { LoadingContext } from '../context/LoadingProvider';
import { FrontEndRoutes } from '../config/front-end-routes';
import { useRouter } from 'next/router';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { setLoading } = useContext(LoadingContext);
  const { logout, userData } = useAuth();
  const { addToast } = useNotification();
  const router = useRouter();
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleLogout = () => {
    setLoading(true)
    api.post('/auth/logout', {
    },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          'Content-Type': 'application/json'
        },
      }).then(() => {
        addToast(NOTIFICATION_TYPES.SUCCESS, "Logout efetuado com sucesso", NOTIFICATION_TYPES.SUCCESS);
        logout();
      }).catch(() => {
        addToast(NOTIFICATION_TYPES.ERROR, "Error por favor contate o suporte", NOTIFICATION_TYPES.ERROR);
        setLoading(false)
        router.push(FrontEndRoutes.LOGIN.route);
      })
      .finally(() => {

        setLoading(false)
        router.push(FrontEndRoutes.LOGIN.route);
      })

  };

  return (
    <nav className="bg-red-800 text-white p-4 flex justify-between items-center h-[60px]">
      <div className="flex items-center">

      </div>
      <div className="relative">
        <button onClick={toggleDropdown} className="flex items-center text-gray-300 hover:text-gray-100">
          <UserIcon className="w-6 h-6" />
        </button>
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg z-10">
            <div className="px-4 py-2 border-b border-gray-200">
              <p className="text-sm font-medium">{userData?.name}</p>
              <p className="text-xs text-gray-500">{userData?.email}</p>
            </div>
            <button
              onClick={() => {
                handleLogout();
                setIsDropdownOpen(false);
              }}
              className="w-full text-left block px-4 py-2 hover:bg-gray-100"
            >
              Sair
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
