# @gvray/domkit

## 1.4.0

### Minor Changes

- add new function

### Patch Changes

- Updated dependencies
- Updated dependencies
  - @gvray/eskit@1.6.0

## 1.3.0

### Minor Changes

- feat: add common admin and formatting utilities
  - `@gvray/formatkit`: add `formatUptime`, `formatJson`, `getAvatarInitial`, `caseInsensitiveIncludes`, `formatPercentValue`
  - `@gvray/eskit`: add `arraysEqual`, `arraysEqualIgnoreOrder`, `toggleArrayItem`, `excludeByKey`, `caseInsensitiveFilter`, `shallowMerge`
  - `@gvray/datekit`: add `formatDateRange`
  - `@gvray/adminkit`: add `normalizeListResponse`, `extractListData`, `parsePermissionCode`, `getPermissionAction`, `hasPermissions`, `createRoutePattern`, `matchRoutePath`, `getParentPaths`
  - `@gvray/domkit`: `toggleClass` now accepts optional `force` parameter

- 6e12443: feat: enhance `injectStyle` with `{ media }` option and a dispose return value; split `removeStyle` into its own module for consistent project style

### Patch Changes

- Updated dependencies
  - @gvray/eskit@1.5.0

## 1.3.0

### Minor Changes

- feat: add `injectStyle` and `removeStyle` for id-based `<style>` element management

### Patch Changes

- refactor: split `injectStyle` and `removeStyle` into separate modules for consistent style
- feat: `injectStyle` now accepts a `{ media }` option and returns a dispose function

## 1.2.0

### Minor Changes

- refactor build with swiftlet

### Patch Changes

- Updated dependencies
  - @gvray/eskit@1.4.0

## 1.1.1

### Patch Changes

- build: auto clean before build and disable sourcemap
- Updated dependencies
  - @gvray/eskit@1.3.1

## 1.1.0

### Minor Changes

- Add funtions

### Patch Changes

- Updated dependencies
  - @gvray/eskit@1.3.0

## 1.0.5

### Patch Changes

- Updated dependencies
  - @gvray/eskit@1.2.0

## 1.0.4

### Patch Changes

- Updated dependencies
  - @gvray/eskit@1.1.1

## 1.0.3

### Patch Changes

- Updated dependencies
  - @gvray/eskit@1.1.0

## 1.0.2

### Patch Changes

- Updated dependencies
  - @gvray/eskit@1.0.2

## 1.0.1

### Patch Changes

- 36de24b: First official release.
- Updated dependencies [36de24b]
  - @gvray/eskit@1.0.1
