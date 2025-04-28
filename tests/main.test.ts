import minimist from 'minimist';
import { describe, expect, it, type Mock, vi } from 'vitest';
import { main } from '../src/main';

vi.mock('minimist', () => ({
  default: vi.fn(),
}));

describe('main.ts', () => {
  it('should log the project name and design system', async () => {
    (minimist as Mock).mockReturnValueOnce({
      'project-name': 'my-project',
      'design-system': 'apollo',
    });

    const consoleSpy = vi.spyOn(console, 'info').mockImplementation(() => {});

    await main();

    expect(consoleSpy).toHaveBeenCalledWith('You projectName: my-project');
    expect(consoleSpy).toHaveBeenCalledWith('You designSystem: apollo');
  });
});
