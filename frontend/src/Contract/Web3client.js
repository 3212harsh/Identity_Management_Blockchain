import Web3 from 'web3';

let selectedAccount;
let web3; // Declare web3 globally
let contract; // Declare contract globally

// Smart contract ABI and address
const contractABI =  [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "uid",
        "type": "bytes32"
      }
    ],
    "name": "UserAdded",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_dob",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "_idtype",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "idNum",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "idaddr",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "idgender",
        "type": "string"
      }
    ],
    "name": "addUser",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_name",
        "type": "string"
      },
      {
        "internalType": "bytes32",
        "name": "_uid",
        "type": "bytes32"
      },
      {
        "internalType": "uint256",
        "name": "_idNum",
        "type": "uint256"
      }
    ],
    "name": "verifyUser",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "hash",
        "type": "bytes32"
      }
    ],
    "name": "display",
    "outputs": [
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "dob",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "idtype",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "aadharNum",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "aadharAddr",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "aadharGender",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  }
];

const contractAddress = "0x9ECb60537eD1c7D3b06A3221d36916A1B4E09a62";

// Initialize Web3 and the contract
export const init = async () => {
  let provider = window.ethereum;
  
  if (typeof provider !== 'undefined') {
    try {
      // Request account access
      const accounts = await provider.request({ method: 'eth_requestAccounts' });
      selectedAccount = accounts[0];
      console.log("Selected Account = ", selectedAccount);

      // Initialize Web3
      web3 = new Web3(provider);

      // Initialize the contract
      contract = new web3.eth.Contract(contractABI, contractAddress);
      console.log("Contract initialized");

      // Listen for account changes
      window.ethereum.on('accountsChanged', function (accounts) {
        selectedAccount = accounts[0];
        console.log("Changed account = ", selectedAccount);
      });
      
    } catch (error) {
      console.error("Error initializing web3: ", error);
    }
  } else {
    console.error("Ethereum provider is not available");
  }
};

// Function to get the value from the contract
export const addUser = async (name, dob, idtype, idNum, idAddr, idGender) => {
    try {
      if (!contract) {
        console.error("Contract is not initialized");
        return;
      }
  
      const accounts = await web3.eth.getAccounts();
      const userHash = await contract.methods
        .addUser(name, dob, idtype, idNum, idAddr, idGender)
        .send({ from: accounts[0] });
  
      console.log("User added with hash: ", userHash);
      return userHash;
    } catch (error) {
      console.error("Error calling contract method 'addUser': ", error);
    }
  };
  
export const verifyUser = async (name, uid, idNum) => {
try {
    if (!contract) {
    console.error("Contract is not initialized");
    return;
    }

    const isVerified = await contract.methods
    .verifyUser(name, uid, idNum)
    .call();

    console.log("User verification result: ", isVerified);
    return isVerified;
} catch (error) {
    console.error("Error calling contract method 'verifyUser': ", error);
}
};

export const displayUser = async (uid) => {
try {
    if (!contract) {
    console.error("Contract is not initialized");
    return;
    }

    const userDetails = await contract.methods.display(uid).call();

    console.log("User details: ", userDetails);
    return userDetails;
} catch (error) {
    console.error("Error calling contract method 'display': ", error);
}
};
