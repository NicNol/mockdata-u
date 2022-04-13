import React from "react";
import { Box, Center, Flex } from "@chakra-ui/react";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

export default function AppWrapper({ children }) {
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
                        <Flex w={"100%"}>
                            <Sidebar />
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
