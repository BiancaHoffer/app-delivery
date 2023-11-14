import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SignIn } from '../screens/SignIn';
import { SignUp } from '../screens/SignUp';
import { RecoverPassword } from '../screens/RecoverPassword';
import { SuccessSignUp } from '../screens/SuccessSignUp';

const Stack = createNativeStackNavigator();

export function AppRoutes() {
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
        name="successsignin"
        component={SuccessSignUp}
      />
    </Stack.Navigator>
  )
}