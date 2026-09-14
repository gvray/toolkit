# @gvray/eskit

## 1.6.0

### Minor Changes

- Add safe variants and extend relative-time helpers across kits:
  - **eskit**: `safeJsonParse(value, fallback?)` — parse JSON without throwing, return fallback on failure or non-string input.
  - **datekit**: `formatDateTime(value, options?)` — locale-aware Intl formatting with `dateStyle`/`timeStyle` and fallback. `timeAgo`/`timeTo` now accept `Date | string | number | null | undefined` and return `options.fallback` (default `''`) on nullish/invalid input instead of producing `NaN` strings.
  - **mathkit**: `safePercentage(part, total, fallback?)` — like `percentage` but returns `fallback` (default `0`) when `total <= 0` or inputs are non-finite, instead of throwing.

  Extracted from gvray-vite's `utils/` so the gvray apps can consume the kit directly instead of hand-rolling defensive wrappers per app.

- add new function

## 1.5.0

### Minor Changes

- feat: add common admin and formatting utilities
  - `@gvray/formatkit`: add `formatUptime`, `formatJson`, `getAvatarInitial`, `caseInsensitiveIncludes`, `formatPercentValue`
  - `@gvray/eskit`: add `arraysEqual`, `arraysEqualIgnoreOrder`, `toggleArrayItem`, `excludeByKey`, `caseInsensitiveFilter`, `shallowMerge`
  - `@gvray/datekit`: add `formatDateRange`
  - `@gvray/adminkit`: add `normalizeListResponse`, `extractListData`, `parsePermissionCode`, `getPermissionAction`, `hasPermissions`, `createRoutePattern`, `matchRoutePath`, `getParentPaths`
  - `@gvray/domkit`: `toggleClass` now accepts optional `force` parameter

## 1.4.0

### Minor Changes

- refactor build with swiftlet

## 1.3.1

### Patch Changes

- build: auto clean before build and disable sourcemap

## 1.3.0

### Minor Changes

- Add funtions

## 1.2.0

### Minor Changes

- Add walkTree

## 1.1.1

### Patch Changes

- Add map tree export

## 1.1.0

### Minor Changes

- Add mapTree

## 1.0.2

### Patch Changes

- Update treeTolist and listTotree

## 1.0.1

### Patch Changes

- 36de24b: First official release.
