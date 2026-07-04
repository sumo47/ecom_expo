import { AppContextType, User } from "@/types";
import { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios";

const server = "http://localhost:5001";

const defaultContext: AppContextType = {
    user: null,
    isAuth: false,
    authLoading: true,
    btnLoading: false,
    token: null,
};

const AppContext = createContext<AppContextType>(defaultContext);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isAuth, setIsAuth] = useState<boolean>(false);
    const [authLoading, setAuthLoading] = useState<boolean>(true);
    const [btnLoading, setBtnLoading] = useState<boolean>(false);
    const [token, setToken] = useState<string | null>(null);

    async function loadUser() {
        setAuthLoading(true)
        try {
            const storedToken = await AsyncStorage.getItem("token")

            if (storedToken) return;

            const { data } = await axios.get(`${server}/api/user/me`, {
                headers: { token: storedToken }
            })

            setUser(data)
            setToken(storedToken)
            setIsAuth(true)

        } catch (error) {
            setUser(null)
            setToken(null)
            setIsAuth(false)
            console.log(error)


        }
        finally {
            setAuthLoading(false)
        }
    }
    useEffect(() => {
        loadUser()
    }, [])

    return <AppContext.Provider value={{ user, isAuth, authLoading, btnLoading, token }}>
        {children}
    </AppContext.Provider>

}
export const useApp = () => useContext(AppContext);