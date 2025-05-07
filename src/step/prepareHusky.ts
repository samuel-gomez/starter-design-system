import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

export const prepareHusky = async (projectPath: string) => {
  const repoPackageJson = JSON.parse(readFileSync(resolve(projectPath, 'package.json'), { encoding: 'utf-8' }));
  repoPackageJson.scripts = { ...repoPackageJson.scripts, prepare: 'husky' };
  writeFileSync(resolve(projectPath, 'package.json'), JSON.stringify(repoPackageJson, null, 2), { encoding: 'utf-8' });
};
