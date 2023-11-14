import { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert
} from "react-native";

import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from "@react-navigation/native";

import { Button } from "../components/Button";
import { useCart } from "../hooks/useCart";

export interface ProductData {
  id: string;
  name: string;
  price: string;
  description: string;
  image: string;
}

interface ParamsData {
  data: ProductData;
}

export interface Cart extends ProductData {
  amount: number;
}

export function Product() {
  const { addCart } = useCart();

  const [amount, setAmount] = useState(1);

  const navigation = useNavigation();
  const route = useRoute();
  const params = route.params as ParamsData;

  var imageUri = { uri: params.data.image };

  function handleAddCart() {
    const data = params.data;

    const newProduct = {
      ...data,
      amount
    } as Cart;

    addCart(newProduct);
    setAmount(1);
    navigation.navigate("cart");
  }

  return (
    <View className="bg-primary h-full flex">
      <View className="h-[20%] p-[20px] flex flex-row justify-between">
        <TouchableOpacity onPress={() => navigation.navigate("home")}>
          <Ionicons name="ios-chevron-back-outline" size={32} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("home")}>
          <Ionicons name="md-close-sharp" size={32} color="white" />
        </TouchableOpacity>
      </View>
      <View className="bg-white flex justify-between h-[80%] p-[20px] rounded-t-[32px]">
        <View>
          <View className="w-full flex items-center ">
            <Image
              source={imageUri}
              className="mt-[-100px] object-cover h-60 w-full rounded-3xl bg-white"
            />
          </View>

          <Text className="text-2xl font-semibold text-zinc-700 mt-4">
            {params.data.name}
          </Text>
          <Text className="text-zinc-400 text-base mt-2">
            {params.data.description === "" ? "-" : params.data.description}
          </Text>
        </View>
        <View>
          <View className="flex flex-row items-center justify-between gap-2 mb-6">
            <Text className="text-2xl font-medium text-zinc-700">Valor: </Text>

            <Text className="text-2xl font-medium text-zinc-700">
              R$ {params.data.price},00
            </Text>
          </View>
          <Button title="Adiconar ao carrinho" onPress={handleAddCart} />
        </View>
      </View>
    </View>
  )
}