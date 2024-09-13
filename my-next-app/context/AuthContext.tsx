import { useRouter } from 'next/router';
import { createContext, useContext, useState, useEffect } from 'react';
import { UserProfileEnum } from '../enums/UserProfileEnum';  
import { FrontEndRoutes } from '../config/front-end-routes'; 

interface AuthContextType {
    isAuthenticated: boolean;
    userData: any;
    login: (token: string, userData: any) => void;
    logout: () => void;
    checkAuth: () => Promise<boolean>;
    hasAccess: (route: string) => Promise<boolean>; // Mudei aqui para Promise<boolean>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userData, setUserData] = useState<any>(null);
    const router = useRouter();

    useEffect(() => {
        const storedUserData = localStorage.getItem('userData');
        if (storedUserData) {
            setUserData(JSON.parse(storedUserData));
        }
    }, []);

    const login = (token: string, userData: any) => {
        localStorage.setItem('authToken', token);
        localStorage.setItem('userData', JSON.stringify(userData));
        setIsAuthenticated(true);
        setUserData(userData);
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
        setIsAuthenticated(false);
        setUserData(null);
    };

    const checkAuth = async () => {
        const token = localStorage.getItem('authToken');

        if (!token) {
            return false;
        }

        const storedUserData = localStorage.getItem('userData');
        if (storedUserData) {
            setIsAuthenticated(true);
            setUserData(JSON.parse(storedUserData));
            return true;
        }

        return false;
    };

    const hasAccess = async (route: string) => {
        if (!userData) {
            const storedUserData = localStorage.getItem('userData');
            if (storedUserData) {
                setUserData(JSON.parse(storedUserData));
            } else {
                return false; 
            }
        }


        if (!userData || !userData.profile_id) {
            return false;
        }

        const routeConfig: any = Object.values(FrontEndRoutes).find((r) => r.route === route);

        if (routeConfig?.profiles && routeConfig.profiles.length < 0) {
            return true;
        }
        console.log(routeConfig, userData, routeConfig.profiles.includes(userData.profile_id))
        if (routeConfig) {
            return routeConfig.profiles.includes(userData.profile_id);
        }

        return false; 
    };

    useEffect(() => {
        checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, userData, login, logout, checkAuth, hasAccess }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
