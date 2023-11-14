import { StatusBar } from "react-native";

import Routes from './src/routes';

import { CartProvider } from "./src/hooks/useCart";
import { AuthProvider } from "./src/hooks/useAuth";

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <StatusBar />
        <Routes />
      </CartProvider>
    </AuthProvider>
  )
}

