import { ReactNode, useState, useEffect } from "react";
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  useColorMode,
  Progress,
  Stack,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import LinkNext from "next/link";
import { faCloudSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import NProgress from "nprogress";
const Links = ["Dashboard", "Projects", "Team"];

export default function Header2({ currentUser }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleStart = (url) => {
      console.log(`Loading: ${url}`);
      setIsLoading(true);
    };
    const handleStop = () => {
      NProgress.done();
      setIsLoading(false);
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleStop);
    router.events.on("routeChangeError", handleStop);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleStop);
      router.events.off("routeChangeError", handleStop);
    };
  }, [router]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const links = [
    !currentUser && { label: "Sign Up", href: "/auth/signup" },
    !currentUser && { label: "Sign In", href: "/auth/signin" },

    currentUser && { label: "Dashboard", href: "/" },
    currentUser && { label: "Investments", href: "/fi/investment" },
    currentUser && { label: "Liabilities", href: "/fi/liabilities" },
    currentUser && { label: "Tax", href: "/fi/tax" },
  ]
    .filter((linkConfig) => linkConfig)
    .map(({ label, href }) => {
      return (
        <HStack
          as={"nav"}
          spacing={4}
          display={{ base: "none", md: "flex" }}
          key={href}
        >
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

  return (
    <>
      <Box
        bg={useColorModeValue("navbarcolor", "coloremptyshadedark")}
        color={useColorModeValue("colorlightestshade", "colorlightestshade")}
        px={4}
        boxShadow="md"
        fontWeight="bold"
      >
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Box>Logo</Box>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {links}
            </HStack>
          </HStack>

          <Flex flex={0.1} justifyContent="space-around">
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
                    src={
                      "https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                    }
                  />
                </MenuButton>
                <MenuList
                  bg={useColorModeValue("navbarcolor", "coloremptyshadedark")}
                >
                  <MenuItem>Link 1</MenuItem>

                  <MenuDivider />
                  <MenuItem>
                    <LinkNext href="/auth/signout">Signout</LinkNext>
                  </MenuItem>
                </MenuList>
              </Menu>
            )}
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {links}
            </Stack>
          </Box>
        ) : null}
      </Box>
      {
        <Progress
          size="xs"
          isIndeterminate={isLoading}
          bg={useColorModeValue("navbarcolor", "coloremptyshadedark")}
        />
      }
    </>
  );
}
