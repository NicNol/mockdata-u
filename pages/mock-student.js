import { useState, useEffect } from "react";
import { Flex } from "@chakra-ui/react";
import AppWrapper from "../components/AppWrapper";
import DataCard from "../components/DataCard";
import Settings from "../components/Settings";
import { createMultipleStudents } from "./api/student/[studentCount]";
import DataButtonGroup from "../components/DataButtonGroup";

export default function Home() {
    const [students, setStudents] = useState([]);
    const [factorySize, setFactorySize] = useState(3);

    useEffect(() => {
        setStudents([...createMultipleStudents(3)]);
    }, []);

    const studentDataCards = students.map((student) => {
        const { firstName, lastName, email, idNumber } = student;
        return (
            <DataCard
                key={`${firstName} ${lastName}`}
                title={`${firstName} ${lastName}`}
                textArray={[email, `ID: ${idNumber}`]}
            />
        );
    });

    return (
        <AppWrapper>
            <Flex justifyContent={"center"} py={16} w={"100%"}>
                <Flex
                    flexDirection={"column"}
                    w={"100%"}
                    alignItems={"center"}
                    gap={8}
                >
                    <Settings
                        setFactorySize={setFactorySize}
                        factorySize={factorySize}
                    />
                    <DataButtonGroup
                        data={students}
                        setData={setStudents}
                        factory={createMultipleStudents}
                        factorySize={factorySize}
                    />
                    {studentDataCards}
                </Flex>
            </Flex>
        </AppWrapper>
    );
}
