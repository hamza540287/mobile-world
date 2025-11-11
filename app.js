const { error } = require("console")
const express = require("express")
const app = express()
const nodemailer= require("nodemailer")
const path = require("path")
const serverless= require("serverless-http")
const port= 3000;

 // view engine setup
 app.set("view engine","ejs")
 app.set("views",path.join(__dirname,"views"))

 // static folder
 app.use(express.static(path.join(__dirname,"public")))
  // body parser
  app.use(express.urlencoded({extended: true}))
  app.use(express.json())
  // routes
  app.get("/",(req, res)=>{
    res.render("index");
  })
  app.post("/send",(req,res)=>{
    const {name, email, msg}=req.body;
    let transport= nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "ah540223@gmail.com",
            pass: "aufdwgjtjzwlywes"
        }
    })
    let mailOption= {
        from: email,
        to: "ah540223@gmail.com",
        subject: "new order",
        text: `Name: ${name}, \n Email: ${email}, \n Message: ${msg}`,
    };
    transport.sendMail(mailOption,(error,info)=>{
        if(error){
            console.log(error)
            return res.send("error"+ error)
        }
        else{
            console.log("sucessful");
            res.send("sent sucessfully")
        }
    })
  })

app.listen(port,()=>{
    console.log(`app listening on port ${port}`);
})