import { AntDesign } from "@expo/vector-icons";
import { ImageBackground, Text, View } from "react-native";

  
  const FoodMainItem = ({ item }) => {
    return (
      <View 
       className="bg-black/20 py-2 flex-row justify-between items-center mx-2 px-3 rounded-xl  ">
        <View className="flex gap-2 ">
          <Text className="font-bold text-lg w-[80vw]">{item.label}</Text>
          <Text className="text-black/30 text-base">
            {item.kcal} cal
          </Text>
        </View>
        <View className="bg-black/5 p-2 rounded-full">
          <AntDesign name="plus" size={24} color="royalblue" />
        </View>
      </View>
    );
  };
  
 export default FoodMainItem;
 /**
  *  LOG  [{"__typename": "Food_log", "created_at": "2024-03-31T13:11:41.336347Z", "food_id": "food_b385x57bftcv8ybnfx6khb0hw7m0", 7bftcv8ybnfx6khb0hw7m0", "id": 130, "kcal": 118, "label": "Yam, Raw", "user_id": "vadim"}, {"__typenamat": "2024-03-31T13:11:41e": "Food_log", "created_at": "2024-03-31T13:11:41.351515Z", "food_id": "food_a8nnos2bgx8puyba34hvpadyer_id": "vadim"}]        de1a", "id": 131, "kcal": 118, "label": "Yam", "user_id": "vadim"}]
  */