import { setupWorker } from 'msw/browser';
import { beforeAll, describe, expect, it, vi } from 'vitest';

vi.mock('msw/browser', () => ({
  setupWorker: vi.fn(),
}));

beforeAll(async () => {
  await import('../main');
});

describe('main.ts', () => {
  it('should register the custom element react-app', () => {
    expect(customElements.get('react-app')).toBeDefined();
    expect(setupWorker).not.toHaveBeenCalledWith();
  });
});
