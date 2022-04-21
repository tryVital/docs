import React, { useState } from "react";
import { chakra, VStack, HStack, Flex } from "@chakra-ui/react";
import { CodeBlock, ResponseBlock } from "../codeblock";
import { ParamTable } from "../param";

export const ScrollStack = ({ children }) => {
  return (
    <VStack width={"100%"} alignItems={"flex-start"} py={10}>
      <HStack spacing={10} width={"100%"} alignItems={"flex-start"}>
        {children}
      </HStack>
      ;
    </VStack>
  );
};

export const ParamsAndCodeBlock = ({ title, params, children }) => {
  return (
    <ScrollStack>
      <Flex
        width={"50%"}
        sx={{
          position: "sticky",
          top: "75px",
        }}
      >
        <ParamTable data={params} width={"100%"} />
      </Flex>
      <Flex
        width={"50%"}
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
  return (
    <ScrollStack>
      <Flex
        width={"50%"}
        sx={{
          position: "sticky",
          top: "75px",
        }}
      >
        <ParamTable data={params} width={"100%"} />
      </Flex>
      <Flex
        width={"50%"}
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
