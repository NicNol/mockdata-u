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
                        right={["5%", "10%", "10%", "20%"]}
                    >
                        I want to mock data for a...{" "}
                    </Heading>
                    <HomeCard
                        title={"Student"}
                        description={
                            "Student data may have first names, last names, email addresses, and ID numbers"
                        }
                        href={"/mock-student"}
                    />
                    <HomeCard
                        title={"Class"}
                        description={
                            "Class data may have a department, course number, quarter (term), and instructor"
                        }
                        href={"/mock-class"}
                    />
                    <HomeCard
                        title={"University"}
                        description={
                            "University data may have an institution name, street address, city, state, and zip code"
                        }
                        href={"/mock-class"}
                    />
                </Flex>
            </Flex>
        </AppWrapper>
    );
}
