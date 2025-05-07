import { getPromptArgs } from '@/step/getPromptArgs';
import { gitCommitRepository, gitRepository } from '@/step/gitRepository';
import { initRepository } from '@/step/initRepository';
import { installPackages } from '@/step/installPackages';
import { prepareRepository } from '@/step/prepareRepository';
import { intro, log, note, outro } from '@clack/prompts';
import pc from 'picocolors';
import { prepareHusky } from './step/prepareHusky';

export const main = async () => {
  intro(`Create React App With ${pc.blue('AXA Design System')}`);

  const { projectName, designSystem, enableGit } = await getPromptArgs();

  const { projectPath } = initRepository(projectName);

  prepareRepository({ projectPath, projectName });

  if (enableGit) {
    await gitRepository(projectPath);
    await prepareHusky(projectPath);
  }

  await installPackages({ projectPath, designSystem });

  if (enableGit) {
    await gitCommitRepository(projectPath);
  }

  log.success(`${pc.yellow('Success \\o/')} Created ${pc.green(projectName)} at ${pc.green(projectPath)}`);
  note(
    `Inside that directory, you can run several commands:
 ${pc.cyan('npm start')}    Starts the development server.
 ${pc.cyan('npm build')}    Bundles the app into static files for production.

We suggest that you begin by typing:
 ${pc.cyan('cd')} ${projectName}
 ${pc.cyan('npm start')}`,
    'What next?',
  );

  outro('Happy hacking!');
};
