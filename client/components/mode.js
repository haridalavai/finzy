import {
  VStack,
  HStack,
  useColorMode,
  useDisclosure,
  useColorModeValue,
  Flex,
  Stack,
  MoonIcon,
  Menu,
  MenuButton,
  Avatar,
  MenuList,
  MenuDivider,
  MenuItem,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Button,
  Center,
  Heading,
  IconButton,
  Form,
  FormControl,
  Link,
  Box,
} from "@chakra-ui/react";
import LinkNext from "next/link";
import { faCloudSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Router from "next/router";

const Mode = ({ currentUser }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      position="fixed"
      zIndex="1"
      paddingTop="93vh"
      paddingLeft="96vw"
      display="flex"
      alignItems="flex-end"
    >
      <IconButton
        icon={
          colorMode === "light" ? (
            <FontAwesomeIcon icon={faMoon} />
          ) : (
            <FontAwesomeIcon icon={faCloudSun} />
          )
        }
        variant="unstyled"
        _focusVisible={{ shadow: "outline" }}
        bg={useColorModeValue("gray.200", "gray.500")}
        _focus={{ shadow: "none" }}
        onClick={toggleColorMode}
      ></IconButton>
    </Box>
  );
};

export default Mode;
