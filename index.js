import Web3 from 'web3';
import chalk from 'chalk';
import fs from 'fs';

const config = {
  rpcUrl: 'https://rpc.testnet.humanity.org',
  contractAddress: '0xa18f6FCB2Fd4884436d10610E69DB7BFa1bFe8C7',
  contractAbi: [
    {"inputs": [],"name": "AccessControlBadConfirmation","type": "error"},
    {"inputs": [{"internalType": "address","name": "account","type": "address"},{"internalType": "bytes32","name": "neededRole","type": "bytes32"}],"name": "AccessControlUnauthorizedAccount","type": "error"},
    {"inputs": [],"name": "InvalidInitialization","type": "error"},
    {"inputs": [],"name": "NotInitializing","type": "error"},
    {"anonymous": false,"inputs": [{"indexed": false,"internalType": "uint64","name": "version","type": "uint64"}],"name": "Initialized","type": "event"},
    {"anonymous": false,"inputs": [{"indexed": true,"internalType": "address","name": "from","type": "address"},{"indexed": true,"internalType": "address","name": "to","type": "address"},{"indexed": false,"internalType": "uint256","name": "amount","type": "uint256"},{"indexed": false,"internalType": "bool","name": "bufferSafe","type": "bool"}],"name": "ReferralRewardBuffered","type": "event"},
    {"anonymous": false,"inputs": [{"indexed": true,"internalType": "address","name": "user","type": "address"},{"indexed": true,"internalType": "enum IRewards.RewardType","name": "rewardType","type": "uint8"},{"indexed": false,"internalType": "uint256","name": "amount","type": "uint256"}],"name": "RewardClaimed","type": "event"},
    {"anonymous": false,"inputs": [{"indexed": true,"internalType": "bytes32","name": "role","type": "bytes32"},{"indexed": true,"internalType": "bytes32","name": "previousAdminRole","type": "bytes32"},{"indexed": true,"internalType": "bytes32","name": "newAdminRole","type": "bytes32"}],"name": "RoleAdminChanged","type": "event"},
    {"anonymous": false,"inputs": [{"indexed": true,"internalType": "bytes32","name": "role","type": "bytes32"},{"indexed": true,"internalType": "address","name": "account","type": "address"},{"indexed": true,"internalType": "address","name": "sender","type": "address"}],"name": "RoleGranted","type": "event"},
    {"anonymous": false,"inputs": [{"indexed": true,"internalType": "bytes32","name": "role","type": "bytes32"},{"indexed": true,"internalType": "address","name": "account","type": "address"},{"indexed": true,"internalType": "address","name": "sender","type": "address"}],"name": "RoleRevoked","type": "event"},
    {"inputs": [],"name": "DEFAULT_ADMIN_ROLE","outputs": [{"internalType": "bytes32","name": "","type": "bytes32"}],"stateMutability": "view","type": "function"},
    {"inputs": [],"name": "claimBuffer","outputs": [],"stateMutability": "nonpayable","type": "function"},
    {"inputs": [],"name": "claimReward","outputs": [],"stateMutability": "nonpayable","type": "function"},
    {"inputs": [],"name": "currentEpoch","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},
    {"inputs": [],"name": "cycleStartTimestamp","outputs": [{"internalType": "uint256","name": "cycleStartTimestamp","type": "uint256"}],"stateMutability": "view","type": "function"},
    {"inputs": [{"internalType": "bytes32","name": "role","type": "bytes32"}],"name": "getRoleAdmin","outputs": [{"internalType": "bytes32","name": "","type": "bytes32"}],"stateMutability": "view","type": "function"},
    {"inputs": [{"internalType": "bytes32","name": "role","type": "bytes32"},{"internalType": "address","name": "account","type": "address"}],"name": "grantRole","outputs": [],"stateMutability": "nonpayable","type": "function"},
    {"inputs": [{"internalType": "bytes32","name": "role","type": "bytes32"},{"internalType": "address","name": "callerConfirmation","type": "address"}],"name": "renounceRole","outputs": [],"stateMutability": "nonpayable","type": "function"},
    {"inputs": [{"internalType": "bytes32","name": "role","type": "bytes32"},{"internalType": "address","name": "account","type": "address"}],"name": "revokeRole","outputs": [],"stateMutability": "nonpayable","type": "function"},
    {"inputs": [{"internalType": "uint256","name": "startTimestamp","type": "uint256"}],"name": "start","outputs": [],"stateMutability": "nonpayable","type": "function"},
    {"inputs": [],"name": "stop","outputs": [],"stateMutability": "nonpayable","type": "function"},
    {"inputs": [{"internalType": "bytes4","name": "interfaceId","type": "bytes4"}],"name": "supportsInterface","outputs": [{"internalType": "bool","name": "","type": "bool"}],"stateMutability": "view","type": "function"},
    {"inputs": [{"internalType": "address","name": "user","type": "address"}],"name": "userBuffer","outputs": [{"internalType": "uint256","name": "buffer","type": "uint256"}],"stateMutability": "view","type": "function"},
    {"inputs": [{"internalType": "address","name": "user","type": "address"},{"internalType": "uint256","name": "epochID","type": "uint256"}],"name": "userClaimStatus","outputs": [{"components": [{"internalType": "uint256","name": "buffer","type": "uint256"},{"internalType": "bool","name": "claimStatus","type": "bool"}],"internalType": "struct IRewards.UserClaim","name": "claim","type": "tuple"}],"stateMutability": "view","type": "function"},
    {"inputs": [{"internalType": "address","name": "user","type": "address"}],"name": "userGenesisClaimStatus","outputs": [{"internalType": "bool","name": "status","type": "bool"}],"stateMutability": "view","type": "function"}
  ],
  privateKeysFile: './private_keys.txt'
};

function getTimestamp() {
  const now = new Date();
  return `[${now.toTimeString().split(' ')[0]}] - `;
}

function displayHeader() {
  console.log(chalk.blue.bold('============================================================'));
  console.log('');
  console.log(chalk.blue.bold('	██╗   ██╗██╗   ██╗██████╗ ██╗    ██╗██████╗'));
  console.log(chalk.blue.bold('	╚██╗ ██╔╝██║   ██║██╔══██╗██║    ██║██╔══██╗'));
  console.log(chalk.blue.bold('	 ╚████╔╝ ██║   ██║██║  ██║██║ █╗ ██║██████╔╝'));
  console.log(chalk.blue.bold('	  ╚██╔╝  ██║   ██║██║  ██║██║███╗██║██╔═══╝'));
  console.log(chalk.blue.bold('	   ██║   ╚██████╔╝██████╔╝╚███╔███╔╝██║'));
  console.log(chalk.blue.bold('	   ╚═╝    ╚═════╝ ╚═════╝  ╚══╝╚══╝ ╚═╝'));
  console.log('');
  console.log(chalk.yellow.bold('	📢 Telegram: https://t.me/Kijita64'));
  console.log(chalk.yellow.bold('	📢 Github: https://github.com/yudwp'));
  console.log(chalk.blue.bold('============================================================'));
  console.log('');
}

async function setupBlockchainConnection(rpcUrl) {
  const web3 = new Web3(new Web3.providers.HttpProvider(rpcUrl));
  try {
    const blockNumber = await web3.eth.getBlockNumber();
    console.log(getTimestamp() + chalk.green(`Connected. Block: ${blockNumber}`));
  } catch (error) {
    console.log(getTimestamp() + chalk.red(`Conn. failed: ${error.message}`));
    process.exit(1);
  }
  return web3;
}

function loadPrivateKeys(filePath) {
  return fs.readFileSync(filePath, 'utf8')
    .split('\n')
    .map(line => line.trim())
    .filter(line => line !== '');
}

async function claimRewards(privateKey, web3, contract) {
  try {
    privateKey = privateKey.trim();
    if (!privateKey.startsWith("0x")) {
      privateKey = "0x" + privateKey;
    }
    if (privateKey.length !== 66) {
      throw new Error(`Invalid key length: ${privateKey}`);
    }
    const account = web3.eth.accounts.privateKeyToAccount(privateKey);
    const senderAddress = account.address;
    const genesisClaimed = await contract.methods.userGenesisClaimStatus(senderAddress).call();
    const currentEpoch = await contract.methods.currentEpoch().call();
    const result = await contract.methods.userClaimStatus(senderAddress, currentEpoch).call();
    const claimStatus = result.claimStatus;
    if (genesisClaimed && !claimStatus) {
      console.log(getTimestamp() + chalk.green(`Claiming for ${senderAddress} (Genesis done).`));
      await processClaim(senderAddress, privateKey, web3, contract);
    } else if (!genesisClaimed) {
      console.log(getTimestamp() + chalk.green(`Claiming for ${senderAddress} (Genesis pending).`));
      await processClaim(senderAddress, privateKey, web3, contract);
    } else {
      console.log(getTimestamp() + chalk.yellow(`${senderAddress} already claimed (Epoch ${currentEpoch}).`));
    }
  } catch (error) {
    handleError(error, privateKey);
  }
}

function handleError(error, privateKey) {
  const errorMessage = error.message || error.toString();
  if (errorMessage.includes('Rewards: user not registered')) {
    console.log(getTimestamp() + chalk.red(`Err: User of key ${privateKey} not registered.`));
  } else {
    console.log(getTimestamp() + chalk.red(`Claim failed for key ${privateKey}: ${errorMessage}`));
  }
}

async function processClaim(senderAddress, privateKey, web3, contract) {
  try {
    const gasAmount = await contract.methods.claimReward().estimateGas({ from: senderAddress });
    const transaction = {
      to: contract.options.address,
      gas: gasAmount,
      gasPrice: await web3.eth.getGasPrice(),
      data: contract.methods.claimReward().encodeABI(),
      nonce: await web3.eth.getTransactionCount(senderAddress),
      chainId: 1942999413
    };
    const signedTxn = await web3.eth.accounts.signTransaction(transaction, privateKey);
    const txReceipt = await web3.eth.sendSignedTransaction(signedTxn.rawTransaction);
    console.log(getTimestamp() + chalk.green(`Txn success for ${senderAddress}; hash: ${txReceipt.transactionHash}`));
  } catch (error) {
    console.log(getTimestamp() + chalk.red(`Claim error for ${senderAddress}: ${error.message}`));
  }
}

async function main() {
  displayHeader();
  const rpcUrl = config.rpcUrl || 'https://rpc.testnet.humanity.org';
  const web3 = await setupBlockchainConnection(rpcUrl);
  const contract = new web3.eth.Contract(config.contractAbi, config.contractAddress);
  while (true) {
    const privateKeys = loadPrivateKeys(config.privateKeysFile || './private_keys.txt');
    for (const privateKey of privateKeys) {
      await claimRewards(privateKey, web3, contract);
    }
    console.log(getTimestamp() + chalk.cyan('Waiting 6h for next cycle...'));
    await new Promise(resolve => setTimeout(resolve, 6 * 60 * 60 * 1000));
  }
}

main().catch(error => console.error(getTimestamp() + chalk.red(`Main error: ${error}`)));
