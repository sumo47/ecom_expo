import React, { useCallback, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, RefreshControl, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import ProtectedRoutes from '@/components/ProtectedRoutes';
import CartItem from '@/components/CartItem';
import { useApp } from '@/context/AppContext';

export default function CartScreen() {
  const { isAuth, cart, cartLoading, fetchCart, updateCart, removeFromCart } = useApp();

  useEffect(() => { fetchCart(); }, []);

  const onRefresh = useCallback(() => { fetchCart(); }, []);

  const total = cart.reduce((sum: any, item: any) => sum + item.product.price * item.quantity, 0);

  if (cartLoading) {
    return (
      <View className='flex-1 items-center justify-center bg-[#F1F3F6]'>
        <ActivityIndicator size='large' color='#2874F0' />
      </View>
    );
  }

  return (
    <ProtectedRoutes isLoggedIn={isAuth}>
      <SafeAreaView className='flex-1 bg-[#F1F3F6]'>
        <StatusBar barStyle='light-content' backgroundColor='#2874F0' />

        <View className='bg-[#2874F0] px-4 py-4'>
          <Text className='text-2xl font-bold text-white'>My Cart ({cart.length})</Text>
        </View>

        {cart.length === 0 ? (
          <View className='flex-1 items-center justify-center px-6'>
            <Ionicons name='cart-outline' size={90} color='#9CA3AF' />
            <Text className='mt-5 text-2xl font-bold text-gray-800'>Your Cart is Empty</Text>
            <Text className='mt-2 text-center text-gray-500'>Looks like you haven't added anything yet.</Text>
          </View>
        ) : (
          <>
            <FlatList
              data={cart}
              keyExtractor={(item: any) => item._id}
              renderItem={({ item }) => (
                <CartItem item={item} updateCart={updateCart} removeFromCart={removeFromCart} />
              )}
              refreshControl={<RefreshControl refreshing={cartLoading} onRefresh={onRefresh} />}
              contentContainerStyle={{ paddingTop: 12, paddingBottom: 170 }}
              initialNumToRender={5}
              maxToRenderPerBatch={5}
              windowSize={7}
              removeClippedSubviews
            />

            <View className='absolute bottom-0 left-0 right-0 rounded-t-3xl bg-white p-5' style={{ elevation: 15 }}>
              <View className='mb-3 flex-row justify-between'>
                <Text className='text-base text-gray-500'>Items</Text>
                <Text className='font-semibold'>{cart.length}</Text>
              </View>

              <View className='mb-3 flex-row justify-between'>
                <Text className='text-base text-gray-500'>Delivery</Text>
                <Text className='font-semibold text-green-600'>FREE</Text>
              </View>

              <View className='mb-4 flex-row justify-between border-t border-gray-200 pt-4'>
                <Text className='text-xl font-bold'>Total</Text>
                <Text className='text-2xl font-bold text-[#2874F0]'>₹{total}</Text>
              </View>

              <TouchableOpacity className='items-center rounded-xl bg-[#FB641B] py-4'>
                <Text className='text-lg font-bold text-white'>Proceed to Checkout</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </SafeAreaView>
    </ProtectedRoutes>
  );
}
