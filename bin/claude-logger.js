#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

const CLAUDE_LOGS_DIR = path.join(os.homedir(), 'Documents', 'claude-logs');
const CLAUDE_LOGGER_DIR = path.dirname(__dirname);

// Helper function to get today's date in YYYY-MM-DD format
function getTodayDate() {
  return new Date().toISOString().split('T')[0];
}

// Helper function to get all session files for a given date
function getSessionFiles(date) {
  const sessionsDir = path.join(CLAUDE_LOGS_DIR, 'sessions');
  if (!fs.existsSync(sessionsDir)) {
    return [];
  }
  
  const files = fs.readdirSync(sessionsDir);
  return files.filter(file => file.startsWith(`${date}-session-`) && file.endsWith('.md'));
}

// Helper function to parse session file
function parseSessionFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    const sessionId = path.basename(filePath).match(/session-([^.]+)\.md/)?.[1] || 'unknown';
    
    let entryCount = 0;
    let lastTimestamp = '';
    let totalTokens = 0;
    
    lines.forEach(line => {
      // Count entries (lines starting with -)
      if (line.trim().startsWith('- ')) {
        entryCount++;
      }
      
      // Extract timestamps (lines in format HH:MM)
      const timestampMatch = line.match(/^(\d{2}:\d{2})/);
      if (timestampMatch) {
        lastTimestamp = timestampMatch[1];
      }
      
      // Extract token usage
      const tokenMatch = line.match(/\+?([\d,]+)\s*tokens?/i);
      if (tokenMatch) {
        totalTokens += parseInt(tokenMatch[1].replace(/,/g, ''));
      }
    });
    
    return {
      sessionId,
      entryCount,
      lastTimestamp,
      totalTokens,
      filePath
    };
  } catch (error) {
    return null;
  }
}

// Helper function to check if session is active (modified in last 30 minutes)
function isSessionActive(filePath) {
  try {
    const stats = fs.statSync(filePath);
    const modifiedTime = stats.mtime;
    const now = new Date();
    const diffMinutes = (now - modifiedTime) / 1000 / 60;
    return diffMinutes <= 30;
  } catch (error) {
    return false;
  }
}

