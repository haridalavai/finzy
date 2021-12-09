import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Button,
  Center,
  VStack,
  Box,
  HStack,
  Heading,
  IconButton,
  NumberInput,
  NumberInputField,
  useColorModeValue,
  Form,
  Image,
  Label,
  FormControl,
  Flex,
} from "@chakra-ui/react";
import { PrimaryButton } from "@fluentui/react";
import Router from "next/router";
import { useEffect, useState } from "react";
import useRequest from "../hooks/use-request";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faEye,
  faEyeSlash,
  faLock,
  faUserAlt,
} from "@fortawesome/free-solid-svg-icons";
import NetWorth from "../components/netWorth";
import Boxv2 from "../components/box";

const Index = ({ currentUser, fid }) => {
  console.log(fid);
  useEffect(() => {
    if (!currentUser) {
      Router.push("/auth/signin");
    }
  }, []);

  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [fiData, setFiData] = useState({});

  const request = useRequest({
    url: `/api/fi/get-fiData/${currentUser?.id}`,
    method: "get",
    body: {},
    onSuccess: async (data) => {
      setFiData(data.fi.fi);
      console.log(fiData);
    },
    onErrors: () => {
      console.log("sad");
    },
  });
  const { doRequest, errors } = useRequest({
    url: `/api/fi/consent/${phone}`,
    method: "get",
    body: {},
    onSuccess: (data) => {
      setLoading(false);
      Router.push(data.url);
      // console.log(data.data);
      console.log(data);
    },
    onErrors: () => {
      console.log("sad");
      setLoading(false);
    },
  });
  const onFetchFIClick = () => {
    console.log(phone);
    doRequest();
  };
  // console.log(fiData);
  // console.log(fid);
  return (
    <>
      {fiData !== null && (
        <Flex maxWidth="100vw" flexWrap="wrap">
          <Boxv2 bg="primary">
            <NetWorth
              bg="behindtext.50"
              summary={fid?.fi?.fi.summary.summary.netWorth}
            />
          </Boxv2>
        </Flex>
      )}

      {/* <Heading as="h1">{fid?.fi.fi.summary.summary.netWorth.netWorth}</Heading> */}
      {
        <div>
          <Center h="100vh">
            <VStack>
              <Heading as="h1">
                {fid?.fi?.fi.summary.summary.netWorth.netWorth}
              </Heading>

              <FormControl isRequired>
                <NumberInput>
                  <NumberInputField
                    onChange={(e) => {
                      setPhone(e.target.value);
                    }}
                  />
                </NumberInput>
              </FormControl>
              <Button onClick={onFetchFIClick}>Fetch FI Data</Button>
            </VStack>
          </Center>
        </div>
      }
    </>
  );
};

// Index.getInitialProps = async (appContext, client, currentUser) => {
//   if (currentUser != null) {
//     const { data } = await client.get(`/api/fi/get-fiData/${currentUser?.id}`);
//     console.log(data);
//     return { fid: data };
//   }
// };

export default Index;
