import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { onAuthStateChanged } from 'firebase/auth';
import { User } from 'firebase/auth';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';

import { app, auth } from './src/misc/firebase';


const Stack = createNativeStackNavigator();


export default function App() {


	const navigationRef = useNavigationContainerRef();


	/* Firebase Authentication */

	const [initializing, setInitializing] = useState(true);
	const [user, setUser] = useState<User | null>(null);


	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setUser(user);
			if (initializing) setInitializing(false);
		});
		return () => { unsubscribe() };
	});

  
	// let [fontsLoaded] = useFonts({
	// 	Lato_Regular: require('./assets/fonts/Lato-Regular.ttf'),
	// 	Lato_Medium: require('./assets/fonts/Lato-Medium.ttf'),
	// 	Lato_SemiBold: require('./assets/fonts/Lato-SemiBold.ttf'),
	// 	Lato_Bold: require('./assets/fonts/Lato-Bold.ttf')
	// });


	// if (!fontsLoaded) { return null };


	return (
		<NavigationContainer
			ref={navigationRef}
		>
			<Stack.Navigator initialRouteName='Onboard' screenOptions={{ headerShown: false }}>
				{!user ? (
					<>
						{/* <Stack.Screen name='Onboard' component={Onboard} />
						<Stack.Screen name='SignUp' component={SignUp} />
						<Stack.Screen name='SignIn' component={SignIn} /> */}
					</>
				) : (
					<>
						{/* <Stack.Screen name='Tabs' component={MainTabs} /> */}
					</>
				)}
			</Stack.Navigator>
		</NavigationContainer>
	);
};
