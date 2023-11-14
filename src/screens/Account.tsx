import {
  View,
} from "react-native";
import { Button } from "../components/Button";
import { useAuth } from "../hooks/useAuth";

export function Account() {
  const { signOutUser } = useAuth();

  return (
    <View>
      <Button title="Logout" onPress={signOutUser} />
    </View>
  )
}