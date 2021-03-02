import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';
import {Wallet} from 'ethers';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const {deployments, getNamedAccounts, ethers} = hre;
  const {diamond, catchUnknownSigner, log} = deployments;

  const {deployer, diamondOwner} = await getNamedAccounts();

  log(`upgrade...`);
  const txData = await catchUnknownSigner(
    diamond.deploy('DiamondExample', {
      from: deployer,
      owner: diamondOwner,
      facets: ['ActionFacet', 'NewFacet', 'TestFacet'],
      log: true,
    })
  );

  const proxyOwnerWallet = new Wallet(
    '0x460434467767a72796f450111bd5bef031b1baaa8e127d5b71d60ca70dae4ee3',
    ethers.provider
  );

  if (txData) {
    console.log(`could not deploy via deployer: ${deployer}`);
    const tx = await proxyOwnerWallet.sendTransaction(txData);
    await tx.wait();
  }

  log(`upgrade recheck`);
  await diamond.deploy('DiamondExample', {
    from: deployer,
    owner: diamondOwner,
    facets: ['ActionFacet', 'NewFacet', 'TestFacet'],
    log: true,
  });

  const test = await deployments.read('DiamondExample', 'sayHello');
  console.log({test});

  const hello2 = await deployments.read('DiamondExample', 'sayHello2');
  console.log({hello2});
};
export default func;
func.tags = ['DiamondExample', 'DiamondExample_upgrade'];
func.dependencies = ['DiamondExample_deploy'];
