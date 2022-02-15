const Web3 =require('web3');
//const web3 = new Web3('https://ropsten.infura.io/v3/13185221b99744cda86c46e02a3ded8f');
const web3 = new Web3(window.ethereum);


const userContractAddress ='0xf6B962810b20E84D468aa3D131F79cc4F601Af54';
const userContractABI=[
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "_user",
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
				"internalType": "address",
				"name": "from",
				"type": "address"
			}
		],
		"name": "getFriendsFrom",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "friend_addr",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "friend_name",
						"type": "string"
					}
				],
				"internalType": "struct Person.Friend[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getMyFriends",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "friend_addr",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "friend_name",
						"type": "string"
					}
				],
				"internalType": "struct Person.Friend[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "myFriends",
		"outputs": [
			{
				"internalType": "address",
				"name": "friend_addr",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "friend_name",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "friend_name",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "friend_addr",
				"type": "address"
			}
		],
		"name": "updateFriends",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]

const UserContract = new web3.eth.Contract(userContractABI,userContractAddress);



export {userContractAddress};
export {UserContract};