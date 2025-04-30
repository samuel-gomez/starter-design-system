import { runCommand } from '@/helper/runCommand';
import { initGitRepository } from '@/step/initGitRepository';
import { describe, expect, it, vi } from 'vitest';

vi.mock('@/helper/runCommand', () => ({
  runCommand: vi.fn(),
}));

describe('initGitRepository', () => {
  it('should initialize a git repository and make an initial commit', async () => {
    const projectPath = '/path/to/project';

    await initGitRepository(projectPath);

    expect(runCommand).toHaveBeenCalledWith(`cd ${projectPath} && git init --initial-branch=main`);
    expect(runCommand).toHaveBeenCalledWith(`cd ${projectPath} && git add .`);
    expect(runCommand).toHaveBeenCalledWith(`cd ${projectPath} && git commit --no-verify --message "Initial commit"`);
  });
});
