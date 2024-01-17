import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { trueGray50 } from "../../config/colors";

import { IconButton } from "./styles";

export default function ({ iconName, onPress }) {
  return (
    <TouchableOpacity activeOpacity={0.5} onPress={onPress}>
      <IconButton>
        <MaterialIcons name={iconName} size={24} color={trueGray50} />
      </IconButton>
    </TouchableOpacity>
  );
}
