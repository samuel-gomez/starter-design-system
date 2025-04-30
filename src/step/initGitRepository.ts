import { runCommand } from '@/helper/runCommand';
import { spinner } from '@clack/prompts';

export const initGitRepository = async (projectPath: string) => {
  const spinnerInstance = spinner();
  spinnerInstance.start('Initializing git repository.');

  await runCommand(`cd ${projectPath} && git init --initial-branch=main`);
  await runCommand(`cd ${projectPath} && git add .`);
  await runCommand(`cd ${projectPath} && git commit --no-verify --message "Initial commit"`);

  spinnerInstance.stop('Git repository initialized successfully.');
};
