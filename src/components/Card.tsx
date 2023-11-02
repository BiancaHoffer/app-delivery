import { useNavigation } from "@react-navigation/native";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { ProductData } from "../screens/Home";

export interface CardProps {
  data: ProductData;
}

export function Card({ data }: CardProps) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("product", { data })}
      className="flex justify-center py-4"
    >
      <View className="flex flex-row justify-between gap-2">
        <View className="flex justify-between w-[60%]">
          <View className="">
            <Text className="text-base text-zinc-700 mb-2">
              {data.product}
            </Text>

            <Text className="text-zinc-400">
              {data.description === "" ? "-" : data.description}
            </Text>
          </View>

          <Text className="text-zinc-900 text-base">{data.price}</Text>
        </View>

        <Image
          source={{ uri: data.image }}
          className="object-cover h-28 rounded-md w-[30%]"
        />
      </View>
    </TouchableOpacity >
  )
}