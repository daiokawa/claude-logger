#!/bin/bash

# Claude Logger - Multi-session support with file locking
# Prevents conflicts when multiple Claude sessions write to the same log file

LOG_DIR="$HOME/Documents/claude-logs"
DATE=$(date +%Y-%m-%d)
LOG_FILE="$LOG_DIR/$DATE.md"
SESSION_ID="${CLAUDE_SESSION_ID:-$(date +%s)-$$}"
SESSION_LOG="$LOG_DIR/sessions/${DATE}-session-${SESSION_ID}.md"
LOCK_FILE="$LOG_DIR/.${DATE}.lock"

# Create log directories if they don't exist
mkdir -p "$LOG_DIR/sessions"

# Function to acquire lock
acquire_lock() {
    local max_wait=5
    local wait_time=0
    
    while [ $wait_time -lt $max_wait ]; do
        if mkdir "$LOCK_FILE" 2>/dev/null; then
            echo $$ > "$LOCK_FILE/pid"
            return 0
        fi
        sleep 0.1
        wait_time=$((wait_time + 1))
    done
    
    return 1
}

# Function to release lock
release_lock() {
    rm -rf "$LOCK_FILE"
}

# Function to log entry to both main log and session log
log_entry() {
    local message="$1"
    local timestamp
    timestamp=$(date +"%H:%M")
    
    # Log to session file (no lock needed, unique per session)
    echo "[$timestamp] $message" >> "$SESSION_LOG"
    
    # Log to main file with lock
    if acquire_lock; then
        # Check if date has changed
        local current_date
        current_date=$(date +%Y-%m-%d)
        if [ "$current_date" != "$DATE" ]; then
            DATE="$current_date"
            LOG_FILE="$LOG_DIR/$DATE.md"
        fi
        
        # Add header if file doesn't exist
        if [ ! -f "$LOG_FILE" ]; then
            echo "# $DATE 作業ログ" > "$LOG_FILE"
            echo "" >> "$LOG_FILE"
        fi
        
        {
            echo "## $timestamp [Session: $SESSION_ID]"
            echo "$message"
            echo ""
        } >> "$LOG_FILE"
        release_lock
    else
        echo "Warning: Could not acquire lock for logging" >&2
    fi
}

# Function to merge all session logs into daily log
merge_session_logs() {
    if acquire_lock; then
        local temp_file="$LOG_DIR/.merge_temp.md"
        
        # Create header
        {
            echo "# $DATE 作業ログ"
            echo ""
            echo "## セッション統合ログ ($(date +%H:%M)更新)"
            echo ""
        } > "$temp_file"
        
        # Merge all session logs for today
        for session_log in "$LOG_DIR/sessions/${DATE}-session-"*.md; do
            if [ -f "$session_log" ]; then
                session_name=$(basename "$session_log" .md)
                {
                    echo "### Session: $session_name"
                    cat "$session_log"
                    echo ""
                } >> "$temp_file"
            fi
        done
        
        # Append existing content if any
        if [ -f "$LOG_FILE" ]; then
            {
                echo ""
                echo "---"
                echo ""
            } >> "$temp_file"
            tail -n +4 "$LOG_FILE" >> "$temp_file"  # Skip header
        fi
        
        # Replace the log file
        mv "$temp_file" "$LOG_FILE"
        
        release_lock
    fi
}

# Auto-log function calls (for debugging)
log_command() {
    local cmd="$1"
    shift
    log_entry "Executing: $cmd $*"
    "$cmd" "$@"
    local exit_code=$?
    log_entry "Completed: $cmd (exit code: $exit_code)"
    return $exit_code
}

# If called with 'merge' argument, run merge
if [ "$1" = "merge" ]; then
    merge_session_logs
fi

# Export functions for use in other scripts
export -f log_entry
export -f acquire_lock
export -f release_lock
export -f merge_session_logs
export -f log_command