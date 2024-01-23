import { Image } from "react-native";

const logo = require("../../assets/logo.png");

export default function () {
  return (
    <Image
      style={{
        resizeMode: "center",
        width: 128,
        height: 128,
      }}
      source={logo}
    />
  );
}
