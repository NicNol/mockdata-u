import { Flex } from "@chakra-ui/react";
import AppWrapper from "../components/AppWrapper";
import DataCard from "../components/DataCard";
import Settings from "../components/Settings";

export default function Home() {
    return (
        <AppWrapper>
            <Flex justifyContent={"center"} py={16} w={"100%"}>
                <Flex
                    flexDirection={"column"}
                    w={"100%"}
                    alignItems={"center"}
                    gap={8}
                >
                    <Settings />
                    <DataCard />
                </Flex>
            </Flex>
        </AppWrapper>
    );
}
