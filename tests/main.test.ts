import { runCommand } from '@/helper/runCommand';
import { main } from '@/main';
import { existsSync, rmSync } from 'fs';
import minimist from 'minimist';
import { resolve } from 'path';
import { afterEach, describe, expect, it, type Mock, vi } from 'vitest';

vi.mock('@/helper/runCommand', () => ({
  runCommand: vi.fn(),
}));

describe('main.ts', () => {
  const testDir = 'test-main';
  const testPath = resolve(process.cwd(), testDir);

  afterEach(() => {
    if (existsSync(testPath)) {
      rmSync(testPath, { recursive: true });
    }
  });

  it('should log the project name and design system', async () => {
    (minimist as Mock).mockReturnValueOnce({
      'project-name': testDir,
      'design-system': 'apollo',
    });

    const consoleSpy = vi.spyOn(console, 'info').mockImplementation(() => {});

    await main();

    expect(consoleSpy).toHaveBeenCalledWith(`You projectName: ${testDir}`);
    expect(consoleSpy).toHaveBeenCalledWith('You designSystem: apollo');
    expect(runCommand).toHaveBeenCalledTimes(2);
  });
});
