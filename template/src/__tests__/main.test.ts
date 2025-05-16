import { beforeAll, describe, expect, it } from 'vitest';

beforeAll(async () => {
  await import('../main');
});

describe('main.ts', () => {
  it('should register the custom element react-app', () => {
    expect(customElements.get('react-app')).toBeDefined();
  });
});
