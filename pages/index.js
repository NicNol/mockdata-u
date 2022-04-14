import { Flex, Heading } from "@chakra-ui/react";
import AppWrapper from "../components/AppWrapper";
import HomeCard from "../components/HomeCard";

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
                    <Heading
                        fontStyle={"italic"}
                        fontWeight={"thin"}
                        color={"141e30"}
                        position={"relative"}
                        right={"20%"}
                    >
                        I want to mock data for a...{" "}
                    </Heading>
                    <HomeCard
                        title={"Student"}
                        description={
                            "Students may have first names, last names, email addresses, and ID numbers"
                        }
                    />
                    <HomeCard
                        title={"Class"}
                        description={
                            "Classes may have numbers, titles, assignments, modules, instructors, and student names"
                        }
                    />
                    <HomeCard
                        title={"University"}
                        description={
                            "Universities may have names, logos, addresses, professional staff, departments, classes, and students"
                        }
                    />
                </Flex>
            </Flex>
        </AppWrapper>
    );
}
