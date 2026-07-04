import { View, Text } from 'react-native'
import React from 'react'
import ProtectedRoutes from '@/components/ProtectedRoutes'
import { useApp } from '@/context/AppContext';

export default function accountScreen() {
    const { isAuth } = useApp();
    return (
        <ProtectedRoutes isLoggedIn={isAuth}>
            <View>
                <Text>accountScreen</Text>
            </View>
        </ProtectedRoutes>

    )
}