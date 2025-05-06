import { runCommand } from '@/helper/runCommand';
import { spinner } from '@clack/prompts';
import pc from 'picocolors';

export const initGitRepository = async (projectPath: string) => {
  const spinnerInstance = spinner();
  spinnerInstance.start(`${pc.green('Initializing git')} repository.`);

  await runCommand(`cd ${projectPath} && git init --initial-branch=main`);
  await runCommand(`cd ${projectPath} && git add .`);
  await runCommand(`cd ${projectPath} && git commit --no-verify --message "Initial commit"`);

  spinnerInstance.stop(pc.green('Git repository initialized successfully.'));
};
