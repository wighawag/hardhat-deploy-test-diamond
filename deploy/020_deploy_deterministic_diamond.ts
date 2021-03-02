import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const {deployments, getNamedAccounts} = hre;
  const {diamond, log} = deployments;

  const {deployer} = await getNamedAccounts();

  const deterministicDiamond = await diamond.deploy(
    'DeterministicDiamondExample',
    {
      from: deployer,
      facets: ['ActionFacet', 'NewFacet', 'TestFacet'],
      log: true,
      deterministicSalt:
        '0x0000000000000000000000000000000000000000000000000000000000000002',
    }
  );
  log({deterministicDiamond: deterministicDiamond.address});
};
export default func;
