import { Tabs } from "expo-router";
import { Ionicons } from '@expo/vector-icons';
import { useApp } from "@/context/AppContext";

export default function TabsLayout() {
    const {quantity} = useApp()
    return (
        <Tabs
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarActiveTintColor: '#000',
                tabBarInactiveTintColor: '#999',
                tabBarIcon: ({ color, size }) => {
                    let iconName: keyof typeof Ionicons.glyphMap;

                    if (route.name === "home") iconName = "home";
                    else if (route.name === "cart") iconName = "cart";
                    else if (route.name === "account") iconName = "person";
                    else iconName = "home";

                    return <Ionicons name={iconName} size={size} color={color} />;
                }
            })}
        >
            <Tabs.Screen name="home" options={{ title: "Home" }} />
            <Tabs.Screen name="cart" options={{ title: "Cart" ,
                tabBarBadge:quantity>0?quantity:undefined
            }} />
            <Tabs.Screen name="account" options={{ title: "Account" }} />
            
            <Tabs.Screen name="orders" options={{ href: null }} />
            <Tabs.Screen name="admin" options={{ href: null }} />
            <Tabs.Screen name="checkout" options={{ href: null }} />
            <Tabs.Screen name="payment" options={{ href: null }} />
            <Tabs.Screen name="order-success" options={{ href: null }} />
        </Tabs>
    )
}