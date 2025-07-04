import { waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { worker } from '../../mocks/browser';

vi.mock('../../mocks/browser', () => ({
  worker: {
    start: vi.fn(),
  },
}));

vi.mock('../App/App', () => ({
  App: () => <div>AppMock</div>,
}));

describe('main.ts', () => {
  it('should register the custom element react-app', async () => {
    await import('../main');
    await waitFor(() => {
      expect(customElements.get('react-app')).toBeDefined();
    });

    expect(worker.start).not.toHaveBeenCalledWith({ onUnhandledRequest: 'warn' });
  });
});
