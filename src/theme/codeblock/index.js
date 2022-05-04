import React, { useState } from "react";
import { PrismAsyncLight as SyntaxHighlighter } from "react-syntax-highlighter";
import style from "react-syntax-highlighter/dist/cjs/styles/prism/atom-dark";
import lightStyle from "react-syntax-highlighter/dist/cjs/styles/prism/duotone-light";
import {
  VStack,
  Box,
  HStack,
  Image,
  Flex,
  Button,
  Spacer,
  chakra,
} from "@chakra-ui/react";
import { CopyIcon, CheckIcon } from "@chakra-ui/icons";
import useGlobalData from "@docusaurus/useGlobalData";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function mapLanugageToLabel(string) {
  const map = {
    js: "node",
    bash: "shell",
    python: "python",
  };
  return map[string] ? map[string] : string;
}

export const CodeResponse = ({ language, code }) => {
  return <Code code={code} language={lanaguage} response />;
};

export const Code = ({ language, code, response, bgColor }) => {
  return (
    <SyntaxHighlighter
      customStyle={{
        lineHeight: "1.3",
        fontSize: "13px",
        width: "100%",
        backgroundColor: response ? "#f7fafc" : bgColor ? bgColor : "#212d63",
        margin: 0,
      }}
      codeTagProps={{
        style: {
          lineHeight: "inherit",
          fontSize: "inherit",
        },
      }}
      showLineNumbers={true}
      language={language}
      style={{
        ...(response ? lightStyle : style),
        width: "100%",
        paddingTop: 0,
        margin: 0,
        background: response ? "#e3e8ee" : bgColor ? bgColor : "#212d63",
      }}
    >
      {code}
    </SyntaxHighlighter>
  );
};

const getCodeJson = (markdownNode) => {
  if (Array.isArray(markdownNode)) {
    return markdownNode.map((el) => {
      const match = /language-(\w+)/.exec(
        el.props.children.props.className || ""
      );
      return {
        language: match[1],
        code: el.props.children.props.children,
      };
    });
  } else if (markdownNode.props.children.props) {
    const match = /language-(\w+)/.exec(
      markdownNode.props.children.props.className || ""
    );
    return [
      { language: match[1], code: markdownNode.props.children.props.children },
    ];
  } else {
    const match = /language-(\w+)/.exec(markdownNode.props.className || "");
    return [{ language: match[1], code: markdownNode.props.children }];
  }
};

const injectVariables = (code, region) => {
  const urls = {
    eu: "https://api.eu.tryvital.io",
    us: "https://api.tryvital.io",
  };
  return code
    .replace("{{BASE_URL}}", urls[region])
    .replace("{{REGION}}", `"${region}"`);
};

const addInstantiationCode = (code, language, include_client_instantiation) => {
  if (!include_client_instantiation) return code;
  const initCode = {
    js: `const { VitalClient } = require("Vital");

const client = new VitalClient({
  api_key: <API_KEY>,
  environment: "sandbox",
  region: {{REGION}}
});

`,
    python: `from vital import Client

client = Client(
  api_key=<API_KEY>,
  environment="sandbox",
  region={{REGION}}
)

`,
  };
  return initCode[language] ? initCode[language] + code : code;
};

