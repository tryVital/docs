export const mapSchemaToJson = (schema) => {
  if (!schema) return {};
  const { properties, required, type, description, deprecated, ...others } =
    schema;
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
  json.deprecated = deprecated ? true : false;
  return json;
};

export const getType = (schema) => {
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
  } else if (schema.type) {
    if (schema.format) return `${schema.type}:${schema.format}`;
    return schema.type;
  }
};

export const mapParameters = (parameters) => {
  if (!parameters) return [];
  return parameters.map((el) => ({
    name: el.name,
    required: el.required,
    description: el.description,
    type: getType(el.schema),
  }));
};

export const mapBody = (body) => {
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
          deprecated: body[el]?.deprecated ? true : false,
        };
      }
    })
    .filter(
      (el) =>
        el.name !== "required" &&
        el.name !== "type" &&
        el.name !== "deprecated" &&
        el.name !== "description"
    );
  return data;
};
