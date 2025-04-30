import { checkCancel } from '@/helper/checkCancel';
import { isCancel } from '@clack/prompts';
import { describe, expect, it, type Mock, vi } from 'vitest';

describe('checkCancel', () => {
  vi.spyOn(process, 'exit').mockImplementation(() => {
    throw new Error('process.exit called');
  });

  it('should call cancelAndExit if the value is cancelled', () => {
    (isCancel as unknown as Mock).mockReturnValue(true);

    expect(() => checkCancel('cancelledValue')).toThrow('process.exit called');
    expect(isCancel).toHaveBeenCalledWith('cancelledValue');
  });

  it('should return the value if it is not cancelled', () => {
    (isCancel as unknown as Mock).mockReturnValue(false);

    const result = checkCancel('validValue');
    expect(result).toBe('validValue');
    expect(isCancel).toHaveBeenCalledWith('validValue');
  });
});
