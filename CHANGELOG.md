# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.2.0] - 2025-06-04
### Added
- ESLint and Prettier configuration for code quality
- Comprehensive Jest unit tests for Node.js code
- Shell script test suite for testing bash scripts
- GitHub Actions CI/CD workflow configuration
- CONTRIBUTING.md guidelines for contributors
- This CHANGELOG.md file

### Changed
- Improved shell scripts with shellcheck recommendations
- Updated package.json with dev dependencies and scripts
- Enhanced error handling in all scripts

### Fixed
- Shell script compatibility issues
- File locking mechanism in multi-session-logger.sh

## [2.1.0] - 2025-06-03
### Added
- Multi-session support with file locking
- Real-time dashboard for monitoring sessions
- Token usage tracking and statistics
- Session merging functionality
- Wrapper script for automatic logging

### Changed
- Improved session management architecture
- Enhanced productivity metrics

## [2.0.0] - 2025-05-30
### Added
- Complete rewrite with Node.js CLI
- Professional command-line interface
- Session-based logging system
- Automatic setup script

### Changed
- Migrated from simple bash script to full Node.js application
- New directory structure with sessions folder

## [1.0.0] - 2025-05-25
### Added
- Initial release
- Basic logging functionality
- Simple bash script implementation

[Unreleased]: https://github.com/daiokawa/claude-logger/compare/v2.2.0...HEAD
[2.2.0]: https://github.com/daiokawa/claude-logger/compare/v2.1.0...v2.2.0
[2.1.0]: https://github.com/daiokawa/claude-logger/compare/v2.0.0...v2.1.0
[2.0.0]: https://github.com/daiokawa/claude-logger/compare/v1.0.0...v2.0.0
[1.0.0]: https://github.com/daiokawa/claude-logger/releases/tag/v1.0.0