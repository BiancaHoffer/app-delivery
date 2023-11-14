import { NavigationContainer } from "@react-navigation/native";

import { AppRoutes } from "./app.routes";
import { AuthRoutes } from "./auth.routes";

import { useAuth } from "../hooks/useAuth";

export default function Routes() {
  const { userLogged } = useAuth();

  return (
    <NavigationContainer>
      {userLogged ? <AuthRoutes /> : <AppRoutes />}
    </NavigationContainer>
  )
}