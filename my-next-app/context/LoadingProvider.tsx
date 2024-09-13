
import React, { createContext, useContext, useState } from 'react';
import LoadingComponent from "../components/LoadingComponent"

export const LoadingContext = createContext({
    isLoading: false,
    setLoading: (value: boolean) => { }
});


export const LoadingProvider = ({ children }: { children: React.ReactNode }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    return (
        <LoadingContext.Provider value={{ isLoading, setLoading: setIsLoading }}>
            {children}
            {isLoading && (
                <>

                    <LoadingComponent></LoadingComponent>

                </>

            )}
        </LoadingContext.Provider>
    );
};

export const useLoading = () => {
    return useContext(LoadingContext);
};
