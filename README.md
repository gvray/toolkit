# Gvray Toolkit

A modern collection of frontend utility libraries, covering JavaScript, DOM, date/time, validation, formatting, colors, networking, and more.

Designed for modern TypeScript applications with full type safety, modular architecture, and tree-shakable packages.

## 📦 Packages

| Package                | Description                                                                                                                                      |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `@gvray/eskit`         | JavaScript & TypeScript utility library for type-safe programming, functional helpers, asynchronous utilities, and common language enhancements. |
| `@gvray/domkit`        | DOM utility library providing element manipulation, event handling, browser APIs, and animation helpers.                                         |
| `@gvray/adminkit`      | Utilities commonly used in admin dashboards, including clipboard, storage, event bus, loading states, and formatting helpers.                    |
| `@gvray/pathkit`       | Path manipulation utilities for parsing, joining, normalizing, and resolving paths.                                                              |
| `@gvray/datekit`       | Date and time utilities for formatting, parsing, comparison, calculation, and scheduling.                                                        |
| `@gvray/validationkit` | Data validation utilities for forms, schemas, and common business validation scenarios.                                                          |
| `@gvray/mathkit`       | Mathematical utilities including calculations, statistics, interpolation, random generators, and easing functions.                               |
| `@gvray/colorkit`      | Color manipulation utilities for parsing, conversion, blending, brightness adjustment, and color generation.                                     |
| `@gvray/formatkit`     | Formatting utilities for numbers, currencies, file sizes, durations, text transformation, and masking.                                           |
| `@gvray/requestkit`    | Network request utilities including timeout control, retries, polling, concurrency limiting, cancellation, and async workflows.                  |

## 🚀 Installation

Install only the packages you need.

```bash
# npm
npm install @gvray/eskit @gvray/domkit @gvray/adminkit @gvray/pathkit @gvray/datekit @gvray/validationkit @gvray/mathkit @gvray/colorkit @gvray/formatkit @gvray/requestkit

# yarn
yarn add @gvray/eskit @gvray/domkit @gvray/adminkit @gvray/pathkit @gvray/datekit @gvray/validationkit @gvray/mathkit @gvray/colorkit @gvray/formatkit @gvray/requestkit

# pnpm
pnpm add @gvray/eskit @gvray/domkit @gvray/adminkit @gvray/pathkit @gvray/datekit @gvray/validationkit @gvray/mathkit @gvray/colorkit @gvray/formatkit @gvray/requestkit
```

## ✨ Features

- 🚀 **TypeScript First** — Built with TypeScript and ships with complete type definitions.
- 📦 **Modular & Tree-Shakable** — Each package is published independently for minimal bundle size.
- 🧩 **Composable APIs** — Simple, focused, and reusable utility functions.
- 🧪 **Well Tested** — Comprehensive unit test coverage across packages.
- 📚 **Fully Documented** — Rich JSDoc comments with examples and API references.
- ⚡ **Modern Build System** — Optimized for ESM, CJS, and modern frontend toolchains.

## 🎮 Playground

Try all utilities interactively in the local playground.

```bash
pnpm dev:play
```

The playground supports:

- TypeScript execution
- Real-time code evaluation
- Output inspection
- Utility exploration

## 📖 Documentation

Each package contains a dedicated `README.md` with:

- Installation guide
- API reference
- Usage examples
- Type definitions
- Best practices

## 🤝 Contributing

Contributions are welcome.

Feel free to:

- Open an Issue
- Submit a Pull Request
- Suggest new utility packages
- Improve documentation

## 📄 License

MIT License
