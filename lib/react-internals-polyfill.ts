import React from "react"

const fallbackInternals = {
  H: null as unknown,
  A: {
    getOwner: () => null,
  },
  T: null as unknown,
  S: null as unknown,
  actQueue: null as unknown,
  asyncTransitions: 0,
  isBatchingLegacy: false,
  didScheduleLegacyUpdate: false,
  didUsePromise: false,
  thrownErrors: [] as unknown[],
  getCurrentStack: () => "",
  recentlyCreatedOwnerStacks: 0,
}

const reactAny = React as unknown as {
  __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED?: typeof fallbackInternals
  __CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE?: typeof fallbackInternals
}

if (!reactAny.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE) {
  reactAny.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = {
    ...fallbackInternals,
  }
}

if (!reactAny.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED) {
  reactAny.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED =
    reactAny.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE
}

const internals = reactAny.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE
if (internals) {
  if (typeof internals.recentlyCreatedOwnerStacks !== "number") {
    internals.recentlyCreatedOwnerStacks = 0
  }
  if (typeof internals.getCurrentStack !== "function") {
    internals.getCurrentStack = () => ""
  }
  if (!internals.A || typeof internals.A.getOwner !== "function") {
    internals.A = {
      getOwner: () => null,
    }
  }
}
