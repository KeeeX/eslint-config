# Changelog

## v2.5.5 2025-04-29 12:01:30 +0200

### Fixed

- [#47] Fixed mocha compatibility

### Security

- Update

## v2.5.4 2025-04-28 17:38:00 +0200

### Security

- Update

## v2.5.3 2025-04-10 13:54:25 +0200

### Fixed

- [#46] Broken CLI call for setup

## v2.5.2 2025-04-09 15:33:00 +0200

### Changed

- [#44] Removed annoying rules
- [#43] Relaxed tests rules

### Fixed

- [#45] Fixed conflict between prettier and eslint
- Fixed react config not applying to node files
- Removed old config

### Security

- Update

## v2.5.1 2025-03-27 14:51:05 +0100

### Changed

- Made NPM output to terminal instead of being silent

### Fixed

- Fixed tests not having globals in webservice environment

## v2.5.0 2025-03-21 15:31:23 +0100

### Added

- Allow customizing setup CLI

### Security

- Update

## v2.4.2 2025-03-17 10:32:21 +0100

### Security

- Update

## v2.4.1 2025-02-20 16:14:01 +0100

### Security

- Update

## v2.4.0 2025-02-19 10:38:53 +0100

### Changed

- [#36] Relaxed some rules for testing
- Package exports

### Fixed

- [#42] Fixed markdown formatting issue with prettier

### Security

- Update

## v2.3.0 2025-02-11 15:13:17 +0100

### Added

- [#39] Added weblibrary environment setting

### Changed

- [#40] Added some prompts to kxeslint-setup

### Fixed

- [#41] Detect incorrect package type

### Security

- Update

## v2.2.5 2025-01-03 16:43:57 +0100

### Changed

- [#38] "react/jsx-runtime" not enabled by default in React enabled projects

### Security

- Update

## v2.2.4 2025-01-03 14:26:01 +0100

### Changed

- Revert "[fix #32] Changed jsx-no-leaked-render config"

## v2.2.3 2024-12-13 14:52:59 +0100

### Changed

- [#35] Updated config for sort-keys regarding computed key names

### Fixed

- [#37] Providing directories for different environments was broken

### Security

- Update

## v2.2.2 2024-11-26 17:01:57 +0100

### Fixed

- [#34] Fixed mocha environments

### Security

- Update

## v2.2.1 2024-11-21 13:30:52 +0100

### Changed

- [#33] Added root of project as node environment for library preset
- [#32] Changed jsx-no-leaked-render config

### Security

- Update

## v2.2.0 2024-11-15 13:57:59 +0100

### Added

- [#21] Added support for "environment" directories

### Removed

- [#31] Removed "full" check mechanism

### Security

- Update

## v2.1.4 2024-11-06 18:04:04 +0100

### Changed

- [#28] Removed `prefer-arrow-callback` from mocha test files
- [#27] Removed deconstruction rule
- More tuning for mocha

### Security

- Update

## v2.1.3 2024-10-24 17:26:53 +0200

### Added

- Added full parameter in config object

### Changed

- [#23] Non-filtered default "globals" entry not mandatory

### Removed

- [#22] Removed react-native plugins

### Fixed

- Added missing react-native from removed dependencies
- Fixed mishandled old dependency in setup script
- [#25] Automatically install import-x
- [#24] Fixed config object for React
- [#26] Fixed react-hooks plugin

### Security

- Update

## v2.1.2 2024-10-22 18:13:07 +0200

### Fixed

- [#20] Fixed some costly rules, added full check env var
- Fixed error with no-empty

## v2.1.1 2024-10-22 16:01:16 +0200

### Fixed

- Missing config file in package

## v2.1.0 2024-10-22 15:41:44 +0200

### Added

- [#18] Added prettier

### Fixed

- [#19] Added name to all eslint config sections
- Better handling of .cjs files
- Added a check for TypeScript
- Fixed dependency issue

### Security

- Update

## v2.0.2 2024-10-18 16:09:59 +0200

### Fixed

- Fixed no-cycle rule

## v2.0.1 2024-10-18 13:48:11 +0200

### Fixed

- Fixed error with import config at 0 cycle depth

## v2.0.0 2024-10-17 17:17:18 +0200

This major version changed some config and removed some styling configuration. This is a temporary
solution that will require using prettier later on.

### Changed

- Automatic dependencies and setup script renamed to `kxeslint-setup`
- Updated list of removed dependencies
- [#15] Migration to eslint@9 with flat config

### Fixed

- Automatic setup now uses `--force` for package removal/installation
- [#14] Ignore some stuff in test files

### Security

- Update

## v1.12.6 2024-07-25 16:26:28 +0200

### Fixed

- [#13] Failure to install dependency returns exit code 1

### Security

- Update

## v1.12.5 2024-06-03 16:16:27 +0200

### Fixed

- Updated dependency

## v1.12.4 2024-02-29 15:35:59 +0100

### Changed

- [#12] Remove `defaultProps` for JSX

### Security

- Update

## v1.12.3 2024-02-22 10:56:10 +0100

### Added

- Changelog

## v1.12.2 2024-02-22 10:54:07 +0100

### Added

- [#10] Package check for itself when doing dependency check

### Changed

- [#7] Disable `no-invalid-this` for Mocha tests
- Disable `no-invalid-this` for TypeScript projects

### Fixed

- [#11] Fixed typo in old dependency check

## v1.12.1 2024-02-21 17:56:54 +0100

### Changed

- README

## v1.12.0 2024-02-21 17:51:02 +0100

### Added

- [#9] Added `eslint-depcheck` tool

### Changed

- [#5] Replaced "eslint-plugin-import" with "eslint-plugin-i"
- [#7] Disable `func-names` for test units

### Removed

- [#8] Removed chai support

### Fixed

- [#6] Disable `react/sort-comp` with TypeScript

### Security

- Update

## v1.11.6 2024-02-19 10:23:31 +0100

### Security

- Update

## v1.11.5 2023-09-15 17:53:34 +0200

### Changed

- Dependency to eslint-plugin-deprecation 2.x

### Fixed

- Self eslint config require

## v1.11.4 2023-07-22 13:43:19 +0200

### Fixed

- Updated TS rules

## v1.11.3 2023-07-22 13:24:04 +0200

### Fixed

- Peer dependency versions were badly specified

## v1.11.2 2023-07-22 13:18:06 +0200

### Security

- Update

## v1.11.1 2023-07-03 11:25:46 +0200

### Fixed

- License and deploy file minor fix

### Security

- Update

## v1.11.0 2023-06-19 11:18:03 +0200

### Added

- Rule for delimiter in interface definition

## v1.10.1 2023-05-17 17:51:58 +0200

### Changed

- Relaxed type alias rule for conditional types

## v1.10.0 2023-05-11 17:35:55 +0200

### Added

- [#2] Uses `eslint-plugin-tsdoc` for TypeScript projects

### Security

- Update

## v1.9.3 2023-02-06 13:04:56 +0100

### Fixed

- indent rules for TypeScript source were different from JavaScript

## v1.9.2 2023-01-18 19:21:20 +0100

### Fixed

- Hotfix for issue in "eslint-plugin-react"
- Duplicated entries

## v1.9.1 2023-01-18 11:53:38 +0100

### Changed

- Ignore magic numbers for default values and class property initializers

### Security

- Update

## v1.9.0 2022-12-05 13:39:36 +0100

### Added

- Support for deprecated calls detection (in TypeScript)

### Fixed

- Some presets were loaded incorrectly

## v1.8.3 2022-12-01 14:03:08 +0100

### Changed

- Skip comment line in max function length

### Fixed

- Invalid properties in member-ordering

### Security

- Update

## v1.8.2 2022-05-06 15:47:48 +0200

### Fixed

- Property placement issue for classes

## v1.8.1 2022-05-04 15:22:34 +0200

### Fixed

- eslint-plugin-chai-friendly is now an optional peer dependency

## v1.8.0 2022-05-02 15:14:36 +0200

### Added

- Support for chai with mocha

### Security

- Update

## v1.7.5 2022-04-12 16:44:27 +0200

### Fixed

- Conflict between typescript-plugin class member ordering and eslint default rule about
  getter/setter

## v1.7.4 2022-04-03 20:14:35 +0200

### Removed

- "full" support for TypeScript removed; there's some incompatibilities. For now, import cycles are
  not detected in this situation.

## v1.7.3 2022-04-03 03:57:53 +0200

### Fixed

- Compatibility issue between imports and typescript

## v1.7.2 2022-04-03 01:13:52 +0200

### Fixed

- "import" config depending on "promise" extension

## v1.7.1 2022-02-14 18:16:12 +0100

### Changed

- Updated peer dependencies

## v1.7.0 2021-12-23 11:30:27 +0100

### Changed

- Use latest ECMA version by default

## v1.6.0 2021-12-23 11:20:15 +0100

### Changed

- Update to using eslint@8

### Security

- Update

## v1.5.10 2021-11-16 13:03:16 +0100

### Removed

- removed rule in @typescript-eslint@5.0

## v1.5.9 2021-11-09 11:19:10 +0100

### Security

- Update

## v1.5.8 2021-10-08 13:47:45 +0200

### Fixed

- Merge issue

## v1.5.7 2021-09-06 13:51:55 +0200

### Fixed

- Typo in unbound-method

## v1.5.6 2021-09-03 17:20:39 +0200

### Changed

- unbound-method ignore static functions

## v1.5.5 2021-08-03 15:29:06 +0200

### Added

- Import cycle detection is now optional

### Security

- Update

## v1.5.4 2021-07-16 03:58:22 +0200

### Fixed

- Bad interaction between react and typescript on methods ordering

## v1.5.3 2021-07-12 22:37:42 +0200

### Fixed

- Misconfiguration of extensions rule

## v1.5.2 2021-07-11 22:00:18 +0200

### Fixed

- no-use-before-define issue with TypeScript and React
- package deep import not requiring extension

## v1.5.1 2021-06-29 13:41:44 +0200

### Fixed

- Borked import for typescript

## v1.5.0 2021-06-28 17:47:25 +0200

### Added

- Use `eslint-plugin-import`

### Changed

- Updated license

### Security

- Update

## v1.4.3 2021-06-04 17:26:24 +0200

### Security

- Update

## v1.4.2 2021-06-02 18:05:51 +0200

### Security

- Update

## v1.4.1 2021-02-12 13:08:25 +0100

### Fixed

- Mocha setting did not correctly set the environment value to include mocha

## v1.4.0 2021-02-03 15:34:37 +0100

### Added

- Mocha settings

### Changed

- Package can't accidentaly be published by hand

### Fixed

- Ruleset application order is not hardcoded

### Security

- Update

## v1.3.0 2021-02-03 14:16:55 +0100

### Added

- peerDependencies

## v1.2.0 2021-01-20 12:22:32 +0100

### Added

- React hooks support

## v1.1.2 2020-12-09 11:01:33 +0100

### Changed

- space-before-function-paren correct handling of async functions

## v1.1.1 2020-12-07 13:32:20 +0100

### Fixed

- package.json referencing github

## v1.1.0 2020-12-07 13:17:17 +0100

### Changed

- Maximum blank lines restricted to 1 in file with no line at beginning/end.
- Changed licence to MIT
- Publish on npmjs/github

## v1.0.6 2020-10-14 15:08:03 +0200

### Fixed

- Potential issue with typescript rule

### Security

- Update

## v1.0.5 2020-10-09 11:21:55 +0200

### Fixed

- Removed extra file in package

## v1.0.4 2020-09-11 11:54:06 +0200

### Fixed

- Issue with no-shadow in typescript

## v1.0.3 2020-09-09 15:59:47 +0200

### Changed

- Some error moved to warn

## v1.0.2 2020-08-14 17:39:08 +0200

### Security

- Update

## v1.0.1 2020-07-21 16:37:30 +0200

### Fixed

- react/jsx-max-props-per-line rule was incorrect

## v1.0.0 2020-06-26 16:22:48 +0200

### Changed

- Parser now check for ES2020

## v0.3.5 2020-06-22 11:09:40 +0200

### Fixed

- max-lines rule was incorrect

## v0.3.4 2020-06-19 11:21:05 +0200

### Changes

- Relaxed some rules

## v0.3.3 2020-06-19 11:20:31 +0200

### Fixed

- Updated typescript definitions

## v0.3.2 2020-04-06 16:11:57 +0200

### Changed

- Relaxed react/no-unescaped-entities

## v0.3.1 2020-04-06 12:52:49 +0200

### Security

- Update

## v0.3.0 2020-04-06 12:47:23 +0200

### Changed

- Increased max-lines for files to 1000

### Removed

- Automatic override of files in /webres using the browser env. If you need this behavior you can
  either provide the override yourself when calling

### eslintConfig() or set it on a per-file basis

## v0.2.13 2020-03-18 17:09:52 +0100

### Changed

- Relaxed max-len in comments

## v0.2.12 2020-02-25 16:34:05 +0100

### Changed

- Allow single line in objects and arrays

## v0.2.11 2020-02-25 15:31:47 +0100

### Changed

- Removed force to multiline for array and brackets

## v0.2.10 2020-02-24 12:05:57 +0100

### Fixed

- Relaxed rule about callback in promises

## v0.2.9 2020-02-24 10:41:53 +0100

### Changed

- Allow single-argument arrow function with no parenthesis
- max-len does not allow string to break the rule anymore
- Removed minimum length for identifiers. Max length set to 32.

### Fixed

- Bug with no-unused-vars

## v0.2.8 2020-02-20 16:11:21 +0100

### Changed

- Generator use syntax "function\* name()" instead of "function \*name()"

## v0.2.7 2020-02-20 15:00:57 +0100

### Added

- "up" is an acceptable identifier

## v0.2.6 2020-02-20 14:49:19 +0100

### Changed

- Long lines containing strings are ignored

## v0.2.5 2020-02-18 15:35:32 +0100

### Changed

- Allow single-line class member to not be separated with blank lines

## v0.2.4 2020-02-18 15:10:20 +0100

### Changed

- Allow render() method to not reference this for style reasons

## v0.2.3 2020-02-14 16:13:47 +0100

### Changed

- JSX closing bracket on multiline element must match with the line instead of the tag

### Fixed

- Seemingly random crash in some cases

## v0.2.2 2020-02-14 11:38:56 +0100

### Changed

- Allow single-statement nonblock on same line

## v0.2.1 2020-02-13 14:15:55 +0100

### Fixed

- Exclusion for localization code

## v0.2.0 2020-02-12 19:33:36 +0100

### Added

- eslint-plugin-promise

### Changed

- Relaxed rules round identifiers (id-length)
- Removed some react rules (react/destructuring-assignment, react/static-property-placement,
  react/jsx-closing-tag-location) for producing inconsistent codebase

### Fixed

- All presets are handled in a generic way
- Typescript and Typescript types now merged under a single preset

## v0.1.0 2020-02-06 19:16:57 +0100

Initial version
