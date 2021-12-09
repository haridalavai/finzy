import { ChakraProvider } from "@chakra-ui/react";
import { buildClient } from "../api/build-client";
import Header from "../components/header";
import Header2 from "../components/header-2";
import Mode from "../components/mode";
import { myTheme } from "../styles/theme";

function AppComponent({ Component, pageProps, currentUser, fid }) {
  return (
    <ChakraProvider theme={myTheme}>
      <Header2 currentUser={currentUser} />

      <Component currentUser={currentUser} fid={fid} {...pageProps} />
    </ChakraProvider>
  );
}
AppComponent.getInitialProps = async (appContext) => {
  const client = buildClient(appContext.ctx);
  const { data } = await client.get("/api/users/currentuser");
  let fid = null;
  if (data.currentUser != null) {
    const fiData = await client.get(
      `/api/fi/get-fiData/${data.currentUser?.id}`
    );
    console.log(fiData.data, "hi");
    fid = fiData.data;
  }

  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(
      appContext.ctx,
      client,
      data.currentUser
    );
    console.log(pageProps);
  }

  return {
    pageProps,
    ...data,
    fid,
  };
};
export default AppComponent;
