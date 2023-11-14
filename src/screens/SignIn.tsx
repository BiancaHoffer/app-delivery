import { useState } from "react";

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert
} from "react-native";

import { useNavigation } from "@react-navigation/native";

import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { ButtonGoogle } from "../components/ButtonGoogle";
import { useAuth } from "../hooks/useAuth";

export function SignIn() {
  const { signIn, loading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  function handleSignIn() {
    const dataUser = {
      email,
      password,
    };

    if (email === "" || password === "") {
      Alert.alert("Por favor, preencha os campos obrigatórios. '*'")
      return;
    }

    signIn(dataUser);

    if (loading == false) {
      navigation.navigate("home");
    };
  }

  return (
    <View className="flex justify-center items-center h-screen bg-white">
      <Image
        source={require("../images/logo.png")}
        className="w-24 h-24 mb-12"
      />
      <View className="px-[40px] w-full flex items-center">
        <Input
          placeholder="E-mail *"
          inputMode="email"
          icon="mail-outline"
          value={email}
          onChangeText={email => setEmail(email)}
        />
        <Input
          placeholder="Senha *"
          inputIsPassword={true}
          startWithHiddenPassword={true}
          icon="lock-closed-outline"
          value={password}
          onChangeText={pass => setPassword(pass)}
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
          title={loading ? "carregando" : "Acessar"}
          onPress={handleSignIn}
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

