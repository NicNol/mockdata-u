import React from "react";
import {
    Box,
    Collapse,
    Flex,
    Icon,
    Link,
    Stack,
    useBoolean,
} from "@chakra-ui/react";
import { IoClose, IoMenu } from "react-icons/io5";
import { default as NextLink } from "next/link";

export default function HamburgerMenu() {
    const [isOpen, setIsOpen] = useBoolean(false);

    return (
        <Flex
            display={{ base: "block", lg: "none" }}
            justifyContent={"flex-start"}
            flexDirection={"column"}
            w={"100%"}
            mb={4}
        >
            <Flex justifyContent={"center"}>
                <Flex
                    as={"nav"}
                    align={"center"}
                    justify={"space-between"}
                    wrap={"wrap"}
                    w={"100%"}
                    minH={14}
                >
                    <Box onClick={setIsOpen.toggle} py={2} px={4}>
                        <Icon
                            as={isOpen ? IoClose : IoMenu}
                            color={"#333"}
                            h={8}
                            w={8}
                        />
                    </Box>
                    <Flex flexBasis={"100%"} justifyContent={"center"}>
                        <Collapse in={isOpen}>
                            <Stack
                                justify={"center"}
                                direction={"column"}
                                align={"center"}
                            >
                                <NextLink passHref href={"/"}>
                                    <Link>Home</Link>
                                </NextLink>
                                <NextLink passHref href={"/mock-student"}>
                                    <Link>Mock Student Data</Link>
                                </NextLink>
                                <NextLink passHref href={"/mock-class"}>
                                    <Link>Mock Class Data</Link>
                                </NextLink>
                                <NextLink passHref href={"/mock-university"}>
                                    <Link>Mock University Data</Link>
                                </NextLink>
                            </Stack>
                        </Collapse>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    );
}
