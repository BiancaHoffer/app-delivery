import { CardProps } from "../components/Card";
import { ProductData } from "../screens/Home";

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      signin: undefined;
      signup: undefined;
      home: undefined;
      orders: undefined;
      recoverpassword: undefined;
      cart: undefined;
      product: CardProps;
    }
  }
}