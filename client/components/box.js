import { Box, useColorModeValue } from "@chakra-ui/react";
import React from "react";

const Boxv2 = ({ children, bg }) => {
  return (
    <Box
      bg={bg || useColorModeValue("colorlightshade", "colorlightshadedark")}
      color={useColorModeValue("colorlightestshadedark", "colorlightestshade")}
      boxShadow="sm"
      m="1rem"
      borderRadius="5px"
    >
      {children}
    </Box>
  );
};

export default Boxv2;
