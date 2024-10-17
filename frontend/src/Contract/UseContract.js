// import { web3, staticAddress, privateKey } from './Web3';
// import contract from './Contract';

// const interactWithContract = async (methodName, params) => {
//     // Encode contract method and params into ABI format
//     const data = contract.methods[methodName](...params).encodeABI();
//     const nonce = await web3.eth.getTransactionCount(staticAddress, 'pending'); // Get latest pending nonce

//     // Estimate the required gas for the transaction
//     const gasEstimate = await web3.eth.estimateGas({ from: staticAddress, to: contract.options.address, data: data });
//     const gasPrice = await web3.eth.getGasPrice(); // BigInt

//     // Convert gasPrice to BigInt, and increase it by 10%
//     const adjustedGasPrice = BigInt(gasPrice) + (BigInt(gasPrice) / BigInt(10)); // 10% increase

//     // Transaction object
//     const tx = {
//         from: staticAddress,
//         to: contract.options.address,
//         data: data,
//         gas: gasEstimate,  // Dynamically estimate the gas
//         nonce: nonce,
//         gasPrice: adjustedGasPrice.toString(),  // Convert BigInt to string before passing it
//     };

//     // Sign the transaction
//     const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);

//     // Send the signed transaction to the blockchain
//     const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
//     return receipt;
// };

// export const getvalue = async () => {
//     const value = await contract.methods.value().call();
//     return value;
// };

// export const setvalue = async () => {
//     const receipt = await interactWithContract('addvalue', [20]);
//     return receipt;
// };
