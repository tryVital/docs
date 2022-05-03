import React from "react";
import { chakra, useDisclosure, Collapse, Text, Box } from "@chakra-ui/react";

export const Param = ({
  name,
  type,
  required,
  description,
  deprecated,
  ...props
}) => {
  if (deprecated) return null;
  return (
    <chakra.tr
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        py: "10px",
        px: "20px",
        _first: { borderTop: "none" },
        _last: { borderBottom: "none" },
        ...props,
      }}
    >
      <chakra.div
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <chakra.div
          fontFamily={"monospace"}
          fontWeight={600}
          fontSize={"14px"}
          lineHeight={"2.4rem"}
          textDecoration={"underline"}
          textUnderlineOffset={6}
          _hover={{ textDecoration: "none" }}
        >
          {name}
        </chakra.div>
        <chakra.div fontWeight={300} fontSize={"12px"}>
          {required ? (
            <span>
              <chakra.span sx={{ color: "#7646ec", fontSize: "12px" }}>
                required
              </chakra.span>
              , {type}
            </span>
          ) : (
            <p>{type}</p>
          )}
        </chakra.div>
      </chakra.div>
      <chakra.div fontWeight={300} fontSize={"14px"}>
        {description}
      </chakra.div>
    </chakra.tr>
  );
};

const ParamObject = ({ items, ...props }) => {
  const { isOpen, onToggle } = useDisclosure();
  return (
    <chakra.tr
      flexDirection={"column"}
      display={"flex"}
      width={"100%"}
      alignItems={"flex-start"}
      _first={{ borderTop: "none" }}
    >
      <Param {...props} />
      <chakra.button
        className="button button--outline button--primary"
        border={0}
        px={"20px"}
        color={"#555555"}
        pt={0}
        pb={10}
        margin={"0 !important"}
        fontWeight={600}
        fontSize={"12px"}
        transitionDuration={5}
        sx={{
          ":hover": { background: "transparent", color: "#0072cf" },
        }}
        onClick={onToggle}
      >
        {isOpen ? `Hide Object...` : `View Object...`}
      </chakra.button>

      <Collapse in={isOpen} animateOpacity style={{ width: "100% !important" }}>
        <Box width={"100%"} pl={20}>
          {items.map((el, i) => {
            if (el.type === "object" || el.type === "array") {
              return <ParamObject key={i} {...el} />;
            } else {
              return <Param key={i} {...el} />;
            }
          })}
        </Box>
      </Collapse>
    </chakra.tr>
  );
};

export const ParamTable = ({ data }) => {
  return data.length == 0 ? (
    <Text>No parameters</Text>
  ) : (
    <chakra.table border={"2px solid #ededed"} width={"100%"}>
      {data.map((el, i) => {
        if (el.type === "object" || el.type === "[object]") {
          return <ParamObject key={i} {...el} />;
        } else {
          return <Param key={i} {...el} />;
        }
      })}
    </chakra.table>
  );
};
