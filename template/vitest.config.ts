import react from '@vitejs/plugin-react-swc';
import { loadEnv } from 'vite';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react(), viteTsconfigPaths()],
    envPrefix: 'FRONT_',
    test: {
      environment: 'jsdom',
      setupFiles: 'vitest.setup.ts',
      clearMocks: true,
      css: {
        modules: {
          classNameStrategy: 'non-scoped',
        },
      },
      reporters: ['default', 'junit', 'vitest-sonar-reporter'],
      outputFile: {
        'vitest-sonar-reporter': 'test-reports/unit/sonar-report.xml',
        junit: 'test-reports/unit/junit-report.xml',
      },
      include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
      poolOptions: {
        forks: {
          minForks: env.CI ? 1 : undefined,
          maxForks: env.CI ? 2 : undefined,
        },
      },
      coverage: {
        enabled: env.CI === 'true',
        provider: 'v8',
        reporter: ['lcovonly', 'html', 'text', 'text-summary', 'cobertura'],
        reportsDirectory: 'test-reports/unit/coverage',
        lines: 80,
        functions: 75,
        branches: 80,
        statements: 80,
        include: ['src/**/*.[jt]s?(x)'],
        exclude: [
          'src/**/*.d.[jt]s?(x)',
          'src/**/*.types.[jt]s?(x)',
          'src/**/index.[jt]s?(x)',
          'src/shared/tests/**/*.[jt]s?(x)',
        ],
      },
    },
  };
});
