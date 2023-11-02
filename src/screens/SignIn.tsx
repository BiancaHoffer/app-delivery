import { View, Text, Image, TouchableOpacity } from "react-native";

import { useNavigation } from "@react-navigation/native";

import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { ButtonGoogle } from "../components/ButtonGoogle";

export function SignIn() {
  const navigation = useNavigation();

  return (
    <View className="flex justify-center items-center h-screen bg-white">
      <Image
        source={require("../images/logo.png")}
        className="w-24 h-24 mb-12"
      />

      <View className="px-[40px] w-full flex items-center">
        <Input
          placeholder="E-mail"
          name="e-mail"
          inputMode="email"
          icon="mail-outline"
        />

        <Input
          placeholder="Senha"
          name="password"
          inputIsPassword={true}
          startWithHiddenPassword={true}
          icon="lock-closed-outline"
        />
        <TouchableOpacity
          onPress={() => navigation.navigate("recoverpassword")}
          className="w-[100%] py-[8px]"
        >
          <Text className="mt-[-20px] mb-6 text-base text-zinc-500 self-start">
            Esqueceu a senha?
          </Text>
        </TouchableOpacity>

        <Button
          title="Acessar"
          onPress={() => navigation.navigate("home")}
        />
        <ButtonGoogle title="Acessar com o google" />

        <TouchableOpacity
          onPress={() => navigation.navigate("signup")}
        >
          <Text className="mt-4 text-zinc-500 text-lg">
            Criar conta
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

