import { endProcess } from '@/helper/endProcess';
import { log } from '@clack/prompts';
import { existsSync, mkdirSync } from 'fs';
import { resolve } from 'path';

export const initRepository = (projectName: ProjectName) => {
  const projectPath = resolve(process.cwd(), projectName);

  if (existsSync(projectPath)) {
    log.error(`The directory ${projectName} already exists.
Either try using a new directory name, or remove the files listed above and try again.
`);
    endProcess(true);
  }

  log.info(`Creating a new React App in ${projectName}`);
  mkdirSync(projectPath, { recursive: true });

  return {
    projectPath,
  };
};
