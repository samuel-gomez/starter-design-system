import { waitFor } from '@testing-library/react';
import { setupWorker } from 'msw/browser';
import { afterAll, beforeAll, describe, expect, it, type Mock, vi } from 'vitest';

vi.mock('msw/browser', () => ({
  setupWorker: vi.fn(),
}));

beforeAll(async () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  import.meta.env.FRONT_MOCK_ENABLE = 'true';
  await import('../main');
});

afterAll(() => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  import.meta.env.FRONT_MOCK_ENABLE = 'false';
});

describe('main.ts', () => {
  it('should register the custom element react-app', async () => {
    const start = vi.fn();
    (setupWorker as Mock).mockImplementation(() => ({
      start,
    }));
    await waitFor(() => {
      expect(customElements.get('react-app')).toBeDefined();
    });
    expect(setupWorker).toHaveBeenCalledWith();
    expect(start).toHaveBeenCalledWith({ onUnhandledRequest: 'warn' });
  });
});
