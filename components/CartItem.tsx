import React, { memo } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";

interface Props {
    item: any;
    updateCart: (action: "inc" | "dec", cartItemId: string) => void;
    removeFromCart: (cartItemId: string) => void;
}

function CartItem({
    item,
    updateCart,
    removeFromCart,
}: Props) {
    const product = item.product;

    const image =
        product?.images?.[0]?.url ||
        "https://placehold.co/600x600/png?text=No+Image";

    return (
        <View
            className="mx-3 mb-4 rounded-2xl bg-white p-3"
            style={{
                elevation: 3,
            }}
        >
            <View className="flex-row">

                {/* Product Image */}
                <Image
                    source={{ uri: image }}
                    style={{
                        width: 100,
                        height: 100,
                        borderRadius: 12,
                    }}
                    contentFit="cover"
                    cachePolicy="memory-disk"
                    transition={250}
                />

                {/* Details */}
                <View className="ml-3 flex-1 justify-between">

                    <View>
                        <Text
                            numberOfLines={2}
                            className="text-base font-bold text-gray-900"
                        >
                            {product.title}
                        </Text>

                        <Text
                            numberOfLines={2}
                            className="mt-1 text-xs text-gray-500"
                        >
                            {product.about}
                        </Text>

                        <Text className="mt-2 text-xl font-bold text-[#2874F0]">
                            ₹{product.price}
                        </Text>
                    </View>

                    {/* Quantity */}
                    <View className="mt-3 flex-row items-center">

                        <TouchableOpacity
                            onPress={() =>
                                updateCart("dec", item._id)
                            }
                            className="h-9 w-9 items-center justify-center rounded-full border border-gray-300"
                        >
                            <Ionicons
                                name="remove"
                                size={18}
                                color="#000"
                            />
                        </TouchableOpacity>

                        <Text className="mx-4 text-lg font-bold">
                            {item.quantity}
                        </Text>

                        <TouchableOpacity
                            onPress={() =>
                                updateCart("inc", item._id)
                            }
                            className="h-9 w-9 items-center justify-center rounded-full border border-gray-300"
                        >
                            <Ionicons
                                name="add"
                                size={18}
                                color="#000"
                            />
                        </TouchableOpacity>

                    </View>
                </View>
            </View>

            {/* Bottom Row */}
            <View className="mt-4 flex-row items-center justify-between border-t border-gray-200 pt-3">

                <Text className="font-semibold text-gray-600">
                    Total: ₹{product.price * item.quantity}
                </Text>

                <TouchableOpacity
                    onPress={() => removeFromCart(item._id)}
                    className="flex-row items-center rounded-lg bg-red-50 px-3 py-2"
                >
                    <Ionicons
                        name="trash-outline"
                        size={18}
                        color="#DC2626"
                    />

                    <Text className="ml-2 font-semibold text-red-600">
                        Remove
                    </Text>
                </TouchableOpacity>

            </View>
        </View>
    );
}

export default memo(CartItem);