import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { FormDemo } from '../FormDemo';

// Utilitaire pour remplir le formulaire
const fillForm = async (firstName: string, email: string) => {
  const user = userEvent.setup();
  await user.type(screen.getByLabelText(/prénom/i), firstName);
  await user.type(screen.getByLabelText(/email/i), email);
  return user;
};

describe('FormDemo', () => {
  it('affiche le titre et les champs', () => {
    render(<FormDemo />);
    expect(screen.getByRole('heading', { name: /react hook form/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/prénom/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /envoyer/i })).toBeInTheDocument();
  });

  it('affiche les erreurs de validation si champs requis manquants', async () => {
    render(<FormDemo />);
    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: /envoyer/i }));
    expect(await screen.findByText(/le prénom est requis/i)).toBeInTheDocument();
    expect(await screen.findByText(/l’email est requis/i)).toBeInTheDocument();
  });

  it('affiche une erreur si le format de l’email est invalide', async () => {
    render(<FormDemo />);
    await fillForm('Jean', 'not-an-email');
    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: /envoyer/i }));
    expect(await screen.findByText(/format d’email invalide/i)).toBeInTheDocument();
  });

  it('appelle la fonction de soumission avec les bonnes valeurs', async () => {
    const consoleSpy = vi.spyOn(console, 'info').mockImplementation(() => {});
    render(<FormDemo />);
    await fillForm('Jean', 'jean@email.com');
    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: /envoyer/i }));
    expect(consoleSpy).toHaveBeenCalledWith('Form data:', {
      firstName: 'Jean',
      email: 'jean@email.com',
    });
    consoleSpy.mockRestore();
  });
});
