import jwtDecode from "jwt-decode";
import { createContext, useEffect, useState } from "react";


interface UserData {

    name: string;
    email: string;

}

export let AuthContext = createContext<{ userData: UserData | null, saveUserData: () => void } | null>(null);

export default function AuthContextProvider(props: { children: React.ReactNode }) {
    const [userData, setUserData] = useState<UserData | null>(null);

    let saveUserData = () => {
        let encodedToken = localStorage.getItem('userToken');
        if (encodedToken) {
            let decodedToken: UserData = jwtDecode(encodedToken);
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
            {props.children}
        </AuthContext.Provider>
    );
}
