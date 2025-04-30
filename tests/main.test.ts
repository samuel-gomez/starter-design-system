import * as prompts from '@clack/prompts';
import { existsSync, rmSync } from 'fs';
import minimist from 'minimist';
import { resolve } from 'path';
import { afterEach, describe, expect, it, type Mock, vi } from 'vitest';
import { main } from '../src/main';
import { runCommand } from '../src/runCommand';

vi.mock('../src/runCommand', () => ({
  runCommand: vi.fn(),
}));

vi.mock('minimist', () => ({
  default: vi.fn(),
}));

vi.mock('@clack/prompts', async importOriginal => {
  const original = (await importOriginal()) as typeof prompts;
  return {
    ...original,
    intro: vi.fn(),
    log: {
      info: vi.fn(),
    },
    spinner: vi.fn().mockImplementation(() => ({
      start: vi.fn(),
      stop: vi.fn(),
    })),
  };
});

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
