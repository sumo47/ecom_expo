import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function OrderSuccessScreen() {
    const router = useRouter();
    const { orderId } = useLocalSearchParams();

    return (
        <SafeAreaView className="flex-1 bg-[#F1F3F6]">
            <StatusBar
                backgroundColor="#2874F0"
                barStyle="light-content"
            />

            {/* Header */}

            <View className="bg-[#2874F0] px-5 py-4">
                <Text className="text-2xl font-bold text-white">
                    Order Success
                </Text>
            </View>

            <View className="flex-1 items-center justify-center px-6">

                {/* Success Icon */}

                <View className="h-32 w-32 items-center justify-center rounded-full bg-green-100">

                    <Ionicons
                        name="checkmark-circle"
                        size={90}
                        color="#16A34A"
                    />

                </View>

                {/* Title */}

                <Text className="mt-8 text-3xl font-bold text-gray-900">
                    Order Placed!
                </Text>

                {/* Subtitle */}

                <Text className="mt-4 text-center text-base leading-6 text-gray-600">

                    Thank you for shopping with us.
                    {"\n\n"}

                    Order ID: {orderId}

                    {"\n\n"}

                    Your order has been placed successfully.

                </Text>

                {/* Continue Shopping */}

                <TouchableOpacity
                    className="mt-10 w-full items-center rounded-xl bg-[#FB641B] py-4"
                    activeOpacity={0.8}
                    onPress={() =>
                        router.replace("/(tabs)/home")
                    }
                >
                    <Text className="text-lg font-bold text-white">
                        Continue Shopping
                    </Text>
                </TouchableOpacity>

                {/* My Orders */}

                <TouchableOpacity
                    className="mt-4 w-full items-center rounded-xl border border-[#2874F0] py-4"
                    activeOpacity={0.8}
                    onPress={() =>
                        router.replace("/(tabs)/orders")
                    }
                >
                    <Text className="text-lg font-bold text-[#2874F0]">
                        View My Orders
                    </Text>
                </TouchableOpacity>

            </View>
        </SafeAreaView>
    );
}