import React from "react";
import { Aif } from "@linklab-test-p/common";
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

import AifAccount from "../accounts/aifAccount";

const AifComponent = ({ aif }) => {
  const onClick = () => {
    console.log("hi");
  };
  const aifs: Aif[] = aif;
  console.log(aifs);
  const investedValue = aifs?.reduce(
    (accumulator, current) =>
      accumulator + Number(current.account.summary.investmentValue),
    0
  );
  const currentValue = aifs?.reduce(
    (accumulator, current) =>
      accumulator + Number(current.account.summary.currentValue),
    0
  );
  return (
    <Box padding="1rem" w="80%">
      {/* <Heading
        as="h1"
        size="md"
        color={useColorModeValue("accent", "accentdark")}
        p=".5rem"
      >
        AIF Accounts
      </Heading> */}
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
          {aifs?.map((aif: Aif) => {
            return (
              <Box
                p="1rem"
                key={aif.account.maskedAccNumber}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                w="100%"
              >
                <AifAccount accounts={aif} />
              </Box>
            );
          })}
          {aifs?.map((aif: Aif) => {
            return (
              <Box
                p="1rem"
                key={aif.account.maskedAccNumber}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                w="100%"
              >
                <AifAccount accounts={aif} />
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
          <Table
            // bg="behindtext.50"
            size="sm"
            // color={useColorModeValue(
            //   "colorlightestshade",
            //   "colorlightestshadedark"
            // )}
            colorScheme="blue"
          >
            <TableCaption
              fontSize="md"
              fontWeight="bold"
              p="0"
              // color={useColorModeValue(
              //   "colorlightestshade",
              //   "colorlightestshadedark"
              // )}
            >
              AIF Summary
            </TableCaption>

            <Tbody>
              <Tr>
                <Td>no of Accounts</Td>
                <Td isNumeric>{aifs?.length}</Td>
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

export default AifComponent;
