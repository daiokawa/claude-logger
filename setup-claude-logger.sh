#!/bin/bash

# Claude Logger Setup Script
# This script sets up automatic logging for all Claude sessions

echo "🚀 Setting up Claude Logger..."

# Get the directory of claude-logger
CLAUDE_LOGGER_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Check if multi-session-logger.sh exists
if [ ! -f "$CLAUDE_LOGGER_DIR/multi-session-logger.sh" ]; then
    echo "❌ Error: multi-session-logger.sh not found in $CLAUDE_LOGGER_DIR"
    exit 1
fi

# Add to .zshrc if not already added
ZSHRC_FILE="$HOME/.zshrc"
LOGGER_SOURCE="source $CLAUDE_LOGGER_DIR/multi-session-logger.sh"

if ! grep -q "claude-logger" "$ZSHRC_FILE" 2>/dev/null; then
    {
        echo ""
        echo "# Claude Logger - Automatic session logging"
        echo "export CLAUDE_LOGGER_DIR=\"$CLAUDE_LOGGER_DIR\""
        echo "$LOGGER_SOURCE"
    } >> "$ZSHRC_FILE"
    echo "✅ Added to .zshrc"
else
    echo "✅ Already configured in .zshrc"
fi

# Create logs directory
mkdir -p ~/Documents/claude-logs/sessions

# Set up cron job for 15-minute intervals
CRON_JOB="*/15 * * * * $CLAUDE_LOGGER_DIR/multi-session-logger.sh merge"
(crontab -l 2>/dev/null | grep -v "claude-logger"; echo "$CRON_JOB") | crontab -

echo "✅ Cron job configured for 15-minute intervals"

# Create Claude wrapper script
CLAUDE_WRAPPER="$HOME/.local/bin/claude-logged"
mkdir -p "$HOME/.local/bin"

cat > "$CLAUDE_WRAPPER" << 'EOF'
#!/bin/bash
# Claude wrapper with automatic logging

# Generate session ID if not set
export CLAUDE_SESSION_ID="${CLAUDE_SESSION_ID:-$(date +%s)-$$}"

# Source the logger
source "$CLAUDE_LOGGER_DIR/multi-session-logger.sh"

# Log session start
log_entry "Claude session started"

# Run Claude with all arguments
claude "$@"

# Log session end
log_entry "Claude session ended"
EOF

chmod +x "$CLAUDE_WRAPPER"

echo "✅ Claude wrapper created at $CLAUDE_WRAPPER"

# Update PATH if needed
if [[ ":$PATH:" != *":$HOME/.local/bin:"* ]]; then
    echo "export PATH=\"\$HOME/.local/bin:\$PATH\"" >> "$ZSHRC_FILE"
    echo "✅ Added ~/.local/bin to PATH"
fi

echo ""
echo "✅ Claude Logger setup complete!"
echo ""
echo "🎯 Next steps:"
echo "1. Restart your terminal or run: source ~/.zshrc"
echo "2. Use 'claude-logged' instead of 'claude' for automatic logging"
echo "3. Or add this to each terminal: export CLAUDE_SESSION_ID=\$(date +%s)-\$\$"
echo ""
echo "📊 View logs:"
echo "- Today's log: ~/Documents/claude-logs/\$(date +%Y-%m-%d).md"
echo "- Session logs: ~/Documents/claude-logs/sessions/"
echo ""