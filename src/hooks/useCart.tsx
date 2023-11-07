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
}

export interface ProductData {
  id: string;
  name: string;
  price: string;
  description: string;
  image: string;
}

export interface Cart extends ProductData {
  amount: number;
}

export const CartContext = createContext({} as AuthContextProps);

export function CartProvider({ children }: AuthProviderProps) {
  const [cart, setCart] = useState<Cart[]>([]);

  function addCart(data: Cart) {
    let copyCart = [...cart];

    const productIndex = copyCart.findIndex(item => item.id === data.id);

    if (productIndex < 0) {
      copyCart.push(data);
    } else {
      //1                          +   //1
      copyCart[productIndex].amount += data.amount;
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

  return (
    <CartContext.Provider value={{
      cart,
      addCart,
      removeCart
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext);
  return context;
}