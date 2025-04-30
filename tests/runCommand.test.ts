import { runCommand } from '@/runCommand';
import * as prompts from '@clack/prompts';
import { exec } from 'child_process';
import { describe, expect, it, type Mock, vi } from 'vitest';

vi.mock('child_process', () => ({
  exec: vi.fn(),
}));

vi.mock('@clack/prompts', () => ({
  log: {
    error: vi.fn(),
  },
}));

describe('runCommand', () => {
  it('should execute the command successfully', async () => {
    (exec as unknown as Mock).mockImplementation((_, callback) => {
      callback(null, { stdout: 'Command executed successfully' });
    });

    await runCommand('echo "Hello World"');

    expect(exec).toHaveBeenCalledWith('echo "Hello World"', expect.any(Function));
  });

  it('should handle errors and exit the process', async () => {
    const mockExit = vi.spyOn(process, 'exit').mockImplementation(() => {
      throw new Error('process.exit called');
    });
    (exec as unknown as Mock).mockImplementation((_, callback) => {
      callback(null, { stderr: 'Command failed' });
    });
    (prompts.log.error as Mock).mockImplementation(() => {});

    await expect(runCommand('invalid-command')).rejects.toThrow('process.exit called');
    expect(exec).toHaveBeenCalledWith('invalid-command', expect.any(Function));
    expect(prompts.log.error).toHaveBeenCalledWith('Failed to execute invalid-command');
    expect(mockExit).toHaveBeenCalledWith(-1);
  });
});
