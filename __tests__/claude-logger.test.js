const fs = require('fs');
const path = require('path');
const os = require('os');
const { execSync } = require('child_process');

// Mock console to capture output
const mockConsole = () => {
  const output = [];
  const originalLog = console.log;
  const originalError = console.error;
  
  console.log = jest.fn((...args) => output.push(args.join(' ')));
  console.error = jest.fn((...args) => output.push('ERROR: ' + args.join(' ')));
  
  return {
    output,
    restore: () => {
      console.log = originalLog;
      console.error = originalError;
    }
  };
};

describe('claude-logger.js integration tests', () => {
  const testDir = path.join(os.tmpdir(), 'claude-logger-test-' + Date.now());
  const testHome = path.join(testDir, 'home');
  const logsDir = path.join(testHome, 'Documents', 'claude-logs');
  const originalHome = process.env.HOME;
  const originalArgv = process.argv;
  
  let consoleCapture;

  beforeAll(() => {
    // Create test directories
    fs.mkdirSync(testDir, { recursive: true });
    fs.mkdirSync(testHome, { recursive: true });
    fs.mkdirSync(path.join(testHome, 'Documents'), { recursive: true });
    
    // Set HOME to test directory
    process.env.HOME = testHome;
  });

  afterAll(() => {
    // Restore original HOME
    process.env.HOME = originalHome;
    
    // Clean up test directory
    fs.rmSync(testDir, { recursive: true, force: true });
  });

  beforeEach(() => {
    // Clear module cache
    jest.resetModules();
    
    // Reset process.argv
    process.argv = originalArgv;
    
    // Setup console capture
    consoleCapture = mockConsole();
  });

  afterEach(() => {
    // Restore console
    consoleCapture.restore();
    
    // Restore process.argv
    process.argv = originalArgv;
  });

  describe('init command', () => {
    test('creates necessary directories', () => {
      process.argv = ['node', 'claude-logger.js', 'init'];
      require('../bin/claude-logger.js');
      
      expect(fs.existsSync(logsDir)).toBe(true);
      expect(fs.existsSync(path.join(logsDir, 'projects'))).toBe(true);
      expect(fs.existsSync(path.join(logsDir, 'sessions'))).toBe(true);
    });

    test('creates initial log file', () => {
      process.argv = ['node', 'claude-logger.js', 'init'];
      require('../bin/claude-logger.js');
      
      const today = new Date().toISOString().split('T')[0];
      const logFile = path.join(logsDir, `${today}.md`);
      
      expect(fs.existsSync(logFile)).toBe(true);
      
      const content = fs.readFileSync(logFile, 'utf8');
      expect(content).toContain(`# ${today} 作業ログ`);
      expect(content).toContain('Claude Logger initialized');
    });

    test('displays success message', () => {
      process.argv = ['node', 'claude-logger.js', 'init'];
      require('../bin/claude-logger.js');
      
      const output = consoleCapture.output.join('\n');
      expect(output).toContain('Initializing Claude Logger');
      expect(output).toContain('Claude Logger initialized!');
      expect(output).toContain(logsDir);
    });
  });

  describe('start command', () => {
    test('generates session ID and creates script', () => {
      process.argv = ['node', 'claude-logger.js', 'start'];
      require('../bin/claude-logger.js');
      
      const output = consoleCapture.output.join('\n');
      expect(output).toContain('Starting Claude Logger session:');
      expect(output).toContain('To activate logging in this terminal, run:');
      expect(output).toContain('source /');
      expect(output).toContain('claude-session-');
    });
  });

  describe('stats command', () => {
    beforeEach(() => {
      // Create test session files
      fs.mkdirSync(path.join(logsDir, 'sessions'), { recursive: true });
      
      const today = new Date().toISOString().split('T')[0];
      const sessionContent = `[10:30] Starting work
- Implemented feature X
[10:45] Fixed bug
- Added +50,000 tokens
[11:00] Done
- Used 25,000 tokens`;
      
      fs.writeFileSync(
        path.join(logsDir, 'sessions', `${today}-session-test.md`),
        sessionContent
      );
    });

    test('displays today stats by default', () => {
      process.argv = ['node', 'claude-logger.js', 'stats'];
      require('../bin/claude-logger.js');
      
      const output = consoleCapture.output.join('\n');
      expect(output).toContain('Claude Logger - Productivity Stats');
      expect(output).toContain('Period: today');
      expect(output).toContain('Sessions: 1');
      expect(output).toContain('Log Entries: 2');
      expect(output).toContain('Token Usage: 75,000 tokens');
    });

    test('handles --week option', () => {
      process.argv = ['node', 'claude-logger.js', 'stats', '--week'];
      require('../bin/claude-logger.js');
      
      const output = consoleCapture.output.join('\n');
      expect(output).toContain('Period: --week');
    });

    test('handles --yesterday option', () => {
      process.argv = ['node', 'claude-logger.js', 'stats', '--yesterday'];
      require('../bin/claude-logger.js');
      
      const output = consoleCapture.output.join('\n');
      expect(output).toContain('Period: --yesterday');
    });
  });

  describe('dashboard command', () => {
    test('shows message when no sessions found', () => {
      // Ensure sessions directory is empty
      const sessionsDir = path.join(logsDir, 'sessions');
      if (fs.existsSync(sessionsDir)) {
        fs.readdirSync(sessionsDir).forEach(file => {
          fs.unlinkSync(path.join(sessionsDir, file));
        });
      }
      
      process.argv = ['node', 'claude-logger.js', 'dashboard'];
      require('../bin/claude-logger.js');
      
      const output = consoleCapture.output.join('\n');
      expect(output).toContain('Claude Logger - Live Dashboard');
      expect(output).toContain('No sessions found for today');
    });
  });

  describe('list command', () => {
    test('lists session files', () => {
      // Create test session files
      const sessionsDir = path.join(logsDir, 'sessions');
      fs.mkdirSync(sessionsDir, { recursive: true });
      
      fs.writeFileSync(path.join(sessionsDir, 'session1.md'), 'test content');
      fs.writeFileSync(path.join(sessionsDir, 'session2.md'), 'test content 2');
      
      process.argv = ['node', 'claude-logger.js', 'list'];
      require('../bin/claude-logger.js');
      
      const output = consoleCapture.output.join('\n');
      expect(output).toContain('Claude Logger - Session List');
      expect(output).toContain('Found 2 session file(s)');
      expect(output).toContain('session1.md');
      expect(output).toContain('session2.md');
    });
  });

  describe('help command', () => {
    test('displays help for unknown command', () => {
      process.argv = ['node', 'claude-logger.js', 'unknown'];
      require('../bin/claude-logger.js');
      
      const output = consoleCapture.output.join('\n');
      expect(output).toContain('Claude Logger - Command your productivity empire');
      expect(output).toContain('Commands:');
      expect(output).toContain('claude-logger init');
    });

    test('displays help when no command', () => {
      process.argv = ['node', 'claude-logger.js'];
      require('../bin/claude-logger.js');
      
      const output = consoleCapture.output.join('\n');
      expect(output).toContain('Claude Logger - Command your productivity empire');
    });
  });
});