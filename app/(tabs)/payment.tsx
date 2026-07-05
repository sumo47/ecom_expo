import React, { useMemo, useState } from "react";
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
    StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import axios from "axios";
import Toast from "react-native-toast-message";

import ProtectedRoutes from "@/components/ProtectedRoutes";
import { server, useApp } from "@/context/AppContext";



export default function PaymentScreen() {
    const router = useRouter();

    const { phone, address } = useLocalSearchParams<{
        phone: string;
        address: string;
    }>();

    const {
        isAuth,
        token,
        cart,
        fetchCart,
        clearCart,
    } = useApp();

    const [loading, setLoading] = useState(false);

    const total = useMemo(() => {
        return cart.reduce(
            (sum: number, item: any) =>
                sum + item.product.price * item.quantity,
            0
        );
    }, [cart]);

    return (
        <ProtectedRoutes isLoggedIn={isAuth}>
            <SafeAreaView className="flex-1 bg-[#F1F3F6]">

                <StatusBar
                    backgroundColor="#2874F0"
                    barStyle="light-content"
                />

                {/* Header */}

                <View className="flex-row items-center bg-[#2874F0] px-4 py-4">

                    <TouchableOpacity
                        onPress={() => router.push("/checkout")}
                    >
                        <Ionicons
                            name="arrow-back"
                            size={24}
                            color="white"
                        />
                    </TouchableOpacity>

                    <Text className="ml-4 text-2xl font-bold text-white">
                        Payment
                    </Text>

                </View>

                <FlatList
                    data={cart}
                    keyExtractor={(item: any) => item._id}
                    contentContainerStyle={{
                        paddingBottom: 220,
                    }}

                    ListHeaderComponent={
                        <>

                            {/* Address */}

                            <View className="mx-4 mt-4 rounded-2xl bg-white p-4">

                                <View className="flex-row items-center">

                                    <Ionicons
                                        name="location"
                                        size={22}
                                        color="#2874F0"
                                    />

                                    <Text className="ml-2 text-lg font-bold text-gray-900">
                                        Deliver To
                                    </Text>

                                </View>

                                <Text className="mt-4 font-semibold">
                                    {phone}
                                </Text>

                                <Text className="mt-2 text-gray-600">
                                    {address}
                                </Text>

                            </View>

                            {/* Review */}

                            <View className="mx-4 mt-4 rounded-2xl bg-white p-4">

                                <Text className="mb-4 text-xl font-bold">
                                    Review Order
                                </Text>

                            </View>

                        </>
                    }

                    renderItem={({ item }) => (

                        <View className="mx-4 mb-3 rounded-xl bg-white p-3">

                            <View className="flex-row">

                                <Image
                                    source={{
                                        uri:
                                            item.product.images?.[0]?.url ||
                                            "https://placehold.co/300x300",
                                    }}
                                    style={{
                                        width: 90,
                                        height: 90,
                                        borderRadius: 12,
                                    }}
                                    contentFit="cover"
                                />

                                <View className="ml-3 flex-1">

                                    <Text
                                        numberOfLines={2}
                                        className="text-base font-bold text-gray-900"
                                    >
                                        {item.product.title}
                                    </Text>

                                    <Text className="mt-2 text-gray-500">
                                        Qty : {item.quantity}
                                    </Text>

                                    <Text className="mt-2 text-xl font-bold text-[#2874F0]">
                                        ₹{item.product.price}
                                    </Text>

                                    <Text className="mt-2 font-semibold text-green-600">
                                        Total ₹
                                        {item.product.price *
                                            item.quantity}
                                    </Text>

                                </View>

                            </View>

                        </View>

                    )}
                    ListFooterComponent={
                        <>
                            {/* Payment Method */}

                            <View className="mx-4 mt-2 rounded-2xl bg-white p-4">

                                <Text className="mb-4 text-xl font-bold">
                                    Payment Method
                                </Text>

                                <View className="flex-row items-center">

                                    <Ionicons
                                        name="radio-button-on"
                                        size={24}
                                        color="#2874F0"
                                    />

                                    <Text className="ml-3 text-base font-semibold">
                                        Cash On Delivery
                                    </Text>

                                </View>

                            </View>

                            {/* Price Details */}

                            <View className="mx-4 mt-4 rounded-2xl bg-white p-4">

                                <Text className="mb-4 text-xl font-bold">
                                    Price Details
                                </Text>

                                <View className="mb-3 flex-row justify-between">

                                    <Text className="text-gray-600">
                                        Items
                                    </Text>

                                    <Text>
                                        {cart.length}
                                    </Text>

                                </View>

                                <View className="mb-3 flex-row justify-between">

                                    <Text className="text-gray-600">
                                        Delivery Charges
                                    </Text>

                                    <Text className="font-semibold text-green-600">
                                        FREE
                                    </Text>

                                </View>

                                <View className="border-t border-gray-200 pt-4 flex-row justify-between">

                                    <Text className="text-xl font-bold">
                                        Total
                                    </Text>

                                    <Text className="text-2xl font-bold text-[#2874F0]">
                                        ₹{total}
                                    </Text>

                                </View>

                            </View>

                        </>
                    }

                />

                {/* Bottom */}

                <View
                    className="absolute bottom-0 left-0 right-0 rounded-t-3xl bg-white p-5"
                    style={{ elevation: 15 }}
                >

                    <TouchableOpacity
                        disabled={loading}
                        activeOpacity={0.8}
                        className="items-center rounded-xl bg-[#FB641B] py-4"
                        onPress={async () => {

                            try {

                                setLoading(true);

                                const { data } = await axios.post(
                                    `${server}/api/order/new/cod`,
                                    {
                                        method: "cod",
                                        phone,
                                        address,
                                    },
                                    {
                                        headers: {
                                            token,
                                        },
                                    }
                                );

                                Toast.show({
                                    type: "success",
                                    text1: data.message,
                                });

                                clearCart();

                                await fetchCart();

                                router.replace("/(tabs)/order-success");

                            } catch (error: any) {

                                Toast.show({
                                    type: "error",
                                    text1:
                                        error?.response?.data?.message ||
                                        "Failed to place order",
                                });

                            } finally {

                                setLoading(false);

                            }

                        }}
                    >

                        {loading ? (

                            <ActivityIndicator
                                color="white"
                            />

                        ) : (

                            <Text className="text-lg font-bold text-white">
                                Place Order
                            </Text>

                        )}

                    </TouchableOpacity>

                </View>

            </SafeAreaView>
        </ProtectedRoutes>
    );
}