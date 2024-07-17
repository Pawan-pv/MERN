/* eslint-disable react-refresh/only-export-components */
import React, { useContext, useState } from "react";
import Toast from "../componenets/Toast";
import { useQuery } from "react-query";
import * as apiClient from "../api-client"

type ToastMessage = {
    message: string;
    type: "SUCCESS" | "ERROR";
}

type AppContext = {
    showToast: (toastMessage: ToastMessage) => void;
    isLoggedIn: boolean;
}

const AppContext = React.createContext< AppContext | undefined >(undefined);

export const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [toast, setToast] = useState<ToastMessage | undefined>(undefined)
    // "isError" variable will be true if the token validation fails.
    const { isError } = useQuery("validateToken", apiClient.validateToken, { retry: false, })

    return (
        <AppContext.Provider  
        value={{showToast: (toastMessage) => {
        setToast(toastMessage);
        console.log(toastMessage);},
         isLoggedIn: !isError
            }}>
            {toast && (
                <Toast 
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(undefined)}
                />)
            }
            {children}
        </AppContext.Provider>
    )
};

// coustom hook
export const useAppContext = () => {
    const context = useContext(AppContext)
    return context as AppContext;
}



