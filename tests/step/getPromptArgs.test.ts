import { endProcess } from '@/helper/endProcess';
import { getPromptArgs } from '@/step/getPromptArgs';
import * as prompts from '@clack/prompts';
import minimist from 'minimist';
import { describe, expect, it, type Mock, vi } from 'vitest';

vi.mock('@/helper/endProcess', () => ({
  endProcess: vi.fn().mockImplementation(() => {
    throw new Error('End process called');
  }),
}));

describe('getPromptArgs', () => {
  it('should return projectName and designSystem from CLI arguments', async () => {
    (minimist as Mock).mockReturnValueOnce({
      'project-name': 'my-project',
      'design-system': 'apollo',
    });

    const result = await getPromptArgs();
    expect(result).toStrictEqual({
      projectName: 'my-project',
      designSystem: 'apollo',
      enableGit: false,
    });
  });

  it('should return projectName and designSystem from prompts typing', async () => {
    (minimist as Mock).mockReturnValueOnce({});
    (prompts.text as Mock).mockResolvedValueOnce('my-project');
    (prompts.select as Mock).mockResolvedValueOnce('apollo');

    const result = await getPromptArgs();
    expect(result).toStrictEqual({
      projectName: 'my-project',
      designSystem: 'apollo',
      enableGit: false,
    });
  });

  it('should return projectName, designSystem, and enableGit from CLI arguments', async () => {
    (minimist as Mock).mockReturnValueOnce({
      'project-name': 'my-project',
      'design-system': 'apollo',
      'use-git': true,
    });

    const result = await getPromptArgs();
    expect(result).toStrictEqual({
      projectName: 'my-project',
      designSystem: 'apollo',
      enableGit: true,
    });
  });

  it('should return projectName, designSystem, and enableGit from prompts typing', async () => {
    (minimist as Mock).mockReturnValueOnce({});
    (prompts.text as Mock).mockResolvedValueOnce('my-project');
    (prompts.select as Mock).mockResolvedValueOnce('apollo');
    (prompts.confirm as Mock).mockResolvedValueOnce(true);

    const result = await getPromptArgs();
    expect(result).toStrictEqual({
      projectName: 'my-project',
      designSystem: 'apollo',
      enableGit: true,
    });
  });

  it('should set enableGit to false when user declines git initialization', async () => {
    (minimist as Mock).mockReturnValueOnce({});
    (prompts.text as Mock).mockResolvedValueOnce('my-project');
    (prompts.select as Mock).mockResolvedValueOnce('apollo');
    (prompts.confirm as Mock).mockResolvedValueOnce(false);

    const result = await getPromptArgs();
    expect(result).toStrictEqual({
      projectName: 'my-project',
      designSystem: 'apollo',
      enableGit: false,
    });
  });

  it.each([['Invalid Name!'], [true]])('should log an error for invalid projectName (%s)', async projectName => {
    (minimist as Mock).mockReturnValueOnce({ 'project-name': projectName });

    await expect(getPromptArgs()).rejects.toThrow('End process called');

    expect(prompts.log.error).toHaveBeenCalledWith(`The project name '${projectName}' is not valid.

A valid npm project name must start with a lowercase letter, a number, a hyphen, or a tilde, and can include dots, hyphens, tildes, or underscores.

If the project name starts with '@', it must be followed by a valid scope name and a '/'.`);
    expect(endProcess).toHaveBeenCalledWith(true);
  });

  it('should log an error for invalid  designSystem', async () => {
    (minimist as Mock).mockReturnValueOnce({
      'project-name': 'my-project',
      'design-system': 'Invalid Name!',
    });

    await expect(getPromptArgs()).rejects.toThrow('End process called');

    expect(prompts.log.error).toHaveBeenCalledWith(
      `The design system 'Invalid Name!' is not valid. Valid options are: apollo, slash, look&feel`,
    );
    expect(endProcess).toHaveBeenCalledWith(true);
  });

  it('should log help message when --help is passed', async () => {
    (minimist as Mock).mockReturnValueOnce({ help: true });

    await expect(getPromptArgs()).rejects.toThrow('End process called');

    expect(prompts.log.message).toHaveBeenCalledOnce();
    expect(prompts.outro).toHaveBeenCalledOnce();
  });

  it('should log version message when --version is passed', async () => {
    (minimist as Mock).mockReturnValueOnce({ version: true });

    await expect(getPromptArgs()).rejects.toThrow('End process called');

    expect(prompts.outro).toHaveBeenCalledOnce();
  });
});
