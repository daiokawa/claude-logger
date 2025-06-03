# Claude Logger 🚀 - For Hardcore Claude Code Users

[日本語版 README](./README.ja.md)

<p align="center">
  <img src="https://img.shields.io/badge/Claude-Logger-blue?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJDNi40OCAyIDIgNi40OCAyIDEyUzYuNDggMjIgMTIgMjJTMjIgMTcuNTIgMjIgMTJTMTcuNTIgMiAxMiAyWk0xMiAyMEM3LjU4IDIwIDQgMTYuNDIgNCAxMlM3LjU4IDQgMTIgNFMyMCA3LjU4IDIwIDEyUzE2LjQyIDIwIDEyIDIwWiIgZmlsbD0iIzAwMDAwMCIvPgo8cGF0aCBkPSJNOCA4SDE2VjEwSDhWOFoiIGZpbGw9IiMwMDAwMDAiLz4KPHBhdGggZD0iTTggMTJIMTZWMTRIOFYxMloiIGZpbGw9IiMwMDAwMDAiLz4KPC9zdmc+" alt="Claude Logger">
  <br>
  <img src="https://img.shields.io/npm/v/claude-logger?style=flat-square" alt="npm version">
  <img src="https://img.shields.io/npm/dm/claude-logger?style=flat-square" alt="npm downloads">
  <img src="https://img.shields.io/github/stars/daiokawa/claude-logger?style=flat-square" alt="GitHub stars">
  <img src="https://img.shields.io/github/license/daiokawa/claude-logger?style=flat-square" alt="License">
</p>

<p align="center">
  <b>🔥 Track ALL your parallel Claude sessions. Justify that $200/month. 🔥</b>
</p>

## 💸 The Math That Changes Everything

**Claude Max ($200/month) - Work harder and reduce your cost virtually**

🧮 Revolutionary Cost Calculation:
- 1 session = $200/month
- 4 parallel sessions = $50/month per session*
- 8 parallel sessions = $25/month per session**
- 16 parallel sessions = $12.50/month per session***
- 32 parallel sessions = PRACTICALLY FREE!****

<sub>* Not actual pricing. You still pay $200/month.</sub>  
<sub>** Still $200/month. But divided by 8 sounds better!</sub>  
<sub>*** Your electricity bill might disagree.</sub>  
<sub>**** CPU has left the chat.</sub>

### 🎯 "The more sessions you run, the cheaper each one becomes!" 
*(Disclaimer: This is not how money works. But it IS how we justify things to ourselves.)*

### You're already running multiple Claudes. Now RATIONALIZE IT with MATH!

## 🔥 What is Claude Logger?

The **ULTIMATE** productivity tool for power users who run multiple Claude Code sessions simultaneously. Track EVERYTHING. Analyze EVERYTHING. Optimize EVERYTHING.

### 📊 Every 15 minutes, automatically:
- Logs all active sessions
- Tracks token usage
- Records project progress  
- Prevents log conflicts
- Creates unified timeline

## 💪 Built for the 1% of Claude Users

You know who you are:
- Running 4+ Claude terminals
- Juggling 10+ projects  
- Burning through millions of tokens
- Need to justify that $200/month

### 🖥️ Platform Support
- ✅ macOS
- ✅ Linux
- ✅ Windows (WSL)

## 🛠️ Installation

### Prerequisites
- Node.js 14.0.0 or higher
- npm or yarn
- macOS, Linux, or Windows (WSL)

### Quick Install (Recommended)

```bash
npm install -g claude-logger
claude-logger init
```

This will:
- Set up automatic logging for all terminals
- Configure 15-minute interval snapshots
- Create session tracking directories
- Add shell integration to ~/.zshrc
- Set up cron job for automatic log merging

### Manual Install

```bash
# Clone the repository
git clone https://github.com/daiokawa/claude-logger.git
cd claude-logger

# Install globally
npm install -g .

# Initialize
claude-logger init
```

## 🚀 Usage

### After Installation

1. **Start a new terminal** (required for shell integration)

2. **For each Claude session**, either:
   ```bash
   claude-logger start  # Then follow the instructions
   ```
   
   OR use the wrapper:
   ```bash
   claude-logged  # Instead of 'claude'
   ```

3. **View your logs**:
   ```bash
   claude-logger dashboard  # Real-time session view
   claude-logger stats      # Today's statistics
   claude-logger merge      # Merge all session logs
   ```

That's it. Now you're tracking EVERYTHING.

## 📈 What You Can Do With This Data

### 1. **Productivity Analytics**
```bash
claude-logger stats --this-week
```
```
Peak productivity: Tuesday 2-4 PM (8 concurrent sessions)
Token velocity: 2.3M tokens/hour
Sessions completed: 47 projects
```

### 2. **Project Timeline Visualization**
```bash
claude-logger timeline --export
```
Generate beautiful Gantt charts showing all parallel work streams.

### 3. **Parallel Efficiency Reports**
```bash
claude-logger efficiency --monthly
```
```
Total sessions: 847
Parallel efficiency: 4.2x
Average concurrent sessions: 6.3

🎤 PRODUCTIVITY MULTIPLIER 🎤
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Running 4 sessions? 4x the output!
Running 8 sessions? 8x the productivity!!
Running 16 sessions? SUPERHUMAN CODING!!!

BUT WAIT, THERE'S MORE!

Running 32 sessions? YOU ARE THE MATRIX!!!!
※Your computer might explode

*All for the same $200/month. Unlimited tokens.
 The more you run, the more you get done!
```

### 4. **Token Usage Heatmaps**
Find your most productive hours. Optimize your schedule. DOMINATE.

### 5. **Project Success Predictor**
ML-powered analysis of your work patterns. Know which projects will succeed before you start.

