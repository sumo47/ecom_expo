//? For learning purpose
// import { View, Text, StyleSheet } from 'react-native'
// import React from 'react'

// export default function HomePage() {
//     return (
//         <View style={styles.viewStyle}>
//             <Text style={{ color: 'red', fontSize: 24 }}>HomePage</Text>
//             <Text style={styles.textStyle}>
//                 Welcome to the HomePage!
//             </Text>
//         </View>
//     )
// }
// const styles = StyleSheet.create({

//     viewStyle: {
//         flex: 1,
//         backgroundColor: '#fff',
//         alignItems: 'center',
//         justifyContent: 'center',

//     },
//     textStyle: {
//         color: 'blue',
//         fontSize: 18,
//         textAlign: 'center',
//         // marginTop: 10,
//     }
// });/

import { View, Text } from 'react-native'
import React from 'react'

export default function HomePage() {
  return (
    <View>
      <Text className='text-red-500'>HomePage</Text>
    </View>
  )
}