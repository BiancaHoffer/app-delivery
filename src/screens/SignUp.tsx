import { View, Text, TouchableOpacity } from "react-native";

import { useNavigation } from "@react-navigation/native";

import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { ButtonGoogle } from "../components/ButtonGoogle";

export function SignUp() {
  const navigation = useNavigation();

  return (
    <View className="flex items-center justify-center h-full bg-white">
      <Text className="text-xl font-medium text-zinc-600 mb-8">
        Criar conta
      </Text>
      <View className="flex items-center px-[40px] w-[100%]">
        <Input
          placeholder="Nome completo"
          name="name"
          inputMode="text"
          icon="person-outline"
        />
        <Input
          placeholder="E-mail"
          name="e-mail"
          inputMode="email"
          icon="mail-outline"
        />
        <Input
          placeholder="Telefone"
          name="phone"
          inputMode="tel"
          icon="call-outline"
        />
        <Input
          placeholder="Senha"
          name="password"
          inputIsPassword={true}
          startWithHiddenPassword={true}
          icon="lock-closed-outline"
        />
        <Button title="Criar conta" />
        <ButtonGoogle title="Criar conta com o  google" />
        <TouchableOpacity
          onPress={() => navigation.navigate("signin")}
        >
          <Text className="mt-8 text-zinc-500 text-lg">
            Já possuo uma conta
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}