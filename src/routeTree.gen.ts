/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as PublicLayoutImport } from './routes/_public-layout'
import { Route as AuthLayoutImport } from './routes/_auth-layout'
import { Route as IndexImport } from './routes/index'
import { Route as PublicLayoutSignUpImport } from './routes/_public-layout/sign-up'
import { Route as PublicLayoutSignInImport } from './routes/_public-layout/sign-in'
import { Route as AuthLayoutUserProfileImport } from './routes/_auth-layout/user-profile'

// Create/Update Routes

const PublicLayoutRoute = PublicLayoutImport.update({
  id: '/_public-layout',
  getParentRoute: () => rootRoute,
} as any)

const AuthLayoutRoute = AuthLayoutImport.update({
  id: '/_auth-layout',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const PublicLayoutSignUpRoute = PublicLayoutSignUpImport.update({
  id: '/sign-up',
  path: '/sign-up',
  getParentRoute: () => PublicLayoutRoute,
} as any)

const PublicLayoutSignInRoute = PublicLayoutSignInImport.update({
  id: '/sign-in',
  path: '/sign-in',
  getParentRoute: () => PublicLayoutRoute,
} as any)

const AuthLayoutUserProfileRoute = AuthLayoutUserProfileImport.update({
  id: '/user-profile',
  path: '/user-profile',
  getParentRoute: () => AuthLayoutRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/_auth-layout': {
      id: '/_auth-layout'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthLayoutImport
      parentRoute: typeof rootRoute
    }
    '/_public-layout': {
      id: '/_public-layout'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof PublicLayoutImport
      parentRoute: typeof rootRoute
    }
    '/_auth-layout/user-profile': {
      id: '/_auth-layout/user-profile'
      path: '/user-profile'
      fullPath: '/user-profile'
      preLoaderRoute: typeof AuthLayoutUserProfileImport
      parentRoute: typeof AuthLayoutImport
    }
    '/_public-layout/sign-in': {
      id: '/_public-layout/sign-in'
      path: '/sign-in'
      fullPath: '/sign-in'
      preLoaderRoute: typeof PublicLayoutSignInImport
      parentRoute: typeof PublicLayoutImport
    }
    '/_public-layout/sign-up': {
      id: '/_public-layout/sign-up'
      path: '/sign-up'
      fullPath: '/sign-up'
      preLoaderRoute: typeof PublicLayoutSignUpImport
      parentRoute: typeof PublicLayoutImport
    }
  }
}

// Create and export the route tree

interface AuthLayoutRouteChildren {
  AuthLayoutUserProfileRoute: typeof AuthLayoutUserProfileRoute
}

const AuthLayoutRouteChildren: AuthLayoutRouteChildren = {
  AuthLayoutUserProfileRoute: AuthLayoutUserProfileRoute,
}

const AuthLayoutRouteWithChildren = AuthLayoutRoute._addFileChildren(
  AuthLayoutRouteChildren,
)

interface PublicLayoutRouteChildren {
  PublicLayoutSignInRoute: typeof PublicLayoutSignInRoute
  PublicLayoutSignUpRoute: typeof PublicLayoutSignUpRoute
}

const PublicLayoutRouteChildren: PublicLayoutRouteChildren = {
  PublicLayoutSignInRoute: PublicLayoutSignInRoute,
  PublicLayoutSignUpRoute: PublicLayoutSignUpRoute,
}

const PublicLayoutRouteWithChildren = PublicLayoutRoute._addFileChildren(
  PublicLayoutRouteChildren,
)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '': typeof PublicLayoutRouteWithChildren
  '/user-profile': typeof AuthLayoutUserProfileRoute
  '/sign-in': typeof PublicLayoutSignInRoute
  '/sign-up': typeof PublicLayoutSignUpRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '': typeof PublicLayoutRouteWithChildren
  '/user-profile': typeof AuthLayoutUserProfileRoute
  '/sign-in': typeof PublicLayoutSignInRoute
  '/sign-up': typeof PublicLayoutSignUpRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/_auth-layout': typeof AuthLayoutRouteWithChildren
  '/_public-layout': typeof PublicLayoutRouteWithChildren
  '/_auth-layout/user-profile': typeof AuthLayoutUserProfileRoute
  '/_public-layout/sign-in': typeof PublicLayoutSignInRoute
  '/_public-layout/sign-up': typeof PublicLayoutSignUpRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '' | '/user-profile' | '/sign-in' | '/sign-up'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '' | '/user-profile' | '/sign-in' | '/sign-up'
  id:
    | '__root__'
    | '/'
    | '/_auth-layout'
    | '/_public-layout'
    | '/_auth-layout/user-profile'
    | '/_public-layout/sign-in'
    | '/_public-layout/sign-up'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  AuthLayoutRoute: typeof AuthLayoutRouteWithChildren
  PublicLayoutRoute: typeof PublicLayoutRouteWithChildren
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AuthLayoutRoute: AuthLayoutRouteWithChildren,
  PublicLayoutRoute: PublicLayoutRouteWithChildren,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/_auth-layout",
        "/_public-layout"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/_auth-layout": {
      "filePath": "_auth-layout.tsx",
      "children": [
        "/_auth-layout/user-profile"
      ]
    },
    "/_public-layout": {
      "filePath": "_public-layout.tsx",
      "children": [
        "/_public-layout/sign-in",
        "/_public-layout/sign-up"
      ]
    },
    "/_auth-layout/user-profile": {
      "filePath": "_auth-layout/user-profile.tsx",
      "parent": "/_auth-layout"
    },
    "/_public-layout/sign-in": {
      "filePath": "_public-layout/sign-in.tsx",
      "parent": "/_public-layout"
    },
    "/_public-layout/sign-up": {
      "filePath": "_public-layout/sign-up.tsx",
      "parent": "/_public-layout"
    }
  }
}
ROUTE_MANIFEST_END */
