import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Auth from '~/components/Auth';
import Home from '~/components/Home';

import Carrillo from '~/assets/images/carrillo.svg';

const Stack = createNativeStackNavigator();

export default function Screen() {

  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="Auth" screenOptions={{
        headerShown: false, animation: 'spring', config: {
          stiffness: 1000,
          damping: 500,
          mass: 3,
          overshootClamping: true,
          restDisplacementThreshold: 0.01,
          restSpeedThreshold: 0.01,
        }
      }}>
        <Stack.Screen
          name="Auth" component={Auth} 
          />
        <Stack.Screen
          // options={{
          //   title: null,
          //   headerBackVisible: false,
          //   headerRight: () => (
          //     <>
          //       <PlusCircle size={24} strokeWidth={2} className='text-foreground/70' />
          //       <PlusCircle size={24} strokeWidth={2} className='text-foreground/70' />
          //     </>
          //   ),
          // }}
          name="Home" component={Home} />

      </Stack.Navigator>
    </NavigationContainer>
  );

}
