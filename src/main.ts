import { select } from '@clack/prompts';

export const main = async () => {
  const designSystemSelect = await select({
    message: 'Which design system do you want to use?',
    options: [
      { value: 'slash', label: 'Slash' },
      { value: 'apollo', label: 'Apollo' },
      { value: 'lf', label: 'Look and Feel' },
    ],
  });

  console.info(`You selected: ${designSystemSelect.toString()}`);
};
