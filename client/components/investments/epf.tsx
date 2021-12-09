import React from "react";
import { Epf } from "@linklab-test-p/common";
import {
  Box,
  HStack,
  Heading,
  useColorModeValue,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Table,
  TableCaption,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  Stat,
  StatLabel,
  StatNumber,
  StatGroup,
  Divider,
} from "@chakra-ui/react";

import EpfAccount from "../accounts/epfAccount";

const EpfComponent = ({ epf }) => {
  const onClick = () => {
    console.log("hi");
  };
  const epfs: Epf[] = epf;
  console.log(epfs);

  return (
    <Box padding="1rem" w="80%">
      <HStack alignItems="flex-start">
        <Box
          bg={useColorModeValue("coloremptyshade", "coloremptyshadedark")}
          alignItems="flex-start"
          display="flex"
          flexDir="column"
          shadow="md"
          border="1px"
          w="100%"
          flex=".7"
          borderRadius="4px"
          borderColor={useColorModeValue("primary", "primarydark")}
        >
          {epfs?.map((epf: Epf) => {
            return (
              <Box
                p="1rem"
                key={epf.account.maskedAccNumber}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                w="100%"
              >
                <EpfAccount accounts={epf} />
              </Box>
            );
          })}
        </Box>
        <Box
          shadow="lg"
          border="1px"
          flex=".3"
          p=".5rem"
          borderRadius="4px"
          borderColor={useColorModeValue("primary", "primarydark")}
          // bg={useColorModeValue("success", "successdark")}
        >
          <Stat>
            <StatLabel>Projected till 2056</StatLabel>
            <StatNumber>₹1,00,00,000</StatNumber>
          </Stat>
        </Box>
      </HStack>
    </Box>
  );
};

export default EpfComponent;
