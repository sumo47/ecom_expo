import { View, Text } from 'react-native'
import React from 'react'
import PublicRoutes from '@/components/PublicRoutes'
import { useApp } from '@/context/AppContext';

export default function registerScreen() {
    const { isAuth } = useApp();
    return (
        <PublicRoutes isLoggedIn={isAuth}>
            <View>
                <Text>Register Screen</Text>
            </View>
        </PublicRoutes>


    )
}