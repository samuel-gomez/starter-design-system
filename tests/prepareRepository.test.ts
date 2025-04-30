import { existsSync, readFileSync, rmSync } from 'fs';
import { resolve } from 'path';
import { afterEach, describe, expect, it } from 'vitest';
import { prepareRepository } from '../src/prepareRepository';

describe('prepareRepository', () => {
  const projectName = 'test-prepareRepository';
  const projectPath = resolve(process.cwd(), projectName);

  afterEach(() => {
    if (existsSync(projectPath)) {
      rmSync(projectPath, { recursive: true });
    }
  });

  it('should copy template files to the project path', () => {
    prepareRepository({
      projectPath,
      projectName,
    });

    expect(existsSync(`${projectPath}/public`)).toBeTruthy();
    expect(existsSync(`${projectPath}/src`)).toBeTruthy();
    expect(existsSync(`${projectPath}/package.json`)).toBeTruthy();
  });

  it('should initialize package.json with the correct project name', () => {
    prepareRepository({
      projectPath,
      projectName,
    });

    const repoPackageJson = JSON.parse(readFileSync(resolve(projectPath, 'package.json'), { encoding: 'utf-8' }));
    expect(repoPackageJson.name).toStrictEqual(projectName);
  });

  it('should rename _gitignore to .gitignore', () => {
    prepareRepository({
      projectPath,
      projectName,
    });

    expect(existsSync(`${projectPath}/.gitignore`)).toBeTruthy();
    expect(existsSync(`${projectPath}/_gitignore`)).toBeFalsy();
  });
});
