/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from "react";
import MDXHead from "@theme/MDXComponents/Head";
import MDXCode from "@theme/MDXComponents/Code";
import MDXA from "@theme/MDXComponents/A";
import MDXPre from "@theme/MDXComponents/Pre";
import MDXDetails from "@theme/MDXComponents/Details";
import MDXHeading from "@theme/MDXComponents/Heading";
import MDXUl from "@theme/MDXComponents/Ul";
import MDXImg from "@theme/MDXComponents/Img";
import { Table, TData, THead, TR, TBody } from "./Table";
import { CodeBlock, MDXCodeBlock } from "../codeblock";

const MDXComponents = {
  head: MDXHead,
  code: CodeBlock,
  a: MDXA,
  pre: MDXCodeBlock,
  details: MDXDetails,
  ul: MDXUl,
  img: MDXImg,
  h1: (props) => <MDXHeading as="h1" style={{ color: "#202d4a" }} {...props} />,
  h2: (props) => (
    <MDXHeading
      as="h2"
      style={{ fontWeight: 300, color: "#202d4a", fontSize: "2rem" }}
      {...props}
    />
  ),
  h3: (props) => <MDXHeading as="h3" {...props} />,
  h4: (props) => <MDXHeading as="h4" {...props} />,
  h5: (props) => <MDXHeading as="h5" {...props} />,
  h6: (props) => <MDXHeading as="h6" {...props} />,
  table: Table,
  th: THead,
  td: TData,
  tr: TR,
  tbody: TBody,
};
export default MDXComponents;
