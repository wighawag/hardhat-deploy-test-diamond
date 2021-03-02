import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';
import {parseEther} from 'ethers/lib/utils';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const {deployments, getNamedAccounts} = hre;
  const {rawTx} = deployments;

  const {deployer, diamondOwner} = await getNamedAccounts();

  await rawTx({
    from: deployer,
    log: true,
    to: diamondOwner,
    value: parseEther('10'),
  });
};
export default func;
func.tags = ['Test', 'Test_deploy'];
