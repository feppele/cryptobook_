// server/index.js

const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.json());

// databank
var pgp = require("pg-promise")(/*options*/);
var db = pgp("postgres://fritz:admin@localhost:5432/databank1");





app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
  });



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













  // download Images
  app.use(express.static('public')); 
  app.use('/images', express.static('images'));



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




app.post("/deleteProfilPic", (req) => {

  console.log(req.body.userAddress);


  fs.unlinkSync("./images/profile/q.png");


})


// 'image' must be name of <input>'
app.use(upload.single('image'))

app.post('/uploadUserImage', (req, res) => {

  console.log("IN UPLOAD")
  console.log(req.body)
//   console.log(req)
//   console.log("req")

// console.log(JSON.stringify(req.body.photo)) // form fields
// console.log(req.photo) // form files
// console.log(req.file) // form files
// res.send(req.body.photo);
});


























  app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });









async function getAnfrage(methode,ele){

  console.log("Die Methode: " + methode);

    var anfrage;

    // Person
    // erst delete. sorgt dafür dass eine person nur einam in liste ist
    if(methode === "add"){
        anfrage= ` delete from Person where address = '${ele.address}';   insert into Person values ('${ele.address}', '${ele.username}'); `;
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

      select Likes.address,name from Likes left outer join Person on Likes.address = Person.address where tokenid='${ele.tokenId}';

      `;
    }


    // Follower
    if(methode === "follow"){
      anfrage= `

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








    return anfrage; /// <-- return
}



//query("find",{address:"0x447f0D108d66431BB85CbEd1F477D41fd728a380"});



