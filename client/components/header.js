import {
  HStack,
  useColorMode,
  useDisclosure,
  useColorModeValue,
  Flex,
  Stack,
  Menu,
  MenuButton,
  Avatar,
  MenuList,
  MenuDivider,
  MenuItem,
  Button,
  Center,
  Heading,
  IconButton,
  Form,
  Link,
  Box,
} from "@chakra-ui/react";
import LinkNext from "next/link";
import { faCloudSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Router from "next/router";

const Header = ({ currentUser }) => {
  const links = [
    !currentUser && { label: "Sign Up", href: "/auth/signup" },
    !currentUser && { label: "Sign In", href: "/auth/signin" },

    currentUser && { label: "Dashboard", href: "/auth/signout" },
    currentUser && { label: "Investments", href: "/auth/signout" },
    currentUser && { label: "Liabilities", href: "/auth/signout" },
    currentUser && { label: "Tax", href: "/auth/signout" },
  ]
    .filter((linkConfig) => linkConfig)
    .map(({ label, href }) => {
      return (
        <HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }}>
          <LinkNext href={href}>
            <Link
              px={2}
              py={1}
              rounded={"md"}
              _hover={{
                textDecoration: "none",
                bg: useColorModeValue("gray.200", "gray.700"),
              }}
            >
              {label}
            </Link>
          </LinkNext>
        </HStack>
      );
    });

  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const logout = () => {
    Router.push("/auth/signout");
  };
  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"}>
          <Flex flex=".05" justifyContent="center">
            Logo
          </Flex>
          <Flex flex="1" alignItems={"center"}>
            <HStack>{links}</HStack>
          </Flex>

          <Flex>
            <Stack direction={"row"} spacing={7}>
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
                _focus={{ shadow: "none" }}
                onClick={toggleColorMode}
              ></IconButton>

              {currentUser && (
                <Menu>
                  <MenuButton
                    as={Button}
                    rounded={"full"}
                    variant={"link"}
                    cursor={"pointer"}
                    minW={0}
                  >
                    <Avatar
                      size={"sm"}
                      src={"https://avatars.dicebear.com/api/male/username.svg"}
                    />
                  </MenuButton>
                  <MenuList alignItems={"center"}>
                    <br />
                    <Center>
                      <Avatar
                        size={"2xl"}
                        src={
                          "https://avatars.dicebear.com/api/male/username.svg"
                        }
                      />
                    </Center>
                    <br />
                    <Center>
                      <p>{currentUser.username}</p>
                    </Center>
                    <br />
                    <MenuDivider />
                    <MenuItem>Profile</MenuItem>
                    <MenuItem>Settings</MenuItem>
                    <MenuItem onClick={logout}>Logout</MenuItem>
                  </MenuList>
                </Menu>
              )}
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};

export default Header;
