import React, { useState } from "react";
import {
    Icon,
    IconButton,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Tooltip,
} from "@chakra-ui/react";
import { HiDotsVertical } from "react-icons/hi";
import { IoCopyOutline } from "react-icons/io5";
import { RiDeleteBin2Line } from "react-icons/ri";
import DeleteAlert from "./DeleteAlert";
import copy from "copy-to-clipboard";

export default function DataCardContextMenu({ content, deleteCard }) {
    const [openStatus, setOpenStatus] = useState(false);

    function handleCopy() {
        copy(content);
        setOpenStatus(true);
        setTimeout(() => setOpenStatus(false), 2000);
    }

    return (
        <>
            <Tooltip
                label={"Copied to Clipboard!"}
                placement={"top"}
                hasArrow
                isOpen={openStatus}
                gutter={4}
                bgGradient={"linear-gradient(to top, #141e30, #243b55)"}
            >
                {" "}
            </Tooltip>
            <Menu>
                <MenuButton
                    as={IconButton}
                    aria-label={"Options"}
                    icon={
                        <Icon
                            as={HiDotsVertical}
                            w={8}
                            h={8}
                            color={"#0083b0cc"}
                        />
                    }
                    variant={"outline"}
                    h={12}
                    w={12}
                    borderRadius={8}
                    _hover={{ backgroundColor: "#0083b022" }}
                    _active={{ backgroundColor: "#0083b022" }}
                />
                <MenuList>
                    <MenuItem
                        icon={<IoCopyOutline />}
                        onClick={() => handleCopy()}
                    >
                        Copy Data as Text
                    </MenuItem>
                    <MenuItem icon={<IoCopyOutline />} isDisabled>
                        Copy Data as JSON
                    </MenuItem>
                    <MenuItem
                        icon={<RiDeleteBin2Line />}
                        color={"#ff0000"}
                        onClick={deleteCard}
                    >
                        Delete this Data
                    </MenuItem>
                </MenuList>
            </Menu>
            <DeleteAlert />
        </>
    );
}
