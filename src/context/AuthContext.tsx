import jwtDecode from "jwt-decode";
import { createContext, useEffect, useState, ReactNode } from "react";

interface UserData {
    name: string;
    email: string;
    id?: number; // تأكد من وجود id إذا كنت تستخدمه
}

interface AuthContextType {
    userData: UserData | null;
    saveUserData: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthContextProvider({ children }: { children: ReactNode }) {
    const [userData, setUserData] = useState<UserData | null>(null);

    const saveUserData = () => {
        const encodedToken = localStorage.getItem('userToken');
        if (encodedToken) {
            const decodedToken: UserData = jwtDecode(encodedToken);
            setUserData(decodedToken);
        }
    }

    useEffect(() => {
        if (localStorage.getItem("userToken")) {
            saveUserData();
        }
    }, []);

    return (
        <AuthContext.Provider value={{ userData, saveUserData }}>
            {children}
        </AuthContext.Provider>
    );
}
