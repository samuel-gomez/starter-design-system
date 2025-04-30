import { endProcess } from '@/helper/endProcess';
import { log } from '@clack/prompts';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export const runCommand = async (command: string) => {
  try {
    await execAsync(command);
  } catch {
    log.error(`Failed to execute ${command}`);
    endProcess(true);
  }
};
