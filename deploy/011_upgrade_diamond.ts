import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';
import {Wallet} from 'ethers';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const {deployments, getNamedAccounts, ethers} = hre;
  const {diamond, catchUnknownSigner} = deployments;

  const {deployer} = await getNamedAccounts();

  const txData = await catchUnknownSigner(
    diamond.deploy('DiamondExample', {
      from: deployer,
      facets: ['ActionFacet', 'NewFacet', 'TestFacet'],
      log: true,
    })
  );

  const proxyOwnerWallet = new Wallet(
    '0x460434467767a72796f450111bd5bef031b1baaa8e127d5b71d60ca70dae4ee3',
    ethers.provider
  );

  if (txData) {
    const tx = await proxyOwnerWallet.sendTransaction(txData);
    await tx.wait();
  }

  await diamond.deploy('DiamondExample', {
    from: deployer,
    facets: ['ActionFacet', 'NewFacet', 'TestFacet'],
    log: true,
  });

  const test = await deployments.read('DiamondExample', 'sayHello');
  console.log({test});
};
export default func;
func.tags = ['DiamondExample', 'DiamondExample_upgrade'];
