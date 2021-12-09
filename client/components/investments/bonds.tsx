import React from "react";
import { Bonds } from "@linklab-test-p/common";
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

import BondAccount from "../accounts/bondAccount";

const BondsComponent = ({ bond }) => {
  const onClick = () => {
    console.log("hi");
  };
  const bonds: Bonds[] = bond;
  console.log(bonds);
  const investedValue = bonds?.reduce(
    (accumulator, current) =>
      accumulator + Number(current.account.summary.investmentValue),
    0
  );
  const currentValue = bonds?.reduce(
    (accumulator, current) =>
      accumulator + Number(current.account.summary.currentValue),
    0
  );
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
          {bonds?.map((aif: Bonds) => {
            return (
              <Box
                p="1rem"
                key={aif.account.maskedAccNumber}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                w="100%"
              >
                <BondAccount accounts={aif} />
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
        >
          <Table size="sm" colorScheme="blue">
            <TableCaption fontSize="md" fontWeight="bold" p="0">
              Bonds Summary
            </TableCaption>

            <Tbody>
              <Tr>
                <Td>no of Accounts</Td>
                <Td isNumeric>{bonds?.length}</Td>
              </Tr>
              <Tr>
                <Td>total invested</Td>
                <Td isNumeric>₹{investedValue}</Td>
              </Tr>
              <Tr>
                <Td>current value</Td>
                <Td isNumeric>₹{currentValue}</Td>
              </Tr>
              <Tr
                fontWeight="bold"
                color={useColorModeValue("accentdark", "accentdark")}
              >
                <Td>returns</Td>
                <Td isNumeric>
                  {((currentValue - investedValue) / investedValue) * 100}%
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </Box>
      </HStack>
    </Box>
  );
};

export default BondsComponent;
