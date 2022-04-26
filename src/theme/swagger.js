import React, { useState } from "react";
import SwaggerParser from "@apidevtools/swagger-parser";
import { useEffect } from "react";
import swaggerObject from "../../static/data/swagger.json";
import { ParamsAndCodeBlock, ParamsAndResponseBlock } from "./ScrollStack";
import {
  chakra,
  Badge,
  HStack,
  Text,
  Flex,
  Wrap,
  WrapItem,
  Box,
} from "@chakra-ui/react";

const mapSchemaToJson = (schema) => {
  if (!schema) return {};
  const { properties, required, type, description, ...others } = schema;
  const json = {};
  if (schema.additionalProperties) {
    json.items = mapSchemaToJson(schema.additionalProperties);
    json.type = "array";
    json.name = schema.additionalProperties.title;
  } else if (type === "object" && properties) {
    Object.keys(properties).forEach((key) => {
      json[key] = mapSchemaToJson(properties[key]);
    });
    json.type = "object";
  } else if (type === "array") {
    if (schema.items) {
      json.items = mapSchemaToJson(schema.items);
      json.type = "array";
    } else {
      json.items = mapSchemaToJson(properties);
    }
  } else {
    const { allOf } = others;
    json.type = allOf ? "enum" : type;
    json.description = description;
  }
  if (required) {
    json.required = required;
  }
  return json;
};

const getType = (schema) => {
  if (schema.anyOf) {
    const types = schema.anyOf.map((el) => ({
      format: el.format,
      type: el.type,
    }));
    const key = "type";
    const unique_objects = [
      ...new Map(types.map((item) => [item[key], item])).values(),
    ];
    return unique_objects
      .map((el) => {
        if (el.format) return `${el.type}:${el.format}`;
        return el.type;
      })
      .join(",");
  } else if (schema.allOf) {
    console.log("ALL OF", schema.allOf);
  } else if (schema.type) {
    if (schema.format) return `${schema.type}:${schema.format}`;
    return schema.type;
  }
};

const mapParameters = (parameters) => {
  if (!parameters) return [];
  return parameters.map((el) => ({
    name: el.name,
    required: el.required,
    description: el.description,
    type: getType(el.schema),
  }));
};

const mapBody = (body) => {
  if (!body) return [];
  if (body.items) {
    return [
      {
        name: "body",
        type: "[object]",
        items: mapBody(body.items),
      },
    ];
  }
  const data = Object.keys(body)
    .map((el) => {
      if (body[el]?.type == "array") {
        return {
          name: el,
          type: "[object]",
          description: body[el]?.description,
          items: mapBody(body[el].items),
        };
      } else if (body[el]?.type == "object") {
        return {
          name: el,
          type: "object",
          description:
            typeof body[el]?.description === "string"
              ? body[el]?.description
              : "",
          items: mapBody(body[el]),
        };
      } else {
        return {
          name: el,
          type: body[el]?.type,
          description: body[el]?.description,
          required: body?.required?.indexOf(el) > -1,
        };
      }
    })
    .filter((el) => el.name !== "required" && el.name !== "type");
  return data;
};

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
    console.log(schema);
    return [responseSchema?.properties];
  }
  console.log("FAILED", responseSchema);
};

export const Swagger = ({ endpoint, method, title, children }) => {
  const [endpointData, setEndpointData] = useState({ params: [], body: [] });
  const [responseData, setResponseData] = useState({ params: [], body: [] });
  const [responseExample, setResponseExample] = useState("");

  useEffect(() => {
    const parseSwagger = async () => {
      try {
        let api = await SwaggerParser.dereference(swaggerObject);
        // will raise typeerror if it cannot index into api.paths
        const schema = api?.paths[`/v2${endpoint}`][method];
        if (!schema) {
          throw Error(
            "No schema found - please check your endpoint and method"
          );
        }
        if (endpoint == "/user/providers/{user_id}") {
          console.log({ schema, endpoint: `/v2${endpoint}` });
        }

        let requestBody =
          schema.requestBody?.content["application/json"]?.schema;
        if (!requestBody) {
          requestBody = schema;
          console.error("No request body found", endpoint);
        }
        const requestBodyParams = mapSchemaToJson(requestBody);

        const data = {
          description: schema.description
            ? schema.description.replace(method.toUpperCase(), "")
            : "",
          body: mapBody(requestBodyParams),
          params: mapParameters(schema.parameters),
        };
        setEndpointData(data);
        const responseSchema = mapSchemaToJson(
          schema.responses["200"].content["application/json"]?.schema
        );

        const response = {
          body: mapBody(responseSchema),
        };
        setResponseData(response);
        const exampleResponse = getExampleResponse(schema);
        // console.log({ exampleResponse, endpoint: `/v2${endpoint}` });

        setResponseExample(JSON.stringify(exampleResponse, null, 2));
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
        <Text>{endpointData.description}</Text>
      </HStack>
      <chakra.span>
        <chakra.span sx={{ fontWeight: 600 }}>Request fields</chakra.span> and
        example
      </chakra.span>
      <ParamsAndCodeBlock
        title={title}
        params={[...endpointData.params, ...endpointData.body]}
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
        code={responseExample}
      />
    </>
  );
};
