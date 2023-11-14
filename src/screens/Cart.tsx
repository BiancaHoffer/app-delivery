import {
  View,
  FlatList,
  Text,
  Image,
  TouchableOpacity
} from "react-native";

import { useCart } from "../hooks/useCart";

import { CardCart } from "../components/CardCart";
import { Button } from "../components/Button";
import { Input } from "../components/Input";

import { useNavigation } from "@react-navigation/native";

import { Ionicons } from '@expo/vector-icons';

export function Cart() {
  const { cart } = useCart();

  const navigation = useNavigation();

  return (
    <View className="bg-primary h-full flex">
      <View className="h-[10%] p-[20px] flex flex-row justify-between">
        <TouchableOpacity onPress={() => navigation.navigate("home")}>
          <Ionicons name="ios-chevron-back-outline" size={32} color="white" />
        </TouchableOpacity>
        <Text className="text-white text-xl font-medium">Carrinho</Text>
        <TouchableOpacity onPress={() => navigation.navigate("home")}>
          <Ionicons name="md-close-sharp" size={32} color="white" />
        </TouchableOpacity>
      </View>
      <View className="bg-zinc-100 flex justify-between h-[90%] rounded-t-[32px]">
        {cart.length == 0 && (
          <View className="flex justify-center items-center h-full">
            <Image
              source={require("../../assets/cart.png")}
              className="w-[240px] h-[240px] mb-2"
            />
            <Text className="text-xl mb-[2px]">Seu carrinho está vazio</Text>
            <Text className="text-sm mb-[18]">Confira nossos produtos</Text>
            <View className="w-1/2">
              <Button title="Ver produtos" onPress={() => navigation.navigate("home")} />
            </View>
          </View>
        )}
        <FlatList
          className=" p-[20px]"
          scrollEnabled
          data={cart}
          keyExtractor={(produto) => produto.id}
          renderItem={({ item }) => (
            <CardCart data={item} />
          )}
        />
        {cart.length !== 0 && (
          <View className="bg-white p-[20px] rounded-t-[32px]">
            <Input placeholder="Deixar observação" />
            <Text>Produtos: R$ 50,00</Text>
            <Text>Entrega: R$ 20,00</Text>
            <Text>Total: R$ 40,00</Text>
            <Button title="Finalizar compra" />
          </View>
        )}
      </View>
    </View>
  )
}