// Commands
const commands = {
  init: () => {
    console.log('🚀 Initializing Claude Logger...');
    
    // Create directories
    fs.mkdirSync(CLAUDE_LOGS_DIR, { recursive: true });
    fs.mkdirSync(path.join(CLAUDE_LOGS_DIR, 'projects'), { recursive: true });
    fs.mkdirSync(path.join(CLAUDE_LOGS_DIR, 'sessions'), { recursive: true });
    
    // Create initial log file
    const today = new Date().toISOString().split('T')[0];
    const logFile = path.join(CLAUDE_LOGS_DIR, `${today}.md`);
    
    if (!fs.existsSync(logFile)) {
      fs.writeFileSync(logFile, `# ${today} 作業ログ\n\n## Claude Logger initialized\n`);
    }
    
    // Run setup script
    const setupScript = path.join(CLAUDE_LOGGER_DIR, 'setup-claude-logger.sh');
    if (fs.existsSync(setupScript)) {
      console.log('\n🔧 Running automatic setup...');
      try {
        execSync(`bash ${setupScript}`, { stdio: 'inherit' });
      } catch (error) {
        console.error('Setup failed:', error.message);
      }
    }
    
    console.log('✅ Claude Logger initialized!');
    console.log(`📁 Logs directory: ${CLAUDE_LOGS_DIR}`);
  },
  
  start: () => {
    const sessionId = `${Date.now()}-${process.pid}`;
    console.log(`🔄 Starting Claude Logger session: ${sessionId}`);
    
    // Create session environment setup script
    const sessionScript = `
#!/bin/bash
export CLAUDE_SESSION_ID="${sessionId}"
export CLAUDE_LOGGER_DIR="${CLAUDE_LOGGER_DIR}"
source "${CLAUDE_LOGGER_DIR}/multi-session-logger.sh"
echo "✅ Claude Logger active for this session"
echo "📝 Session ID: ${sessionId}"
`;
    
    const tempScript = path.join(os.tmpdir(), `claude-session-${sessionId}.sh`);
    fs.writeFileSync(tempScript, sessionScript, { mode: 0o755 });
    
    console.log('\n⚠️  To activate logging in this terminal, run:');
    console.log(`source ${tempScript}\n`);
    console.log('Or use the wrapper: claude-logged');
  },
  
  stats: (args) => {
    console.log('📊 Claude Logger - Productivity Stats');
    console.log('═══════════════════════════════════════════════════════');
    
    const period = args[0] || 'today';
    const today = getTodayDate();
    let dates = [];
    
    // Determine which dates to analyze
    switch(period) {
      case '--week':
        for (let i = 0; i < 7; i++) {
          const date = new Date();
          date.setDate(date.getDate() - i);
          dates.push(date.toISOString().split('T')[0]);
        }
        break;
      case '--yesterday':
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        dates.push(yesterday.toISOString().split('T')[0]);
        break;
      case '--today':
      default:
        dates.push(today);
    }
    
    console.log(`Period: ${period}`);
    console.log('');
    
    let totalSessions = 0;
    let totalEntries = 0;
    let totalTokens = 0;
    
    dates.forEach(date => {
      const sessionFiles = getSessionFiles(date);
      sessionFiles.forEach(file => {
        const sessionData = parseSessionFile(path.join(CLAUDE_LOGS_DIR, 'sessions', file));
        if (sessionData) {
          totalSessions++;
          totalEntries += sessionData.entryCount;
          totalTokens += sessionData.totalTokens;
        }
      });
    });
    
    console.log(`📅 Sessions: ${totalSessions}`);
    console.log(`📝 Log Entries: ${totalEntries}`);
    console.log(`💰 Token Usage: ${totalTokens.toLocaleString()} tokens`);
    console.log(`⚡ Avg Entries/Session: ${totalSessions > 0 ? (totalEntries / totalSessions).toFixed(1) : 0}`);
    console.log('');
    
    if (totalSessions === 0) {
      console.log('💡 No sessions found for the specified period.');
      console.log('   Start a session with:');
      console.log('   source ~/Documents/claude-logs/multi-session-logger.sh');
    } else {
      const avgTokensPerSession = Math.round(totalTokens / totalSessions);
      console.log(`💡 Insight: Average ${avgTokensPerSession.toLocaleString()} tokens per session`);
    }
  },
  
  dashboard: () => {
    console.log('🖥️  Claude Logger - Live Dashboard');
    console.log('═══════════════════════════════════════════════════════');
    console.log('');
    
    const today = getTodayDate();
    const sessionFiles = getSessionFiles(today);
    
    if (sessionFiles.length === 0) {
      console.log('❌ No sessions found for today');
      console.log('');
      console.log('To start a new session:');
      console.log('  source ~/Documents/claude-logs/multi-session-logger.sh');
      console.log('');
      console.log('Then use: log_entry "Your work description"');
      return;
    }
    
    const sessions = [];
    let activeSessions = 0;
    let totalTokensToday = 0;
    
    sessionFiles.forEach(file => {
      const filePath = path.join(CLAUDE_LOGS_DIR, 'sessions', file);
      const sessionData = parseSessionFile(filePath);
      
      if (sessionData) {
        const active = isSessionActive(filePath);
        if (active) activeSessions++;
        
        sessions.push({
          ...sessionData,
          active
        });
        
        totalTokensToday += sessionData.totalTokens;
      }
    });
    
    // Display summary
    console.log(`Active Sessions: ${activeSessions}/${sessions.length}`);
    console.log(`Total Sessions Today: ${sessions.length}`);
    console.log(`Token Usage Today: ${totalTokensToday.toLocaleString()} tokens`);
    console.log('');
    
    // Display individual sessions
    console.log('Session Details:');
    console.log('─────────────────────────────────────────────────');
    
    sessions.forEach((session, index) => {
      const status = session.active ? '🟢' : '⚫';
      console.log(`${status} Session ${index + 1} [${session.sessionId}]`);
      console.log(`   Entries: ${session.entryCount}`);
      console.log(`   Last Update: ${session.lastTimestamp || 'No timestamp'}`);
      console.log(`   Tokens: ${session.totalTokens.toLocaleString()}`);
      console.log('');
    });
    
    // Check main log file
    const mainLogPath = path.join(CLAUDE_LOGS_DIR, `${today}.md`);
    if (fs.existsSync(mainLogPath)) {
      const mainLogStats = fs.statSync(mainLogPath);
      const mainLogSize = (mainLogStats.size / 1024).toFixed(1);
      console.log(`📄 Main Log: ${today}.md (${mainLogSize} KB)`);
    }
    
    console.log('');
    console.log('💡 Tip: Sessions are marked inactive after 30 minutes');
  },
  
  list: () => {
    console.log('📋 Claude Logger - Session List');
    console.log('═══════════════════════════════════════════════════════');
    console.log('');
    
    const sessionsDir = path.join(CLAUDE_LOGS_DIR, 'sessions');
    if (!fs.existsSync(sessionsDir)) {
      console.log('❌ No sessions directory found');
      return;
    }
    
    const files = fs.readdirSync(sessionsDir)
      .filter(file => file.endsWith('.md'))
      .sort()
      .reverse();
    
    if (files.length === 0) {
      console.log('❌ No session files found');
      return;
    }
    
    console.log(`Found ${files.length} session file(s):`);
    console.log('');
    
    files.slice(0, 20).forEach(file => {
      const filePath = path.join(sessionsDir, file);
      const stats = fs.statSync(filePath);
      const size = (stats.size / 1024).toFixed(1);
      const active = isSessionActive(filePath) ? '🟢' : '⚫';
      
      console.log(`${active} ${file} (${size} KB)`);
    });
    
    if (files.length > 20) {
      console.log(`... and ${files.length - 20} more`);
    }
  },
  
  merge: () => {
    console.log('🔄 Merging session logs...');
    
    const mergeScript = path.join(CLAUDE_LOGGER_DIR, 'multi-session-logger.sh');
    if (fs.existsSync(mergeScript)) {
      try {
        execSync(`bash ${mergeScript} merge`, { stdio: 'inherit' });
        console.log('✅ Logs merged successfully!');
      } catch (error) {
        console.error('Merge failed:', error.message);
      }
    }
  }
};

// Parse command
const command = process.argv[2] || 'help';
const args = process.argv.slice(3);

if (commands[command]) {
  commands[command](args);
} else {
  console.log('Claude Logger - Command your productivity empire');
  console.log('');
  console.log('Commands:');
  console.log('  claude-logger init       - Set up your productivity fortress');
  console.log('  claude-logger start      - Begin tracking this session');
  console.log('  claude-logger stats      - View your productivity metrics');
  console.log('  claude-logger dashboard  - Real-time session monitor');
  console.log('  claude-logger list       - List all session files');
  console.log('  claude-logger merge      - Merge all session logs');
  console.log('');
  console.log('Stats options:');
  console.log('  claude-logger stats --today      - Today\'s stats (default)');
  console.log('  claude-logger stats --yesterday  - Yesterday\'s stats');
  console.log('  claude-logger stats --week       - Last 7 days');
  console.log('');
  console.log('💸 Remember: Track everything, optimize everything!');
}