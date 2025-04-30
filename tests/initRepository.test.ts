import { initRepository } from '@/initRepository';
import * as prompts from '@clack/prompts';
import { existsSync, mkdirSync, rmSync } from 'fs';
import { resolve } from 'path';
import { afterEach, describe, expect, it, vi } from 'vitest';

vi.mock('@clack/prompts', async importOriginal => {
  const original = (await importOriginal()) as typeof prompts;
  return {
    ...original,
    log: {
      error: vi.fn(),
      info: vi.fn(),
    },
  };
});

describe('initRepository', () => {
  const testDir = 'test-initRepository';
  const testPath = resolve(process.cwd(), testDir);

  vi.spyOn(process, 'exit').mockImplementation(existCode => {
    throw new Error(`process.exit called with code: ${existCode}`);
  });

  afterEach(() => {
    if (existsSync(testPath)) {
      rmSync(testPath, { recursive: true, force: true });
    }
  });

  it('should create a new directory for the project', () => {
    const { projectPath } = initRepository(testDir);

    expect(projectPath).toStrictEqual(testPath);
    expect(existsSync(projectPath)).toBeTruthy();
    expect(prompts.log.info).toHaveBeenCalledWith(`Creating a new React App in ${testDir}`);
  });

  it('should throw an error if the directory already exists', () => {
    mkdirSync(testDir, { recursive: true });

    expect(() => initRepository(testDir)).toThrow('process.exit called with code: 1');
    expect(prompts.log.error).toHaveBeenCalledWith(`The directory ${testDir} already exists.
Either try using a new directory name, or remove the files listed above and try again.
`);
  });
});
