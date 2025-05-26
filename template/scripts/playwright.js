/* eslint-disable import/no-extraneous-dependencies */
import { execSync } from 'child_process';
import { loadEnv } from 'vite';

const runCommand = command => {
  console.info(`> ${command}`);
  execSync(command, { cwd: process.cwd(), stdio: 'inherit' });
};

const main = async () => {
  const args = process.argv.slice(2);

  const configIndex = args.indexOf('--config');
  const configValue = configIndex !== -1 ? args[configIndex + 1] : '';

  loadEnv('playwright', process.cwd(), '');

  if (args[0] === 'test' && !configValue.includes('a11y')) {
    runCommand('npx rimraf tests/.features-gen');

    if (args.indexOf('--watch') !== -1) {
      const command = `node scripts/playwright.js ${args.filter(a => a !== '--watch').join(' ')}`;

      runCommand(
        `npx nodemon --watch ./tests/ --ignore ./tests/.features-gen --ext feature,js,jx,ts,tsx --exec "${command}"`,
      );

      return;
    }

    const bddgenArgs = [];

    if (configValue) {
      bddgenArgs.push(`--config ${configValue}`);
    }

    runCommand(`npx bddgen test ${bddgenArgs.join(' ')}`);
  }

  let playwrightArgs = [...args];

  if (playwrightArgs.indexOf('--coverage') !== -1) {
    process.env.ENABLED_COVERAGE = 'true';
    playwrightArgs = playwrightArgs.filter(p => p !== '--coverage');
  }

  runCommand(`npx playwright ${playwrightArgs.join(' ')}`);
};

main().catch(e => process.exit(e.status));
