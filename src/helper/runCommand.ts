import { log } from '@clack/prompts';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export const runCommand = async (command: string) => {
  const { stderr } = await execAsync(command);

  if (stderr) {
    log.error(`Failed to execute ${command}`);
    process.exit(-1);
  }
};
