import {
  TouchableOpacity,
  Text,
  ButtonProps
} from "react-native";

import { Ionicons } from '@expo/vector-icons';

interface ButtonGoogleProps extends ButtonProps {
  title: string
}

export function ButtonGoogle({ title }: ButtonGoogleProps) {
  return (
    <TouchableOpacity className="mt-4 bg-[#4285F4] flex-row shadow-lg w-[100%] rounded-xl flex justify-center items-center">
      <Ionicons name="logo-google" size={24} color="white" />
      <Text className="flex text-white justify-center items-center text-base p-[14px] font-bold uppercase">
        {title}
      </Text>
    </TouchableOpacity>
  )
}