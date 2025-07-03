import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { FormDemo } from '../FormDemo';

describe('FormDemo', () => {
  it('renders the form with all fields', () => {
    render(<FormDemo />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /login form example/i })).toBeInTheDocument();
  });

  it('shows an error if the email field is empty', async () => {
    render(<FormDemo />);
    await userEvent.click(screen.getByRole('button', { name: /login/i }));
    expect(screen.getByText(/email is required/i)).toBeInTheDocument();
  });

  it('shows an error if the email field is invalid', async () => {
    render(<FormDemo />);
    await userEvent.type(screen.getByLabelText(/email/i), 'invalid-email');
    await userEvent.click(screen.getByRole('button', { name: /login/i }));
    expect(screen.getByText(/invalid email format/i)).toBeInTheDocument();
  });

  it('shows an error if the password field is empty', async () => {
    render(<FormDemo />);
    await userEvent.type(screen.getByLabelText(/email/i), 'test@email.com');
    await userEvent.click(screen.getByRole('button', { name: /login/i }));
    expect(screen.getByText(/password is required/i)).toBeInTheDocument();
  });

  it('submits the form with valid values', async () => {
    const consoleSpy = vi.spyOn(console, 'info').mockImplementation(() => {});
    render(<FormDemo />);
    await userEvent.type(screen.getByLabelText(/email/i), 'test@email.com');
    await userEvent.type(screen.getByLabelText(/password/i), '123456');
    await userEvent.click(screen.getByRole('button', { name: /login/i }));
    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith('Login data:', {
        email: 'test@email.com',
        password: '123456',
      });
    });
    consoleSpy.mockRestore();
  });
});
