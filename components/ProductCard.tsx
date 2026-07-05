import React, { memo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const CARD_WIDTH = (width - 24) / 2;

function ProductCard({ item, addToCart }: any) {
  const image =
    item?.images?.[0]?.url ||
    "https://placehold.co/600x600/png?text=No+Image";

  const outOfStock = item?.stock <= 0;

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      className="mb-3 overflow-hidden rounded-xl bg-white"
      style={{
        width: CARD_WIDTH,
        elevation: 3,
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 6,
      }}
    >
      {/* Image */}
      <View className="relative">
        <Image
          source={{ uri: image }}
          style={{
            width: "100%",
            height: 170,
          }}
          contentFit="cover"
          transition={250}
          cachePolicy="memory-disk"
        />

        {/* Out of Stock */}
        {outOfStock && (
          <View className="absolute inset-0 items-center justify-center bg-black/50">
            <Text className="rounded bg-red-600 px-3 py-1 font-bold text-white">
              OUT OF STOCK
            </Text>
          </View>
        )}

        {/* Category Badge */}
        <View className="absolute left-2 top-2 rounded-full bg-[#2874F0] px-2 py-1">
          <Text className="text-[10px] font-bold text-white">
            {item.category}
          </Text>
        </View>
      </View>

      {/* Details */}
      <View className="p-3">
        {/* Title */}
        <Text
          numberOfLines={2}
          className="min-h-[40px] text-[15px] font-semibold text-gray-900"
        >
          {item.title}
        </Text>

        {/* About */}
        <Text
          numberOfLines={2}
          className="mt-1 text-xs text-gray-500"
        >
          {item.about}
        </Text>

        {/* Price */}
        <Text className="mt-3 text-xl font-bold text-[#212121]">
          ₹{item.price}
        </Text>

        {/* Stock + Sold */}
        <View className="mt-2 flex-row items-center justify-between">
          <View
            className={`rounded-full px-2 py-1 ${
              outOfStock ? "bg-red-100" : "bg-green-100"
            }`}
          >
            <Text
              className={`text-[11px] font-semibold ${
                outOfStock ? "text-red-600" : "text-green-700"
              }`}
            >
              {outOfStock
                ? "Out of Stock"
                : `${item.stock} Left`}
            </Text>
          </View>

          <Text className="text-[11px] text-gray-500">
            Sold {item.sold}
          </Text>
        </View>

        {/* Button */}
        <TouchableOpacity
          disabled={outOfStock}
          onPress={() => addToCart(item._id)}
          activeOpacity={0.8}
          className={`mt-4 flex-row items-center justify-center rounded-lg py-3 ${
            outOfStock
              ? "bg-gray-300"
              : "bg-[#FB641B]"
          }`}
        >
          <Ionicons
            name="cart-outline"
            size={18}
            color="white"
          />

          <Text className="ml-2 font-bold text-white">
            Add to Cart
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

export default memo(ProductCard);