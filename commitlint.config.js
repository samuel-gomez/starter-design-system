/** @type {import('@commitlint/types').UserConfig} */
const config = {
  extends: ['@commitlint/config-conventional'],
  ignores: [commit => /release/.test(commit)],
}

export default config;
