import React from "react"

const fallbackInternals = {
  H: null,
  A: {
    getOwner() {
      return null
    },
  },
  T: null,
  S: null,
  actQueue: null,
  asyncTransitions: 0,
  isBatchingLegacy: false,
  didScheduleLegacyUpdate: false,
  didUsePromise: false,
  thrownErrors: [],
  getCurrentStack() {
    return ""
  },
  recentlyCreatedOwnerStacks: 0,
}

if (!React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE) {
  React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = fallbackInternals
}

if (!React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED) {
  React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED =
    React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE
}

const internals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE
if (internals) {
  if (typeof internals.recentlyCreatedOwnerStacks !== "number") {
    internals.recentlyCreatedOwnerStacks = 0
  }
  if (typeof internals.getCurrentStack !== "function") {
    internals.getCurrentStack = () => ""
  }
  if (!internals.A || typeof internals.A.getOwner !== "function") {
    internals.A = {
      getOwner() {
        return null
      },
    }
  }
}
