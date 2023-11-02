import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Home } from "../screens/Home";
import { Orders } from "../screens/Orders";

const Tab = createBottomTabNavigator();

export function TabRoutes() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="homeTab"
        component={Home}
      />

      <Tab.Screen
        name="orders"
        component={Orders}
      />
    </Tab.Navigator>
  )
}
