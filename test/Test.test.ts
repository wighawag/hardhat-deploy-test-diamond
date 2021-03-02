import {deployments} from 'hardhat';

describe('Test', function () {
  it('deploy and upgrade', async function () {
    await deployments.fixture('Test_deploy');
  });
});
