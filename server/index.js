const express = require("express");
const path = require('path');
const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors({ origin: '*'}))
var pgp = require("pg-promise")(/*options*/); //psql


// Choose here if local or Azure Database
//var db = pgp("postgres://fritz:admin@localhost:5432/databank1"); // local database
//var db = pgp("postgres://fritz@psqlserver100:Admin123!@psqlserver100.postgres.database.azure.com:5432/databank1");
var db = pgp("postgres://fritz:Admin123!@kleinerpsql.postgres.database.azure.com:5432/databank1");


// download images
app.use("/images", express.static(__dirname + '/images'));

// this is for Chainlink Smart Contracts to ask for price
app.get("/price", (req, res) => {

    console.log(req.query.tokenid)

    const ele = {tokenId:req.query.tokenid}

    getAnfrage("getPreisOfNFT",ele).then(anfrage =>{

      console.log("Die Anfrage:  " + anfrage);
      console.log("Die Antwort:  ");

            db.multi(anfrage , 123)
            .then(function (sql_answer) {
                // SEND FETCH ANSWER
                console.log(sql_answer);
                res.json(sql_answer[0][0]);
            })
            .catch(function (error) {
                console.log("ERROR:", error);
                res.json(error);
            });
    });

  });


// this is for all Database-Requests
app.post("/databank", (req, res) => {

  getAnfrage(req.body.methode,req.body.ele).then(anfrage =>{

    console.log("Die Anfrage:  " + anfrage);
    console.log("Die Antwort:  ");

    db.multi(anfrage , 123)
      .then(function (sql_answer) {
        // SEND FETCH ANSWER
        console.log(sql_answer);
        res.json(sql_answer);
      })
      .catch(function (error) {
        console.log("ERROR:", error);
        res.json("error");
      });
    });
  });


// upload Images
const multer = require('multer');
var fs = require('fs');

var storage = multer.diskStorage({
  destination: './images/profile',
  filename: function (req, file, cb) {

      cb(null, file.originalname);
  }
});

var upload = multer({storage: storage});

// 'image' must be name of <input>' in react app
app.use(upload.single('image'))
app.post('/uploadUserImage', (req, res) => {

  res.json({message:"upload Use Image"})
 });


// delete old picture. Is used when upload new profile Pic, to delete the old one
app.post("/deleteProfilPic", (req, res) => {

  console.log(req.body.userAddress);
  const userAdd = req.body.userAddress.toString();

  fs.unlink("./images/profile/" + userAdd + ".jpeg" , (err)=>{ console.log(err)});
  fs.unlink("./images/profile/" + userAdd + ".png", (err)=>{ console.log(err)});
  fs.unlink("./images/profile/" + userAdd + ".jpg", (err)=>{ console.log(err)});

  res.json({ message: "Files Deleted" });

});

// App Listen
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});




