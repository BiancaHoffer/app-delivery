import { View, Text, Image } from "react-native";

interface ProductData {
  id: string;
  name: string;
  price: string;
  description: string;
  image: string;
}


import { Ionicons } from '@expo/vector-icons';
import { useState } from "react";
import { useCart } from "../hooks/useCart";
import { Button } from "./Button";

interface CardCartProps {
  data: ProductData;
}

export function CardCart({ data }: CardCartProps) {
  const { cart, removeCart } = useCart();

  const [amount, setAmount] = useState(1);

  const updateAmount = (newAmount: number) => {
    if (newAmount >= 1) {
      setAmount(newAmount);
    }
  };

  function handleRemoveCart() {
    removeCart(data.id);
  }

  return (
    <View className="flex justify-center bg-white p-4">
      <View className="flex flex-row justify-between gap-2 mb-2">
        <View className="flex flex-row justify-between">
          <Image
            source={{ uri: data.image }}
            className="object-cover mr-3 h-24 rounded-md w-[100px]"
          />
          <Text className="text-lg text-zinc-700 font-medium mb-2">
            {data.name}
          </Text>
        </View>



        <View className="flex flex-col items-end justify-between gap-2">
          <Text className="text-xl font-medium text-zinc-700">
            R$ {data.price},00
          </Text>

          <View className="flex self-start flex-row rounded-3xl py-2 px-4 border-[1px] border-zinc-200">
            <View className="flex justify-center">
              {amount === 1 ? (
                <Ionicons name="trash-outline" color="#fb923c" size={22} onPress={handleRemoveCart} />
              ) : (
                <Ionicons name="remove" color="#fb923c" size={28} onPress={() => updateAmount(amount - 1)} />

              )}
            </View>
            <View className="flex justify-center items-center mx-2 max-w-[40px] min-w-[40px]">
              <Text className="text-base">{amount}</Text>
            </View>
            <Ionicons name="add" size={28} color="#fb923c" onPress={() => updateAmount(amount + 1)} />
          </View>
        </View>
      </View>
    </View>
  )
}