import { MaterialIcons } from "@expo/vector-icons";

import { trueGray50 } from "@/config/colors";

import { IconButtonContainer } from "./styles";

export default function ({ iconName, onPress }) {
  return (
    <IconButtonContainer onPress={onPress}>
      <MaterialIcons name={iconName} size={24} color={trueGray50} />
    </IconButtonContainer>
  );
}
