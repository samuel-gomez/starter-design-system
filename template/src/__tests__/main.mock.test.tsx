import { waitFor } from '@testing-library/react';
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';
import { worker } from '../../mocks/browser';

vi.mock('../../mocks/browser', () => ({
  worker: {
    start: vi.fn(),
  },
}));

vi.mock('../App/App', () => ({
  App: () => <div>AppMock</div>,
}));

beforeAll(async () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  import.meta.env.FRONT_MOCK_ENABLE = 'true';
});

afterAll(() => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  import.meta.env.FRONT_MOCK_ENABLE = 'false';
});

describe('main.ts', () => {
  it('should register the custom element react-app', async () => {
    await import('../main');
    await waitFor(() => {
      expect(customElements.get('react-app')).toBeDefined();
    });

    expect(worker.start).toHaveBeenCalledWith({ onUnhandledRequest: 'warn' });
  });
});
