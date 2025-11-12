import "./lib/react-internals-polyfill.mjs"
import { defineDocumentType, makeSource } from "contentlayer/source-files"

/** @type {import('contentlayer/source-files').ComputedFields} */
const computedFields = {
  slug: {
    type: "string",
    resolve: (doc) => `/${doc._raw.flattenedPath}`,
  },
  slugAsParams: {
    type: "string",
    resolve: (doc) => doc._raw.flattenedPath.split("/").slice(1).join("/"),
  },
}

export const Page = defineDocumentType(() => ({
  name: "Page",
  filePathPattern: `pages/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
    },
    tag: {
      type: "string",
    },
    language: {
      type: "string",
    },
  },
  computedFields,
}))

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `posts/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
    },
    tag: {
      type: "string",
    },
    language: {
      type: "string",
    },
    date: {
      type: "date",
      required: true,
    },
    image: {
      type: "string",
    },
  },
  computedFields,
}))

export default makeSource({
  contentDirPath: "./content",
  documentTypes: [Post, Page],
  mdx: {
    esbuildOptions(options) {
      options.jsxDev = false
      const patch = `var React = typeof React !== "undefined" ? React : require("react");
if (!React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE) {
  React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = {
    H: null,
    A: { getOwner: function () { return null; } },
    T: null,
    S: null,
    actQueue: null,
    asyncTransitions: 0,
    isBatchingLegacy: false,
    didScheduleLegacyUpdate: false,
    didUsePromise: false,
    thrownErrors: [],
    getCurrentStack: function () { return ""; },
    recentlyCreatedOwnerStacks: 0,
  };
}
if (!React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED) {
  React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
}
var __internals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
if (__internals) {
  if (typeof __internals.recentlyCreatedOwnerStacks !== "number") {
    __internals.recentlyCreatedOwnerStacks = 0;
  }
  if (typeof __internals.getCurrentStack !== "function") {
    __internals.getCurrentStack = function () { return ""; };
  }
  if (!__internals.A || typeof __internals.A.getOwner !== "function") {
    __internals.A = { getOwner: function () { return null; } };
  }
}
`
      options.banner = options.banner || {}
      options.banner.js = options.banner.js
        ? `${patch}
${options.banner.js}`
        : patch
      return options
    },
  },
})
