import {
  View,
  Text,
  TouchableOpacity,
  Alert
} from "react-native";

import { useNavigation } from "@react-navigation/native";

import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { ButtonGoogle } from "../components/ButtonGoogle";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { maskPhone } from "../utils/Masks";

export function SignUp() {
  const { loading, signUp } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  function handleSignUp() {
    const userData = {
      name,
      email,
      phone,
      password,
    }

    if (email === "" || password === "" || phone === "" || name === "") {
      Alert.alert("Por favor, preencha os campos obrigatórios. '*'")
      return;
    }

    setName("");
    setEmail("");
    setPhone("");
    setPassword("");

    signUp(userData);

    if (loading == false) {
      navigation.navigate("successsignin");
    };
  }

  return (
    <View className="flex items-center justify-center h-full bg-white">
      <Text className="text-xl font-medium text-zinc-600 mb-8">
        Criar conta
      </Text>
      <View className="flex items-center px-[40px] w-[100%]">
        <Input
          placeholder="Nome completo *"
          inputMode="text"
          icon="person-outline"
          value={name}
          onChangeText={(name) => setName(name)}
        />
        <Input
          placeholder="E-mail *"
          inputMode="email"
          icon="mail-outline"
          value={email}
          onChangeText={(email) => setEmail(email)}
        />
        <Input
          placeholder="Telefone *"
          inputMode="tel"
          icon="call-outline"
          value={phone}
          onChangeText={(phone) => setPhone(maskPhone(phone))}
        />
        <Input
          placeholder="Senha *"
          inputIsPassword={true}
          startWithHiddenPassword={true}
          icon="lock-closed-outline"
          value={password}
          onChangeText={(pass) => setPassword(pass)}
        />
        <Button
          title={loading ? "carregando" : "Criar conta"}
          onPress={handleSignUp}
        />
        <ButtonGoogle title="Criar conta com o google" />
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