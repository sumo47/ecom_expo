import PublicRoutes from '@/components/PublicRoutes'
import { useApp } from '@/context/AppContext';
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Link } from 'expo-router';


export default function login() {
  const { isAuth, btnLoading } = useApp();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const isDisabled = !email.trim() || !password.trim() || btnLoading;

  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    console.log({email, password});
  };

  return (
    <PublicRoutes isLoggedIn={isAuth}>
      <SafeAreaView className="flex-1 bg-blue-600">
        {/* <StatusBar barStyle="light-content"
          // backgroundColor="#2563EB"
           /> */}

        {/* Header */}
        <View className="px-6 pt-16 pb-10 bg-blue-600">
          <Text className="text-4xl font-bold text-white">
            Welcome Back 👋
          </Text>

          <Text className="mt-3 text-base text-blue-100">
            Login to continue shopping
          </Text>
        </View>

        {/* Card */}
        <View className="flex-1 rounded-t-[30px] bg-white px-6 pt-8">

          {/* Email */}

          <Text className="mb-2 text-gray-700 font-semibold">
            Email
          </Text>

          <TextInput
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
            className="mb-5 rounded-xl border border-gray-300 bg-gray-50 px-4 py-4 text-base"
          />

          {/* Password */}

          <Text className="mb-2 text-gray-700 font-semibold">
            Password
          </Text>

          <View className="flex-row items-center rounded-xl border border-gray-300 bg-gray-50 px-4">

            <TextInput
              placeholder="Enter your password"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
              className="flex-1 py-4 text-base"
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

          {/* Forgot Password */}

          {/* <TouchableOpacity className="mt-3 self-end">
              <Text className="font-medium text-blue-600">
                Forgot Password?
              </Text>
            </TouchableOpacity> */}

          {/* Login */}

          <TouchableOpacity
            onPress={handleLogin} disabled={isDisabled}
            className={`mt-8 items-center rounded-xl py-4 active:opacity-80 ${isDisabled ? 'bg-gray-400' : ' bg-orange-500'}`}

          >
            <Text className="text-lg font-bold text-white">
              LOGIN
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

          {/* Sign Up */}

          <TouchableOpacity className="items-center">
            <Text className="text-gray-600">
              Don't have an account?{" "}
              <Link href={"/register"} className="font-bold text-blue-600">
                Sign Up
              </Link>
            </Text>
          </TouchableOpacity>

        </View>
      </SafeAreaView>
    </PublicRoutes>
  )
}

