import { useState, useEffect } from "react";
import { Flex, Text, useDisclosure } from "@chakra-ui/react";
import AppWrapper from "../components/AppWrapper";
import DataCard from "../components/DataCard";
import UniversitySettings from "../components/UniversitySettings";
import { createMultipleUniversities } from "./api/university/[universityCount]";
import DataButtonGroup from "../components/DataButtonGroup";
import DeleteAlert from "../components/DeleteAlert";
import BreadCrumb from "../components/BreadCrumb";

export default function Home() {
    const [universities, setUniversities] = useState([]);
    const [factorySize, setFactorySize] = useState(1);
    const { isOpen, onOpen, onClose } = useDisclosure(); // For DeleteAlert
    const [dataAfterDelete, setDataAfterDelete] = useState([]);

    /* Data view toggles */
    const [showTitle, setShowTitle] = useState(true);
    const [showStreetAddress, setShowStreetAddress] = useState(true);
    const [showCityStateZip, setShowCityStateZip] = useState(true);

    useEffect(() => {
        setUniversities([...createMultipleUniversities(3)]);
    }, []);

    useEffect(() => setDataAfterDelete([]), [universities]);

    function deleteOne(universityToDelete) {
        const modifiedUniversityData = universities.filter((universityData) =>
            Object.keys(universityData).some(
                (value, index) =>
                    universityData[value] !== universityToDelete[value]
            )
        );
        setDataAfterDelete(modifiedUniversityData);
        onOpen();
    }

    function handleTextArray(streetAddress, cityStateZip) {
        const output = [];
        showStreetAddress ? output.push(streetAddress) : null;
        showCityStateZip ? output.push(cityStateZip) : null;
        return output;
    }

    const universityDataCards = universities.map((universityData) => {
        const { name, streetAddress, city, state, zip } = universityData;
        return (
            <DataCard
                key={name}
                title={showTitle ? name : ""}
                textArray={handleTextArray(
                    streetAddress,
                    `${city}, ${state} ${zip}`
                )}
                deleteCard={() => deleteOne(universityData)}
                json={universityData}
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
                        <BreadCrumb currentPageName={"Mock University Data"} />
                        <UniversitySettings
                            setFactorySize={setFactorySize}
                            factorySize={factorySize}
                            toggles={{
                                setShowTitle,
                                setShowStreetAddress,
                                setShowCityStateZip,
                            }}
                            toggleValues={{
                                showTitle,
                                showDepartment: showStreetAddress,
                                showQuarter: showCityStateZip,
                            }}
                        />
                    </Flex>
                    <DataButtonGroup
                        data={universities}
                        setData={setUniversities}
                        factory={createMultipleUniversities}
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
                            Showing data for {universities.length}{" "}
                            {universities.length === 1
                                ? "university"
                                : "universities"}
                            :
                        </Text>
                        {universityDataCards}
                    </Flex>
                </Flex>
            </Flex>
            <DeleteAlert
                isOpen={isOpen}
                onClose={onClose}
                setData={setUniversities}
                dataAfterDelete={dataAfterDelete}
            />
        </AppWrapper>
    );
}
