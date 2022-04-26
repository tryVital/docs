import React, { useState } from "react";
import { Box, VStack, HStack, Flex } from "@chakra-ui/react";
import { CodeBlock, ResponseBlock } from "../codeblock";
import { ParamTable } from "../param";
import { useMediaQuery } from "@chakra-ui/react";

export const ScrollStack = ({ children }) => {
  const [isLargerThan1280] = useMediaQuery("(min-width: 960px)");
  if (isLargerThan1280) {
    return (
      <VStack width={"100%"} alignItems={"flex-start"} py={10} wrap={"wrap"}>
        <HStack spacing={10} width={"100%"} alignItems={"flex-start"}>
          {children}
        </HStack>
      </VStack>
    );
  } else {
    return (
      <Box spacing={10} width={"100%"} alignItems={"flex-start"}>
        {children}
      </Box>
    );
  }
};

export const ParamsAndCodeBlock = ({ title, params, children }) => {
  const [isLargerThan1280] = useMediaQuery("(min-width: 960px)");
  return (
    <ScrollStack>
      <Flex
        width={isLargerThan1280 ? "40%" : "100%"}
        sx={{
          position: "sticky",
          top: "75px",
        }}
      >
        <ParamTable data={params} width={"100%"} />
      </Flex>
      <Flex
        width={isLargerThan1280 ? "60%" : "100%"}
        sx={{
          position: "sticky",
          top: "75px",
          display: "block",
        }}
      >
        <CodeBlock title={title}>{children}</CodeBlock>
      </Flex>
    </ScrollStack>
  );
};

export const ParamsAndResponseBlock = ({ title, params, code }) => {
  const [isLargerThan1280] = useMediaQuery("(min-width: 960px)");

  return (
    <ScrollStack>
      <Flex
        width={isLargerThan1280 ? "40%" : "100%"}
        sx={{
          position: "sticky",
          top: "75px",
        }}
      >
        <ParamTable data={params} width={"100%"} />
      </Flex>
      <Flex
        width={isLargerThan1280 ? "60%" : "100%"}
        sx={{
          position: "sticky",
          top: "75px",
          display: "block",
        }}
      >
        <ResponseBlock title={title} code={code} />
      </Flex>
    </ScrollStack>
  );
};
