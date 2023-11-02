import { TouchableOpacity, View, Text } from "react-native";

import { useNavigation } from "@react-navigation/native";

import { Input } from "../components/Input";
import { Button } from "../components/Button";

export function RecoverPassword() {
  const navigation = useNavigation();

  return (
    <View className="flex items-center justify-center h-full bg-white">
      <Text className="text-xl font-medium text-zinc-600 mb-8">
        Recuperar senha
      </Text>

      <View className="w-full flex items-center px-[40px]">
        <Input
          placeholder="E-mail"
          name="e-mail"
          inputMode="email"
          icon="mail-outline"
        />

        <Button title="Recuperar senha" />
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate("signin")}
      >
        <Text className="mt-8 text-zinc-600 font-bold text-base">
          Já possuo uma conta
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("signup")}
      >
        <Text className="mt-4 text-zinc-600 font-bold text-base">
          Criar conta
        </Text>

      </TouchableOpacity>
    </View>
  )
}