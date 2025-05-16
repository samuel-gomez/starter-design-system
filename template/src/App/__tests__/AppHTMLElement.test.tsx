import { waitFor } from '@testing-library/react';
import { createRoot } from 'react-dom/client';
import { afterEach, beforeEach, describe, expect, it, type Mock, vi } from 'vitest';
import { App } from '../App';
import { AppHTMLElement } from '../AppHTMLElement';

vi.mock('../App', () => ({
  App: () => <div data-testid="app-mock">AppMock</div>,
}));

vi.mock('react-dom/client', () => ({
  createRoot: vi.fn(),
}));

describe('AppHTMLElement', () => {
  let container: HTMLElement;
  const render = vi.fn();
  const unmount = vi.fn();
  (createRoot as Mock).mockImplementation(() => ({
    render,
    unmount,
  }));

  customElements.define('app-html-element', AppHTMLElement);

  beforeEach(() => {
    container = document.createElement('app-html-element') as HTMLElement;
  });

  afterEach(() => {
    container.remove();
  });

  it('should mount the React component in the custom element', () => {
    document.body.appendChild(container);

    expect(createRoot as Mock).toHaveBeenCalledWith(expect.anything());
    expect(render).toBeCalledWith(<App />);
    expect(unmount).not.toHaveBeenCalled();
  });

  it('should unmount the React component when removed from the DOM', async () => {
    document.body.appendChild(container);

    expect(unmount).not.toHaveBeenCalled();

    container.remove();

    await waitFor(() => {
      expect(unmount).toHaveBeenCalledWith();
    });
  });
});
