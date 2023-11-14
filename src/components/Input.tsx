import { useState } from "react";
import {
  TextInput,
  View,
  TextInputProps,
  TouchableOpacity
} from "react-native";

import { Ionicons } from '@expo/vector-icons';

interface InputProps extends TextInputProps {
  icon?: keyof typeof Ionicons.glyphMap;
  inputIsPassword?: boolean;
  startWithHiddenPassword?: boolean;
}

export function Input({
  icon,
  inputIsPassword = false,
  startWithHiddenPassword = false,
  ...props
}: InputProps) {
  const [showPassword, setShowPassword] = useState(startWithHiddenPassword);

  return (
    <>
      <View
        className="border-[1px] w-[auto] mb-6 px-4 py-2 flex flex-row items-center rounded-2xl border-zinc-200 shadow-lg bg-white focus:border-primary"
      >
        <Ionicons name={icon} size={24} color="#fb923c" />
        <TextInput
          secureTextEntry={showPassword === true ? true : false}
          className="w-[100%] px-2 py-1 text-base text-zinc-900"
          {...props}
        />
        <View className={`${inputIsPassword === true ? "flex" : "hidden"}`}>
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
          >
            <View className="relative z-20 px-[8px] w-[40px] bg-white ml-[-36px]">{showPassword === true ?
              <Ionicons name="eye-outline" size={24} color="#fb923c" />
              :
              <Ionicons name="eye-off-outline" size={24} color="#fb923c" />}</View>
          </TouchableOpacity>
        </View>
      </View>
    </>
  )
}