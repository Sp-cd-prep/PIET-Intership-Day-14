const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt')
const saltRound = 10;

const jwt = require('jsonwebtoken')
const secretKey = "acharya"

// const auth = require('../Middleware/auth')


let arr=[];
router.post('/register',(req,res)=>{
    //to receive the user input data
    const data = req.body
    console.log(data,"before hash"); //{ email: 'piet@gmail.com', password: '12345678' }

    //to hash the password into fixed length of string
    data.password =  bcrypt.hashSync(data.password, saltRound);
    console.log(data,"after hash")

    //add validation , if user again input the same email then it shows this email is already exist
    let account = arr.find(item=>item.email===data.email)
    if(account){
        return res.send("This email is already exist")
    }

    // push the user credentials into array
    arr.push(data)
    console.log(arr)

    const token = jwt.sign({user:data.email},secretKey)  //jwt token generation  
    console.log(token,"token");


    // res.send("User registered Successfully!")

    res.send({msg:"user Registered successfully", token:token});


})


router.post('/login',(req,res)=>{
    const loginData = req.body;
    console.log("loginData",loginData); //{ email: 'piet@gmail.com', password: '12345678' }


    let account = arr.find(item=>item.email===loginData.email)
    console.log(account,"account")
    if(!account){
        return  res.send("user is not registered")
      }

    const validate = bcrypt.compareSync(loginData.password,account.password)
    console.log(validate,"validate")
    if(validate){
        const token = jwt.sign({user:loginData.email},secretKey,{expiresIn:"365d"})

        return res.send({msg:"user Registered successfully", token:token})
     }
     else{
         return res.send("password is wrong")
     }

})

router.get('/home',(req,res)=>{
    res.send({msg:"Welcome to home page"})
  })
  
router.get('/dashboard', (req,res)=>{
    res.send({msg:"Welcome to Dashboard"})
  })

module.exports=router