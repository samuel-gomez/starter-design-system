import { endProcess } from '@/helper/endProcess';
import { cancel, isCancel } from '@clack/prompts';

const cancelAndExit = () => {
  cancel('Operation cancelled.');
  endProcess();
};

export const checkCancel = <V>(value: V): V => {
  if (isCancel(value)) {
    cancelAndExit();
  }

  return value;
};
