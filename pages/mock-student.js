import { useState, useEffect } from "react";
import { Flex, Text, useDisclosure } from "@chakra-ui/react";
import AppWrapper from "../components/AppWrapper";
import DataCard from "../components/DataCard";
import Settings from "../components/Settings";
import { createMultipleStudents } from "./api/student/[studentCount]";
import DataButtonGroup from "../components/DataButtonGroup";
import DeleteAlert from "../components/DeleteAlert";
import BreadCrumb from "../components/BreadCrumb";

export default function Home() {
    const [students, setStudents] = useState([]);
    const [factorySize, setFactorySize] = useState(1);
    const { isOpen, onOpen, onClose } = useDisclosure(); // For DeleteAlert
    const [dataAfterDelete, setDataAfterDelete] = useState([]);

    useEffect(() => {
        setStudents([...createMultipleStudents(3)]);
    }, []);

    useEffect(() => setDataAfterDelete([]), [students]);

    function deleteOne(studentToDelete) {
        const modifiedStudents = students.filter((student) =>
            Object.keys(student).some(
                (value, index) => student[value] !== studentToDelete[value]
            )
        );
        setDataAfterDelete(modifiedStudents);
        onOpen();
    }

    const studentDataCards = students.map((student) => {
        const { firstName, lastName, email, idNumber } = student;
        return (
            <DataCard
                key={`${firstName} ${lastName}`}
                title={`${firstName} ${lastName}`}
                textArray={[email, `ID: ${idNumber}`]}
                deleteCard={() => deleteOne(student)}
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
                    <Flex
                        w={"100%"}
                        maxW={"800px"}
                        justifyContent={"space-between"}
                    >
                        <BreadCrumb currentPageName={"Mock Student Data"} />
                        <Settings
                            setFactorySize={setFactorySize}
                            factorySize={factorySize}
                        />
                    </Flex>
                    <DataButtonGroup
                        data={students}
                        setData={setStudents}
                        factory={createMultipleStudents}
                        factorySize={factorySize}
                        onOpen={onOpen}
                    />
                    <Flex
                        direction={"column"}
                        w={"100%"}
                        alignItems={"center"}
                        maxW={"800px"}
                    >
                        <Text alignSelf={"flex-start"} color={"#999"}>
                            Showing data for {students.length}{" "}
                            {students.length === 1 ? "student" : "students"}:
                        </Text>
                        {studentDataCards}
                    </Flex>
                </Flex>
            </Flex>
            <DeleteAlert
                isOpen={isOpen}
                onClose={onClose}
                setData={setStudents}
                dataAfterDelete={dataAfterDelete}
            />
        </AppWrapper>
    );
}
