import { runCommand } from '@/helper/runCommand';
import { main } from '@/main';
import { note, outro } from '@clack/prompts';
import { existsSync, readFileSync, rmSync } from 'fs';
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

  it('should log project details and skip git initialization when enableGit is false', async () => {
    (minimist as Mock).mockReturnValueOnce({
      'project-name': testDir,
      'design-system': 'apollo',
      'use-git': false,
    });

    await main();

    expect(runCommand).toHaveBeenCalledTimes(2);
    expect(runCommand).toHaveBeenCalledWith(expect.stringContaining('npm install'));
    expect(note).toHaveBeenCalledWith(expect.stringContaining('npm start'), 'What next?');
    expect(note).toHaveBeenCalledWith(expect.stringContaining('npm build'), 'What next?');
    expect(outro).toHaveBeenCalledWith(expect.stringContaining('Happy hacking!'));
  });

  it('should log project details and initialize git repository when enableGit is true', async () => {
    (minimist as Mock).mockReturnValueOnce({
      'project-name': testDir,
      'design-system': 'apollo',
      'use-git': true,
    });

    await main();

    expect(runCommand).toHaveBeenCalledTimes(5);
    expect(runCommand).toHaveBeenCalledWith(expect.stringContaining('npm install'));
    expect(runCommand).toHaveBeenCalledWith(expect.stringContaining('git init'));
    expect(runCommand).toHaveBeenCalledWith(expect.stringContaining('git commit'));
  });

  it('should add prepare script in package.json when use-git is true', async () => {
    (minimist as Mock).mockReturnValueOnce({
      'project-name': testDir,
      'design-system': 'apollo',
      'use-git': true,
    });

    await main();

    const pkg = JSON.parse(readFileSync(resolve(testPath, 'package.json'), { encoding: 'utf-8' }));
    expect(pkg.scripts.prepare).toBe('husky');
  });

  it('should NOT add prepare script in package.json when use-git is false', async () => {
    (minimist as Mock).mockReturnValueOnce({
      'project-name': testDir,
      'design-system': 'apollo',
      'use-git': false,
    });

    await main();

    const pkg = JSON.parse(readFileSync(resolve(testPath, 'package.json'), { encoding: 'utf-8' }));

    expect(pkg.scripts.prepare).toBeUndefined();
  });
});
