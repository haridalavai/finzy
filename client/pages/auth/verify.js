import React, { useState } from "react";

import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Button,
  Center,
  VStack,
  HStack,
  Heading,
  IconButton,
  Form,
  FormControl,
  PinInput,
  PinInputField,
} from "@chakra-ui/react";
import Router, { useRouter } from "next/router";
import useRequest from "../../hooks/use-request";
const Verify = () => {
  const sendCode = async () => {
    console.log(code);
    console.log(Router.query);
    await doRequest();
  };

  const [code, setCode] = useState("");

  const { doRequest, errors } = useRequest({
    url: "/api/users/verify",
    method: "post",
    body: {
      username: useRouter().query.username,
      code: code,
    },
    onSuccess: () => Router.push("/auth/signin"),
  });

  return (
    <VStack>
      <Center>
        <Heading as="h1">Enter Verification code</Heading>
      </Center>
      <Center width="20%">
        <HStack>
          <PinInput onChange={(code) => setCode(code)}>
            <PinInputField />
            <PinInputField />
            <PinInputField />
            <PinInputField />
            <PinInputField />
            <PinInputField />
          </PinInput>
        </HStack>
      </Center>
      {errors}
      <Center>
        <Button onClick={sendCode}>Send</Button>
      </Center>
    </VStack>
  );
};

export default Verify;
