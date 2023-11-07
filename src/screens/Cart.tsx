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
    <View className="flex justify-center bg-slate-50 h-full">
      <View className="bg-white py-6 flex justify-between items-center flex-row px-[20px] text-center pb-4 text-2xl font-medium border-b-[0.2px] border-zinc-200">
        <Text className="text-2xl font-medium">
          Carrinho
        </Text>

        <TouchableOpacity onPress={() => navigation.navigate("home")}>
          <Ionicons name="md-close-sharp" size={32} color="black" />
        </TouchableOpacity>
      </View>

      {cart.length == 0 && (
        <View className="flex justify-center items-center h-3/4">
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
        className=" mb-[80px] "
        scrollEnabled
        data={cart}
        keyExtractor={(produto) => produto.id}
        renderItem={({ item }) => (
          <View className="border-b-[0.5px] border-zinc-300">
            <CardCart data={item} />
          </View>
        )}
      />

      {cart.length !== 0 && (
        <View className="px-[20px] pb-[20px]">
          <Input name="obs" placeholder="Deixar observação" startWithHiddenPassword={false} />
          <Text>Produtos: R$ 50,00</Text>
          <Text>Entrega: R$ 20,00</Text>
          <Text>Total: R$ 40,00</Text>
          <Button title="Finalizar compra" />
        </View>
      )}
    </View>
  )
}