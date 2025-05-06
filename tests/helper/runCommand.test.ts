import { endProcess } from '@/helper/endProcess';
import { runCommand } from '@/helper/runCommand';
import * as prompts from '@clack/prompts';
import { exec } from 'child_process';
import { describe, expect, it, type Mock, vi } from 'vitest';

vi.mock('child_process', () => ({
  exec: vi.fn(),
}));

vi.mock('@/helper/endProcess', () => ({
  endProcess: vi.fn().mockImplementation(() => {
    throw new Error('End process called');
  }),
}));

describe('runCommand', () => {
  it('should execute the command successfully', async () => {
    (exec as unknown as Mock).mockImplementation((_, callback) => {
      callback(null);
    });

    await runCommand('echo "Hello World"');

    expect(exec).toHaveBeenCalledWith('echo "Hello World"', expect.any(Function));
  });

  it('should handle errors and exit the process', async () => {
    (exec as unknown as Mock).mockImplementation((_, callback) => {
      callback(new Error('Command failed'));
    });
    (prompts.log.error as Mock).mockImplementation(() => {});

    await expect(runCommand('invalid-command')).rejects.toThrow('End process called');
    expect(exec).toHaveBeenCalledWith('invalid-command', expect.any(Function));
    expect(prompts.log.error).toHaveBeenCalledWith('Failed to execute invalid-command');
    expect(endProcess).toHaveBeenCalledWith(true);
  });
});
