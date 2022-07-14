import { ethers } from "ethers";


import {getPublicKey} from './node/databank'
const ethUtil = require('ethereumjs-util');
const sigUtil = require('@metamask/eth-sig-util');


export async function encryptMessage(message, address){

    const publicKey = await getPublicKey(address)
    const encryptedMessage = ethUtil.bufferToHex(
        Buffer.from(
          JSON.stringify(
            sigUtil.encrypt({
              publicKey: publicKey,
              data: message,
              version: 'x25519-xsalsa20-poly1305',
            })
          ),
          'utf8'
        )
    );

    console.log("Encrypted: " + encryptedMessage)

    return encryptedMessage
}

export async function decryptedMessage(encryptedMessage){

    await window.ethereum.request({
    method: 'eth_decrypt',
    params: [encryptedMessage, "0x447f0D108d66431BB85CbEd1F477D41fd728a380"],
  })
  .then((decryptedMessage) =>
    console.log('The decrypted message is:', decryptedMessage)
  )
  .catch((error) => console.log(error.message));

}

