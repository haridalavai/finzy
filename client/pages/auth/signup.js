import React, { useState, useEffect } from "react";
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

import useRequest from "../../hooks/use-request";
const Signup = ({ currentUser }) => {
  useEffect(() => {
    if (currentUser) {
      Router.push("/");
    }
  }, []);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const [loading, setLoading] = useState(false);
  const { doRequest, errors } = useRequest({
    url: "/api/users/signup",
    method: "post",
    body: {
      username,
      email,
      password,
      birthdate: "1998-06-19",
      family_name: "srihari",
    },
    onSuccess: () => {
      setLoading(false);
      Router.push({ pathname: "/auth/verify", query: { username: username } });
    },
    onErrors: () => {
      setLoading(false);
    },
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    console.log(username);
    console.log(email);
    console.log(password);
    await doRequest();
  };
  return (
    <form onSubmit={onSubmit}>
      <VStack spacing={4} align="center">
        <Center>
          <Heading as="h1">Signup</Heading>
        </Center>
        <Center width="20%">
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
        </Center>
        <Center width="20%">
          <FormControl>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<FontAwesomeIcon icon={faEnvelope} />}
                color="gray.300"
              />
              <Input
                type="tel"
                placeholder="email"
                onChange={(event) => setEmail(event.target.value)}
              />
            </InputGroup>
          </FormControl>
        </Center>
        <Center width="20%">
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
        </Center>
        <Center>{errors}</Center>
        <Center>
          <Button
            loadingText="Submitting"
            colorScheme="teal"
            type="submit"
            isLoading={loading}
          >
            Signup
          </Button>
        </Center>
      </VStack>
    </form>
  );
};

export default Signup;
