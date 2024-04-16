import {
  View,
  Text,
  FlatList,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import FoodItem from "../components/FoodItem";
import { gql, useQuery } from "@apollo/client";
import dayjs from "dayjs";
import FoodMainItem from "../components/FoodMainItem";
const foodItem = [
  { food: { cal: 432, brand: "Dominos", label: "Pizza" } },
  { food: { cal: 412, brand: "Apple", label: "Humburger" } },
  { food: { cal: 222, brand: "Banana", label: "Dude" } },
  { food: { cal: 413, brand: "Capage", label: "Pizza" } },
  { food: { cal: 423, brand: "Capage", label: "Pizza" } },
  { food: { cal: 453, brand: "Capage", label: "Pizza" } },
  { food: { cal: 462, brand: "Capage", label: "Pizza" } },
  { food: { cal: 424, brand: "Capage", label: "Pizza" } },
];

//{food: { nutrients: {ENERC_KCAL: 424}, brand: "Capage", label: "Pizza" }},

const query = gql`
  query foodLogsForDate($date: Date!, $user_id: String!) {
    foodLogsForDate(date: $date, user_id: $user_id) {
      food_id
      user_id
      created_at
      label   
      kcal
      id
    }
  }
`;

const Home = () => {
  const user_id = "vadim"; 
  const { data, loading, error } = useQuery(query, {
    variables: {
      date: dayjs().format('YYYY-MM-DD'),
      user_id,
    },
  });  

  if (loading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Failed to fetch data</Text>;
  }

  return (
    <SafeAreaView>
      <View className="flex-row mb-9 justify-between items-center mx-5">
        <Text className="text-xl font-bold ">Todays Logged Food</Text>
        <Link href={"/search"} asChild>
          <Pressable>
            <Text className="text-blue-500 py-2 px-4  text-base bg-blue-200  rounded-xl">
              Add item
            </Text>
          </Pressable>
        </Link>
      </View>

      <FlatList
        data={data.foodLogsForDate}
        renderItem={({ item }) => <FoodMainItem item={item} />}
        contentContainerStyle={{ gap: 20 }}
        bounces
      />
    </SafeAreaView>
  );
};

export default Home;
