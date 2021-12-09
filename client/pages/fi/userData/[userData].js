import React, { useEffect, useState } from "react";
import useRequest from "../../../hooks/use-request";
import router, { useRouter } from "next/router";
import { Center, Heading } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
const UserData = ({ currentUser, userData }) => {
  const Router = useRouter();

  const [displayTest, setDisplayTest] = useState(
    "Fetching FI Data...Please wait"
  );

  const request = useRequest({
    url: `/api/fi/fetch-consent/${userData}`,
    method: "get",
    body: {},
    onSuccess: (data) => {
      console.log(data);
      setDisplayTest("data fetch successful!..Redirecting to Dashboard");
      router.push("/");
    },
    onErrors: () => {
      console.log("sad");
      router.push("/");
    },
  });

  useEffect(() => {
    request.doRequest();
  }, []);

  return (
    <div>
      <Center h="100vh">
        <Spinner />
        <Heading as="h3">{displayTest}</Heading>
      </Center>
    </div>
  );
};

UserData.getInitialProps = async (context) => {
  return { userData: context.query.userData };
};
export default UserData;
