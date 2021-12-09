import {
  Heading,
  Box,
  VStack,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  TabPanels,
} from "@chakra-ui/react";

import React, { useEffect } from "react";
import Router from "next/router";
import { FiTypes } from "@linklab-test-p/common";
import AifComponent from "../../components/investments/aif";
import BondsComponent from "../../components/investments/bonds";
import DebentureComponent from "../../components/investments/debentures";
import EpfComponent from "../../components/investments/epf";
import EquitiesComponent from "../../components/investments/equities";

const Investment = ({ fid, currentUser }) => {
  useEffect(() => {
    if (!currentUser) {
      Router.push("/auth/signin");
    }
  }, []);
  console.log(fid);
  return (
    <Box>
      <VStack>
        <Heading as="h1" size="lg" color="primary" m="1rem">
          Investments
        </Heading>
        <Tabs
          isManual
          variant="line"
          // borderRight="md"

          align="center"
          // m="1rem"
          p="1rem"
          paddingTop=".2rem"
        >
          <TabList flexWrap="wrap">
            <Tab>{FiTypes.aif}</Tab>
            <Tab>{FiTypes.bonds}</Tab>
            {/* <Tab>{FiTypes.cd}</Tab> */}
            {/* <Tab>{FiTypes.cis}</Tab> */}
            {/* <Tab>{FiTypes.cp}</Tab> */}
            <Tab>{FiTypes.debentures}</Tab>
            <Tab>{FiTypes.epf}</Tab>
            <Tab>{FiTypes.equities}</Tab>
            <Tab>{FiTypes.etf}</Tab>
            <Tab>{FiTypes.govt_securities}</Tab>
            {/* <Tab>{FiTypes.idr}</Tab> */}
            {/* <Tab>{FiTypes.invit}</Tab> */}
            <Tab>{FiTypes.mutual_funds}</Tab>
            {/* <Tab>{FiTypes.nps}</Tab> */}
            <Tab>{FiTypes.ppf}</Tab>
            <Tab>{FiTypes.recurring_deposit}</Tab>
            {/* <Tab>{FiTypes.reit}</Tab> */}
            <Tab>{FiTypes.sip}</Tab>
            <Tab>{FiTypes.term_deposit}</Tab>
            {/* <Tab>{FiTypes.ulip}</Tab> */}
          </TabList>
          <TabPanels>
            <TabPanel>
              <AifComponent aif={fid?.fi.fi.accounts.AIF} />
            </TabPanel>
            <TabPanel>
              <BondsComponent bond={fid?.fi.fi.accounts.BONDS} />
            </TabPanel>
            <TabPanel>
              <DebentureComponent debenture={fid?.fi.fi.accounts.DEBENTURES} />
            </TabPanel>
            <TabPanel>
              <EpfComponent epf={fid?.fi.fi.accounts.EPF} />
            </TabPanel>
            <TabPanel>
              <EquitiesComponent equity={fid?.fi.fi.accounts.EQUITIES} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>
    </Box>
  );
};

export default Investment;
