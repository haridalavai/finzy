import { Heading, Flex, useColorModeValue, Box } from "@chakra-ui/react";
import React, { useEffect } from "react";
import Boxv2 from "../../components/box";
import Router from "next/router";
import { Pie } from "react-chartjs-2";
import { graphColors } from "../../styles/chartColors";

const NetWorth = ({ fid, currentUser }) => {
  const da = [];
  fid?.fi.fi.summary.summary.netWorth.distribution.map((dis) => {
    da.push(dis.amount);
  });
  const labels = [];
  fid?.fi.fi.summary.summary.netWorth.distribution.map((dis) => {
    labels.push(dis.maskedAccountNumber + dis.type);
  });
  console.log(da);
  const pidata = {
    labels: labels,
    datasets: [
      {
        label: "Dataset 1",
        data: da,
        backgroundColor: [
          graphColors.green,
          graphColors.red,
          graphColors.pink,
          graphColors.purple,
          graphColors.coffee,
          graphColors.green,
          graphColors.red,
          graphColors.pink,
          graphColors.purple,
          graphColors.coffee,
        ],
        borderColor: "#131417",
        borderWidth: "1",
        height: "10px",
        width: "10px",
      },
    ],
  };
  const DATA_COUNT = 5;
  const NUMBER_CFG = { count: DATA_COUNT, min: 0, max: 100 };
  useEffect(() => {
    if (!currentUser) {
      Router.push("/auth/signin");
    }
  }, []);
  console.log(fid?.fi.fi.summary.summary.netWorth.netWorth);
  console.log(fid?.fi.fi.summary.summary.netWorth.distribution);

  return (
    <>
      <Boxv2>
        <Flex justifyContent="center" alignItems="center">
          <Heading as="h3" size="md" p="1rem" paddingRight="0">
            ₹
          </Heading>
          <Heading
            as="h3"
            size="lg"
            p="1rem"
            paddingRight="0"
            color={useColorModeValue("primary", "primarydark")}
          >
            {Number(
              fid?.fi.fi.summary.summary.netWorth.netWorth
            ).toLocaleString("en-IN")}
          </Heading>
          <Heading as="h3" size="md" p="1rem" paddingRight="0">
            distributed accross{" "}
          </Heading>
          <Heading
            as="h3"
            size="lg"
            p="1rem"
            paddingRight="0"
            color={useColorModeValue("accent", "accentdark")}
          >
            {fid?.fi.fi.summary.summary.netWorth.distribution.length}
          </Heading>
          <Heading as="h3" size="md" p="1rem" paddingRight="0">
            {" "}
            accounts
          </Heading>
        </Flex>
      </Boxv2>

      <Flex p="0.5">
        <Flex flex=".5">
          <Box
            alignItem="center"
            bg="primary"
            p=".5rem"
            m="1rem"
            // marginLeft="1rem"
            // marginTop="0"
            // marginRight="0"
            w="100%"
          >
            hi
          </Box>
        </Flex>
        <Flex flex=".5">
          <Box
            alignItem="center"
            bg="primary"
            p=".5rem"
            m="1rem"
            // marginTop="0"
            // marginRight="0"
            w="100%"
          >
            hello
          </Box>
        </Flex>
      </Flex>
    </>
  );
};
export default NetWorth;
