import { cancel, isCancel } from '@clack/prompts';

const cancelAndExit = () => {
  cancel('Operation cancelled.');
  process.exit(0);
};

export const checkCancel = <V>(value: V): V => {
  if (isCancel(value)) {
    cancelAndExit();
  }

  return value;
};
