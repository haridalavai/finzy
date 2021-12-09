import React from "react";
import Router from "next/router";
import {
  Heading,
  Box,
  HStack,
  VStack,
  useColorModeValue,
  Stat,
  StatGroup,
  StatLabel,
  StatNumber,
  StatHelpText,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";

const NetWorth = ({ summary }) => {
  const onClick = (e) => {
    e.preventDefault();
    Router.push("/fi/networth");
  };

  return (
    <Box
      as="button"
      p="1rem"
      //   _hover={{ background: "categorical.50", borderRadius: "5px" }}
      onClick={onClick}
      display="flex"
      alignItems="center"
      justifyContent="space-around"
    >
      <StatGroup
        w="100%"
        color={useColorModeValue(
          "colorlightestshade",
          "colorlightestshadedark"
        )}
      >
        <Stat align="left">
          <StatLabel>Net Worth</StatLabel>
          <StatNumber>
            ₹ {Number(summary?.netWorth).toLocaleString("en-IN")}
          </StatNumber>
          <StatHelpText>
            from {summary?.distribution.length} accounts
          </StatHelpText>
        </Stat>
      </StatGroup>
      <ChevronRightIcon color="pagebackgrounddark" h={10} w={10} />
    </Box>
  );
};

export default NetWorth;
