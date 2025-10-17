const { spawn } = require('child_process');
const path = require('path');

// Resolve absolute paths to avoid any working-directory issues on Windows shells.
const repoRoot = path.resolve(__dirname, '..');
const genkitCli = path.join(repoRoot, 'node_modules', 'genkit-cli', 'dist', 'bin', 'genkit.js');
const tsxCli = path.join(repoRoot, 'node_modules', 'tsx', 'dist', 'cli.mjs');
const devEntry = path.join(repoRoot, 'src', 'ai', 'dev.ts');

console.log('Starting Genkit (watch) with absolute paths...');
console.log('genkit-cli:', genkitCli);
console.log('tsx cli:', tsxCli);
console.log('dev entry:', devEntry);

const args = [genkitCli, 'start', '--', 'node', tsxCli, '--watch', devEntry];
const child = spawn('node', args, {
  cwd: repoRoot,
  stdio: 'inherit',
  shell: false,
});

child.on('exit', (code) => {
  console.log(`Genkit process exited with code ${code}`);
});