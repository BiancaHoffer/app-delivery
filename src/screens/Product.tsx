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

import { CardProps } from "../components/Card";
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
  const { cart, addCart } = useCart();

  const [amount, setAmount] = useState(1);

  const navigation = useNavigation();
  const route = useRoute();
  const params = route.params as ParamsData;

  var imageUri = { uri: params.data.image };

  const updateAmount = (newAmount: number) => {
    if (newAmount >= 0) {
      setAmount(newAmount);
    } else {
      return;
    }
  };

  function handleAddCart() {
    const data = params.data;

    const newProduct = {
      ...data,
      amount
    } as Cart;

    addCart(newProduct);
    console.log(cart);
    navigation.navigate("cart");
  }

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
            {params.data.name}
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
          <Button title="Adiconar ao carrinho" onPress={handleAddCart} />
        </View>
      </View>
    </View>
  )
}