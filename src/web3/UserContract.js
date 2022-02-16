const Web3 =require('web3');
//const web3 = new Web3('https://ropsten.infura.io/v3/13185221b99744cda86c46e02a3ded8f');
const web3 = new Web3(window.ethereum);


const userContractAddress ='0xF47B5A7AA54B72779861bb15F6906Fa8a4ed8fA3';
const userContractABI=[
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "friend_addr",
				"type": "address"
			}
		],
		"name": "deleteFriend",
		"outputs": [],
		"stateMutability": "nonpayable",
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
				"internalType": "struct User.Friend[]",
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
				"internalType": "struct User.Friend[]",
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