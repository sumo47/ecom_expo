import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router';
import { useApp } from '@/context/AppContext';
import { SafeAreaView } from 'react-native-safe-area-context';


type Tab = "products" | "orders" | "stats";
const TABS: { key: Tab; label: string; emoji: string }[]
  = [
    { key: "products", label: "Product", emoji: "📦" },
    { key: "orders", label: "Orders", emoji: "📻" },
    { key: "stats", label: "Stats", emoji: "📊" },
  ]

export default function AdminScreen() {

  const router = useRouter();
  const { user } = useApp();
  const [activeTab, setActiveTab] = useState<Tab>("products");

  if (!user || user.role !== "admin") {
    router.replace("/(tabs)/home");
    return null;
  }

  return (
    <SafeAreaView>
      <View >
        <TouchableOpacity onPress={() => router.push("/account")}>
          <Text>
            🔙
          </Text>
        </TouchableOpacity>
        <Text>
          Admin Dashboard
        </Text>
      </View>
    </SafeAreaView>
  )
}




// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   FlatList,
//   StatusBar,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { Ionicons } from "@expo/vector-icons";
// import { Image } from "expo-image";
// import { useRouter } from "expo-router";

// import ProtectedRoutes from "@/components/ProtectedRoutes";
// import { useApp } from "@/context/AppContext";

// export default function AdminDashboard() {
//   const router = useRouter();

//   const {
//     isAuth,
//     products,
//   } = useApp();

//   const [tab, setTab] = useState<
//     "products" | "orders" | "stats"
//   >("products");

//   return (
//     <ProtectedRoutes isLoggedIn={isAuth}>

//       <SafeAreaView className="flex-1 bg-[#F1F3F6]">

//         <StatusBar
//           backgroundColor="#2874F0"
//           barStyle="light-content"
//         />

//         {/* Header */}

//         <View className="bg-[#2874F0] px-4 py-4">

//           <Text className="text-2xl font-bold text-white">
//             Admin Dashboard
//           </Text>

//           <Text className="mt-1 text-blue-100">
//             Manage your store
//           </Text>

//         </View>

//         {/* Tabs */}

//         <View className="flex-row bg-white">

//           {/* Products */}

//           <TouchableOpacity
//             className={`flex-1 items-center border-b-2 py-4 ${tab === "products"
//                 ? "border-[#2874F0]"
//                 : "border-transparent"
//               }`}
//             onPress={() => setTab("products")}
//           >

//             <Ionicons
//               name="cube-outline"
//               size={22}
//               color={
//                 tab === "products"
//                   ? "#2874F0"
//                   : "#6B7280"
//               }
//             />

//             <Text
//               className={`mt-1 font-semibold ${tab === "products"
//                   ? "text-[#2874F0]"
//                   : "text-gray-500"
//                 }`}
//             >
//               Products
//             </Text>

//           </TouchableOpacity>

//           {/* Orders */}

//           <TouchableOpacity
//             className={`flex-1 items-center border-b-2 py-4 ${tab === "orders"
//                 ? "border-[#2874F0]"
//                 : "border-transparent"
//               }`}
//             onPress={() => setTab("orders")}
//           >

//             <Ionicons
//               name="bag-handle-outline"
//               size={22}
//               color={
//                 tab === "orders"
//                   ? "#2874F0"
//                   : "#6B7280"
//               }
//             />

//             <Text
//               className={`mt-1 font-semibold ${tab === "orders"
//                   ? "text-[#2874F0]"
//                   : "text-gray-500"
//                 }`}
//             >
//               Orders
//             </Text>

//           </TouchableOpacity>

//           {/* Stats */}

//           <TouchableOpacity
//             className={`flex-1 items-center border-b-2 py-4 ${tab === "stats"
//                 ? "border-[#2874F0]"
//                 : "border-transparent"
//               }`}
//             onPress={() => setTab("stats")}
//           >

//             <Ionicons
//               name="bar-chart-outline"
//               size={22}
//               color={
//                 tab === "stats"
//                   ? "#2874F0"
//                   : "#6B7280"
//               }
//             />

//             <Text
//               className={`mt-1 font-semibold ${tab === "stats"
//                   ? "text-[#2874F0]"
//                   : "text-gray-500"
//                 }`}
//             >
//               Stats
//             </Text>

//           </TouchableOpacity>

//         </View>

//         {/* Products */}

//         {tab === "products" && (

//           <FlatList
//             data={products}
//             keyExtractor={(item: any) => item._id}
//             contentContainerStyle={{
//               padding: 12,
//               paddingBottom: 90,
//             }}
//             renderItem={({ item }) => (

//               <TouchableOpacity
//                 activeOpacity={0.85}
//                 onPress={() =>
//                   router.push({
//                     pathname: "/admin/product/[id]",
//                     params: {
//                       id: item._id,
//                     },
//                   })
//                 }
//                 className="mb-4 rounded-2xl bg-white p-4"
//               >

