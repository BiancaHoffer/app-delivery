import { CardProps } from "../components/Card";
import { ProductData } from "../screens/Home";

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      signin: undefined;
      signup: undefined;
      successsignin: undefined;
      home: undefined;
      homeTab: undefined;
      orders: undefined;
      account: undefined;
      recoverpassword: undefined;
      cart: undefined;
      product: CardProps;
    }
  }
}