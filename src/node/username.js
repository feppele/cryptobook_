
import {fetchi} from '../globalData'
import {getOptions} from './databank'
import sha256 from 'crypto-js/sha256';
var crypto = require("crypto-js");



export async function registerDB(name,pw,privatekey,publickey,address){

    // Encrypto private Key with PW
    privatekey = PWencrypt(privatekey,pw)

    // create hash from PW
    pw = sha256(pw)
    pw = pw.words.join()

    var res = await fetch(fetchi+ "/databank",getOptions("register",{name:name,pw:pw,privatekey:privatekey,publickey:publickey,address:address} )).then(res => {return res.json()}).catch(console.log);

    console.log(res)

}

// not exist: return "error" else: {name:'',pw:'',publickey,privatekey,address}
export async function loginDB(name,pw){

    const unhasedPW = pw
    pw = sha256(pw)
    pw = pw.words.join()

    var res = await fetch(fetchi+ "/databank",getOptions("getNamePW",{name:name,pw:pw} )).then(res => {return res.json()}).catch(console.log);

    if(res[0].length === 0){
        return "error"
    }else{
        res = res[0][0]
        res.privatekey = PWdecrypt(res.privatekey,unhasedPW)
        return res
    }



}


function PWencrypt(clear,pw){
    var cipher = crypto.AES.encrypt(clear, pw);
    cipher = cipher.toString();
    return cipher;

}

function PWdecrypt(cipher,pw){
    var decipher = crypto.AES.decrypt(cipher, pw);
    decipher = decipher.toString(crypto.enc.Utf8);
    return decipher;

}