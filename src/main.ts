import { getPromptArgs } from '@/getPromptArgs';
import { initRepository } from '@/initRepository';
import { intro } from '@clack/prompts';

export const main = async () => {
  intro('Create React App With Axa Design System');

  const { projectName, designSystem } = await getPromptArgs();

  const { projectPath } = initRepository(projectName);

  console.info(`You projectName: ${projectName}`);
  console.info(`You designSystem: ${designSystem}`);
  console.info(`You projectPath: ${projectPath}`);
};
