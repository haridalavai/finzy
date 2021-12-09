import React, { useState } from "react";
import useRequest from "../../hooks/use-request";
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
  Form,
  Image,
  FormControl,
  Flex,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faEye,
  faEyeSlash,
  faLock,
  faUserAlt,
} from "@fortawesome/free-solid-svg-icons";
import Router from "next/router";

const signin = () => {
  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const [loading, setLoading] = useState(false);
  const { doRequest, errors } = useRequest({
    url: "/api/users/signin",
    method: "post",
    body: {
      username,

      password,
    },
    onSuccess: () => {
      setLoading(false);
      Router.push("/");
    },
    onErrors: () => {
      setLoading(false);
    },
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    console.log(username);

    console.log(password);
    await doRequest();
  };
  return (
    <Center h="90 vh">
      <Box>
        <form onSubmit={onSubmit} w="80%">
          <VStack spacing={4} align="center">
            <Heading as="h1">Signin</Heading>

            <FormControl isRequired>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<FontAwesomeIcon icon={faUserAlt} />}
                  color="gray.300"
                />
                <Input
                  type="tel"
                  placeholder="username"
                  onChange={(event) => setUsername(event.target.value)}
                />
              </InputGroup>
            </FormControl>

            <FormControl>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<FontAwesomeIcon icon={faLock} />}
                  color="gray.300"
                />
                <Input
                  type={show ? "text" : "password"}
                  placeholder="Enter password"
                  onChange={(event) => setPassword(event.target.value)}
                />
                <InputRightElement width="4.5rem">
                  <IconButton
                    color="gray.300"
                    onClick={handleClick}
                    icon={
                      show ? (
                        <FontAwesomeIcon icon={faEyeSlash} color="gray.300" />
                      ) : (
                        <FontAwesomeIcon icon={faEye} color="gray.300" />
                      )
                    }
                    variant="unstyled"
                    _focusVisible={{ shadow: "outline" }}
                    _focus={{ shadow: "none" }}
                  ></IconButton>
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <Button
              loadingText="Submitting"
              colorScheme="teal"
              type="submit"
              isLoading={loading}
            >
              Signin
            </Button>
          </VStack>
        </form>
      </Box>
    </Center>
  );
};

export default signin;
