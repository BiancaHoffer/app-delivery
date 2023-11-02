'use client';

import {
  ReactNode,
  createContext,
  useContext,
  useState,
} from 'react';

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextProps {
  cart: CartData[];
}

export interface ProductData {
  id: string;
  product: string;
  price: string;
  description: string;
  image: string;
  category: string;
}

export interface CartData extends ProductData {
  amount: number;
}

export const CartContext = createContext({} as AuthContextProps);

export function CartProvider({ children }: AuthProviderProps) {
  const [cart, setCart] = useState<CartData[]>([])

  return (
    <CartContext.Provider value={{
      cart
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext);

  return context;
}