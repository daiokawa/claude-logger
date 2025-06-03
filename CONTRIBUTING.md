# Contributing to Claude Logger

First off, thank you for considering contributing to Claude Logger! It's people like you that make Claude Logger such a great tool for tracking Claude Code sessions.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Style Guidelines](#style-guidelines)
- [Testing](#testing)
- [Pull Request Process](#pull-request-process)

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainers.

## Getting Started

1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/your-username/claude-logger.git
   cd claude-logger
   ```
3. Add the upstream repository as a remote:
   ```bash
   git remote add upstream https://github.com/daiokawa/claude-logger.git
   ```
4. Create a new branch for your feature or bugfix:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues to avoid duplicates. When you create a bug report, include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples**
- **Describe the behavior you observed and what you expected**
- **Include your environment details** (OS, Node.js version, etc.)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion:

- **Use a clear and descriptive title**
- **Provide a detailed description of the suggested enhancement**
- **Explain why this enhancement would be useful**
- **List any alternative solutions you've considered**

### Pull Requests

- **Focus on a single concern** - one feature or bug fix per PR
- **Include tests** - ensure your changes are covered by tests
- **Follow the style guidelines** - run linting before submitting
- **Update documentation** - keep README and other docs in sync
- **Add entries to CHANGELOG.md** - document your changes

## Development Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run tests:
   ```bash
   npm test
   ```

3. Run linting:
   ```bash
   npm run lint
   npm run format:check
   ```

4. Fix linting issues:
   ```bash
   npm run lint:fix
   npm run format
   ```

## Style Guidelines

### JavaScript Code Style

We use ESLint and Prettier to maintain consistent code style:

- **Use ES6+ features** where appropriate
- **Prefer const over let**, never use var
- **Use meaningful variable and function names**
- **Add JSDoc comments** for public functions
- **Keep functions small and focused**

Run `npm run lint` and `npm run format:check` before committing.

### Shell Script Style

For shell scripts, we follow these guidelines:

- **Use shellcheck** to verify scripts
- **Add error handling** with `set -e` where appropriate
- **Use quotes** around variables: `"$var"`
- **Prefer `[[ ]]` over `[ ]`** for conditionals
- **Add comments** for complex logic

### Commit Messages

- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters or less
- Reference issues and pull requests liberally after the first line
- Consider starting the commit message with an emoji:
  - 🎨 `:art:` - Improving structure/format of the code
  - ⚡ `:zap:` - Improving performance
  - 🐛 `:bug:` - Fixing a bug
  - ✨ `:sparkles:` - Introducing new features
  - 📝 `:memo:` - Writing docs
  - 🚀 `:rocket:` - Deploying stuff
  - ✅ `:white_check_mark:` - Adding tests
  - 🔧 `:wrench:` - Changing configuration files

## Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run shell script tests
bash __tests__/shell-scripts.test.sh
```

### Writing Tests

- **Write tests for all new features**
- **Maintain or improve code coverage**
- **Use descriptive test names**
- **Follow the AAA pattern**: Arrange, Act, Assert
- **Mock external dependencies**
- **Test edge cases and error conditions**

## Pull Request Process

1. **Update your branch** with the latest upstream changes:
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Run tests and linting** to ensure everything passes:
   ```bash
   npm test
   npm run lint
   npm run format:check
   ```

3. **Update documentation** if you've changed APIs or added features

4. **Update CHANGELOG.md** with your changes under the "Unreleased" section

5. **Push your branch** and create a pull request

6. **Respond to code review feedback** promptly

7. Your pull request will be merged once it:
   - Passes all CI checks
   - Has been approved by a maintainer
   - Has no merge conflicts

## Questions?

If you have any questions, please feel free to:
- Open an issue for discussion
- Contact the maintainers
- Join our community discussions

Thank you for contributing to Claude Logger! 🎉