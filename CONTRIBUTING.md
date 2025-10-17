# Contributing to LLM Proxy Server

Thank you for your interest in contributing to the LLM Proxy Server! This document provides guidelines and instructions for contributing to the project.

## Table of Contents

- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Making Changes](#making-changes)
- [Submitting Changes](#submitting-changes)
- [Code Style](#code-style)
- [Testing](#testing)
- [Reporting Issues](#reporting-issues)
- [Feature Requests](#feature-requests)

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/praveentcom/llm-proxy-server.git
   cd llm-proxy-server
   ```
3. **Set up your development environment** (see below)
4. **Create a new branch** for your changes:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Setup

### Prerequisites

- Node.js 18 or higher
- PostgreSQL (for testing the database integration)
- npm or yarn

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. Build the project:
   ```bash
   npm run build
   ```

### Running in Development Mode

```bash
npm run dev
```

## Making Changes

### Code Style

- Follow TypeScript best practices
- Use meaningful variable and function names
- Add comments for complex logic
- Keep functions focused and single-purpose
- Use proper error handling

### Testing

Currently, the project doesn't have automated tests. When adding new features:

1. Test your changes manually
2. Consider adding integration tests for database operations
3. Test both streaming and non-streaming responses

### Documentation

- Update README.md if you add new features
- Add inline comments for complex code
- Update this CONTRIBUTING.md if you add new development processes

## Submitting Changes

### Pull Request Process

1. **Update your fork** with the latest changes:
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Commit your changes** with clear, descriptive messages:
   ```bash
   git commit -m "feat: add support for custom cost models"
   ```

3. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

4. **Create a Pull Request** on GitHub with:
   - Clear title and description
   - Links to any related issues
   - Screenshots if applicable
   - Testing instructions

### Pull Request Guidelines

- **One feature per PR** - separate features into different PRs
- **Update documentation** - include any necessary changes to README.md
- **Test thoroughly** - ensure your changes work as expected
- **Follow the code style** - maintain consistency with existing code
- **Include tests** - add tests for new functionality if possible

## Code Review

All pull requests will be reviewed by maintainers. Please be responsive to feedback and make requested changes in a timely manner.

## Reporting Issues

### Bug Reports

When reporting bugs, please include:

1. **Environment details**:
   - Node.js version
   - PostgreSQL version (if applicable)
   - Operating system

2. **Steps to reproduce**:
   - Clear, step-by-step instructions
   - Sample code if applicable

3. **Expected behavior**:
   - What should happen

4. **Actual behavior**:
   - What actually happens

5. **Error messages**:
   - Full error stack traces

### Security Issues

Please report security vulnerabilities privately to mail@praveent.com. Do not create public issues for security problems.

## Feature Requests

We welcome feature requests! Please:

1. **Check existing issues** first to avoid duplicates
2. **Create a new issue** with:
   - Clear description of the feature
   - Use case and motivation
   - Implementation suggestions if you have any
   - Potential alternatives you've considered

## Community

- Join our discussions in GitHub issues
- Be respectful and inclusive
- Help others when you can
- Celebrate milestones and successes

## License

By contributing to this project, you agree that your contributions will be licensed under the MIT License.
