import { useNavigation } from "@react-navigation/native";

import {
  View,
  Text,
  Image,
  TouchableOpacity
}
  from "react-native";

import { ProductData } from "../screens/Home";

import { Ionicons } from '@expo/vector-icons';

export interface CardProps {
  data: ProductData;
}

export function Card({ data }: CardProps) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("product", { data })}
      className="mb-4 mr-4 bg-zinc-200 flex  rounded-tl-3xl rounded-br-3xl"
    >
      <View className="flex justify-between w-full">
        <Image
          source={{ uri: data.image }}
          className="object-cover h-36 my-4 mx-6 rounded-2xl rounded-br-3xl bg-zinc-50"
        />
        <Text className="text-lg text-zinc-700 px-6">
          {data.name}
        </Text>
        <View className="mt-1 flex justify-between flex-row items-center">
          <Text className="text-zinc-900 font-medium text-lg px-6">
            R$ {data.price},00
          </Text>

          <View className="bg-primary w-20 h-14 self-end flex justify-center items-center rounded-tl-3xl  rounded-br-3xl">
            <Ionicons name="add" size={24} color="#fff" />
          </View>
        </View>
      </View>
    </TouchableOpacity >
  )
}