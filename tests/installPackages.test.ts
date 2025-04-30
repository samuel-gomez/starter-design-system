import { installPackages } from '@/installPackages';
import { runCommand } from '@/runCommand';
import { describe, expect, it, type Mock, vi } from 'vitest';

vi.mock('../src/runCommand', () => ({
  runCommand: vi.fn(),
}));

vi.mock('@clack/prompts', () => ({
  spinner: vi.fn().mockImplementation(() => ({
    start: vi.fn(),
    stop: vi.fn(),
  })),
}));

describe('installPackages', () => {
  it('should install base packages', async () => {
    const mockRunCommand = runCommand as Mock;

    const projectPath = '/path/to/project';
    const designSystem = 'apollo';

    await installPackages({ projectPath, designSystem });

    expect(mockRunCommand).toHaveBeenCalledWith(`cd ${projectPath} && npm install`);
  });

  it.each([
    ['apollo', '@axa-fr/design-system-apollo-react@next @axa-fr/design-system-apollo-css@next'],
    ['slash', '@axa-fr/design-system-slash-react@latest @axa-fr/design-system-slash-css@latest'],
    [
      'look&feel',
      '@axa-fr/design-system-look-and-feel-react@next @axa-fr/design-system-look-and-feel-css@next @axa-fr/design-system-apollo-react@next @axa-fr/design-system-apollo-css@next',
    ],
  ])('should handle %s design systems', async (name, packages) => {
    const mockRunCommand = runCommand as Mock;

    const projectPath = '/path/to/project';
    const designSystem = name as DesignSystem;

    await installPackages({ projectPath, designSystem });

    expect(mockRunCommand).toHaveBeenCalledWith(`cd ${projectPath} && npm install ${packages}`);
  });
});
