import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import axios from "axios";
import ProtectedRoutes from "@/components/ProtectedRoutes";
import { server, useApp } from "@/context/AppContext";
import { useFocusEffect } from "@react-navigation/native";

function SkeletonCard() {
  return (
    <View className="mx-4 mb-3 rounded-2xl bg-white p-4">
      <View className="flex-row">
        <View className="h-20 w-20 rounded-xl bg-gray-200" />

        <View className="ml-3 flex-1">
          <View className="h-5 w-3/4 rounded bg-gray-200" />

          <View className="mt-3 h-4 w-1/2 rounded bg-gray-100" />

          <View className="mt-3 h-4 w-1/3 rounded bg-gray-200" />
        </View>
      </View>
    </View>
  );
}

export default function OrdersScreen() {
  const router = useRouter();

  const { token, isAuth } = useApp();

  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  async function fetchOrders() {
    if (!token) return;

    setLoading(true);

    try {
      const { data } = await axios.get(
        `${server}/api/order/all`,
        {
          headers: {
            token,
          },
        }
      );

      setOrders(data.orders || []);

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  // useEffect(() => {
  //   fetchOrders();
  // }, []);

  useFocusEffect(
    useCallback(()=>{
      fetchOrders();
    },[token])
  )

  const onRefresh = useCallback(() => {
    fetchOrders();
  }, []);

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
            onPress={() => router.back()}
          >
            <Ionicons
              name="arrow-back"
              size={24}
              color="white"
            />
          </TouchableOpacity>

          <Text className="ml-4 text-2xl font-bold text-white">
            My Orders
          </Text>

        </View>

        {loading ? (

          <FlatList
            data={[1, 2, 3, 4, 5]}
            keyExtractor={(item) => item.toString()}
            renderItem={() => <SkeletonCard />}
          />

        ) : (

          <FlatList
            data={orders}
            keyExtractor={(item: any) => item._id}
            refreshControl={
              <RefreshControl
                refreshing={loading}
                onRefresh={onRefresh}
              />
            }
            contentContainerStyle={{
              paddingVertical: 12,
            }}
            initialNumToRender={6}
            maxToRenderPerBatch={6}
            windowSize={7}
            removeClippedSubviews

            renderItem={({ item }) => {

              const firstProduct = item.items[0]?.product;

              const moreItems =
                item.items.length - 1;

              return (

                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() =>
                    router.push({
                      pathname: "/order/[id]",
                      params: {
                        id: item._id,
                      },
                    })
                  }
                  className="mx-4 mb-3 rounded-2xl bg-white p-4"
                >

                  <View className="flex-row">

                    <Image
                      source={{
                        uri:
                          firstProduct?.images?.[0]?.url ??
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
                        {firstProduct?.title}
                      </Text>

                      {moreItems > 0 && (

                        <Text className="mt-1 text-gray-500">
                          +{moreItems} more item
                          {moreItems > 1 ? "s" : ""}
                        </Text>

                      )}

                      <Text className="mt-3 text-xl font-bold text-[#2874F0]">
                        ₹{item.subTotal}
                      </Text>
                      <View className="mt-3 flex-row items-center justify-between">

                        {/* Left */}

                        <View>

                          {/* Date */}

                          <View className="flex-row items-center">

                            <Ionicons
                              name="calendar-outline"
                              size={16}
                              color="#6B7280"
                            />

                            <Text className="ml-1 text-gray-500">
                              {new Date(
                                item.createdAt
                              ).toLocaleDateString("en-GB")}
                            </Text>

                          </View>

                          {/* Payment */}

                          <View className="mt-2 flex-row items-center">

                            <Ionicons
                              name="cash-outline"
                              size={16}
                              color="#16A34A"
                            />

                            <Text className="ml-1 font-medium text-gray-700">
                              {item.method.toUpperCase()}
                            </Text>

                          </View>

                        </View>

                        {/* Status */}

                        <View
                          className={`rounded-full px-3 py-1 ${item.status === "Delivered"
                              ? "bg-green-100"
                              : item.status === "Cancelled"
                                ? "bg-red-100"
                                : item.status === "Shipped"
                                  ? "bg-blue-100"
                                  : "bg-orange-100"
                            }`}
                        >
                          <Text
                            className={`font-bold ${item.status === "Delivered"
                                ? "text-green-700"
                                : item.status === "Cancelled"
                                  ? "text-red-700"
                                  : item.status === "Shipped"
                                    ? "text-blue-700"
                                    : "text-orange-700"
                              }`}
                          >
                            {item.status}
                          </Text>
                        </View>

                      </View>

                    </View>

                    <Ionicons
                      name="chevron-forward"
                      size={22}
                      color="#9CA3AF"
                    />

                  </View>

                </TouchableOpacity>

              );

            }}

            ListEmptyComponent={
              <View className="mt-24 items-center px-6">

                <Ionicons
                  name="cube-outline"
                  size={90}
                  color="#9CA3AF"
                />

                <Text className="mt-5 text-2xl font-bold text-gray-800">
                  No Orders Yet
                </Text>

                <Text className="mt-2 text-center text-gray-500">
                  Looks like you haven't placed any orders.
                </Text>

                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() =>
                    router.replace("/(tabs)/home")
                  }
                  className="mt-8 rounded-xl bg-[#FB641B] px-8 py-4"
                >
                  <Text className="text-lg font-bold text-white">
                    Continue Shopping
                  </Text>
                </TouchableOpacity>

              </View>
            }

            ListFooterComponent={
              orders.length > 0 ? (
                <View className="h-5" />
              ) : null
            }

          />

        )}

      </SafeAreaView>

    </ProtectedRoutes>
  );
}