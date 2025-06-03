#!/bin/bash

# Shell script test suite for Claude Logger
# Run with: bash __tests__/shell-scripts.test.sh

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test counters
TESTS_PASSED=0
TESTS_FAILED=0

# Test helper functions
assert_equals() {
    local expected="$1"
    local actual="$2"
    local test_name="$3"
    
    if [ "$expected" = "$actual" ]; then
        echo -e "${GREEN}✓${NC} $test_name"
        ((TESTS_PASSED++))
    else
        echo -e "${RED}✗${NC} $test_name"
        echo "  Expected: $expected"
        echo "  Actual: $actual"
        ((TESTS_FAILED++))
    fi
}

assert_file_exists() {
    local file="$1"
    local test_name="$2"
    
    if [ -f "$file" ]; then
        echo -e "${GREEN}✓${NC} $test_name"
        ((TESTS_PASSED++))
    else
        echo -e "${RED}✗${NC} $test_name"
        echo "  File not found: $file"
        ((TESTS_FAILED++))
    fi
}

assert_dir_exists() {
    local dir="$1"
    local test_name="$2"
    
    if [ -d "$dir" ]; then
        echo -e "${GREEN}✓${NC} $test_name"
        ((TESTS_PASSED++))
    else
        echo -e "${RED}✗${NC} $test_name"
        echo "  Directory not found: $dir"
        ((TESTS_FAILED++))
    fi
}

assert_contains() {
    local file="$1"
    local pattern="$2"
    local test_name="$3"
    
    if grep -q "$pattern" "$file" 2>/dev/null; then
        echo -e "${GREEN}✓${NC} $test_name"
        ((TESTS_PASSED++))
    else
        echo -e "${RED}✗${NC} $test_name"
        echo "  Pattern not found in $file: $pattern"
        ((TESTS_FAILED++))
    fi
}

# Setup test environment
setup_test_env() {
    export TEST_DIR="/tmp/claude-logger-test-$$"
    export TEST_HOME="$TEST_DIR/home"
    export HOME="$TEST_HOME"
    export CLAUDE_LOGGER_DIR="$TEST_DIR/claude-logger"
    
    mkdir -p "$TEST_HOME/Documents/claude-logs/sessions"
    mkdir -p "$CLAUDE_LOGGER_DIR"
    
    # Copy scripts to test directory
    cp multi-session-logger.sh "$CLAUDE_LOGGER_DIR/"
    cp setup-claude-logger.sh "$CLAUDE_LOGGER_DIR/"
    cp install.sh "$CLAUDE_LOGGER_DIR/"
    
    # Create empty .zshrc
    touch "$TEST_HOME/.zshrc"
}

# Cleanup test environment
cleanup_test_env() {
    if [ -n "$TEST_DIR" ] && [ -d "$TEST_DIR" ]; then
        rm -rf "$TEST_DIR"
    fi
}

# Test multi-session-logger.sh
test_multi_session_logger() {
    echo -e "\n${YELLOW}Testing multi-session-logger.sh${NC}"
    
    # Source the script
    source "$CLAUDE_LOGGER_DIR/multi-session-logger.sh"
    
    # Test log_entry function
    log_entry "Test log entry"
    local date=$(date +%Y-%m-%d)
    assert_file_exists "$HOME/Documents/claude-logs/$date.md" "Log file created"
    assert_contains "$HOME/Documents/claude-logs/$date.md" "Test log entry" "Log entry written"
    
    # Test session log creation
    local session_file="$HOME/Documents/claude-logs/sessions/${date}-session-${SESSION_ID}.md"
    assert_file_exists "$session_file" "Session log file created"
    
    # Test lock mechanism
    local lock_dir="$HOME/Documents/claude-logs/.${date}.lock"
    acquire_lock
    assert_dir_exists "$lock_dir" "Lock directory created"
    release_lock
    [ ! -d "$lock_dir" ]
    assert_equals "0" "$?" "Lock directory removed"
}

