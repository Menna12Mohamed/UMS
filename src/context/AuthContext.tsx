import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";


export let AuthContext = createContext();

export default function AuthContextProvider(props) {
    const [userData, setUserData] = useState(null)

  
    
    let seveUserData = () => {
        let encodedToken = localStorage.getItem('userToken')
        let decodedToken = jwtDecode(encodedToken)
        setUserData(decodedToken)
    }

    useEffect(() => {
        if (localStorage.getItem("userToken")) {
            seveUserData();
        }
    }, [])


    return <AuthContext.Provider value={{ userData, seveUserData }}>
        {props.children}
    </AuthContext.Provider>
}