// here are all query requests defined
async function getAnfrage(methode,ele){

  console.log("Die Methode: " + methode);
  console.log("Die Elemente: ");
  console.log(ele);

  var anfrage;

  // Person
  // erst delete. sorgt dafür dass eine person nur einam in liste ist
  if(methode === "add"){
      anfrage= ` delete from Person where address = '${ele.address}';
                delete from Person where address = '${ele.address}';
                insert into Person values ('${ele.username}', '${ele.address}');

                `;
  }

  if(methode === "find"){
      anfrage= `select * from Person where address ='${ele.address}';  `;
  }


  //NFT
  if(methode === "getNFTLikes"){
    anfrage= ` select count(*) from Likes where tokenId ='${ele.tokenId}';  `;
  }

  if(methode === "doILike"){
    anfrage= ` select count(*) from Likes where tokenId ='${ele.tokenId}' and address='${ele.address}';  `;
  }

  if(methode === "likeNFT"){
    anfrage= `

    insert into Likes
    Select '${ele.tokenId}','${ele.address}'
    Where not exists (select * from Likes where tokenid='${ele.tokenId}'and address= '${ele.address}');

    `;
  }
  if(methode === "dislikeNFT"){
    anfrage= `

    delete from Likes where tokenId ='${ele.tokenId}' and address='${ele.address}';

    `;
  }

  if(methode === "getLikesList"){
    anfrage= `

    select tokenid from likes where address='${ele.address}';

    `;
  }

  if(methode === "getAlltokenidILike"){
    anfrage= `

    select Likes.address,name from Likes left outer join Person on Likes.address = Person.address where tokenid='${ele.tokenId}';

    `;
  }


  


  // Follower
  if(methode === "follow"){
    anfrage= `
    delete from Follow where person= '${ele.person}' and follower= '${ele.follower}';
    insert into Follow values ('${ele.person}','${ele.follower}');
    `;
  }
  if(methode === "unfollow"){
    anfrage= `

    delete from Follow where person= '${ele.person}' and follower= '${ele.follower}';
    `;
  }

  if(methode === "followCount"){
    anfrage= `

    select count (*) from Follow where person ='${ele.person}';
    `;
  }

  if(methode === "getFollowList"){
    anfrage= `

    select follower,name from Follow left outer join Person on Follow.follower = Person.address where person='${ele.person}';

    `;
  }

  if(methode === "doIFollow"){
    anfrage= `

    select count (*) from Follow where person ='${ele.person}' and follower='${ele.follower}';
    `;
  }

  if(methode === "WHOdoIFollow"){
    anfrage= `

    select person,name from Follow left outer join Person on Follow.person = Person.address where follower='${ele.me}';

    `;
  }


  //collecion
  if(methode === "createCollection"){
    anfrage= `

    delete from collection where collection = '${ele.collection}';
    delete from collection where collection = '${ele.collection}';
    insert into collection values ('${ele.collection}','${ele.creator}');

    `;
  }

  if(methode === "getMyCollections"){
    anfrage= `

    select collection from collection where creator ='${ele.creator}';

    `;
  }

  if(methode === "doesCollectionExist"){
    anfrage= `

    select collection from collection where collection ='${ele.collection}';

    `;
  }

  if(methode === "getCretorFromCollection"){
    anfrage= `

    select creator from collection where collection ='${ele.collection}';

    `;
  }

  if(methode === "getAllCollections"){
    anfrage= `

    select collection from collection limit ${ele.limit} offset ${ele.offset};

    `;
  }

  if(methode === "getAllCollectionsOfPerson"){
    anfrage= `

    select collection from collection where creator='${ele.person}' limit ${ele.limit} offset ${ele.offset};

    `;
  }


  if(methode === "searchCollections"){
    anfrage= `

    select DISTINCT collection from nftInfo where find like '%${ele.find}%' and collection != '' limit ${ele.limit} offset ${ele.offset};

    `;
  }

  if(methode === "searchCollectionsOfPerson"){
    anfrage= `

    select DISTINCT collection from nftInfo where find like '%${ele.find}%' and collection != '' and creator='${ele.person}' limit ${ele.limit} offset ${ele.offset};

    `;
  }


  //nftInfo
  if(methode === "createNFTInfo"){
    anfrage= `

    delete from nftInfo where tokenId = '${ele.tokenId}';
    insert into nftInfo values ('${ele.tokenId}','${ele.find}','${ele.collection}','${ele.creator}','${ele.name}','${ele.metaDataURL}');

    `;
  }

  if(methode === "getAllTokenIdFromCollection"){
    anfrage= `

    select tokenid from nftInfo where collection ='${ele.collection}';

    `;
  }

  if(methode === "getNFTInfoFromTokenId"){
    anfrage= `

    select * from nftInfo where tokenid ='${ele.tokenId}';

    `;
  }

  if(methode === "highestTokenId"){
    anfrage= `

    select max(tokenid) from nftInfo;

    `;
  }

  if(methode === "getAllSingles"){
    anfrage= `

    select tokenid from nftInfo limit ${ele.limit} offset ${ele.offset};

    `;
  }

  if(methode === "getTokenIdFromSearch"){
    anfrage= `

    select tokenid from nftinfo where find like  '%${ele.find}%';

    `;
  }

  if(methode === "getTokenIdFromSearchLimit"){
    anfrage= `

    select tokenid from nftinfo where find like  '%${ele.find}%' limit ${ele.limit} offset ${ele.offset};

    `;
  }

  if(methode === "getTokenURI"){
    anfrage= `

    select metaurl from nftinfo where tokenid = '${ele.tokenId}';

    `;
  }

  if(methode === "getOffchainMetaData"){
    anfrage= `

    select metaurl,name,tokenid from nftinfo where creator ='${ele.creator}';

    `;
  }

  if(methode === "buyOffChainNFT_deleteCreator"){
    anfrage= `

    update nftinfo set creator = '' where tokenid = '${ele.tokenId}';

    `;
  }


  // Preis
  if(methode === "setPreisOfNFT"){
    anfrage= `

    delete from preis where tokenid = '${ele.tokenId}';
    delete from preis where tokenid = '${ele.tokenId}';
    insert into preis values ('${ele.tokenId}','${ele.preis}');

    `;
  }

  if(methode === "getPreisOfNFT"){
    anfrage= `

    select preis from preis where tokenid = '${ele.tokenId}';

    `;
  }


  // MESSAGES_____________

  if(methode === "getMessages"){
    anfrage= `

    select * from messages where von = '${ele.from}' AND zu ='${ele.to}' OR (zu = '${ele.from}' AND von ='${ele.to}') ORDER BY id desc limit ${ele.limit} offset ${ele.offset} ;

    `;
  }

  if(methode === "sendMessage"){
    anfrage= `

      insert into messages values ('${ele.message}','${ele.from}','${ele.to}','${ele.date}')
    `;
  }

  if(methode === "sendMessageEnrcypt"){
    anfrage= `

      insert into messages (message,von,zu,date,sendermessage,receivermessage) values ('${ele.message}','${ele.from}','${ele.to}','${ele.date}', '${ele.senderMessage}', '${ele.receiverMessage}')
    `;
  }

  

  if(methode === "getAllMyMessages"){
    anfrage= `

    select * from messages where von = '${ele.me}' OR zu ='${ele.me}';

    `;
  }

  if(methode === "getLatestMessage"){
    anfrage= `

    select * from messages where id = (select max(id) from messages where von = '${ele.from}' AND zu ='${ele.to}' OR (zu = '${ele.from}' AND von ='${ele.to}' ) );


    `;
  }
  

  // NOTIFICATIONS

  if(methode === "loadMyNotifications"){
    anfrage= `

    select * from notifications where zu='${ele.zu}';

    `;
  }

  if(methode === "setNotification"){
    anfrage= `

    delete from notifications where notification = '${ele.notification}' and von = '${ele.von}' and zu = '${ele.zu}' and nft = '${ele.nft}';
    insert into notifications values ('${ele.notification}','${ele.von}','${ele.zu}','${ele.nft}');

    `;
  }

  if(methode === "deleteNotification"){
    anfrage= `

    delete from notifications where id = '${ele.id}';
 
    `;
  }


  // ADD PUBLIC KEY 
  if(methode === "addPublicKeyToDB"){
    anfrage= `

    insert into publickey values ('${ele.address}', '${ele.key}');
 
    `;
  }

  if(methode === "checkPublicKeyExists"){
    anfrage= `

    select count(*) from publickey where address = '${ele.address}';
 
    `;
  }

  if(methode === "getPublicKey"){
    anfrage= `

    select key from publickey where address = '${ele.address}';
 
    `;
  }


  // MCB WALLET

  if(methode === "register"){
    anfrage= `

    insert into username values ('${ele.name}', '${ele.pw}','${ele.publickey}','${ele.privatekey}','${ele.address}');
 
    `;
  }

  if(methode === "getNamePW"){
    anfrage= `

    select * from username where name = '${ele.name}' AND pw = '${ele.pw}';
    `;
  }


  


    

  return anfrage; /// <-- return
}



