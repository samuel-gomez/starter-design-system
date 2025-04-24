import { select } from '@clack/prompts';
import { describe, expect, it, type Mock, vi } from 'vitest';
import { main } from '../src/main';

vi.mock('@clack/prompts', () => ({
  select: vi.fn(),
}));

describe('main.ts', () => {
  it('should log the selected design system', async () => {
    const consoleSpy = vi.spyOn(console, 'info').mockImplementation(() => {});
    (select as Mock).mockResolvedValue('apollo');

    await main();

    expect(consoleSpy).toHaveBeenCalledWith('You selected: apollo');

    consoleSpy.mockRestore();
  });
});
