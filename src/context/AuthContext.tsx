import jwtDecode from "jwt-decode";  // تأكد من أنك تستورد jwtDecode بشكل صحيح
import { createContext, useEffect, useState } from "react";

// حدد نوع البيانات للمستخدم إذا كنت تعرفها، وإذا لم تعرفها، يمكنك استخدام 'any'
interface UserData {
    // مثال على الحقول الممكنة
    name: string;
    email: string;
    // أضف الحقول الأخرى حسب الحاجة
}

export let AuthContext = createContext<{ userData: UserData | null, saveUserData: () => void } | null>(null);

export default function AuthContextProvider(props: { children: React.ReactNode }) {
    const [userData, setUserData] = useState<UserData | null>(null);

    let saveUserData = () => {
        let encodedToken = localStorage.getItem('userToken');
        if (encodedToken) {  // تحقق من أن token ليس null
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
