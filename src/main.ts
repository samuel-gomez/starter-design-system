import { getPromptArgs } from '@/step/getPromptArgs';
import { initRepository } from '@/step/initRepository';
import { installPackages } from '@/step/installPackages';
import { prepareRepository } from '@/step/prepareRepository';
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
