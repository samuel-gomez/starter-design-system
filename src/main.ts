import { getPromptArgs } from '@/step/getPromptArgs';
import { initGitRepository } from '@/step/initGitRepository';
import { initRepository } from '@/step/initRepository';
import { installPackages } from '@/step/installPackages';
import { prepareRepository } from '@/step/prepareRepository';
import { intro, log, note, outro } from '@clack/prompts';

export const main = async () => {
  intro('Create React App With Axa Design System');

  const { projectName, designSystem, enableGit } = await getPromptArgs();

  const { projectPath } = initRepository(projectName);

  prepareRepository({ projectPath, projectName });

  await installPackages({ projectPath, designSystem });

  if (enableGit) {
    await initGitRepository(projectPath);
  }

  log.success(`Success \\o/ Created ${projectName} at ${projectPath}`);
  note(`Inside that directory, you can run several commands:
 npm start    Starts the development server.
 npm build    Bundles the app into static files for production.

We suggest that you begin by typing:
 cd ${projectName}
 npm start`);

  outro('Happy hacking!');
};
