import { checkCancel } from '@/helper/checkCancel';
import { endProcess } from '@/helper/endProcess';
import { confirm, log, outro, select, text } from '@clack/prompts';
import minimist from 'minimist';
import * as process from 'node:process';
import pc from 'picocolors';
import packageJson from '../../package.json';

const logHelpMessage = () => {
  log.message(`Usage: ${pc.green('create-starter-design-system')} [options]

  Options:
    -p, --project-name <${pc.red('name')}>   Name of the project
    -d, --design-system <${pc.red('name')}>  Design system to use, can be 'apollo', 'slash', or 'look&feel'
    -g, --use-git               Initialize a git repository
    -h, --help                  Show help
    -v, --version               Show version
  
  Examples:
  ${pc.yellow('npm create @axa.fr/starter-design-system -- -p my-project -d apollo')}
  ${pc.yellow('npx @axa.fr/create-starter-design-system -p my-project -d apollo')}`);

  outro('See you soon!');
  endProcess();
};

const logVersionMessage = () => {
  outro(`Version: ${pc.green(packageJson.version)}`);
  endProcess();
};

const validateProjectName = (value: ProjectName | unknown) => {
  const isValid = new RegExp(/^(@[a-z0-9-~][a-z0-9-._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/);
  if (typeof value !== 'string' || !isValid.test(value)) {
    return `The project name '${value}' is not valid.

A valid npm project name must start with a lowercase letter, a number, a hyphen, or a tilde, and can include dots, hyphens, tildes, or underscores.

If the project name starts with '@', it must be followed by a valid scope name and a '/'.`;
  }

  return '';
};

const validateDesignSystem = (value: DesignSystem) => {
  const validDesignSystems = ['apollo', 'slash', 'look&feel'];
  if (!validDesignSystems.includes(value)) {
    return `The design system '${value}' is not valid. Valid options are: ${validDesignSystems.join(', ')}`;
  }

  return '';
};

export const getPromptArgs = async () => {
  const argv = minimist(process.argv.slice(2), {
    alias: { p: 'project-name', d: 'design-system', g: 'use-git', h: 'help', v: 'version' },
  });

  if (argv.help) {
    logHelpMessage();
  }

  if (argv.version) {
    logVersionMessage();
  }

  if (argv['project-name']) {
    const projectNameIsValid = validateProjectName(argv['project-name'] as string);
    if (projectNameIsValid !== '') {
      log.error(projectNameIsValid);
      outro('Please check and try again.');
      endProcess(true);
    }
  }

  if (argv['design-system']) {
    const designSystemIsValid = validateDesignSystem(argv['design-system'] as DesignSystem);
    if (designSystemIsValid !== '') {
      log.error(designSystemIsValid);
      outro('Please check and try again.');
      endProcess(true);
    }
  }

  const projectName =
    (argv['project-name'] as ProjectName) ??
    (checkCancel(
      await text({
        message: 'What is the name of your project?',
        placeholder: 'my-project',
        validate: validateProjectName,
      }),
    ).toString() as ProjectName);

  const designSystem =
    (argv['design-system'] as DesignSystem) ??
    (checkCancel(
      await select({
        message: 'Which design system do you want to use?',
        options: [
          { value: 'apollo', label: 'Apollo' },
          { value: 'slash', label: 'Slash' },
          { value: 'look&feel', label: 'Look and Feel' },
        ],
      }),
    ).toString() as DesignSystem);

  const enableGit = Boolean(
    argv['use-git'] ??
      checkCancel(
        await confirm({
          message: 'Do you want to initialize a git repository?',
          initialValue: true,
        }),
      ),
  );

  return {
    projectName,
    designSystem,
    enableGit,
  };
};
