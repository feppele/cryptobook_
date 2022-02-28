const Web3 =require('web3');
//const web3 = new Web3('https://ropsten.infura.io/v3/13185221b99744cda86c46e02a3ded8f');
const web3 = new Web3(window.ethereum);


const BuyNFTContractAddress ='0x2E4a58688c8f11098C01B8692f799A388342C369';
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
		"name": "buyToken",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	}
]

const BuyNFTContract = new web3.eth.Contract(BuyNFTContractABI,BuyNFTContractAddress);



export {BuyNFTContractAddress};
export {BuyNFTContract};