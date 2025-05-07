import { runCommand } from '@/helper/runCommand';
import { prepareHusky } from '@/step/prepareHusky';

vi.mock('@/helper/runCommand', () => ({
  runCommand: vi.fn(),
}));

describe('prepareHusky', () => {
  it('should prepare husky', async () => {
    const projectPath = '/path/to/project';

    await prepareHusky(projectPath);

    expect(runCommand).toHaveBeenCalledWith(`cd ${projectPath} && npm run prepare`);
  });
});
