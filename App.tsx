import { StatusBar } from "react-native"
import Routes from './src/routes';
import { CartProvider } from "./src/hooks/useCart";

export default function App() {
  return (
    <CartProvider>
      <StatusBar />
      <Routes />
    </CartProvider>

  );
}

