import { getPromptArgs } from '@/getPromptArgs';
import { intro } from '@clack/prompts';

export const main = async () => {
  intro('Create React App With Axa Design System');

  const { projectName, designSystem } = await getPromptArgs();

  console.info(`You projectName: ${projectName}`);
  console.info(`You designSystem: ${designSystem}`);
};
