import React, { useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useApp } from "@/context/AppContext";
import ProductCard from "@/components/ProductCard";

function SkeletonCard() {
  return (
    <View className="mb-3 h-[310px] flex-1 mx-1 rounded-xl bg-white p-3">
      <View className="h-40 rounded-lg bg-gray-200" />
      <View className="mt-3 h-4 w-3/4 rounded bg-gray-200" />
      <View className="mt-2 h-3 w-full rounded bg-gray-100" />
      <View className="mt-4 h-5 w-1/3 rounded bg-gray-200" />
      <View className="mt-4 h-10 rounded-lg bg-gray-200" />
    </View>
  );
}

export default function HomeScreen() {
  const {
    products,
    productLoading,
    fetchProducts,
    search,
    setSearch,
    category,
    setCategory,
    categories,
    sortByPrice,
    setSortByPrice,
    addToCart,
  } = useApp();

  const onRefresh = useCallback(() => {
    fetchProducts();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-[#F1F3F6]">
      <View className="bg-[#2874F0] px-4 pt-3 pb-4">
        <Text className="text-2xl font-bold text-white">Trash</Text>

        <View className="mt-3 flex-row items-center">
          <View className="mr-2 flex-1 flex-row items-center rounded-lg bg-white px-3">
            <Ionicons name="search" size={20} color="#888" />
            <TextInput
              value={search}
              onChangeText={setSearch}
              placeholder="Search products..."
              className="flex-1 px-2 py-3"
            />
          </View>

          <TouchableOpacity
            onPress={fetchProducts}
            className="rounded-lg bg-[#FB641B] px-4 py-3"
          >
            <Text className="font-bold text-white">Search</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View className="bg-white py-2">
        <FlatList
          horizontal
          data={["All", ...categories]}
          keyExtractor={(item) => item}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 12 }}
          renderItem={({ item }) => {
            const active =
              (item === "All" && category === "") || item === category;

            return (
              <TouchableOpacity
                onPress={() =>
                  setCategory(item === "All" ? "" : item)
                }
                className={`mr-2 rounded-full px-4 py-2 ${active ? "bg-[#2874F0]" : "bg-gray-200"
                  }`}
              >
                <Text
                  className={`font-semibold ${active ? "text-white" : "text-gray-700"
                    }`}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            );
          }}
        />

        <View className="mt-2 flex-row px-3">
          <TouchableOpacity
            onPress={() =>
              setSortByPrice(
                sortByPrice === "lowToHigh" ? "" : "lowToHigh"
              )
            }
            className={`mr-2 rounded-full px-4 py-2 ${sortByPrice === "lowToHigh"
                ? "bg-[#2874F0]"
                : "bg-gray-200"
              }`}
          >
            <Text
              className={
                sortByPrice === "lowToHigh"
                  ? "font-semibold text-white"
                  : "font-semibold text-gray-700"
              }
            >
              Price ↑
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              setSortByPrice(
                sortByPrice === "highToLow" ? "" : "highToLow"
              )
            }
            className={`rounded-full px-4 py-2 ${sortByPrice === "highToLow"
                ? "bg-[#2874F0]"
                : "bg-gray-200"
              }`}
          >
            <Text
              className={
                sortByPrice === "highToLow"
                  ? "font-semibold text-white"
                  : "font-semibold text-gray-700"
              }
            >
              Price ↓
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {productLoading ? (
        <FlatList
          data={[1, 2, 3, 4, 5, 6]}
          numColumns={2}
          keyExtractor={(i) => String(i)}
          renderItem={() => <SkeletonCard />}
          contentContainerStyle={{ padding: 8 }}
        />
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item: any) => item._id}
          numColumns={2}
          columnWrapperStyle={{
            justifyContent: "space-between",
            paddingHorizontal: 8,
          }}
          refreshControl={
            <RefreshControl
              refreshing={productLoading}
              onRefresh={onRefresh}
            />
          }
          ListEmptyComponent={
            <View className="mt-20 items-center">
              <Ionicons
                name="cube-outline"
                size={70}
                color="#9CA3AF"
              />
              <Text className="mt-4 text-lg font-semibold text-gray-700">
                No Products Found
              </Text>
            </View>
          }
          initialNumToRender={6}
          maxToRenderPerBatch={6}
          windowSize={7}
          removeClippedSubviews
          renderItem={({ item }) => (
            <ProductCard
              item={item}
              addToCart={addToCart}
            />
          )}
          ListFooterComponent={
            productLoading ? (
              <ActivityIndicator
                size="large"
                color="#2874F0"
              />
            ) : null
          }
        />
      )}
    </SafeAreaView>
  );
}
