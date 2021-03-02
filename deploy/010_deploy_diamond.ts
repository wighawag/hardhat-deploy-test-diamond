import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const {deployments, getNamedAccounts} = hre;
  const {diamond, catchUnknownSigner} = deployments;

  const {deployer, diamondOwner} = await getNamedAccounts();

  await catchUnknownSigner(
    diamond.deploy('DiamondExample', {
      from: deployer,
      owner: diamondOwner,
      facets: ['ActionFacet', 'FacetToDelete', 'TestFacet'],
      log: true,
    })
  );
};
export default func;
func.tags = ['DiamondExample', 'DiamondExample_deploy'];
