import { getPromptArgs } from '@/getPromptArgs';
import * as prompts from '@clack/prompts';
import minimist from 'minimist';
import { describe, expect, it, type Mock, vi } from 'vitest';

vi.mock('@clack/prompts', async importOriginal => {
  const original = (await importOriginal()) as typeof prompts;
  return {
    ...original,
    text: vi.fn(),
    select: vi.fn(),
    log: {
      error: vi.fn(),
      message: vi.fn(),
    },
    outro: vi.fn(),
  };
});

vi.mock('minimist', () => ({
  default: vi.fn(),
}));

describe('getPromptArgs', () => {
  vi.spyOn(process, 'exit').mockImplementation(existCode => {
    throw new Error(`process.exit called with code: ${existCode}`);
  });

  it('should return projectName and designSystem from CLI arguments', async () => {
    (minimist as Mock).mockReturnValueOnce({
      'project-name': 'my-project',
      'design-system': 'apollo',
    });

    const result = await getPromptArgs();
    expect(result).toStrictEqual({
      projectName: 'my-project',
      designSystem: 'apollo',
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
    });
  });

  it.each([['Invalid Name!'], [true]])('should log an error for invalid projectName (%s)', async projectName => {
    (minimist as Mock).mockReturnValueOnce({ 'project-name': projectName });

    await expect(getPromptArgs()).rejects.toThrow('process.exit called with code: 1');

    expect(prompts.log.error).toHaveBeenCalledWith(`The project name '${projectName}' is not valid.

A valid npm project name must start with a lowercase letter, a number, a hyphen, or a tilde, and can include dots, hyphens, tildes, or underscores.

If the project name starts with '@', it must be followed by a valid scope name and a '/'.`);
  });

  it('should log an error for invalid  designSystem', async () => {
    (minimist as Mock).mockReturnValueOnce({
      'project-name': 'my-project',
      'design-system': 'Invalid Name!',
    });

    await expect(getPromptArgs()).rejects.toThrow('process.exit called with code: 1');

    expect(prompts.log.error).toHaveBeenCalledWith(
      `The design system 'Invalid Name!' is not valid. Valid options are: apollo, slash, look&feel`,
    );
  });

  it('should log help message when --help is passed', async () => {
    (minimist as Mock).mockReturnValueOnce({ help: true });

    await expect(getPromptArgs()).rejects.toThrow('process.exit called with code: 0');

    expect(prompts.log.message).toHaveBeenCalledOnce();
    expect(prompts.outro).toHaveBeenCalledOnce();
  });

  it('should log version message when --version is passed', async () => {
    (minimist as Mock).mockReturnValueOnce({ version: true });

    await expect(getPromptArgs()).rejects.toThrow('process.exit called with code: 0');

    expect(prompts.outro).toHaveBeenCalledOnce();
  });
});
