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
import { Epf } from "@linklab-test-p/common";

const EpfAccount = ({ accounts }) => {
  const account: Epf = accounts;
  const currentValue = account.account.summary.currentBalance;
  const employeeBalance = account.account.summary.employeeBalance;
  const employerBalance = account.account.summary.employerBalance;
  const companyName = account.account.summary.establishmentName;

  return (
    <Box w="100%">
      <StatGroup w="100%" p="0.5rem">
        <Stat>
          <StatLabel>{account.account.maskedAccNumber}</StatLabel>
          <StatNumber>₹{currentValue}</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>employee share</StatLabel>
          <StatNumber>₹{employeeBalance}</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>employer share</StatLabel>
          <StatNumber>₹{employerBalance}</StatNumber>
        </Stat>
      </StatGroup>
      <Divider color="primary" />
      <Heading as="h2" size="md" p="0.5rem">
        Employer Details
      </Heading>
      <Divider />
      <StatGroup w="100%" p="0.5.3em">
        <Stat size="xs">
          <StatLabel>Employer</StatLabel>
          <StatNumber>{companyName}</StatNumber>
        </Stat>
        <Stat size="xs">
          <StatLabel>establishment Id</StatLabel>
          <StatNumber>₹{account.account.summary.establishmentId}</StatNumber>
        </Stat>
        <Stat size="xs">
          <StatLabel>employer share</StatLabel>
          <StatNumber>{employerBalance}</StatNumber>
        </Stat>
      </StatGroup>
      <Divider />
    </Box>
  );
};

export default EpfAccount;
