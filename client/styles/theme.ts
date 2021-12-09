import { extendTheme } from "@chakra-ui/react";
import { colors } from "./colors";
import { ButtonStyles } from "./components/Button";
import { BoxStyles } from "./components/Box";
import { InputStyles as Input } from "./components/Input";
import { darken, mode, whiten } from "@chakra-ui/theme-tools";
import "@fontsource/poppins";

const radii = {
  none: "0",
  sm: "5px",
  base: "5px",
  md: "5px",
  lg: "5px",
  xl: "5px",
  "2xl": "5px",
  "3xl": "5px",
  full: "5px",
};

export const myTheme = extendTheme({
  fonts: {
    body: "poppins",
  },
  radii,
  colors: colors,
  components: {
    Button: ButtonStyles,
    IconButton: ButtonStyles,
    Input,
  },
  styles: {
    global: (props) => ({
      body: {
        bg: mode("pagebackground", "pagebackgrounddark")(props),
        borderColor: mode("pagebackgrounddark", "pagebackground")(props),
      },
    }),
  },
});
