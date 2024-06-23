import '~/global.css';
import Menu from '~/components/Menu';
import Auth from '~/components/Auth';
import Home from '~/components/Home';
import NewPost from '~/components/NewPost';
import XButtonHome from '~/components/XButtonHome';

import { X } from 'lucide-react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Theme, ThemeProvider } from '@react-navigation/native';
import { SplashScreen, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Platform } from 'react-native';
import { NAV_THEME } from '~/lib/constants';
import { useColorScheme } from '~/lib/useColorScheme';
import { PortalHost } from '~/components/primitives/portal';
import { ThemeToggle } from '~/components/ThemeToggle';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';


const LIGHT_THEME: Theme = {
  dark: false,
  colors: NAV_THEME.light,
};
const DARK_THEME: Theme = {
  dark: true,
  colors: NAV_THEME.dark,
};

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

// Prevent the splash screen from auto-hiding before getting the color scheme.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  const { colorScheme, setColorScheme, isDarkColorScheme } = useColorScheme();
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      const theme = await AsyncStorage.getItem('theme');
      if (Platform.OS === 'web') {
        // Adds the background color to the html element to prevent white background on overscroll.
        document.documentElement.classList.add('bg-background');
      }
      if (!theme) {
        AsyncStorage.setItem('theme', colorScheme);
        setIsColorSchemeLoaded(true);
        return;
      }
      const colorTheme = theme === 'dark' ? 'dark' : 'light';
      if (colorTheme !== colorScheme) {
        setColorScheme(colorTheme);

        setIsColorSchemeLoaded(true);
        return;
      }
      setIsColorSchemeLoaded(true);
    })().finally(() => {
      SplashScreen.hideAsync();
    });
  }, []);

  if (!isColorSchemeLoaded) {
    return null;
  }

  const Stack = createNativeStackNavigator();

  return (
    <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
    <NavigationContainer independent={true}>
      <Stack.Navigator
        initialRouteName="Auth"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="Auth"
          component={Auth}
          options={{
            headerShown: true,
            title: null,
            headerStyle: {
              backgroundColor: isDarkColorScheme ? '#000' : '#fff',
            },
            headerLeft: () => <Menu />,
            headerRight: () => <ThemeToggle />,
            animation: 'spring',
          }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: true,
            title: null,
            headerStyle: {
              backgroundColor: isDarkColorScheme ? '#000' : '#fff',
            },
            headerLeft: () => <Menu />,
            headerRight: () => <ThemeToggle />,
            animation: 'spring',
          }}
        />
        <Stack.Screen
          name='NewPost'
          component={NewPost}
          options={{
            headerShown: true,
            title: 'New post',
            headerStyle: {
              backgroundColor: isDarkColorScheme ? '#000' : '#fff',
            },
            headerLeft: () => <XButtonHome />,
            headerTitleStyle: {
              color: isDarkColorScheme ? '#fff' : '#000',
            },
          }}
        />
        {/* Additional screens can be added here */}
      </Stack.Navigator>
      <StatusBar style={isDarkColorScheme ? 'light' : 'dark'} />
      <PortalHost />
    </NavigationContainer>
  </ThemeProvider>
  );
}
