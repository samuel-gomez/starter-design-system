import { initRepository } from '@/step/initRepository';
import * as prompts from '@clack/prompts';
import { existsSync, mkdirSync, rmSync } from 'fs';
import { resolve } from 'path';
import { afterEach, describe, expect, it, vi } from 'vitest';

vi.mock('@/helper/endProcess', () => ({
  endProcess: vi.fn().mockImplementation(() => {
    throw new Error('End process called');
  }),
}));

describe('initRepository', () => {
  const testDir = 'test-initRepository';
  const testPath = resolve(process.cwd(), testDir);

  afterEach(() => {
    if (existsSync(testPath)) {
      rmSync(testPath, { recursive: true, force: true });
    }
  });

  it('should create a new directory for the project', () => {
    const { projectPath } = initRepository(testDir);

    expect(projectPath).toStrictEqual(testPath);
    expect(existsSync(projectPath)).toBeTruthy();
    expect(prompts.log.info).toHaveBeenCalledWith(`Creating a new React App in ${testPath}`);
  });

  it('should throw an error if the directory already exists', () => {
    mkdirSync(testDir, { recursive: true });

    expect(() => initRepository(testDir)).toThrow('End process called');
    expect(prompts.log.error).toHaveBeenCalledWith(expect.stringContaining(`The directory ${testDir} already exists.`));
  });
});
