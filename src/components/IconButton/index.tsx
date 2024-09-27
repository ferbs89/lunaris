import { MaterialIcons } from "@expo/vector-icons";

import { trueGray50, warmGray800 } from "@/config/colors";

import { IconButtonContainer } from "./styles";

export default function ({ iconName, color = warmGray800, onPress }) {
  return (
    <IconButtonContainer color={color} onPress={onPress}>
      <MaterialIcons name={iconName} size={24} color={trueGray50} />
    </IconButtonContainer>
  );
}
