import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ImageBackground,
} from "react-native";
import React, { useState } from "react";
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import { useQuery, gql, useLazyQuery } from "@apollo/client";
import { SafeAreaView } from "react-native-safe-area-context";
import FoodItem from "../components/FoodItem";
import { Camera, CameraType } from "expo-camera";

const query = gql`
  query search($ingr: String, $upc: String) {
    search(ingr: $ingr, upc: $upc) {
      text
      hints {
        food {
          brand 
          label
          nutrients {
            ENERC_KCAL
          }
          image
        }
      }
    }
  }
`;

const SearchScreen = () => {
  const [scannerEnabled, setScannerEnabled] = useState(false);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [handleSearch, { data, loading, error }] = useLazyQuery(query);
  requestPermission();
     
  if (scannerEnabled) {
    return (
      <View>  
        <Camera
          style={{
            width: "100%",
            height: "100%",
          }}
          onBarCodeScanned={(data) =>
          {
            setScannerEnabled(false)
            console.log(data);
            handleSearch({
              variables: { upc: data.data || null },
            })
          }
          }
        />
        <AntDesign
          onPress={() => setScannerEnabled(false)}
          style={{ position: "absolute", right: 10, top: 10 }}
          name="closecircleo"
          size={34}
          color="white"
        />
      </View>
    );
  }

  if (error) {
    console.warn("Error:", error);  
  }
  const items = data?.search?.hints || [];
  // console.log(JSON.stringify(data, null, 2));

  const handleSearching = () => {
    handleSearch({
      variables: { ingr: searchQuery },
    });
  };
  const uniqueFoodData = Array.from(
    new Map(
      items.map((item) => [item.food.nutrients.ENERC_KCAL, item])
    ).values()
  );

  return (
    <SafeAreaView className="flex-1">
      <View>
        <TextInput
          value={searchQuery}
          placeholder="Search..."
          className="h-12 mb-12  bg-black/10 pl-2 mx-4 rounded-md border-none shadow-sm"
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearching} // Call handleSearch when the user submits
        />

        <TouchableOpacity
          onPress={handleSearching}
          className="absolute right-1 bg-black/50 p-3 rounded-full top-0"
        >
          <Feather name="search" size={24} color="white" />
        </TouchableOpacity>
        <Ionicons
          style={{
            alignItems: "center",
            alignSelf: "center",
            backgroundColor: "#3d3d3d",
            padding: 8,
            borderRadius: 15,
          }}
          onPress={() => setScannerEnabled(true)}
          name="barcode-outline"
          size={24}
          color="white"
        />
      </View>
      {loading && <ActivityIndicator size={"large"} color={"#3d3d3d"} />}
      <FlatList
        data={uniqueFoodData}
        renderItem={({ item }) => (
          <FoodItem
            itemProp={{
              cal: item.food.nutrients.ENERC_KCAL,
              brand: item.food.brand,
              label: item.food.label,
              image: item.image,
            }}
          />
        )}
        ListEmptyComponent={() => (
          <Text className="text-xl text-green-500 font-bold">
            Search For Food...
          </Text>
        )}
        keyExtractor={(item) => item.food.nutrients.ENERC_KCAL.toString()}
        contentContainerStyle={{ gap: 20 }}
      />
    </SafeAreaView>
  );
};

export default SearchScreen;
