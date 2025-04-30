import { runCommand } from '@/helper/runCommand';
import { spinner } from '@clack/prompts';

type InstallPackagesArgs = {
  projectPath: string;
  designSystem: DesignSystem;
};

const designSystemVersion: Record<DesignSystem, 'latest' | 'next'> = {
  apollo: 'next',
  slash: 'latest',
  'look&feel': 'next',
};

const installDesignSystem = async (projectPath: string, designSystem: DesignSystem) => {
  switch (designSystem) {
    case 'apollo':
      await runCommand(
        `cd ${projectPath} && npm install @axa-fr/design-system-apollo-react@${designSystemVersion.apollo} @axa-fr/design-system-apollo-css@${designSystemVersion.apollo}`,
      );
      break;
    case 'slash':
      await runCommand(
        `cd ${projectPath} && npm install @axa-fr/design-system-slash-react@${designSystemVersion.slash} @axa-fr/design-system-slash-css@${designSystemVersion.slash}`,
      );
      break;
    case 'look&feel':
      await runCommand(
        `cd ${projectPath} && npm install @axa-fr/design-system-look-and-feel-react@${designSystemVersion['look&feel']} @axa-fr/design-system-look-and-feel-css@${designSystemVersion['look&feel']} @axa-fr/design-system-apollo-react@${designSystemVersion['look&feel']} @axa-fr/design-system-apollo-css@${designSystemVersion['look&feel']}`,
      );
  }
};

export const installPackages = async ({ projectPath, designSystem }: InstallPackagesArgs) => {
  const spinnerInstance = spinner();
  spinnerInstance.start('Installing packages. This might take a couple of minutes.');

  await runCommand(`cd ${projectPath} && npm install`);

  await installDesignSystem(projectPath, designSystem);

  spinnerInstance.stop('Packages installed successfully.');
};
