import { runCommand } from '@/helper/runCommand';
import { gitCommitRepository, gitRepository } from '@/step/gitRepository';
import { describe, expect, it, vi } from 'vitest';

vi.mock('@/helper/runCommand', () => ({
  runCommand: vi.fn(),
}));

describe('initGitRepository', () => {
  it('should initialize a git repository', async () => {
    const projectPath = '/path/to/project';

    await gitRepository(projectPath);

    expect(runCommand).toHaveBeenCalledWith(`cd ${projectPath} && git init --initial-branch=main`);
  });
});

describe('gitCommitRepository', () => {
  it('should add all files and make an initial commit', async () => {
    const projectPath = '/path/to/project';

    await gitCommitRepository(projectPath);

    expect(runCommand).toHaveBeenCalledWith(`cd ${projectPath} && git add .`);
    expect(runCommand).toHaveBeenCalledWith(`cd ${projectPath} && git commit --no-verify --message "Initial commit"`);
  });
});
