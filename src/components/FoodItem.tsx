import { AntDesign } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { useMutation, gql, useLazyQuery } from "@apollo/client";
import { useRouter } from "expo-router";

const mutation = gql`
  mutation MyMutation(
    $food_id: String!
    $label: String!
    $kcal: Int!
    $user_id: String!
  ) {
    insertFood_log(
      food_id: $food_id
      label: $label
      kcal: $kcal
      user_id: $user_id
    ) {
      user_id
      label
      kcal
      id
      food_id
      created_at
    }
  }
`;

const FoodItem = ({ itemProp }) => {
  const router = useRouter()
  const [logFood] = useMutation(mutation, {
    refetchQueries: ['foodLogsForDate']
  });
  const onPlusPressed = async () => {
   await logFood({
      variables: {
        food_id: itemProp.cal,
        label: itemProp.label,
        kcal: itemProp.cal,
        user_id: "vadim",
      },
    });
    router.back()
  };
  return (
    <View className="bg-black/20 py-2 flex-row justify-between items-center mx-2 px-3 rounded-xl  ">
      <View className="flex gap-2 ">
        <Text className="font-bold text-lg w-[80vw]">{itemProp.label}</Text>
        <Text className="text-black/30 text-base">
          {itemProp.cal} cal, {itemProp.brand}
        </Text>
      </View>
      <View className="bg-black/5 p-2 rounded-full">
        <AntDesign
          onPress={onPlusPressed}
          name="plus"
          size={24}
          color="royalblue"
        />
      </View>
    </View>
  );
};

export default FoodItem;
