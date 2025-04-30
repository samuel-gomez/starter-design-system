import { getPromptArgs } from '@/getPromptArgs';
import { initRepository } from '@/initRepository';
import { installPackages } from '@/installPackages';
import { prepareRepository } from '@/prepareRepository';
import { intro } from '@clack/prompts';

export const main = async () => {
  intro('Create React App With Axa Design System');

  const { projectName, designSystem } = await getPromptArgs();

  const { projectPath } = initRepository(projectName);

  prepareRepository({ projectPath, projectName });

  await installPackages({ projectPath, designSystem });

  console.info(`You projectName: ${projectName}`);
  console.info(`You designSystem: ${designSystem}`);
  console.info(`You projectPath: ${projectPath}`);
};
