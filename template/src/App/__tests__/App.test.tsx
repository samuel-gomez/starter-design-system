import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { App } from '../App';

describe('App Component', () => {
  it('should renders the correct text', () => {
    render(<App />);
    const textElement = screen.getByText(/template-starter-design-system/i);
    expect(textElement).toBeInTheDocument();
  });
});
