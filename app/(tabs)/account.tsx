import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import ProtectedRoutes from "@/components/ProtectedRoutes";
import { useApp } from "@/context/AppContext";

export default function AccountScreen() {
  const { isAuth, user, logoutUser } = useApp();
  const router = useRouter();

  const firstLetter = user?.name?.charAt(0).toUpperCase() || "?";
  const isAdmin = user?.role === "admin";

  return (
    <ProtectedRoutes isLoggedIn={isAuth}>
      <SafeAreaView className="flex-1 bg-[#F1F3F6]">
        <StatusBar
          barStyle="light-content"
          backgroundColor="#2874F0"
        />

        {/* Header */}
        <View className="bg-[#2874F0] px-5 pt-6 pb-10">
          <Text className="text-3xl font-bold text-white">
            My Account
          </Text>
        </View>

        {/* Profile Card */}
        <View className="-mt-6 mx-4 rounded-2xl bg-white p-5 shadow">

          <View className="flex-row items-center">

            {/* Avatar */}
            <View className="h-16 w-16 items-center justify-center rounded-full bg-[#2874F0]">
              <Text className="text-3xl font-bold text-white">
                {firstLetter}
              </Text>
            </View>

            <View className="ml-4 flex-1">
              <Text className="text-xl font-bold text-gray-900">
                {user?.name}
              </Text>

              <Text className="mt-1 text-gray-500">
                {user?.email}
              </Text>

              {isAdmin && (
                <View className="mt-2 self-start rounded-full bg-orange-100 px-3 py-1">
                  <Text className="font-semibold text-[#FB641B]">
                    ADMIN
                  </Text>
                </View>
              )}
            </View>

          </View>
        </View>

        {/* Menu */}
        <View className="mx-4 mt-5 rounded-2xl bg-white">

          {/* Orders */}
          <TouchableOpacity
            onPress={() => router.push("/(tabs)/orders")}
            className="flex-row items-center justify-between border-b border-gray-200 px-5 py-5"
          >
            <View className="flex-row items-center">
              <Ionicons
                name="bag-handle-outline"
                size={22}
                color="#2874F0"
              />

              <Text className="ml-4 text-base font-medium text-gray-800">
                My Orders
              </Text>
            </View>

            <Ionicons
              name="chevron-forward"
              size={20}
              color="#9CA3AF"
            />
          </TouchableOpacity>

          {/* Admin */}
          {isAdmin && (
            <TouchableOpacity
              onPress={() => router.push("/(tabs)/admin")}
              className="flex-row items-center justify-between border-b border-gray-200 px-5 py-5"
            >
              <View className="flex-row items-center">
                <Ionicons
                  name="settings-outline"
                  size={22}
                  color="#2874F0"
                />

                <Text className="ml-4 text-base font-medium text-gray-800">
                  Admin Dashboard
                </Text>
              </View>

              <Ionicons
                name="chevron-forward"
                size={20}
                color="#9CA3AF"
              />
            </TouchableOpacity>
          )}

          {/* Logout */}
          <TouchableOpacity
            onPress={async () => {
              await logoutUser();
              router.replace("/login");
            }}
            className="flex-row items-center justify-between px-5 py-5"
          >
            <View className="flex-row items-center">
              <Ionicons
                name="log-out-outline"
                size={22}
                color="#EF4444"
              />

              <Text className="ml-4 text-base font-medium text-red-500">
                Logout
              </Text>
            </View>

            <Ionicons
              name="chevron-forward"
              size={20}
              color="#9CA3AF"
            />
          </TouchableOpacity>

        </View>

        {/* Version */}
        <Text className="mt-8 text-center text-gray-400">
          App Version 1.0.0
        </Text>

      </SafeAreaView>
    </ProtectedRoutes>
  );
}