
import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";


interface UserData {
  id: string;
  email: string;
 
}

interface AuthContextType {
  userData: UserData | null;
  seveUserData: () => void;
}

export let AuthContext = createContext<AuthContextType | null>(null);

export default function AuthContextProvider(props: any) {
  const [userData, setUserData] = useState<UserData | null>(null);

  let seveUserData = () => {
    let encodedToken = localStorage.getItem('userToken');
    if (encodedToken) {
      let decodedToken = jwtDecode<UserData>(encodedToken);
      setUserData(decodedToken);
    }
  }

  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      seveUserData();
    }
  }, [])

  return (
    <AuthContext.Provider value={{ userData, seveUserData }}>
      {props.children}
    </AuthContext.Provider>
  );
}
