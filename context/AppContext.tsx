import { AppContextType, CartItem, Product, User } from "@/types";
import { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios";
import Toast from "react-native-toast-message";
// import { router } from "@/.expo/types/router";

export const server = "http://10.207.12.249:5001";

const defaultContext: AppContextType = {
    user: null,
    isAuth: false,
    authLoading: true,
    btnLoading: false,
    token: null,
    loginUser: async () => { },
    registerUser: async () => { },
    // loadUser: async()=>{},
    logoutUser: async () => { },
    search: "",
    setSearch: () => { },
    category: "",
    setCategory: () => { },
    sortByPrice: "",
    setSortByPrice: () => { },
    products: [],
    productLoading: false,
    fetchProducts: async () => { },
    categories: [],
    cart: [],
    cartLoading: false,
    addToCart: async () => { },
    updateCart: async () => { },
    removeFromCart: async () => { },
    fetchCart: async () => { },
    quantity: 0
};

const AppContext = createContext<AppContextType>(defaultContext);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isAuth, setIsAuth] = useState<boolean>(false);
    const [authLoading, setAuthLoading] = useState<boolean>(true);
    const [btnLoading, setBtnLoading] = useState<boolean>(false);
    const [token, setToken] = useState<string | null>(null);

    const [products, setProducts] = useState<Product[]>([]);
    const [productLoading, setProductLoading] = useState<boolean>(false);
    const [search, setSearch] = useState<string>("");
    const [category, setCategory] = useState<string>("");
    const [sortByPrice, setSortByPrice] = useState<string>("");
    const [categories, setCategories] = useState<string[]>([]);

    const [cart, setCart] = useState<CartItem[]>([]);
    const [quantity, setQuantity] = useState(0);
    const [cartLoading, setCartLoading] = useState(false);


    const registerUser = async (name: string, email: string, password: string, setName: any, setEmail: any, setPassword: any, router: any) => {

        setBtnLoading(true);
        try {
            const { data } = await axios.post(`${server}/api/user/register`, {
                name,
                email,
                password,
            });
            await AsyncStorage.setItem("token", data.token);
            setToken(data.token);
            setUser(data.user);
            setIsAuth(true);

            Toast.show({ type: "success", text1: data.message, });
            setEmail("");
            setPassword("");
            setName("");
            fetchCart();

            router.replace("/(tabs)/home");

        } catch (error: any) {
            console.log(error.response.data.message);
            Toast.show({
                type: "error",
                text1: "Registration Error",
                text2: error?.response?.data?.message ?? "An error occurred during registration.",
            });
        }

        finally {
            setBtnLoading(false);
        }
    }

    const loginUser = async (email: string, password: string, setEmail: any, setPassword: any, router: any) => {

        setBtnLoading(true);
        try {
            const { data } = await axios.post(`${server}/api/user/login`, {
                email,
                password,
            });
            await AsyncStorage.setItem("token", data.token);
            setToken(data.token);
            setUser(data.user);
            setIsAuth(true);

            Toast.show({
                type: "success",
                text1: data.message,
            });
            setEmail("");
            setPassword("");
            fetchCart();

            router.replace("/(tabs)/home");

        } catch (error: any) {
            // console.log("========== LOGIN ERROR ==========");
            // console.log("Status:", error.response?.status);
            // console.log("Response:", error.response?.data);
            // console.log("Message:", error.response?.data?.message);
            // console.log("=================================");
            Toast.show({
                type: "error",
                text1: "Login Error",
                text2:
                    error?.response?.data?.message ||
                    error?.message ||
                    "Something went wrong",
            });
        }
        finally {
            setBtnLoading(false);
        }
    }

    async function logoutUser() {
        await AsyncStorage.removeItem("token");
        setToken(null);
        setUser(null);
        setIsAuth(false);
        Toast.show({
            type: "success",
            text1: "Logged out successfully",
        });
    }

    async function fetchProducts() {
        setProductLoading(true);
        try {
            const { data } = await axios.get(`${server}/api/product/all`, {
                params: { search, category, sortByPrice }
            });
            setProducts(data.products);
            setCategories(data.categories || [])
        } catch (error: any) {
            // console.log("Message:", error.message);
            // console.log("Code:", error.code);
            // console.log("Response:", error.response?.data);
            Toast.show({ type: "error", text1: "Failed to load products" })
        } finally {
            setProductLoading(false);
        }
    }

    useEffect(() => {
        fetchProducts();
    }, [search, category, sortByPrice]);

    async function fetchCart() {
        if (!token) {
            Toast.show({ type: "error", text1: "Please login to view cart" })
            return;
        }
        setCartLoading(true);
        try {
            const { data } = await axios.get(`${server}/api/cart/all`, { headers: { token } })

            setCart(Array.isArray(data) ? data : data.cart || [])
            setQuantity(data.sumofQuantities);
        } finally {
            setCartLoading(false);
        }

    }

    useEffect(() => {
        if (token) fetchCart()
    }, [token])

    async function addToCart(productId: string) {
        if (!token) {
            Toast.show({
                type: "error",
                text1: "Please login to add items to cart",
            });
            return;
        }

        try {
            const { data } = await axios.post(
                `${server}/api/cart/add`,
                { product: productId },
                { headers: { token } }
            );

            Toast.show({
                type: "success",
                text1: data.message,
            });

            await fetchCart();
        } catch (error: any) {
            console.log("Add to Cart Error:", error.response?.data);

            Toast.show({
                type: "error",
                text1: error.response?.data?.message || "Failed to add to cart",
            });
        }
    }

    async function updateCart(action: "inc" | "dec", cartItemId: string) {
        if (!token) {
            Toast.show({ type: "error", text1: "Please login to update cart" })
            return;
        }

        try {
            await axios.post(`${server}/api/cart/update?action=${action}`, { id: cartItemId }, { headers: { token } })
            Toast.show({ type: "success", text1: "Cart updated" })
            fetchCart();
        }
        catch (error:any) {
            Toast.show({ type: "error", text1: error?.response?.data?.message })
        }

    }

    async function removeFromCart(cartItemId: string) {
        if (!token) {
            Toast.show({ type: "error", text1: "Please login to remove items from cart" })
            return;
        }

        try {
            await axios.get(`${server}/api/cart/remove/${cartItemId}`, { headers: { token } })
            Toast.show({ type: "success", text1: "Item removed from cart" })
            fetchCart();
        } catch (error: any) {
            console.error("Error removing item from cart:", error);
            Toast.show({ type: "error", text1: "Failed to remove item from cart" })
        }
    }

    async function loadUser() {
        setAuthLoading(true)
        try {
            const storedToken = await AsyncStorage.getItem("token")

            if (!storedToken) {
                setAuthLoading(false);
                return;
            }

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

    return <AppContext.Provider value={{
        user, isAuth, authLoading, btnLoading, token, loginUser, registerUser, logoutUser, products, productLoading, search, setSearch, category, setCategory, sortByPrice, setSortByPrice, fetchProducts, categories, cart, fetchCart, cartLoading, addToCart, updateCart, removeFromCart, quantity,
    }}>
        {children}
        <Toast />
    </AppContext.Provider>

}
export const useApp = () => useContext(AppContext);