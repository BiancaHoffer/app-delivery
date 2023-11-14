'use client';

import {
  ReactNode,
  createContext,
  useContext,
  useState,
} from 'react';
import { Alert } from 'react-native';

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextProps {
  cart: ProductData[];
  addCart: (data: Cart) => void;
  removeCart: (id: string) => void;
  updateAmount: ({ id, type }: UpdateAmount) => void;
}

interface UpdateAmount {
  id: string;
  type: "increment" | "decrement"
}

interface ProductData {
  id: string;
  name: string;
  price: string;
  description: string;
  image: string;
}

interface Cart extends ProductData {
  amount: number;
}

export const CartContext = createContext({} as AuthContextProps);

export function CartProvider({ children }: AuthProviderProps) {
  const [cart, setCart] = useState<Cart[]>([]);

  function addCart(product: Cart) {
    let copyCart = [...cart];

    const productIndex = copyCart.findIndex(item => item.id === product.id);

    if (productIndex < 0) {
      copyCart.push(product);
    } else {
      copyCart[productIndex].amount += product.amount;
    }
    setCart(copyCart);
  }

  function removeCart(id: string) {
    let copyCart = [...cart];

    const productIndex = copyCart.findIndex(item => item.id === id);

    if (productIndex >= 0) {
      copyCart.splice(productIndex, 1);
      setCart(copyCart);
    } else {
      Alert.alert("Erro ao deletar produto");
    }
  }

  function updateAmount({ id, type }: UpdateAmount) {
    const copyCart = [...cart];
    const productIndex = copyCart.findIndex(item => item.id === id);

    if (productIndex >= 0) {
      const item = copyCart[productIndex];
      copyCart[productIndex].amount =
        type === "increment" ? item.amount + 1 : item.amount - 1;
    } else {
      throw Error();
    }

    setCart(copyCart);
  }

  return (
    <CartContext.Provider value={{
      cart,
      addCart,
      removeCart,
      updateAmount
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext);
  return context;
}