## 🎯 Features That Matter

- **Zero Config** - Just works
- **File Locking** - No conflicts with 100 parallel sessions
- **Session Intelligence** - Knows which terminal is doing what
- **15-Min Snapshots** - Perfect granularity for analysis
- **Git-Ready** - Version control your productivity
- **Export Everything** - CSV, JSON, SQL, whatever you need

## 💡 Imaginary User Stories

> "I run 8 Claude sessions for my startup. This tool showed me I was wasting 3 hours daily on context switching. Fixed it. Revenue up 40%." - **Startup Founder**

> "Tracked 2.1 million tokens across 6 projects. Found my 'golden hours' are 11pm-3am. Now I plan around it." - **Solo Developer**

> "Company thought I was slacking. Showed them my Claude Logger stats. Got promoted." - **Senior Engineer**

## 📊 Sample Output

```markdown
## 2025-05-26 15:00 - System Summary
- Active Sessions: 6
- Total Tokens: 3,247,891
- Projects in Progress: 
  - Terminal 1: E-commerce Platform (87% complete)
    • Added Stripe payment integration
    • Fixed cart calculation bug
    • Implemented order tracking API
  - Terminal 2: ML Pipeline (32% complete)
    • Set up TensorFlow environment
    • Created data preprocessing scripts
    • Training model on sample dataset
  - Terminal 3: iOS App (64% complete)
    • Designed user authentication flow
    • Integrated push notifications
    • Fixed memory leak in image picker
  - Terminal 4: API Documentation (91% complete)
    • Generated OpenAPI specs
    • Added authentication examples
    • Writing rate limiting guide
  - Terminal 5: Database Migration (15% complete)
    • Backed up production data
    • Created migration scripts
    • Testing rollback procedures
  - Terminal 6: Performance Testing (43% complete)
    • Set up k6 load testing
    • Identified N+1 query issues
    • Optimizing database indexes

## Timeline (Last 15 minutes)
14:45 - Terminal 1: Deployed payment integration to staging
14:47 - Terminal 5: Started backing up user_transactions table (2.3GB)
14:48 - Terminal 4: Generated API docs for new endpoints
14:50 - Terminal 2: Model training reached 10k iterations (loss: 0.231)
14:52 - Terminal 3: Fixed critical bug in photo upload feature
14:53 - Terminal 1: Running integration tests for checkout flow
14:55 - Terminal 6: Load test showing 430ms p95 latency
14:57 - Terminal 5: Migration dry-run completed successfully
14:58 - Terminal 2: Saved checkpoint at epoch 15
15:00 - Terminal 4: Published docs to internal wiki
```

## 🔮 Coming Soon

- **Claude Logger Pro** - Real-time dashboard
- **Team Edition** - Track your whole team's Claude usage
- **AI Insights** - GPT-4 analysis of your work patterns
- **Slack Integration** - Daily productivity summaries
- **VS Code Extension** - See stats without leaving editor

## 🐛 Troubleshooting

### Sessions not logging?
1. Make sure you ran `claude-logger init`
2. Restart your terminal after init (or run `source ~/.zshrc`)
3. Use `claude-logger start` in each terminal
4. Check `~/Documents/claude-logs/sessions/` for log files
5. Verify environment variables:
   ```bash
   echo $CLAUDE_SESSION_ID
   echo $CLAUDE_LOGGER_DIR
   ```

### Logs not merging?
- Run manually: `claude-logger merge`
- Check cron job: `crontab -l | grep claude-logger`
- Verify log directory permissions: `ls -la ~/Documents/claude-logs/`

### Common Issues

**"command not found: claude-logger"**
- Ensure npm global bin is in PATH: `export PATH="$PATH:$(npm bin -g)"`
- Or use full path: `$(npm bin -g)/claude-logger`

**"Permission denied" errors**
- Check file permissions: `chmod +x $(which claude-logger)`
- Ensure log directory is writable: `chmod 755 ~/Documents/claude-logs`

**Sessions not being tracked**
- Verify the logger is sourced: `type log_entry`
- Check if session ID is set: `echo $CLAUDE_SESSION_ID`
- Manually source the logger: `source ~/Documents/claude-logs/multi-session-logger.sh`

### Need help?
- Check existing issues: https://github.com/daiokawa/claude-logger/issues
- Create a new issue with:
  - Your OS and Node.js version
  - Complete error message
  - Steps to reproduce

## 🤝 Contributing

We welcome contributions! See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

### Quick Start for Contributors
```bash
# Fork and clone the repo
git clone https://github.com/your-username/claude-logger.git
cd claude-logger

# Install dependencies
npm install

# Run tests
npm test

# Check code style
npm run lint
npm run format:check
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## 🙏 Acknowledgments

- Built for the Claude Code power user community
- Inspired by developers who maximize their $200/month subscription
- Special thanks to all contributors

**Work Smarter. Track Everything. Optimize Relentlessly.**

---

### Installation

```bash
npm install -g claude-logger
claude-logger init
```

### Start Logging Your Empire

```bash
# In each Claude terminal:
claude-logger start

# View real-time stats:
claude-logger dashboard

# Export for analysis:
claude-logger export --format csv
```

---

**Built by Koichi Okawa**
- GitHub: [@daiokawa](https://github.com/daiokawa)
- Twitter: [@daiokawa](https://twitter.com/daiokawa)
- HendonMob: [Koichi Okawa](https://pokerdb.thehendonmob.com/player.php?a=r&n=230741)

[![npm version](https://badge.fury.io/js/claude-logger.svg)](https://www.npmjs.com/package/claude-logger)
[![Downloads](https://img.shields.io/npm/dm/claude-logger.svg)](https://www.npmjs.com/package/claude-logger)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)