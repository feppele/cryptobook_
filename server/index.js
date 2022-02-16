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

            db.one(anfrage , 123)
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



  app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });






// ` delete from Person where address = '${address}';  `




async function getAnfrage(methode,ele){

    var anfrage;

    // erst delete. sorgt dafür dass eine person nur einam in liste ist
    if(methode === "add"){
        anfrage= ` delete from Person where address = '${ele.address}';   insert into Person values ('${ele.address}', '${ele.username}'); `;
    }
    if(methode === "find"){
        anfrage= `select * from Person where address ='${ele.address}';  `;
    }

    
    return anfrage; /// <-- return
}



//query("find",{address:"0x447f0D108d66431BB85CbEd1F477D41fd728a380"});



