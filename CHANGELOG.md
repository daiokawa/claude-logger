# Changelog

All notable changes to this project will be documented in this file.

## [2.0.0] - 2025-06-04

### Added
- 🛡️ Duplicate prevention mechanism using `CLAUDE_LOGGER_LOADED` environment variable
- 🔇 Silent operation mode - all output redirected to /dev/null
- 🧹 Auto cleanup feature in setup.sh to remove duplicate configurations
- 📝 Version tracking in script headers

### Changed
- Improved file locking mechanism for better parallel session support
- Enhanced setup script with smart duplicate detection
- Better error handling with silent failures

### Fixed
- Multiple function definition warnings on terminal startup
- Cron job errors generating spam emails
- Shell RC file pollution with duplicate entries

### Removed
- Cron job functionality (was causing "Operation not permitted" errors)
- Verbose terminal output during initialization

## [1.0.0] - Initial Release

### Added
- Multi-session logging support
- File locking for concurrent access
- Session tracking and merging
- Basic setup script