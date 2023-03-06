import { extendTheme } from "native-base";

export const theme = extendTheme({
  components: {
    Button: {
      defaultProps: {
        size: "sm",
        _text: {
          fontSize: "sm",
          fontWeight: "600",
        },
      },
    },
  },

  fontConfig: {
    Poppins: {
      400: {
        normal: "Poppins_400Regular",
      },
      500: {
        normal: "Poppins_500Medium",
      },
      600: {
        normal: "Poppins_600SemiBold",
      },
      700: {
        normal: "Poppins_700Bold",
      },
    },
  },

  fonts: {
    heading: "Poppins",
    body: "Poppins",
    mono: "Poppins",
  },
});
