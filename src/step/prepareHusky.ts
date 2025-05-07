import { runCommand } from '@/helper/runCommand';
import { spinner } from '@clack/prompts';

export const prepareHusky = async (projectPath: string) => {
  const spinnerInstance = spinner();
  spinnerInstance.start('Configuring project.');

  await runCommand(`cd ${projectPath} && npm run prepare`);

  spinnerInstance.stop('Project configured successfully.');
};