//                 <View className="flex-row">

//                   <Image
//                     source={{
//                       uri:
//                         item.images?.[0]?.url ??
//                         "https://placehold.co/300x300",
//                     }}
//                     style={{
//                       width: 90,
//                       height: 90,
//                       borderRadius: 12,
//                     }}
//                     contentFit="cover"
//                   />

//                   <View className="ml-3 flex-1">

//                     <Text
//                       numberOfLines={2}
//                       className="text-lg font-bold text-gray-900"
//                     >
//                       {item.title}
//                     </Text>

//                     <Text className="mt-2 text-xl font-bold text-[#2874F0]">
//                       ₹{item.price}
//                     </Text>

//                     <View className="mt-3 flex-row justify-between">

//                       <Text className="font-medium text-gray-600">
//                         Stock
//                       </Text>

//                       <Text
//                         className={`font-bold ${item.stock > 0
//                             ? "text-green-600"
//                             : "text-red-600"
//                           }`}
//                       >
//                         {item.stock}
//                       </Text>

//                     </View>

//                   </View>

//                 </View>

//               </TouchableOpacity>

//             )}
//           />

//         )}

//         {/* Floating Add Product */}

//         {tab === "products" && (

//           <TouchableOpacity
//             activeOpacity={0.8}
//             onPress={() =>
//               router.push("/admin/add-product")
//             }
//             className="absolute bottom-8 right-6 h-16 w-16 items-center justify-center rounded-full bg-[#FB641B]"
//             style={{
//               elevation: 10,
//             }}
//           >

//             <Ionicons
//               name="add"
//               size={34}
//               color="white"
//             />

//           </TouchableOpacity>

//         )}
//         {/* Orders Tab */}

//         {tab === "orders" && (

//           <View className="flex-1 items-center justify-center px-6">

//             <Ionicons
//               name="bag-handle-outline"
//               size={90}
//               color="#2874F0"
//             />

//             <Text className="mt-5 text-2xl font-bold text-gray-900">
//               Manage Orders
//             </Text>

//             <Text className="mt-3 text-center text-gray-500">
//               View all customer orders,
//               update delivery status and
//               manage pending orders.
//             </Text>

//             <TouchableOpacity
//               activeOpacity={0.8}
//               className="mt-8 rounded-xl bg-[#2874F0] px-8 py-4"
//               onPress={() =>
//                 router.push("/admin/orders")
//               }
//             >
//               <Text className="text-lg font-bold text-white">
//                 View Orders
//               </Text>
//             </TouchableOpacity>

//           </View>

//         )}

//         {/* Stats Tab */}

//         {tab === "stats" && (

//           <View className="flex-1 px-4 py-5">

//             <Text className="mb-4 text-2xl font-bold text-gray-900">
//               Store Statistics
//             </Text>

//             {/* Orders */}

//             <View className="mb-4 rounded-2xl bg-white p-5">

//               <View className="flex-row items-center">

//                 <Ionicons
//                   name="bag-check-outline"
//                   size={24}
//                   color="#2874F0"
//                 />

//                 <Text className="ml-3 text-lg font-bold">
//                   Orders
//                 </Text>

//               </View>

//               <Text className="mt-4 text-gray-500">
//                 Coming Soon
//               </Text>

//             </View>

//             {/* Revenue */}

//             <View className="mb-4 rounded-2xl bg-white p-5">

//               <View className="flex-row items-center">

//                 <Ionicons
//                   name="cash-outline"
//                   size={24}
//                   color="#16A34A"
//                 />

//                 <Text className="ml-3 text-lg font-bold">
//                   Revenue
//                 </Text>

//               </View>

//               <Text className="mt-4 text-gray-500">
//                 Coming Soon
//               </Text>

//             </View>

//             {/* Analytics */}

//             <View className="mb-4 rounded-2xl bg-white p-5">

//               <View className="flex-row items-center">

//                 <Ionicons
//                   name="bar-chart-outline"
//                   size={24}
//                   color="#FB641B"
//                 />

//                 <Text className="ml-3 text-lg font-bold">
//                   Analytics
//                 </Text>

//               </View>

//               <Text className="mt-4 text-gray-500">
//                 Charts & reports will appear here.
//               </Text>

//             </View>

//             {/* Payment */}

//             <View className="rounded-2xl bg-white p-5">

//               <View className="flex-row items-center">

//                 <Ionicons
//                   name="card-outline"
//                   size={24}
//                   color="#9333EA"
//                 />

//                 <Text className="ml-3 text-lg font-bold">
//                   Payments
//                 </Text>

//               </View>

//               <Text className="mt-4 text-gray-500">
//                 COD / Online payment reports
//                 will be available here.
//               </Text>

//             </View>

//           </View>

//         )}

//       </SafeAreaView>

//     </ProtectedRoutes>

//   );
// }