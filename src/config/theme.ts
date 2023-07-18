import { extendTheme } from "native-base";

export const theme = extendTheme({
  config: {
    useSystemColorMode: true,
  },

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
    Input: {
      defaultProps: {
        variant: "filled",
        size: "xl",
        bg: "warmGray.200",
        borderColor: "warmGray.200",
        _dark: {
          bg: "muted.800",
          borderColor: "muted.800",
        },
        style: {
          paddingTop: 12,
          height: 48,
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
