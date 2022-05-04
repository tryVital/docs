import React, { useState, version } from "react";
import SwaggerParser from "@apidevtools/swagger-parser";
import { useEffect } from "react";
import swaggerObject from "../../static/data/swagger.json";
import { ParamsAndCodeBlock, ParamsAndResponseBlock } from "./ScrollStack";
import { chakra, Badge, HStack, Text } from "@chakra-ui/react";
import Examples from "../data/examplesOverride";
import {
  mapBody,
  mapSchemaToJson,
  mapParameters,
} from "../lib/CustomSwaggerParser";

const getExampleResponse = (schema) => {
  const responseSchema =
    schema.responses["200"].content["application/json"]?.schema;
  if (responseSchema.example) {
    return responseSchema.example;
  } else if (responseSchema.items) {
    return [responseSchema.items.example];
  } else if (responseSchema.additionalProperties) {
    return [responseSchema.additionalProperties.items.example];
  } else if (responseSchema?.properties) {
    return [responseSchema?.properties];
  }
  console.log("Failed to get example", responseSchema);
  return "";
};

const applyOverrides = (endpoint, exampleResponse) => {
  return Examples[endpoint]
    ? JSON.stringify(Examples[endpoint], null, 2)
    : JSON.stringify(exampleResponse, null, 2);
};

const getRequestBodyData = (endpoint, schema, method) => {
  let requestBody = schema.requestBody?.content["application/json"]?.schema;
  if (!requestBody) {
    requestBody = schema;
    console.warn("No request body found", { endpoint, schema });
  }

  const requestBodyParams = mapSchemaToJson(requestBody);
  return {
    description: schema.description
      ? schema.description.replace(method.toUpperCase(), "")
      : "",
    body: mapBody(requestBodyParams),
    params: mapParameters(schema.parameters),
  };
};

const getEndpointSchema = async (endpoint, method) => {
  let api = await SwaggerParser.dereference(swaggerObject);
  // will raise typeerror if it cannot index into api.paths
  const schema = api?.paths[endpoint][method];
  if (!schema) {
    throw Error("No schema found - please check your endpoint and method");
  }
  return schema;
};

const getResponseData = (endpoint, schema) => {
  const responseSchema = mapSchemaToJson(
    schema.responses["200"].content["application/json"]?.schema
  );
  return {
    body: mapBody(responseSchema),
    example: applyOverrides(endpoint, getExampleResponse(schema)),
  };
};

export const Swagger = ({
  endpoint,
  method,
  title,
  children,
  include_client_instantiation,
}) => {
  const [requestData, setRequestData] = useState({ params: [], body: [] });
  const [responseData, setResponseData] = useState({ params: [], body: [] });

  useEffect(() => {
    const parseSwagger = async () => {
      try {
        const version = "v2";
        const fullEndpoint = `/${version}${endpoint}`;
        const schema = await getEndpointSchema(fullEndpoint, method);
        const request = getRequestBodyData(fullEndpoint, schema, method);
        const response = getResponseData(fullEndpoint, schema);
        setRequestData(request);
        setResponseData(response);
      } catch (err) {
        console.error(err);
      }
    };
    parseSwagger();
  }, []);

  const colorMap = {
    POST: "#0272d9",
    GET: "#0E9B71",
    DELETE: "#C71B29",
  };

  return (
    <>
      <HStack>
        <Badge
          sx={{
            textTransform: "uppercase",
            bg: colorMap[method.toUpperCase()],
            px: "10px",
            fontSize: "12px",
            color: "white",
            borderRadius: 20,
            fontWeight: 600,
          }}
        >
          {method}
        </Badge>
        <chakra.h3 fontFamily={"monospace"}>{`/v2${endpoint}`}</chakra.h3>
      </HStack>

      <HStack mt={20}>
        <Text>{requestData.description}</Text>
      </HStack>
      <chakra.span>
        <chakra.span sx={{ fontWeight: 600 }}>Request fields</chakra.span> and
        example
      </chakra.span>
      <ParamsAndCodeBlock
        title={title}
        params={[...requestData.params, ...requestData.body]}
        include_client_instantiation={include_client_instantiation}
      >
        {children}
      </ParamsAndCodeBlock>

      <chakra.span>
        <chakra.span sx={{ fontWeight: 600 }}>Response fields</chakra.span> and
        example
      </chakra.span>
      <ParamsAndResponseBlock
        params={responseData.body}
        title={"Response"}
        code={responseData.example}
      />
    </>
  );
};
