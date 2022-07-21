const Web3 =require('web3');
//const web3 = new Web3('https://ropsten.infura.io/v3/13185221b99744cda86c46e02a3ded8f');
const web3 = new Web3(window.ethereum);

// var ropstenAlchemy='wss://eth-ropsten.alchemyapi.io/v2/YdR1ysbKAahCXjlkJTCwbikRTC9Ap9wp'
// var web3 = new Web3(new Web3.providers.WebsocketProvider(ropstenAlchemy));


const BuyNFTContractAddress ='0x784CFE28F17bbb8d13b4B543b8b9AF90a7A85933';
const BuyNFTContractABI=[
	{
		"inputs": [],
		"name": "MCBNFTAddress",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "metadataURI",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "address payable",
				"name": "seller",
				"type": "address"
			}
		],
		"name": "buyTokenOff",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "creator",
				"type": "address"
			}
		],
		"name": "buyTokenOn",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	}
]

const BuyNFTContract = new web3.eth.Contract(BuyNFTContractABI,BuyNFTContractAddress);



export {BuyNFTContractAddress};
export {BuyNFTContract};