import { View, Text } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Home } from "../screens/Home";
import { Orders } from "../screens/Orders";
import { Account } from "../screens/Account";

import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export function TabRoutes() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIcon: () => null,
        tabBarStyle: {
          //position: "absolute",
          //bottom: 20,
          height: 80,
          padding: 0,
          borderColor: "transparent",
          shadowColor: "black",
        }
      }}
    >
      <Tab.Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: (props) => (
            <View className="flex items-center justify-center">
              {props.focused
                ? (<Ionicons name="md-home-sharp" size={24} color="#52525b" />)
                : (<Ionicons name="md-home-outline" size={24} color="#52525b" />)
              }
              <Text className="text-zinc-900">Início</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="orders"
        component={Orders}
        options={{
          tabBarIcon: (props) => (
            <View className="flex items-center justify-center">
              {props.focused
                ? (<Ionicons name="ios-create" size={24} color="#52525b" />)
                : (<Ionicons name="create-outline" size={24} color="#52525b" />)
              }
              <Text className="text-zinc-900">Pedidos</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="account"
        component={Account}
        options={{
          tabBarIcon: (props) => (
            <View className="flex items-center justify-center">
              {props.focused
                ? (<Ionicons name="person" size={24} color="#52525b" />)
                : (<Ionicons name="person-outline" size={24} color="#52525b" />)
              }
              <Text className="text-zinc-900">Conta</Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  )
}
