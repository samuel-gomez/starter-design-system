import { checkCancel } from '@/helper/checkCancel';
import { log, outro, select, text } from '@clack/prompts';
import minimist from 'minimist';
import packageJson from '../../package.json';

const logHelpMessage = () => {
  log.message(`Usage: create-starter-design-system [options]

  Options:
    -p, --project-name <name>   Name of the project
    -d, --design-system <name>  Design system to use, can be 'apollo', 'slash', or 'look&feel'
    -h, --help                  Show help
    -v, --version               Show version
  
  Examples:
  npm create @axa.fr/starter-design-system -- -p my-project -d apollo
  npx @axa.fr/create-starter-design-system -p my-project -d apollo`);

  outro('See you soon!');
  process.exit(0);
};

const logVersionMessage = () => {
  outro(`Version: ${packageJson.version}`);
  process.exit(0);
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
    alias: { p: 'project-name', d: 'design-system', h: 'help', v: 'version' },
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
      process.exit(1);
    }
  }

  if (argv['design-system']) {
    const designSystemIsValid = validateDesignSystem(argv['design-system'] as DesignSystem);
    if (designSystemIsValid !== '') {
      log.error(designSystemIsValid);
      outro('Please check and try again.');
      process.exit(1);
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

  return {
    projectName,
    designSystem,
  };
};
