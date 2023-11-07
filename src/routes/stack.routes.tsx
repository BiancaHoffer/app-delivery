import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { TabRoutes } from './tab.routes';

import { SignIn } from '../screens/SignIn';
import { SignUp } from '../screens/SignUp';
import { RecoverPassword } from '../screens/RecoverPassword';
import { Cart } from '../screens/Cart';
import { Product } from '../screens/Product';

const Stack = createNativeStackNavigator();

export function StackRoutes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name='signin'
        component={SignIn}
      />
      <Stack.Screen
        name='signup'
        component={SignUp}
      />
      <Stack.Screen
        name='recoverpassword'
        component={RecoverPassword}
      />
      <Stack.Screen
        name="home"
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