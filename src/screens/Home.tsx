import { useState, useEffect } from "react";

import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";

import { Ionicons } from '@expo/vector-icons';

import { useNavigation } from "@react-navigation/native";
import { Card } from "../components/Card";

import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where
} from "firebase/firestore";
import { db } from "../services/firebase";
import { useCart } from "../hooks/useCart";
import { Button } from "../components/Button";

export interface ProductData {
  id: string;
  name: string;
  price: string;
  description: string;
  image: string;
}

export function Home() {
  const { cart } = useCart();

  const [categorySelected, setCategorySelected] = useState("pizzas");
  const [categoriesID, setCategoriesID] = useState<string[]>([]);

  const [products, setProducts] = useState<ProductData[]>([]);
  const [productCategory, setProductCategory] = useState<ProductData[]>([]);

  const navigation = useNavigation();

  const refCategory = collection(db, "category");
  const refProduct = collection(db, "product");

  useEffect(() => {
    async function getDocsCategory() {
      let listCatoriesID = [] as string[];

      onSnapshot(refCategory, snapshot => {
        snapshot.docs.forEach(doc => {
          listCatoriesID.push(doc.id);
        });
        setCategoriesID(listCatoriesID);
      });
    };

    getDocsCategory();
  }, []);

  useEffect(() => {
    async function getProductByCategory() {
      const listProducts = [] as any;

      try {
        onSnapshot(refProduct, snapshot => {
          snapshot.docs.forEach(doc => {
            const products = doc.data();
            listProducts.push(products);
          });
          setProducts(listProducts);
        })
      } catch {
        Alert.alert("Algo deu errado, tente novamente mais tarde");
      } finally {

      };
    };

    getProductByCategory();
  }, []);

  useEffect(() => {
    function filterByCategory() {
      const filter = products.filter((product: any) => product.category === categorySelected);
      setProductCategory(filter);
    }

    filterByCategory();
  }, [categorySelected]);

  useEffect(() => {
    async function getListPizzas() {
      const listPizzas = [] as any;

      try {
        const q = query(refProduct, where("category", "==", "pizzas"));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          listPizzas.push(doc.data());
        });

        if (productCategory.length == 0) {
          setProductCategory(listPizzas);
        };
      } catch {
        Alert.alert("Algo deu errado, tente novamente mais tarde");
      } finally {

      };
    }

    getListPizzas();
  }, []);

  function handleCategoryPress(categoria: string) {
    setCategorySelected(categoria);
  };

  return (
    <View className="h-screen bg-slate-50">
      <View className="px-[20px] bg-white py-[20px] flex justify-between items-center flex-row mb-4 border-b-[0.2px] border-zinc-200">
        <Text className="text-lg font-medium text-zinc-600">
          Bem-vindo(a)
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("cart")}>
          <Ionicons name="md-cart-outline" size={36} color="#fb923c" />
          <Text className={`${cart.length == 0 && "hidden"} text-xs font-bold text-white absolute bg-secondary px-1 rounded-2xl left-6`}>
            {cart.length}
          </Text>
        </TouchableOpacity>
      </View>
      <View className="px-[20px]">
        <View className="mb-4 p-1">
          <Image
            source={require("../images/banner.png")}
            className="object-cover h-40 w-full"
          />
        </View>
        <FlatList
          data={categoriesID}
          horizontal
          showsVerticalScrollIndicator={false}
          keyExtractor={(id) => id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleCategoryPress(item)}
            >
              <Text
                className={`text-base px-6 py-2 rounded-3xl bg-zinc-100 mr-4 shadow-lg
                ${categorySelected === item ? 'font-medium text-secondary bg-orange-100' : 'font-normal'}
                `}
              >
                {item[0].toUpperCase() + item.substring(1)}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
      {categorySelected && (
        <FlatList
          className={`px-[20px] mt-[16px] 
          ${cart.length == 0 ? "mb-[72px]" : "mb-[132px]"}
          `}
          scrollEnabled
          data={productCategory}
          keyExtractor={(produto) => produto.id}
          renderItem={({ item }) => (
            <View className="">
              <Card data={item} />
            </View>
          )}
        />
      )}
      <View className="absolute w-full px-[20px] bottom-20">
        {cart.length >= 1 &&
          <Button
            title="Ver carrinho"
            onPress={() => navigation.navigate("cart")}
          />
        }
      </View>
    </View>
  )
}