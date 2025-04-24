import { main } from '@/main';
import { describe, expect, it, vi } from 'vitest';

describe('index.ts', () => {
  it('should log the correct message', async () => {
    const consoleSpy = vi.spyOn(console, 'info').mockImplementation(() => {});

    main();

    expect(consoleSpy).toHaveBeenCalledWith('Hello, world! This is a test.');

    consoleSpy.mockRestore();
  });
});
