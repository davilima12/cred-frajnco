import { useState } from 'react';
import Link from 'next/link';
import { HomeIcon, XIcon, MenuIcon } from '@heroicons/react/outline';
import Logo from '../public/images/image.png';
import Image from 'next/image';
import Favicon from '../public/images/favicon.png';
import { FrontEndRoutes } from '../config/front-end-routes';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`h-screen bg-gray-800 text-white p-4 transition-all duration-300 ${isOpen ? 'w-64' : 'w-16'}`}>
      <button onClick={toggleSidebar} className="text-gray-300 hover:text-gray-100 float-end mb-4">
        {isOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-7 h-7" />}
      </button>
      <Image 
        src={isOpen ? Logo : Favicon} 
        alt="Toggle Menu" 
        width={200} 
        height={24}
        className="text-gray-300 hover:text-gray-100 mt-7 mb-7" 
      />
      <ul>
        <li className="mb-2 relative group">
          <Link href={FrontEndRoutes.DASHBOARD.route} className="flex items-center text-gray-300 hover:text-gray-100">
            <HomeIcon style={{ height: isOpen ? '25px' : '35px', width: isOpen ? '25px' : '35px' }} className={`w-${isOpen ? '4' : '3'} h-${isOpen ? '4' : '3'} mr-2`} />
            {isOpen && 'Dashboard'}
          </Link>

        </li>

      </ul>
    </div>
  );
};

export default Sidebar;
