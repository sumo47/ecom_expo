import { View, Text } from 'react-native'
import { Redirect } from 'expo-router'
import React from 'react'

export default function index() {
    return (
        <Redirect href={"/(tabs)/home"} />

    )
}