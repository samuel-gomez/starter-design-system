import { beforeEach, vi } from 'vitest';

beforeEach(() => {
  vi.mock('url', () => ({
    fileURLToPath: vi.fn().mockImplementation(() => `${process.cwd()}/dist/main.js`),
  }));

  vi.mock('@clack/prompts', () => ({
    cancel: vi.fn(),
    isCancel: vi.fn(),
    text: vi.fn(),
    select: vi.fn(),
    intro: vi.fn(),
    outro: vi.fn(),
    log: {
      error: vi.fn(),
      message: vi.fn(),
      info: vi.fn(),
    },
    spinner: vi.fn().mockImplementation(() => ({
      start: vi.fn(),
      stop: vi.fn(),
    })),
  }));

  vi.mock('minimist', () => ({
    default: vi.fn(),
  }));
});
