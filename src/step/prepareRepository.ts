import { cpSync, readFileSync, renameSync, writeFileSync } from 'fs';
import { resolve, sep } from 'path';
import { fileURLToPath } from 'url';

type PrepareRepositoryArgs = {
  projectPath: string;
  projectName: ProjectName;
};

export const prepareRepository = ({ projectPath, projectName }: PrepareRepositoryArgs) => {
  const templatePath = resolve(fileURLToPath(import.meta.url), '../..', 'template');

  // Copy the template files to the project path
  cpSync(templatePath, projectPath, {
    recursive: true,
    dereference: true,
    filter: src => !src.includes(`template${sep}node_modules`),
  });

  // Initialize the package.json file
  const repoPackageJson = JSON.parse(readFileSync(resolve(projectPath, 'package.json'), { encoding: 'utf-8' }));
  repoPackageJson.name = projectName;
  writeFileSync(resolve(projectPath, 'package.json'), JSON.stringify(repoPackageJson, null, 2), { encoding: 'utf-8' });

  renameSync(`${projectPath}/_gitignore`, `${projectPath}/.gitignore`);
};
