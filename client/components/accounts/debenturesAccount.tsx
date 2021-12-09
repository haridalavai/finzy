import {
  Box,
  VStack,
  Heading,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  StatGroup,
  StatArrow,
  useColorModeValue,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Divider,
} from "@chakra-ui/react";
import React from "react";
import { Debentures } from "@linklab-test-p/common";

const AifAccount = ({ accounts }) => {
  const account: Debentures = accounts;
  const currentValue = account.account.summary.currentValue;
  const investmentValue = account.account.summary.investmentValue;
  const profit = Number(currentValue) - Number(investmentValue);
  const returns =
    ((Number(currentValue) - Number(investmentValue)) /
      Number(investmentValue)) *
    100;
  return (
    <VStack w="100%">
      <Accordion w="100%" borderColor="transparent" allowToggle>
        <AccordionItem>
          <h2>
            <AccordionButton
              _focus={{ outline: "none", boxShadow: "none" }}
              dropShadow="sm"
            >
              <Box flex="1" textAlign="left">
                <StatGroup w="100%">
                  <Stat>
                    <StatLabel>{account.account.maskedAccNumber}</StatLabel>
                    <StatNumber>
                      ₹{currentValue}
                      <StatHelpText color={profit >= 0 ? "green" : "red"}>
                        {profit >= 0 ? `+` : `-`}₹{profit}
                      </StatHelpText>
                    </StatNumber>
                  </Stat>
                  <Stat>
                    <StatLabel>invested</StatLabel>
                    <StatNumber>₹{investmentValue}</StatNumber>
                  </Stat>
                  <Stat>
                    <StatLabel>returns</StatLabel>
                    <StatNumber
                      color={useColorModeValue("success", "successdark")}
                    >
                      <StatArrow type={profit >= 0 ? "increase" : "decrease"} />
                      {returns}%
                    </StatNumber>
                  </Stat>
                </StatGroup>
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel borderTop="1px" borderColor="primary">
            <StatGroup w="100%">
              <Stat size="sm">
                <StatLabel>issued on</StatLabel>
                <StatNumber>
                  {account.account.summary.holdings.holding.issueDate}
                </StatNumber>
              </Stat>
              <Stat size="sm">
                <StatLabel>maturity date</StatLabel>
                <StatNumber>
                  {account.account.summary.holdings.holding.maturityDate}
                </StatNumber>
              </Stat>

              <Stat size="sm">
                <StatLabel>units</StatLabel>
                <StatNumber>
                  {account.account.summary.holdings.holding.units}
                </StatNumber>
              </Stat>
              <Stat size="sm">
                <StatLabel>tenure</StatLabel>
                <StatNumber>
                  {account.account.summary.holdings.holding.tenureYears} years
                </StatNumber>
              </Stat>
            </StatGroup>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
      <Divider orientation="horizontal" />
    </VStack>
  );
};

export default AifAccount;
