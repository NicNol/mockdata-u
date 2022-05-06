import React from "react";
import { Box, Center, Flex, useBreakpointValue } from "@chakra-ui/react";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import HamburgerMenu from "./HamburgerMenu";

export default function AppWrapper({ children }) {
    const sidebarOrHamburger = useBreakpointValue({
        base: <HamburgerMenu />,
        lg: <Sidebar />,
    });

    return (
        <Center bg={"#152333cc"} w={"100%"} h={"100%"}>
            <Flex
                justifyContent={"space-between"}
                flexDirection={"column"}
                minH={"100vh"}
                w={"100%"}
                maxW={"1600px"}
                bg={"white"}
                shadow={"2xl"}
            >
                <Header />
                <Flex
                    flexGrow={1}
                    flexDirection={"column"}
                    justifyContent={"flex-start"}
                    alignSelf={"center"}
                    w={"100%"}
                >
                    <Flex w={"100%"} flexGrow={1}>
                        <Flex
                            w={"100%"}
                            flexDirection={["column", null, null, "row"]}
                        >
                            {sidebarOrHamburger}
                            <Box w={"100%"} overflow={"hidden"} px={1}>
                                {children}
                            </Box>
                        </Flex>
                    </Flex>
                </Flex>
                <Footer />
            </Flex>
        </Center>
    );
}
