import { useState, useEffect } from "react";

import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";

import { Ionicons } from '@expo/vector-icons';

import { Input } from "../components/Input";
import { useNavigation } from "@react-navigation/native";
import { Card } from "../components/Card";

import { DocumentData, collection, onSnapshot } from "firebase/firestore";
import { db } from "../services/firebase";

export interface ProductData {
  id: string;
  product: string;
  price: string;
  description: string;
  image: string;
}

interface CategoryData {
  products: ProductData[];
}

export function Home() {
  const [categorySelected, setCategorySelected] = useState("");

  const [categories, setCategories] = useState<DocumentData[]>([]);
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
      })
    }

    getDocsCategory();

  }, []);

  useEffect(() => {
    async function getProductByCategory() {
      const listProducts = [] as any;

      onSnapshot(refProduct, snapshot => {
        snapshot.docs.forEach(doc => {
          const products = doc.data();
          listProducts.push(products);
        });
        setProducts(listProducts);
      })

      const filter = products.filter((product: any) => product.category === categorySelected)
      setProductCategory(filter);
    }

    getProductByCategory();
    console.log(products);
  }, [categorySelected]);

  function handleCategoryPress(categoria: string) {
    setCategorySelected(categoria);
  };

  return (
    <View className="h-screen bg-white">
      <View className="px-[20px] py-[20px] flex justify-between flex-row mb-4">
        <Text className="text-lg font-medium text-zinc-600">
          Bem-vindo(a)
        </Text>

        <TouchableOpacity onPress={() => navigation.navigate("cart")}>
          <Ionicons name="md-cart-outline" size={30} color="#fb923c" />

          <Text className="text-xs font-bold text-white absolute bg-secondary px-1 rounded-2xl left-6">
            2
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

        <View className="mb-2">
          <Input
            name="search"
            icon="ios-search-outline"
            placeholder="Procurar..."
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
                {item}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {categorySelected && (
        <FlatList
          className="px-[20px] mt-[12px] mb-[80px] "
          scrollEnabled
          data={productCategory}
          keyExtractor={(produto) => produto.id}
          renderItem={({ item }) => (
            <View className="border-b-[0.5px] border-zinc-300">
              <Card data={item} />
            </View>
          )}
        />
      )}
    </View>
  )
}