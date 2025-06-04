#!/bin/bash

# Claude Logger Setup Script
# Version: 2.0.0
# Sets up Claude Logger with improved duplicate prevention

set -e

echo "🚀 Claude Logger セットアップを開始します..."

# Get the directory where this script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
LOGGER_SCRIPT="$SCRIPT_DIR/multi-session-logger.sh"

# Check if the logger script exists
if [ ! -f "$LOGGER_SCRIPT" ]; then
    echo "❌ エラー: multi-session-logger.sh が見つかりません"
    exit 1
fi

# Make the script executable
chmod +x "$LOGGER_SCRIPT"

# Detect shell configuration file
if [ -n "$ZSH_VERSION" ]; then
    SHELL_RC="$HOME/.zshrc"
    SHELL_NAME="zsh"
elif [ -n "$BASH_VERSION" ]; then
    SHELL_RC="$HOME/.bashrc"
    SHELL_NAME="bash"
else
    echo "❌ エラー: サポートされていないシェルです"
    exit 1
fi

echo "📝 シェル設定ファイル: $SHELL_RC"

# Function to add configuration without duplicates
add_to_rc() {
    local rc_file="$1"
    local marker="# Claude Logger - Automatic session logging"
    
    # Check if Claude Logger is already configured
    if grep -q "claude-logs/multi-session-logger.sh" "$rc_file" 2>/dev/null; then
        echo "⚠️  既存の設定を検出しました。クリーンアップ中..."
        
        # Create a temporary file
        local temp_file=$(mktemp)
        
        # Remove all existing Claude Logger configurations
        sed '/# Claude Logger - Automatic session logging/,/^$/d' "$rc_file" > "$temp_file"
        
        # Also remove any standalone source lines
        sed -i.bak '/claude-logs\/multi-session-logger.sh/d' "$temp_file"
        
        # Move the cleaned file back
        mv "$temp_file" "$rc_file"
    fi
    
    # Add the new configuration
    {
        echo ""
        echo "$marker"
        echo "export CLAUDE_LOGGER_DIR=\"$SCRIPT_DIR\""
        echo "source $LOGGER_SCRIPT >/dev/null 2>&1"
    } >> "$rc_file"
    
    echo "✅ $rc_file に設定を追加しました"
}

# Add configuration to shell RC file
add_to_rc "$SHELL_RC"

# Create necessary directories
mkdir -p "$SCRIPT_DIR/sessions"
mkdir -p "$SCRIPT_DIR/projects"

echo ""
echo "✅ セットアップが完了しました！"
echo ""
echo "📌 使用方法:"
echo "  - log_entry \"メッセージ\" : ログエントリを追加"
echo "  - merge_session_logs : セッションログを統合"
echo "  - セッションID確認: echo \$CLAUDE_SESSION_ID"
echo ""
echo "⚠️  新しいターミナルセッションで有効になります"
echo ""
echo "📁 ログ保存先: $SCRIPT_DIR"
echo "📁 セッションログ: $SCRIPT_DIR/sessions/"
echo "📁 プロジェクト情報: $SCRIPT_DIR/projects/"