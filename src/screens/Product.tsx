import { View, Text, Image, TouchableOpacity, TextInput } from "react-native";

import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from "@react-navigation/native";
import { CardProps } from "../components/Card";
import { Button } from "../components/Button";
import { useState } from "react";
import { Input } from "../components/Input";

export function Product() {
  const [amount, setAmount] = useState(1)

  const navigation = useNavigation();

  const route = useRoute();
  const params = route.params as CardProps;

  var imageUri = { uri: params.data.image };

  const updateAmount = (newAmount: number) => {
    if (newAmount >= 0) {
      setAmount(newAmount);
    }
  };

  return (
    <View className="bg-primary h-full flex">
      <View className="h-[10%] p-[20px] flex flex-row justify-between">
        <TouchableOpacity onPress={() => navigation.navigate("home")}>
          <Ionicons name="ios-chevron-back-outline" size={32} color="white" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("home")}>
          <Ionicons name="md-close-sharp" size={32} color="white" />
        </TouchableOpacity>

      </View>
      <View className="bg-white flex justify-between h-[90%] p-[20px] rounded-t-[32px]">
        <View>
          <Image
            source={imageUri}
            className="object-cover h-60 w-full rounded-2xl"
          />

          <Text className="text-2xl font-semibold text-zinc-700 mt-4">
            {params.data.product}
          </Text>

          <Text className="text-zinc-400 text-base mt-2">
            {params.data.description === "" ? "-" : params.data.description}
          </Text>
        </View>

        <View>
          <View className="flex flex-row items-center justify-between gap-2 mb-6">
            <Text className="text-2xl font-medium text-zinc-700">
              R$ {params.data.price},00
            </Text>

            <View className="flex self-start flex-row rounded-3xl py-2 px-4 border-[1px] border-zinc-200">
              <Ionicons name="remove" color="#fb923c" size={28} onPress={() => updateAmount(amount - 1)} />

              <View className="flex justify-center items-center mx-2 max-w-[40px] min-w-[40px]">
                <Text className="text-base">{amount}</Text>
              </View>

              <Ionicons name="add" size={28} color="#fb923c" onPress={() => updateAmount(amount + 1)} />
            </View>
          </View>

          <Button title="Adiconar ao carrinho" onPress={() => navigation.navigate("cart")} />
        </View>
      </View>
    </View>
  )
}