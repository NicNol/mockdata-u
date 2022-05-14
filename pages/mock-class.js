import { useState, useEffect } from "react";
import { Flex, Text, useDisclosure } from "@chakra-ui/react";
import AppWrapper from "../components/AppWrapper";
import DataCard from "../components/DataCard";
import ClassSettings from "../components/ClassSettings";
import { createMultipleClasses } from "./api/class/[classCount]";
import DataButtonGroup from "../components/DataButtonGroup";
import DeleteAlert from "../components/DeleteAlert";
import BreadCrumb from "../components/BreadCrumb";

export default function Home() {
    const [classes, setClasses] = useState([]);
    const [factorySize, setFactorySize] = useState(1);
    const { isOpen, onOpen, onClose } = useDisclosure(); // For DeleteAlert
    const [dataAfterDelete, setDataAfterDelete] = useState([]);

    /* Data view toggles */
    const [showTitle, setShowTitle] = useState(true);
    const [showDepartment, setShowDepartment] = useState(true);
    const [showQuarter, setShowQuarter] = useState(true);
    const [showInstructor, setShowInstructor] = useState(true);

    useEffect(() => {
        setClasses([...createMultipleClasses(3)]);
    }, []);

    useEffect(() => setDataAfterDelete([]), [classes]);

    function deleteOne(classToDelete) {
        const modifiedClassData = classes.filter((classData) =>
            Object.keys(classData).some(
                (value, index) => classData[value] !== classToDelete[value]
            )
        );
        setDataAfterDelete(modifiedClassData);
        onOpen();
    }

    function handleTextArray(department, quarter, instructor) {
        const output = [];
        showDepartment ? output.push(department) : null;
        showQuarter ? output.push(quarter) : null;
        showInstructor ? output.push(`Instructor: ${instructor}`) : null;
        return output;
    }

    const classDataCards = classes.map((classData) => {
        const { classTitle, quarter, department, instructor } = classData;
        return (
            <DataCard
                key={classTitle}
                title={showTitle ? classTitle : ""}
                textArray={handleTextArray(department, quarter, instructor)}
                deleteCard={() => deleteOne(classData)}
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
                        <BreadCrumb currentPageName={"Mock Class Data"} />
                        <ClassSettings
                            setFactorySize={setFactorySize}
                            factorySize={factorySize}
                            toggles={{
                                setShowTitle,
                                setShowDepartment,
                                setShowQuarter,
                                setShowInstructor,
                            }}
                            toggleValues={{
                                showTitle,
                                showDepartment,
                                showQuarter,
                                showInstructor,
                            }}
                        />
                    </Flex>
                    <DataButtonGroup
                        data={classes}
                        setData={setClasses}
                        factory={createMultipleClasses}
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
                            Showing data for {classes.length}{" "}
                            {classes.length === 1 ? "class" : "classes"}:
                        </Text>
                        {classDataCards}
                    </Flex>
                </Flex>
            </Flex>
            <DeleteAlert
                isOpen={isOpen}
                onClose={onClose}
                setData={setClasses}
                dataAfterDelete={dataAfterDelete}
            />
        </AppWrapper>
    );
}
