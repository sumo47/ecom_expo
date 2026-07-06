import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import axios from "axios";

import ProtectedRoutes from "@/components/ProtectedRoutes";
import { server, useApp } from "@/context/AppContext";

function Skeleton() {
  return (
    <View className="mx-4 mt-4 rounded-2xl bg-white p-4">

      <View className="h-6 w-40 rounded bg-gray-200" />

      <View className="mt-6 h-24 rounded-xl bg-gray-100" />

      <View className="mt-4 h-5 w-32 rounded bg-gray-200" />

      <View className="mt-3 h-24 rounded-xl bg-gray-100" />

    </View>
  );
}

export default function OrderDetailScreen() {

  const router = useRouter();

  const { id } = useLocalSearchParams();

  const { token, isAuth } = useApp();

  const [loading, setLoading] = useState(true);

  const [order, setOrder] = useState<any>(null);

  async function fetchOrder() {

    if (!token) return;

    try {

      setLoading(true);

      const { data } = await axios.get(
        `${server}/api/order/${id}`,
        {
          headers: {
            token,
          },
        }
      );

      setOrder(data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }
  }

  useEffect(() => {
    fetchOrder();
  }, []);

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-[#F1F3F6]">
        <Skeleton />
      </SafeAreaView>
    );
  }

  const steps = [
    "Pending",
    "Processing",
    "Shipped",
    "Delivered",
  ];

  // const currentIndex = steps.indexOf(order.status);

  const isCancelled = order.status === "Cancelled";
  const currentIndex = isCancelled
    ? 0
    : steps.indexOf(order.status);

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
            Order Details
          </Text>

        </View>

        <FlatList

          data={order.items}

          keyExtractor={(item: any) => item._id}

          contentContainerStyle={{
            paddingBottom: 30,
          }}

          ListHeaderComponent={
            <>

              {/* Status */}

              <View className="mx-4 mt-4 rounded-2xl bg-white p-4">

                <Text className="text-xl font-bold">
                  Order Status
                </Text>

                <View className="mt-4 flex-row items-center">

                  {/* <Ionicons
                    name={
                      order.status === "Delivered"
                        ? "checkmark-circle"
                        : "time"
                    }
                    size={24}
                    color={
                      order.status === "Delivered"
                        ? "#16A34A"
                        : "#F97316"
                    }
                  /> */}
                  <Ionicons
                    name={
                      order.status === "Cancelled"
                        ? "close-circle"
                        : order.status === "Delivered"
                          ? "checkmark-circle"
                          : "time"
                    }
                    size={24}
                    color={
                      order.status === "Cancelled"
                        ? "#DC2626"
                        : order.status === "Delivered"
                          ? "#16A34A"
                          : "#F97316"
                    }
                  />

                  <Text
                    className={`ml-2 text-lg font-bold ${order.status === "Delivered"
                      ? "text-green-600"
                      : "text-orange-500"
                      }`}
                  >
                    {order.status}
                  </Text>

                </View>

              </View>

              {/* Timeline */}

              <View className="mx-4 mt-4 rounded-2xl bg-white p-4">

                <Text className="mb-5 text-xl font-bold">
                  Order Timeline
                </Text>

                {steps.map((step, index) => {

                  const completed =
                    index <= currentIndex;

                  return (

                    <View
                      key={step}
                      className="mb-5 flex-row"
                    >

                      <View className="items-center">

                        <View
                          className={`h-7 w-7 items-center justify-center rounded-full ${completed
                            ? "bg-green-500"
                            : "bg-gray-300"
                            }`}
                        >

                          <Ionicons
                            name="checkmark"
                            size={16}
                            color="white"
                          />

                        </View>

                        {index !== steps.length - 1 && (

                          <View
                            className={`h-10 w-[2px] ${completed
                              ? "bg-green-500"
                              : "bg-gray-300"
                              }`}
                          />

                        )}

                      </View>

                      <Text
                        className={`ml-4 text-base font-semibold ${completed
                          ? "text-green-700"
                          : "text-gray-500"
                          }`}
                      >
                        {step}
                      </Text>

                    </View>

                  );

                })}

              </View>

              {/* Ordered Products */}

              <View className="mx-4 mt-4 rounded-2xl bg-white p-4">

                <Text className="mb-4 text-xl font-bold">
                  Ordered Products
                </Text>

              </View>

            </>
          }


          renderItem={({ item }) => (

            <View className="mx-4 mb-3 rounded-2xl bg-white p-4">

              <View className="flex-row">

                <Image
                  source={{
                    uri:
                      item.product?.images?.[0]?.url ??
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
                    {item.product?.title}
                  </Text>

                  <Text className="mt-2 text-gray-500">
                    Category : {item.product?.category}
                  </Text>

                  <Text className="mt-2 text-gray-500">
                    Qty : {item.quantity}
                  </Text>

                  <Text className="mt-3 text-xl font-bold text-[#2874F0]">
                    ₹{item.product?.price}
                  </Text>

                  <Text className="mt-2 font-semibold text-green-600">
                    Total ₹
                    {item.product?.price * item.quantity}
                  </Text>

                </View>

              </View>

            </View>

          )}

          ListFooterComponent={

            <>

              {/* Delivery Address */}

              <View className="mx-4 mt-2 rounded-2xl bg-white p-4">

                <Text className="mb-4 text-xl font-bold">
                  Delivery Address
                </Text>

                <View className="flex-row">

                  <Ionicons
                    name="location"
                    size={22}
                    color="#2874F0"
                  />

                  <View className="ml-3 flex-1">

                    <Text className="font-semibold">
                      {order.phone}
                    </Text>

                    <Text className="mt-2 text-gray-600">
                      {order.address}
                    </Text>

                  </View>

                </View>

              </View>

              {/* Payment */}

              <View className="mx-4 mt-4 rounded-2xl bg-white p-4">

                <Text className="mb-4 text-xl font-bold">
                  Payment
                </Text>

                <View className="flex-row items-center">

                  <Ionicons
                    name="cash-outline"
                    size={22}
                    color="#16A34A"
                  />

                  <Text className="ml-3 text-lg font-semibold">
                    {order.method.toUpperCase()}
                  </Text>

                </View>

              </View>

              {/* Price Summary */}

              <View className="mx-4 mt-4 rounded-2xl bg-white p-4">

                <Text className="mb-4 text-xl font-bold">
                  Price Details
                </Text>

                <View className="mb-3 flex-row justify-between">

                  <Text className="text-gray-600">
                    Items
                  </Text>

                  <Text>
                    {order.items.length}
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
                    Grand Total
                  </Text>

                  <Text className="text-2xl font-bold text-[#2874F0]">
                    ₹{order.subTotal}
                  </Text>

                </View>

              </View>
              {/* Order Information */}

              <View className="mx-4 mt-4 rounded-2xl bg-white p-4">

                <Text className="mb-4 text-xl font-bold">
                  Order Information
                </Text>

                <View className="mb-4 flex-row justify-between">

                  <Text className="font-semibold text-gray-500">
                    Order ID
                  </Text>

                  <Text
                    className="ml-3 flex-1 text-right font-medium text-gray-800"
                    numberOfLines={1}
                  >
                    {order._id}
                  </Text>

                </View>

                <View className="mb-4 flex-row justify-between">

                  <Text className="font-semibold text-gray-500">
                    Ordered On
                  </Text>

                  <Text className="font-medium text-gray-800">
                    {new Date(order.createdAt).toLocaleDateString(
                      "en-GB"
                    )}
                  </Text>

                </View>

                <View className="mb-4 flex-row justify-between">

                  <Text className="font-semibold text-gray-500">
                    Customer
                  </Text>

                  <Text className="font-medium text-gray-800">
                    {order.user?.name}
                  </Text>

                </View>

                <View className="mb-4 flex-row justify-between">

                  <Text className="font-semibold text-gray-500">
                    Email
                  </Text>

                  <Text
                    className="ml-3 flex-1 text-right font-medium text-gray-800"
                    numberOfLines={1}
                  >
                    {order.user?.email}
                  </Text>

                </View>

                <View className="flex-row justify-between">

                  <Text className="font-semibold text-gray-500">
                    Payment
                  </Text>

                  <Text className="font-medium text-green-600">
                    {order.method.toUpperCase()}
                  </Text>

                </View>

              </View>

              {/* Support Card */}

              <View className="mx-4 mt-4 rounded-2xl bg-white p-4">

                <View className="flex-row items-center">

                  <Ionicons
                    name="help-circle-outline"
                    size={22}
                    color="#2874F0"
                  />

                  <Text className="ml-2 text-lg font-bold">
                    Need Help?
                  </Text>

                </View>

                <Text className="mt-3 text-gray-600">
                  If you have any issue regarding this order,
                  please contact customer support.
                </Text>

              </View>

              {/* Continue Shopping */}

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => router.replace("/(tabs)/home")}
                className="mx-4 mt-6 rounded-xl bg-[#FB641B] py-4"
              >

                <Text className="text-center text-lg font-bold text-white">
                  Continue Shopping
                </Text>

              </TouchableOpacity>

              <View className="h-8" />

            </>

          }

        />

      </SafeAreaView>

    </ProtectedRoutes>

  );

}