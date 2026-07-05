import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    TextInput,
    Modal,
    ActivityIndicator,
    Alert,
    StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import axios from "axios";
import Toast from "react-native-toast-message";

import ProtectedRoutes from "@/components/ProtectedRoutes";
import { server, useApp } from "@/context/AppContext";
import { Address } from "@/types";

export default function CheckoutScreen() {
    const router = useRouter();

    const { token, isAuth } = useApp();

    const [addresses, setAddresses] = useState<Address[]>([]);
    const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const [modalVisible, setModalVisible] = useState(false);

    const [form, setForm] = useState({
        address: "",
        phone: "",
    });

    async function fetchAddresses() {
        if (!token) return;

        setLoading(true);

        try {
            const { data } = await axios.get(
                `${server}/api/address/all`,
                {
                    headers: {
                        token,
                    },
                }
            );

            const list = Array.isArray(data)
                ? data
                : data.addresses || [];

            setAddresses(list);

            if (list.length > 0) {
                setSelectedAddress(list[0]);
            }
        } catch (error: any) {
            Toast.show({
                type: "error",
                text1:
                    error?.response?.data?.message ||
                    "Failed to load addresses",
            });
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchAddresses();
    }, []);

    async function handleAdd() {
        if (
            !form.address.trim() ||
            !form.phone.trim()
        ) {
            Toast.show({
                type: "error",
                text1: "Please fill all fields",
            });

            return;
        }

        setSubmitting(true);

        try {
            await axios.post(
                `${server}/api/address/new`,
                form,
                {
                    headers: {
                        token,
                    },
                }
            );

            Toast.show({
                type: "success",
                text1: "Address Added",
            });

            setForm({
                address: "",
                phone: "",
            });

            setModalVisible(false);

            fetchAddresses();
        } catch (error: any) {
            Toast.show({
                type: "error",
                text1:
                    error?.response?.data?.message ||
                    "Failed to add address",
            });
        } finally {
            setSubmitting(false);
        }
    }

    function handleDelete(id: string) {
        Alert.alert(
            "Delete Address",
            "Are you sure you want to delete this address?",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            await axios.delete(
                                `${server}/api/address/${id}`,
                                {
                                    headers: {
                                        token,
                                    },
                                }
                            );

                            Toast.show({
                                type: "success",
                                text1: "Address Deleted",
                            });

                            fetchAddresses();
                        } catch (error: any) {
                            Toast.show({
                                type: "error",
                                text1:
                                    error?.response?.data?.message ||
                                    "Delete Failed",
                            });
                        }
                    },
                },
            ]
        );
    }

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
                        onPress={() => router.push("/(tabs)/cart")}
                    >
                        <Ionicons
                            name="arrow-back"
                            size={24}
                            color="white"
                        />
                    </TouchableOpacity>

                    <Text className="ml-4 text-2xl font-bold text-white">
                        Checkout
                    </Text>

                </View>

                {loading ? (
                    <View className="flex-1 items-center justify-center">
                        <ActivityIndicator
                            size="large"
                            color="#2874F0"
                        />
                    </View>
                ) : (
                    <FlatList
                        data={addresses}
                        keyExtractor={(item: any) => item._id}
                        contentContainerStyle={{
                            paddingBottom: 140,
                        }}
                        ListHeaderComponent={
                            <TouchableOpacity
                                onPress={() =>
                                    setModalVisible(true)
                                }
                                className="m-4 items-center rounded-xl border-2 border-dashed border-[#2874F0] bg-white py-4"
                            >
                                <Ionicons
                                    name="add-circle-outline"
                                    size={24}
                                    color="#2874F0"
                                />

                                <Text className="mt-1 font-bold text-[#2874F0]">
                                    Add New Address
                                </Text>
                            </TouchableOpacity>
                        }
                        renderItem={({ item }) => (
                            <View className="mx-4 mb-3 rounded-xl bg-white p-4">

                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    onPress={() => setSelectedAddress(item)}
                                >

                                    <View className="flex-row justify-between">

                                        <View className="flex-1 pr-3">

                                            <Text className="text-base font-bold text-gray-900">
                                                {item.phone}
                                            </Text>

                                            <Text className="mt-2 text-gray-600">
                                                {item.address}
                                            </Text>

                                        </View>

                                        <Ionicons
                                            name={
                                                selectedAddress?._id === item._id
                                                    ? "radio-button-on"
                                                    : "radio-button-off"
                                            }
                                            size={24}
                                            color="#2874F0"
                                        />

                                    </View>

                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() =>
                                        handleDelete(item._id)
                                    }
                                    className="mt-4 self-end flex-row items-center rounded-lg bg-red-50 px-3 py-2"
                                >
                                    <Ionicons
                                        name="trash-outline"
                                        size={18}
                                        color="#DC2626"
                                    />

                                    <Text className="ml-2 font-semibold text-red-600">
                                        Delete
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        )}
                        ListEmptyComponent={
                            <View className="mt-20 items-center px-6">
                                <Ionicons
                                    name="location-outline"
                                    size={80}
                                    color="#9CA3AF"
                                />

                                <Text className="mt-4 text-xl font-bold text-gray-800">
                                    No Address Found
                                </Text>

                                <Text className="mt-2 text-center text-gray-500">
                                    Add a delivery address to continue
                                </Text>
                            </View>
                        }
                    />
                )}

                {/* Bottom Button */}

                <View
                    className="absolute bottom-0 left-0 right-0 rounded-t-3xl bg-white p-5"
                    style={{ elevation: 12 }}
                >
                    <TouchableOpacity
                        activeOpacity={0.8}
                        disabled={!selectedAddress}
                        className={`items-center rounded-xl py-4 ${selectedAddress
                            ? "bg-[#FB641B]"
                            : "bg-gray-400"
                            }`}
                        onPress={() => {
                            if (!selectedAddress) {
                                Toast.show({
                                    type: "error",
                                    text1: "Please select an address",
                                });

                                return;
                            }

                            router.push({
                                pathname: "/payment",
                                params: {
                                    phone: selectedAddress?.phone ?? "",
                                    address: selectedAddress?.address ?? "",
                                },
                            });
                        }}
                    >
                        <Text className="text-lg font-bold text-white">
                            Proceed to Payment
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Add Address Modal */}

                <Modal
                    visible={modalVisible}
                    transparent
                    animationType="slide"
                >
                    <View className="flex-1 justify-end bg-black/40">

                        <View className="rounded-t-3xl bg-white p-5">

                            <Text className="mb-5 text-2xl font-bold text-gray-900">
                                Add New Address
                            </Text>

                            <TextInput
                                placeholder="Phone Number"
                                keyboardType="phone-pad"
                                value={form.phone}
                                onChangeText={(text) =>
                                    setForm({
                                        ...form,
                                        phone: text,
                                    })
                                }
                                className="mb-4 rounded-xl border border-gray-300 bg-gray-50 px-4 py-4"
                            />

                            <TextInput
                                placeholder="Complete Address"
                                multiline
                                numberOfLines={4}
                                textAlignVertical="top"
                                value={form.address}
                                onChangeText={(text) =>
                                    setForm({
                                        ...form,
                                        address: text,
                                    })
                                }
                                className="mb-5 rounded-xl border border-gray-300 bg-gray-50 px-4 py-4"
                            />

                            <TouchableOpacity
                                disabled={submitting}
                                activeOpacity={0.8}
                                onPress={handleAdd}
                                className="items-center rounded-xl bg-[#2874F0] py-4"
                            >
                                {submitting ? (
                                    <ActivityIndicator color="white" />
                                ) : (
                                    <Text className="text-lg font-bold text-white">
                                        Save Address
                                    </Text>
                                )}
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => setModalVisible(false)}
                                className="mt-4 items-center"
                            >
                                <Text className="font-semibold text-red-500">
                                    Cancel
                                </Text>
                            </TouchableOpacity>

                        </View>

                    </View>
                </Modal>

            </SafeAreaView>
        </ProtectedRoutes>
    );
}
