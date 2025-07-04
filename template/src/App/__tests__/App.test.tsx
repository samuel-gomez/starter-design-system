import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { App } from '../App';

vi.mock('../Routing/routes', () => ({
  routesObject: [
    {
      path: '/',
      element: <div>Hello world</div>,
    },
  ],
}));

describe('App Component', () => {
  it('should render the BrowserRouter component', () => {
    render(<App />);

    expect(screen.getByText('Hello world')).toBeVisible();
  });
});
