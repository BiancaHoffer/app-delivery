import { TouchableOpacity, Text, ButtonProps as ButtonPropsNative } from "react-native";

interface ButtonProps extends ButtonPropsNative {
  title: string;
}

export function Button({ title, ...props }: ButtonProps) {
  return (
    <TouchableOpacity className="bg-primary shadow-lg w-[100%] rounded-full flex justify-center items-center" {...props}>
      <Text className="text-base p-[14px] text-white font-bold uppercase">
        {title}
      </Text>
    </TouchableOpacity>
  )
}