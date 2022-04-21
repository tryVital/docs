import React from "react";
import { chakra, useColorModeValue, Flex } from "@chakra-ui/react";
import * as Icon from "react-icons/fi";

export const Table = ({ ...props }) => {
  return (
    <chakra.div width={"100%"}>
      <chakra.table textAlign="left" mt="32px" {...props} />
    </chakra.div>
  );
};

export const TR = (props) => (
  <chakra.tr
    {...props}
    _notFirst={{ borderTop: "2px solid #E2E8F0" }}
    border={0}
  />
);

export const THead = (props) => (
  <chakra.th
    px={"18px"}
    bg={"white"}
    py={"5px"}
    fontWeight={700}
    align={"left"}
    fontSize={"14px"}
    borderWidth={"0 !important"}
    textTransform={"capitalize !important"}
    color={"#202d4a"}
    {...props}
    border={0}
  />
);

export const TData = (props) => {
  const mapToIcon = (text) => {
    if (!text) return text;
    if (text.includes("@@")) {
      const results = text.split(/(\s+)/);
      const components = results.map((el) => {
        if (el.startsWith("@@")) {
          const MDIcon = Icon[el.replace("@@", "")];
          return <MDIcon size={"18px"} style={{ marginRight: "10px" }} />;
        } else {
          return el;
        }
      });
      return <Flex alignItems={"center"}>{components}</Flex>;
    }
    return text;
  };
  return (
    <chakra.td
      px={"20px"}
      py={"14px"}
      fontSize={"14px"}
      border={0}
      _odd={{ fontWeight: 700, fontSize: "14px", fontFamily: "monospace" }}
      align={props.align}
    >
      {mapToIcon(props.children)}
    </chakra.td>
  );
};

export const TBody = (props) => (
  <chakra.tbody
    border={"2px solid #E2E8F0"}
    px={"20px"}
    {...props}
    borderRadius={"20px !important"}
    _odd={{ bg: "#F7FAFC" }}
  />
);
