import React, { useState } from "react";
import { Box, VStack, HStack, Flex } from "@chakra-ui/react";
import { CodeBlock, ResponseBlock } from "../codeblock";
import { ParamTable } from "../param";
import { useMediaQuery } from "@chakra-ui/react";

export const ScrollStack = ({ children }) => {
  const [isLargerThan1280] = useMediaQuery("(min-width: 960px)");
  if (isLargerThan1280) {
    return (
      <VStack
        width={"100%"}
        alignItems={"flex-start"}
        spacing={0}
        wrap={"wrap"}
      >
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

export const ParamsAndCodeBlock = ({
  title,
  params,
  children,
  include_client_instantiation,
}) => {
  const [isLargerThan1280] = useMediaQuery("(min-width: 960px)");
  const position = isLargerThan1280 ? "sticky" : "auto";
  const top = isLargerThan1280 ? "75px" : null;

  return (
    <ScrollStack>
      <Flex
        width={isLargerThan1280 ? "40%" : "100%"}
        sx={{
          position,
          top,
        }}
      >
        <ParamTable data={params} width={"100%"} />
      </Flex>
      <Flex
        width={isLargerThan1280 ? "60%" : "100%"}
        sx={{
          position,
          top,
          display: "block",
        }}
      >
        <CodeBlock
          title={title}
          include_client_instantiation={include_client_instantiation}
        >
          {children}
        </CodeBlock>
      </Flex>
    </ScrollStack>
  );
};

export const ParamsAndResponseBlock = ({ title, params, code }) => {
  const [isLargerThan1280] = useMediaQuery("(min-width: 960px)");
  const position = isLargerThan1280 ? "sticky" : "auto";
  const top = isLargerThan1280 ? "75px" : null;
  return (
    <ScrollStack>
      <Flex
        width={isLargerThan1280 ? "40%" : "100%"}
        sx={{
          position,
          top,
        }}
      >
        <ParamTable data={params} width={"100%"} />
      </Flex>
      <Flex
        width={isLargerThan1280 ? "60%" : "100%"}
        sx={{
          position,
          top,
          display: "block",
        }}
      >
        <ResponseBlock title={title} code={code} />
      </Flex>
    </ScrollStack>
  );
};