export const CodeBlock = ({
  title,
  children,
  include_client_instantiation,
  response,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isCopied, setCopied] = useState(false);
  const [region, setRegion] = useState("us");

  const codeJson = getCodeJson(children);
  const codeWithInstantiation = addInstantiationCode(
    codeJson[activeIndex].code,
    codeJson[activeIndex].language,
    include_client_instantiation
  );
  const selectedCode = injectVariables(codeWithInstantiation, region);
  const handleCopied = () => {
    setTimeout(() => {
      setCopied(true);
    }, 100);
    navigator.clipboard.writeText(selectedCode);
    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };
  const codeBgPrimary = "#1A2652";
  const codeBgSecondary = null;
  return (
    <VStack
      borderRadius={3}
      alignItems={"flex-start"}
      background={response ? "rgb(229, 232, 247)" : codeBgPrimary}
      width={"100%"}
    >
      <HStack width={"100%"} justifyContent="space-between">
        <HStack pl={10}>
          <chakra.select
            onChange={(e) => setRegion(e.target.value)}
            bg={codeBgPrimary}
            color={"white"}
            borderColor={codeBgPrimary}
            fontSize={"15px"}
            fontWeight={600}
            sx={{ _hover: { cursor: "pointer" }, textAlign: "left" }}
          >
            <option value={"us"}>🇺🇸</option>
            <option value={"eu"} color={"white"}>
              🇪🇺
            </option>
          </chakra.select>
          <chakra.div
            py="5px"
            color={response ? "#4f566b" : "#ADADAD"}
            fontSize={"12px"}
            fontWeight={400}
          >
            {title}
          </chakra.div>
        </HStack>

        {!response && (
          <HStack>
            <chakra.select
              onChange={(e) => setActiveIndex(e.target.value)}
              bg={codeBgPrimary}
              color={"white"}
              borderColor={codeBgPrimary}
              fontSize={"12px"}
              fontWeight={600}
              sx={{ _hover: { cursor: "pointer" }, textAlign: "right" }}
            >
              {codeJson.map((el, i) => (
                <option key={i} value={i} color={"white"}>
                  {capitalizeFirstLetter(mapLanugageToLabel(el.language))}
                </option>
              ))}
            </chakra.select>

            <Box borderLeft={"1px solid gray"}>
              <chakra.button
                className="button button--outline button--primary"
                border={0}
                px={"10px"}
                py={"3px"}
                transitionDuration={5}
                sx={{
                  ":hover": { background: "transparent", color: "white" },
                }}
                onClick={handleCopied}
              >
                {isCopied ? (
                  <CheckIcon
                    size={20}
                    color={"#7DABF8"}
                    sx={{
                      ":hover": { background: "transparent", color: "white" },
                    }}
                  />
                ) : (
                  <CopyIcon
                    size={20}
                    color={"white"}
                    sx={{
                      ":hover": { background: "transparent", color: "white" },
                    }}
                  />
                )}
              </chakra.button>
            </Box>
          </HStack>
        )}
      </HStack>
      <Code
        language={codeJson[activeIndex].language}
        code={selectedCode}
        response={response}
        bgColor={codeBgSecondary}
      />
    </VStack>
  );
};

export const ResponseBlock = ({ title, code }) => {
  return (
    <VStack
      borderRadius={3}
      alignItems={"flex-start"}
      background={"#E3E8EE"}
      width={"100%"}
    >
      <HStack width={"100%"} justifyContent="space-between">
        <HStack pl={10}>
          <chakra.div
            py="5px"
            color={"#4f566b"}
            fontSize={"12px"}
            fontWeight={400}
          >
            {title}
          </chakra.div>
        </HStack>
      </HStack>
      <Code language={"json"} code={code} response={true} />
    </VStack>
  );
};

export const MDXCodeBlock = ({ children }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isCopied, setCopied] = useState(false);

  const codeJson = getCodeJson(children);
  const selectedCode = injectVariables(codeJson[activeIndex].code, "us");

  const handleCopied = () => {
    setTimeout(() => {
      setCopied(true);
    }, 100);
    navigator.clipboard.writeText(selectedCode);
    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  return (
    <VStack
      borderRadius={3}
      alignItems={"flex-start"}
      background={"#1A2652"}
      width={"100%"}
    >
      <HStack width={"100%"} justifyContent="space-between">
        <Spacer />
        <HStack>
          <chakra.select
            onChange={(e) => setActiveIndex(e.target.value)}
            bg={"#1A2652"}
            color={"white"}
            borderColor="#1A2652"
            fontSize={"12px"}
            fontWeight={600}
            sx={{ _hover: { cursor: "pointer" }, textAlign: "right" }}
          >
            {codeJson.map((el, i) => (
              <option key={i} value={i} color={"white"}>
                {capitalizeFirstLetter(el.language)}
              </option>
            ))}
          </chakra.select>

          <Box borderLeft={"1px solid gray"}>
            <chakra.button
              className="button button--outline button--primary"
              border={0}
              px={"10px"}
              py={"3px"}
              transitionDuration={5}
              sx={{
                ":hover": { background: "transparent", color: "white" },
              }}
              onClick={handleCopied}
            >
              {isCopied ? (
                <CheckIcon
                  size={20}
                  color={"#7DABF8"}
                  sx={{
                    ":hover": { background: "transparent", color: "white" },
                  }}
                />
              ) : (
                <CopyIcon
                  size={20}
                  color={"white"}
                  sx={{
                    ":hover": { background: "transparent", color: "white" },
                  }}
                />
              )}
            </chakra.button>
          </Box>
        </HStack>
      </HStack>
      <Code
        language={codeJson[activeIndex].language}
        code={selectedCode}
        response={false}
      />
    </VStack>
  );
};
