import { darken, mode, whiten } from "@chakra-ui/theme-tools";

export const ButtonStyles = {
  baseStyle: (props) => ({
    borderRadius: "4px",
    fontsize: "",
  }),

  variants: {
    primary: (props) => ({
      bg: mode("primary", "primarydark")(props),
      color: mode("colorfullshadedark", "colorfullshade")(props),
      _hover: {
        bg: mode(whiten("primary", 15), darken("primarydark", 15))(props),
      },
    }),
    primaryOutline: (props) => ({
      bg: "transparent",
      border: "2px solid",
      borderColor: mode("primary", "primarydark")(props),
      color: mode("primary", "primarydark")(props),
    }),

    accent: (props) => ({
      bg: mode("accent", "accentdark")(props),
      color: mode("colorfullshadedark", "colorfullshade")(props),
      _hover: {
        bg: mode(whiten("accent", 15), darken("accentdark", 15))(props),
      },
    }),
    accentOutline: (props) => ({
      bg: "transparent",
      border: "2px solid",
      borderColor: mode("accent", "accentdark")(props),
      color: mode("accent", "accentdark")(props),
    }),
    warning: (props) => ({
      bg: mode("warning", "warningdark")(props),
      color: mode("colorfullshadedark", "colorfullshade")(props),
      _hover: {
        bg: mode(whiten("warning", 15), darken("warningdark", 15))(props),
        translateX: "10px",
      },
    }),
    warningOutline: (props) => ({
      bg: "transparent",
      border: "2px solid",
      borderColor: mode("warning", "warningdark")(props),
      color: mode("warning", "warningdark")(props),
    }),
    danger: (props) => ({
      bg: mode("danger", "dangerdark")(props),
      color: mode("colorfullshadedark", "colorfullshade")(props),
      _hover: {
        bg: mode(whiten("danger", 15), darken("dangerdark", 15))(props),
        translateX: "10px",
      },
    }),
    dangerOutline: (props) => ({
      bg: "transparent",
      border: "2px solid",
      borderColor: mode("danger", "dangerdark")(props),
      color: mode("danger", "dangerdark")(props),
    }),
    success: (props) => ({
      bg: mode("success", "successdark")(props),
      color: mode("colorfullshadedark", "colorfullshade")(props),
      _hover: {
        bg: mode(whiten("success", 15), darken("successdark", 15))(props),
        translateX: "10px",
      },
    }),
    successOutline: (props) => ({
      bg: "transparent",
      border: "2px solid",
      borderColor: mode("success", "successdark")(props),
      color: mode("success", "successdark")(props),
    }),
    outline: (props) => ({
      bg: "transparent",
      border: "1px solid",
      borderColor: mode("colorfullshade", "colorfullshadedark")(props),
      color: mode("colorfullshade", "colorfullshadedark")(props),
    }),
  },

  defaultProps: { variant: "primary" },
};