# Test setup-claude-logger.sh
test_setup_script() {
    echo -e "\n${YELLOW}Testing setup-claude-logger.sh${NC}"
    
    # Run setup script
    cd "$CLAUDE_LOGGER_DIR"
    bash setup-claude-logger.sh > /dev/null 2>&1
    
    # Check .zshrc modifications
    assert_contains "$HOME/.zshrc" "claude-logger" ".zshrc contains claude-logger"
    assert_contains "$HOME/.zshrc" "CLAUDE_LOGGER_DIR" ".zshrc contains CLAUDE_LOGGER_DIR"
    
    # Check wrapper script
    assert_file_exists "$HOME/.local/bin/claude-logged" "Claude wrapper script created"
    
    # Check if wrapper is executable
    [ -x "$HOME/.local/bin/claude-logged" ]
    assert_equals "0" "$?" "Claude wrapper is executable"
}

# Test install.sh
test_install_script() {
    echo -e "\n${YELLOW}Testing install.sh${NC}"
    
    # Check if install script exists and is executable
    assert_file_exists "$CLAUDE_LOGGER_DIR/install.sh" "Install script exists"
    
    # Check shebang
    local shebang=$(head -n 1 "$CLAUDE_LOGGER_DIR/install.sh")
    assert_equals "#!/bin/bash" "$shebang" "Install script has correct shebang"
}

# Test log file structure
test_log_file_structure() {
    echo -e "\n${YELLOW}Testing log file structure${NC}"
    
    source "$CLAUDE_LOGGER_DIR/multi-session-logger.sh"
    
    # Create multiple log entries
    log_entry "First entry"
    log_entry "Second entry with +1,000 tokens"
    log_entry "Third entry"
    
    local date=$(date +%Y-%m-%d)
    local log_file="$HOME/Documents/claude-logs/$date.md"
    
    # Check header
    assert_contains "$log_file" "# $date 作業ログ" "Log file has correct header"
    
    # Check entries
    assert_contains "$log_file" "First entry" "First entry logged"
    assert_contains "$log_file" "Second entry" "Second entry logged"
    assert_contains "$log_file" "Third entry" "Third entry logged"
    
    # Check token tracking
    assert_contains "$log_file" "1,000 tokens" "Token usage tracked"
}

# Test merge functionality
test_merge_logs() {
    echo -e "\n${YELLOW}Testing log merge functionality${NC}"
    
    source "$CLAUDE_LOGGER_DIR/multi-session-logger.sh"
    
    # Create entries in different sessions
    export CLAUDE_SESSION_ID="test-session-1"
    log_entry "Session 1 entry"
    
    export CLAUDE_SESSION_ID="test-session-2"
    log_entry "Session 2 entry"
    
    # Run merge
    merge_session_logs
    
    local date=$(date +%Y-%m-%d)
    local log_file="$HOME/Documents/claude-logs/$date.md"
    
    # Check merged content
    assert_contains "$log_file" "セッション統合ログ" "Merge header present"
    assert_contains "$log_file" "test-session-1" "Session 1 merged"
    assert_contains "$log_file" "test-session-2" "Session 2 merged"
}

# Main test runner
main() {
    echo "🧪 Claude Logger Shell Script Test Suite"
    echo "======================================="
    
    # Setup
    setup_test_env
    
    # Run tests
    test_multi_session_logger
    test_setup_script
    test_install_script
    test_log_file_structure
    test_merge_logs
    
    # Summary
    echo -e "\n======================================="
    echo -e "Tests passed: ${GREEN}$TESTS_PASSED${NC}"
    echo -e "Tests failed: ${RED}$TESTS_FAILED${NC}"
    
    # Cleanup
    cleanup_test_env
    
    # Exit with appropriate code
    if [ $TESTS_FAILED -eq 0 ]; then
        echo -e "\n${GREEN}All tests passed!${NC}"
        exit 0
    else
        echo -e "\n${RED}Some tests failed!${NC}"
        exit 1
    fi
}

# Run tests
main