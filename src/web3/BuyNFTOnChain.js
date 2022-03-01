const Web3 =require('web3');
//const web3 = new Web3('https://ropsten.infura.io/v3/13185221b99744cda86c46e02a3ded8f');
const web3 = new Web3(window.ethereum);


const BuyNFTOnChainAddress ='0x89f223eC9464CfE37E735dbD719a5893c3271D92';
const BuyNFTOnChainABI=[
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
			}
		],
		"name": "buyToken",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
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
	}
]

const BuyNFTOnChainContract = new web3.eth.Contract(BuyNFTOnChainABI,BuyNFTOnChainAddress);



export {BuyNFTOnChainAddress};
export {BuyNFTOnChainContract};