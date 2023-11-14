import { View, Text, Image, TouchableOpacity } from "react-native";

import { Ionicons } from '@expo/vector-icons';
import { useCart } from "../hooks/useCart";
import { useNavigation } from "@react-navigation/native";

interface ProductData {
  id: string;
  name: string;
  price: string;
  description: string;
  image: string;
}

interface Cart extends ProductData {
  amount?: number;
}

interface CardCartProps {
  data: Cart;
}

export function CardCart({ data }: CardCartProps) {
  const { removeCart, updateAmount, cart } = useCart();
  const navigation = useNavigation()

  function handleRemoveCart() {
    removeCart(data.id);
  }

  return (
    <View className="flex flex-row justify-between p-4 mb-2 rounded-2xl bg-white">
      <View className="flex flex-row items-center">
        <Image
          source={{ uri: data.image }}
          className="object-cover h-20 w-20 mr-3 rounded-md "
        />
        <View className="flex justify-between items-star h-20">
          <Text className="text-base text-zinc-700 font-medium max-w-[100px]">
            {data.name}
          </Text>
          <Text className="text-base text-zinc-700 font-medium ">
            R$ {data.price},00
          </Text>
        </View>
      </View>
      <View className="flex flex-col items-end justify-between gap-2">
        <View className="flex justify-between max-w-40 flex-row rounded-3xl  bg-zinc-100">
          <View className="flex justify-center">
            {data.amount === 1 ? (
              <TouchableOpacity
                className="bg-zinc-800 rounded-full p-1"
                onPress={handleRemoveCart}
              >
                <Ionicons
                  name="trash-outline"
                  color="#ffff"
                  size={24}
                />
              </TouchableOpacity>

            ) : (
              <TouchableOpacity
                className="bg-zinc-800 rounded-full p-1"
                onPress={() => updateAmount({ id: data.id, type: "decrement" })}
              >
                <Ionicons
                  name="remove"
                  color="#ffff"
                  size={24}

                />
              </TouchableOpacity>
            )}
          </View>
          <View className="flex justify-center items-center mx-1 max-w-[40px] min-w-[40px]">
            <Text className="text-base">{data.amount}</Text>
          </View>
          <TouchableOpacity
            className="bg-zinc-800 rounded-full p-1"
            onPress={() => updateAmount({ id: data.id, type: "increment" })}
          >
            <Ionicons
              name="add"
              size={24}
              color="#ffff"
            />
          </TouchableOpacity>
        </View>
        <Text className=" text-zinc-400">
          R$ {data.price},00
        </Text>
      </View>
    </View>
  )
}