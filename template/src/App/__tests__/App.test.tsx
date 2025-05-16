import { render, screen } from '@testing-library/react';
import { App } from '../App';

describe('App Component', () => {
  it('renders the correct text', () => {
    render(<App />);
    const textElement = screen.getByText(/template-starter-design-system/i);
    expect(textElement).toBeInTheDocument();
  });
});
