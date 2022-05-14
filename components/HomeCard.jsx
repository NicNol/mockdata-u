import React from "react";
import { Flex, Heading, LinkBox, LinkOverlay, Text } from "@chakra-ui/react";
import { default as NextLink } from "next/link";
import Image from "next/image";

export default function HomeCard({ title, description, href, image }) {
    return (
        <Flex w={"100%"} maxW={"800px"} px={4}>
            <LinkBox w={"100%"}>
                <Flex
                    bg={"#0083b022"}
                    borderRadius={8}
                    w={"100%"}
                    shadow={"md"}
                    border={"#0083b044 solid 1px"}
                    alignItems={"center"}
                    py={8}
                    _hover={{ backgroundColor: "#0083b044" }}
                    _active={{ backgroundColor: "#0083b066" }}
                    transition={"background-color .25s"}
                >
                    <Flex
                        h={"200px"}
                        w={"100%"}
                        maxW={"300px"}
                        position={"relative"}
                        mx={4}
                    >
                        <Image
                            src={image}
                            alt={"student"}
                            layout={"fill"}
                            objectFit={"contain"}
                        />
                    </Flex>
                    <Flex flexDirection={"column"}>
                        <NextLink href={href} passHref>
                            <LinkOverlay href="#">
                                <Heading color={"141e30"} px={4}>
                                    {title}
                                </Heading>
                            </LinkOverlay>
                        </NextLink>
                        <Text color={"#666666"} px={4}>
                            {description}
                        </Text>
                    </Flex>
                </Flex>
            </LinkBox>
        </Flex>
    );
}
