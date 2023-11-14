import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { TabRoutes } from './tab.routes';

import { Cart } from '../screens/Cart';
import { Product } from '../screens/Product';

const Stack = createNativeStackNavigator();

export function AuthRoutes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="homeTab"
        component={TabRoutes}
      />
      <Stack.Screen
        name="cart"
        component={Cart}
      />
      <Stack.Screen
        name="product"
        component={Product}
      />
    </Stack.Navigator>
  )
}