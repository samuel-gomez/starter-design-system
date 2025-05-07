import { prepareHusky } from '@/step/prepareHusky';
import { readFileSync, writeFileSync } from 'fs';
import { describe, expect, it, Mock, vi } from 'vitest';

vi.mock('fs', () => ({
  readFileSync: vi.fn(),
  writeFileSync: vi.fn(),
}));
vi.mock('path', async () => {
  const actual = await vi.importActual('path');
  return {
    ...actual,
    resolve: vi.fn((...args: string[]) => args.join('/')),
  };
});

describe('prepareHusky', () => {
  it('should add prepare script to package.json', async () => {
    const projectPath = '/path/to/project';
    const fakePackageJson = {
      name: 'test',
      scripts: { test: 'vitest' },
    };
    (readFileSync as unknown as Mock).mockReturnValue(JSON.stringify(fakePackageJson));

    await prepareHusky(projectPath);

    expect(readFileSync).toHaveBeenCalledWith('/path/to/project/package.json', { encoding: 'utf-8' });
    expect(writeFileSync).toHaveBeenCalledWith(
      '/path/to/project/package.json',
      expect.stringContaining('"prepare": "husky"'),
      { encoding: 'utf-8' },
    );
  });
});
