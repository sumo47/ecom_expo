import PublicRoutes from "@/components/PublicRoutes";
import { useApp } from "@/context/AppContext";
import { Link, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

export default function RegisterScreen() {
  const { isAuth, btnLoading, registerUser } = useApp();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const isDisabled =
    !name.trim() ||
    !email.trim() ||
    !password.trim() ||
    btnLoading;

  const handleRegister = () => {
    registerUser(name, email, password, setName, setEmail, setPassword, router);
  };

  return (
    <PublicRoutes isLoggedIn={isAuth}>
      <SafeAreaView className="flex-1 bg-[#2874F0]">
        <StatusBar
          barStyle="light-content"
          backgroundColor="#2874F0"
        />

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          className="flex-1"
        >
          {/* Header */}
          <View className="bg-[#2874F0] px-6 pt-12 pb-8">
            <Text className="text-4xl font-bold text-white">
              Create Account
            </Text>

            <Text className="mt-2 text-base text-blue-100">
              Join us and start shopping today
            </Text>
          </View>

          {/* Card */}
          <View className="flex-1 rounded-t-[30px] bg-white px-6 pt-8">

            {/* Full Name */}
            <Text className="mb-2 font-semibold text-gray-700">
              Full Name
            </Text>

            <TextInput
              placeholder="Enter your full name"
              placeholderTextColor="#9CA3AF"
              autoCapitalize="words"
              value={name}
              onChangeText={setName}
              className="mb-5 rounded-xl border border-gray-300 bg-gray-50 px-4 py-4 text-base text-black"
            />

            {/* Email */}
            <Text className="mb-2 font-semibold text-gray-700">
              Email
            </Text>

            <TextInput
              placeholder="Enter your email"
              placeholderTextColor="#9CA3AF"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              value={email}
              onChangeText={setEmail}
              className="mb-5 rounded-xl border border-gray-300 bg-gray-50 px-4 py-4 text-base text-black"
            />

            {/* Password */}
            <Text className="mb-2 font-semibold text-gray-700">
              Password
            </Text>

            <View className="flex-row items-center rounded-xl border border-gray-300 bg-gray-50 px-4">
              <TextInput
                placeholder="Create a password"
                placeholderTextColor="#9CA3AF"
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoCorrect={false}
                value={password}
                onChangeText={setPassword}
                className="flex-1 py-4 text-base text-black"
              />

              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
              >
                <Ionicons
                  name={showPassword ? "eye-off" : "eye"}
                  size={22}
                  color="#6B7280"
                />
              </TouchableOpacity>
            </View>

            {/* Register Button */}
            <TouchableOpacity
              disabled={isDisabled}
              onPress={handleRegister}
              className={`mt-8 items-center rounded-xl py-4 ${
                isDisabled
                  ? "bg-gray-400"
                  : "bg-[#FB641B]"
              }`}
            >
              <Text className="text-lg font-bold text-white">
                CREATE ACCOUNT
              </Text>
            </TouchableOpacity>

            {/* Divider */}
            <View className="my-8 flex-row items-center">
              <View className="h-[1px] flex-1 bg-gray-300" />

              <Text className="mx-3 text-gray-500">
                OR
              </Text>

              <View className="h-[1px] flex-1 bg-gray-300" />
            </View>

            {/* Login */}
            <TouchableOpacity className="items-center">
              <Text className="text-gray-600">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-bold text-[#2874F0]"
                >
                  Login
                </Link>
              </Text>
            </TouchableOpacity>

            {/* Terms */}
            <Text className="mt-8 text-center text-xs leading-5 text-gray-500">
              By creating an account, you agree to our{" "}
              <Text className="font-semibold text-[#2874F0]">
                Terms of Use
              </Text>{" "}
              and{" "}
              <Text className="font-semibold text-[#2874F0]">
                Privacy Policy
              </Text>.
            </Text>

          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </PublicRoutes>
  );
}